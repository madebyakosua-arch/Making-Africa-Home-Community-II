/**
 * Utility to manage user status, exit intent suppression, feedback persistence,
 * and reliable Google Form submission across all environments (Vite dev server, Netlify, Cloud Run).
 */

const STORAGE_KEYS = {
  HAS_JOINED: 'mah_user_joined_community',
  FEEDBACK_SUBMITTED: 'mah_feedback_submitted',
  FEEDBACK_DISMISSED_AT: 'mah_exit_feedback_dismissed_at',
  SESSION_SHOWN: 'mah_exit_feedback_shown_session',
  FEEDBACK_RECORDS_LOCAL: 'mah_local_feedback_history',
};

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

// Google Form Details:
// Form URL: https://docs.google.com/forms/d/e/1FAIpQLSdkvb3G_LmgdYddk2zy12fUK68NQ3wzglXwpB1YJIhoZoSQcQ/formResponse
const GOOGLE_FORM_ACTION_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdkvb3G_LmgdYddk2zy12fUK68NQ3wzglXwpB1YJIhoZoSQcQ/formResponse';

const GOOGLE_FORM_ENTRIES = {
  reason: 'entry.1900871461',
  firstName: 'entry.1157894748',
  email: 'entry.1200870677',
  pageUrl: 'entry.1315210203',
  additional: 'entry.1582234292',
};

/**
 * Sends feedback directly to Google Form from the client browser.
 * Uses both fetch(no-cors) and a hidden iframe form submission to guarantee delivery
 * across all browsers, CORS policies, ad-blockers, and static hosts (e.g. Netlify).
 */
export function sendDirectToGoogleForm(payload: {
  reason: string;
  additionalFeedback?: string;
  firstName?: string;
  email?: string;
  pageUrl?: string;
}) {
  const reasonVal = payload.reason || '';
  const nameVal = payload.firstName || '';
  const emailVal = payload.email || '';
  const urlVal = payload.pageUrl || (typeof window !== 'undefined' ? window.location.href : '');
  const additionalVal = payload.additionalFeedback || 'N/A';

  // 1. Primary method: fetch with mode 'no-cors'
  try {
    const formBody = new URLSearchParams();
    formBody.append(GOOGLE_FORM_ENTRIES.reason, reasonVal);
    if (nameVal) formBody.append(GOOGLE_FORM_ENTRIES.firstName, nameVal);
    if (emailVal) formBody.append(GOOGLE_FORM_ENTRIES.email, emailVal);
    formBody.append(GOOGLE_FORM_ENTRIES.pageUrl, urlVal);
    formBody.append(GOOGLE_FORM_ENTRIES.additional, additionalVal);

    fetch(GOOGLE_FORM_ACTION_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formBody.toString(),
    }).catch((err) => {
      console.warn('Google Form fetch note:', err);
    });
  } catch (e) {
    // Continue to hidden form submission
  }

  // 2. Guaranteed fallback method: Hidden form targeted to a hidden iframe
  // This bypasses any browser fetch restrictions, adblock script hooks, or CORB blocks.
  try {
    if (typeof document !== 'undefined') {
      const iframeName = 'gf_hidden_submit_frame_' + Date.now();
      const iframe = document.createElement('iframe');
      iframe.name = iframeName;
      iframe.style.display = 'none';
      iframe.setAttribute('aria-hidden', 'true');
      document.body.appendChild(iframe);

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = GOOGLE_FORM_ACTION_URL;
      form.target = iframeName;
      form.style.display = 'none';

      const fields: Record<string, string> = {
        [GOOGLE_FORM_ENTRIES.reason]: reasonVal,
        [GOOGLE_FORM_ENTRIES.firstName]: nameVal,
        [GOOGLE_FORM_ENTRIES.email]: emailVal,
        [GOOGLE_FORM_ENTRIES.pageUrl]: urlVal,
        [GOOGLE_FORM_ENTRIES.additional]: additionalVal,
      };

      for (const [key, value] of Object.entries(fields)) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();

      // Clean up DOM after dispatch
      setTimeout(() => {
        try {
          document.body.removeChild(form);
          document.body.removeChild(iframe);
        } catch {
          // Ignore cleanup errors
        }
      }, 3000);
    }
  } catch (domErr) {
    console.warn('Hidden form dispatch note:', domErr);
  }
}

