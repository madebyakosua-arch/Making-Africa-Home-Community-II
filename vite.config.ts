import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import type { Plugin } from 'vite';
import crypto from 'crypto';

interface FeedbackRecord {
  id: string;
  reason: string;
  additionalFeedback?: string;
  firstName?: string;
  email?: string;
  consent: boolean;
  emailVerified: boolean;
  verificationToken?: string;
  submissionTime: string;
  pageUrl: string;
  ipHash: string;
}

// In-memory feedback store (persisted across Vite dev session)
const feedbackRecords: FeedbackRecord[] = [];
// In-memory rate limiting map: ipHash -> timestamp array
const rateLimitMap = new Map<string, number[]>();

function getClientIp(req: any): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || '127.0.0.1';
}

function hashIp(ip: string): string {
  return crypto.createHash('sha256').update(ip + '-mah-salt-2026').digest('hex').substring(0, 16);
}

function isValidEmail(email: string): boolean {
  if (typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length > 254) return false;
  // RFC 5322 compatible practical regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(trimmed);
}

function isRateLimited(ipHash: string, maxRequests = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ipHash) || [];
  const validTimestamps = timestamps.filter(t => now - t < windowMs);
  if (validTimestamps.length >= maxRequests) {
    return true;
  }
  validTimestamps.push(now);
  rateLimitMap.set(ipHash, validTimestamps);
  return false;
}

// Vite plugin to provide secure feedback API endpoints
function feedbackApiPlugin(): Plugin {
  return {
    name: 'feedback-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || '';
        
        // 1. POST /api/feedback
        if (req.method === 'POST' && url === '/api/feedback') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
            if (body.length > 50000) {
              res.writeHead(413, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Payload too large' }));
              req.destroy();
            }
          });

          req.on('end', () => {
            try {
              const data = JSON.parse(body || '{}');
              const clientIp = getClientIp(req);
              const ipHash = hashIp(clientIp);

              // Honeypot spam protection
              if (data.website_trap || data.honeypot) {
                // Silently succeed to fool spam bots
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Received' }));
                return;
              }

              // Rate limiting
              if (isRateLimited(ipHash, 8, 60000)) {
                res.writeHead(429, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Too many submissions. Please wait a minute before trying again.' }));
                return;
              }

              const { reason, additionalFeedback, firstName, email, consent, pageUrl } = data;

              if (!reason || typeof reason !== 'string' || reason.trim() === '') {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'A feedback reason is required' }));
                return;
              }

              const trimmedEmail = typeof email === 'string' ? email.trim() : '';
              const trimmedName = typeof firstName === 'string' ? firstName.trim() : '';

              // Mandatory contact details validation
              if (!trimmedName) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Please enter your first name' }));
                return;
              }

              if (!trimmedEmail) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Please enter your email address' }));
                return;
              }

              if (!isValidEmail(trimmedEmail)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Please enter a valid email address' }));
                return;
              }

              if (!consent) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Consent is required to submit feedback and receive a reply' }));
                return;
              }

              const id = crypto.randomUUID();
              let verificationToken: string | undefined = undefined;
              let confirmationLink: string | undefined = undefined;

              if (trimmedEmail) {
                verificationToken = crypto.randomBytes(24).toString('hex');
                // Build secure confirmation link using origin or host
                const host = req.headers.host || 'localhost:3000';
                const protocol = req.headers['x-forwarded-proto'] || 'http';
                confirmationLink = `${protocol}://${host}?confirm_feedback=${verificationToken}`;
              }

              const record: FeedbackRecord = {
                id,
                reason: reason.trim(),
                additionalFeedback: typeof additionalFeedback === 'string' ? additionalFeedback.trim().slice(0, 1000) : undefined,
                firstName: trimmedName ? trimmedName.slice(0, 100) : undefined,
                email: trimmedEmail || undefined,
                consent: Boolean(consent),
                emailVerified: false,
                verificationToken,
                submissionTime: new Date().toISOString(),
                pageUrl: typeof pageUrl === 'string' ? pageUrl.slice(0, 500) : '/',
                ipHash,
              };

              feedbackRecords.push(record);

              // Forward to Google Form
              const googleFormUrl = process.env.GOOGLE_FORM_POST_URL || 'https://docs.google.com/forms/d/e/1FAIpQLSdkvb3G_LmgdYddk2zy12fUK68NQ3wzglXwpB1YJIhoZoSQcQ/formResponse';
              const entryReason = process.env.GOOGLE_FORM_ENTRY_REASON || 'entry.1900871461';
              const entryFirstName = process.env.GOOGLE_FORM_ENTRY_NAME || 'entry.1157894748';
              const entryEmail = process.env.GOOGLE_FORM_ENTRY_EMAIL || 'entry.1200870677';
              const entryPageUrl = process.env.GOOGLE_FORM_ENTRY_PAGE_URL || 'entry.1315210203';
              const entryAdditional = process.env.GOOGLE_FORM_ENTRY_ADDITIONAL || 'entry.1582234292';

              try {
                const formParams = new URLSearchParams();
                formParams.append(entryReason, record.reason);
                if (record.firstName) {
                  formParams.append(entryFirstName, record.firstName);
                }
                if (record.email) {
                  formParams.append(entryEmail, record.email);
                }
                formParams.append(entryPageUrl, record.pageUrl || '/');
                formParams.append(entryAdditional, record.additionalFeedback || 'N/A');

                fetch(googleFormUrl, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                  body: formParams.toString(),
                })
                  .then((gfRes) => {
                    console.log(`[Google Form] Forwarded feedback ID: ${id}, HTTP Status: ${gfRes.status}`);
                  })
                  .catch((err) => console.warn(`[Google Form Forward Error]:`, err.message));
              } catch (gErr: any) {
                console.warn(`[Google Form Forward Exception]:`, gErr.message);
              }

              // Server log (omits personal email / name to keep logs clean and private)
              console.log(`[Feedback Received] ID: ${id}, Reason: "${record.reason}", HasEmail: ${Boolean(record.email)}, Verified: false`);
              if (confirmationLink) {
                console.log(`[Email Confirmation Link Generated]: ${confirmationLink}`);
              }

              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                success: true,
                id,
                hasEmail: Boolean(trimmedEmail),
                verificationToken: verificationToken || null,
                confirmationLink: confirmationLink || null, // Provided for instant in-app verification testing
              }));
            } catch (err) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Invalid JSON request' }));
            }
          });
          return;
        }

        // 2. GET /api/feedback/verify?token=...
        if (req.method === 'GET' && url.startsWith('/api/feedback/verify')) {
          try {
            const urlObj = new URL(url, 'http://localhost');
            const token = urlObj.searchParams.get('token');

            if (!token) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Verification token is required' }));
              return;
            }

            const record = feedbackRecords.find(r => r.verificationToken === token);
            if (!record) {
              res.writeHead(404, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Verification link expired or not found' }));
              return;
            }

            record.emailVerified = true;
            // Token used
            console.log(`[Email Verified] ID: ${record.id}, Status: verified`);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              success: true,
              verified: true,
              message: 'Your email has been successfully confirmed. Thank you!',
            }));
            return;
          } catch (e) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Server error verifying token' }));
            return;
          }
        }

        // 3. GET /api/feedback (Debug/Admin verification status check)
        if (req.method === 'GET' && url === '/api/feedback/stats') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            totalSubmissions: feedbackRecords.length,
            verifiedEmails: feedbackRecords.filter(r => r.emailVerified).length,
          }));
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), feedbackApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
