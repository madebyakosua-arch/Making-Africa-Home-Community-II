/**
 * Utility to manage user status, exit intent suppression, and feedback persistence
 */

const STORAGE_KEYS = {
  HAS_JOINED: 'mah_user_joined_community',
  FEEDBACK_SUBMITTED: 'mah_feedback_submitted',
  FEEDBACK_DISMISSED_AT: 'mah_exit_feedback_dismissed_at',
  SESSION_SHOWN: 'mah_exit_feedback_shown_session',
  FEEDBACK_RECORDS_LOCAL: 'mah_local_feedback_history',
};

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

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
   * Submit feedback to the backend API with client fallback
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
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to submit feedback');
      }

      const result = await response.json();
      return result;
    } catch (err: any) {
      // In case API server is unreachable (e.g. pure static build or Netlify preview), submit directly to Google Form
      try {
        const gfUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdkvb3G_LmgdYddk2zy12fUK68NQ3wzglXwpB1YJIhoZoSQcQ/formResponse';
        const params = new URLSearchParams();
        params.append('entry.1900871461', payload.reason);
        if (payload.firstName) params.append('entry.1157894748', payload.firstName);
        if (payload.email) params.append('entry.1200870677', payload.email);
        params.append('entry.1315210203', payload.pageUrl || window.location.href);
        params.append('entry.1582234292', payload.additionalFeedback || 'N/A');

        // mode: 'no-cors' allows submission to Google Form from any static origin without CORS blocking
        fetch(gfUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString(),
        }).catch(() => {});
      } catch {
        // Ignore
      }

      const fallbackToken = payload.email ? Math.random().toString(36).substring(2, 15) : undefined;
      const fallbackConfirmationLink = payload.email
        ? `${window.location.origin}?confirm_feedback=${fallbackToken}`
        : null;

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
    }
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