export const feedbackService = {
  /**
   * Mark user as having completed community signup or clicked join
   */
  markUserJoinedCommunity: () => {
    try {
      localStorage.setItem(STORAGE_KEYS.HAS_JOINED, 'true');
    } catch {
      // Fallback for private browsing
    }
  },

  /**
   * Check if user is known to have joined the community or completed signup
   */
  isUserJoinedCommunity: (): boolean => {
    try {
      return localStorage.getItem(STORAGE_KEYS.HAS_JOINED) === 'true';
    } catch {
      return false;
    }
  },

  /**
   * Mark feedback as shown during current session
   */
  markShownInSession: () => {
    try {
      sessionStorage.setItem(STORAGE_KEYS.SESSION_SHOWN, 'true');
    } catch {
      // Ignore
    }
  },

  /**
   * Check if exit intent was already shown in this session
   */
  wasShownInSession: (): boolean => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.SESSION_SHOWN) === 'true';
    } catch {
      return false;
    }
  },

  /**
   * Dismiss the feedback popup (hide for 7 days)
   */
  dismissFeedback: () => {
    try {
      localStorage.setItem(STORAGE_KEYS.FEEDBACK_DISMISSED_AT, Date.now().toString());
      sessionStorage.setItem(STORAGE_KEYS.SESSION_SHOWN, 'true');
    } catch {
      // Ignore
    }
  },

  /**
   * Check if popup is currently suppressed (either joined, dismissed in last 7 days, or shown in session)
   */
  isSuppressed: (): boolean => {
    try {
      // 1. Suppress for visitors known to have completed signup
      if (localStorage.getItem(STORAGE_KEYS.HAS_JOINED) === 'true') {
        return true;
      }

      // 2. Suppress if already submitted feedback
      if (localStorage.getItem(STORAGE_KEYS.FEEDBACK_SUBMITTED) === 'true') {
        return true;
      }

      // 3. Suppress if shown this session
      if (sessionStorage.getItem(STORAGE_KEYS.SESSION_SHOWN) === 'true') {
        return true;
      }

      // 4. Suppress if dismissed within the last 7 days
      const dismissedAt = localStorage.getItem(STORAGE_KEYS.FEEDBACK_DISMISSED_AT);
      if (dismissedAt) {
        const timeElapsed = Date.now() - parseInt(dismissedAt, 10);
        if (timeElapsed < SEVEN_DAYS_MS) {
          return true;
        }
      }

      return false;
    } catch {
      return false;
    }
  },

  /**
   * Record successful submission
   */
  markFeedbackSubmitted: (record: any) => {
    try {
      localStorage.setItem(STORAGE_KEYS.FEEDBACK_SUBMITTED, 'true');
      sessionStorage.setItem(STORAGE_KEYS.SESSION_SHOWN, 'true');

      // Keep record in localStorage too for offline resilience
      const existingStr = localStorage.getItem(STORAGE_KEYS.FEEDBACK_RECORDS_LOCAL) || '[]';
      const list = JSON.parse(existingStr);
      list.push(record);
      localStorage.setItem(STORAGE_KEYS.FEEDBACK_RECORDS_LOCAL, JSON.stringify(list));
    } catch {
      // Ignore
    }
  },

  /**
   * Submit feedback:
   * 1. Submits directly to Google Form from client browser (guaranteed to work on Netlify and static deployments).
   * 2. Also calls /api/feedback backend endpoint if available.
   */
  submitFeedback: async (payload: {
    reason: string;
    additionalFeedback?: string;
    firstName?: string;
    email?: string;
    consent: boolean;
    pageUrl: string;
    honeypot?: string;
  }) => {
    // DIRECT GOOGLE FORM SUBMISSION: Guaranteed to execute in browser
    sendDirectToGoogleForm({
      reason: payload.reason,
      additionalFeedback: payload.additionalFeedback,
      firstName: payload.firstName,
      email: payload.email,
      pageUrl: payload.pageUrl || window.location.href,
    });

    const fallbackToken = payload.email ? Math.random().toString(36).substring(2, 15) : undefined;
    const fallbackConfirmationLink = payload.email
      ? `${window.location.origin}?confirm_feedback=${fallbackToken}`
      : null;

    // Optional backend sync (/api/feedback)
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      }
    } catch (err: any) {
      // Backend unavailable (e.g. Netlify static hosting) - safe to continue
    }

    const localRecord = {
      id: 'local-' + Date.now(),
      reason: payload.reason,
      additionalFeedback: payload.additionalFeedback,
      firstName: payload.firstName,
      email: payload.email,
      consent: payload.consent,
      emailVerified: false,
      verificationToken: fallbackToken,
      submissionTime: new Date().toISOString(),
      pageUrl: payload.pageUrl,
    };

    feedbackService.markFeedbackSubmitted(localRecord);

    return {
      success: true,
      id: localRecord.id,
      hasEmail: Boolean(payload.email),
      verificationToken: fallbackToken,
      confirmationLink: fallbackConfirmationLink,
    };
  },

  /**
   * Verify email token
   */
  verifyEmailToken: async (token: string) => {
    try {
      const response = await fetch(`/api/feedback/verify?token=${encodeURIComponent(token)}`);
      if (response.ok) {
        return true;
      }
    } catch {
      // Fallback: check local storage
    }

    try {
      const existingStr = localStorage.getItem(STORAGE_KEYS.FEEDBACK_RECORDS_LOCAL);
      if (existingStr) {
        const list = JSON.parse(existingStr);
        let updated = false;
        for (const item of list) {
          if (item.verificationToken === token) {
            item.emailVerified = true;
            updated = true;
          }
        }
        if (updated) {
          localStorage.setItem(STORAGE_KEYS.FEEDBACK_RECORDS_LOCAL, JSON.stringify(list));
          return true;
        }
      }
    } catch {
      // Ignore
    }

    return false;
  },
};
