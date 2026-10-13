import { useEffect, useRef, useState, useCallback } from 'react';
import { feedbackService } from '../utils/feedbackService';

interface UseExitIntentOptions {
  onTrigger?: () => void;
  enabled?: boolean;
  inactivityMs?: number; // Inactivity delay (defaults to 10,000ms = 10s)
}

export function useExitIntent({
  onTrigger,
  enabled = true,
  inactivityMs = 10000,
}: UseExitIntentOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  // Check if device supports desktop cursor leave
  const isDesktopCursorSupported = useCallback(() => {
    if (typeof window === 'undefined') return false;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const hasHover = window.matchMedia('(hover: hover)').matches;
    return hasFinePointer && hasHover;
  }, []);

  const openPopup = useCallback(() => {
    if (!feedbackService.isSuppressed()) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement | null;
      feedbackService.markShownInSession();
      setIsOpen(true);
      if (onTrigger) onTrigger();
    }
  }, [onTrigger]);

  const closePopup = useCallback((dismiss = true) => {
    if (dismiss) {
      feedbackService.dismissFeedback();
    }
    setIsOpen(false);
    // Return focus to previous element
    if (previouslyFocusedElement.current && typeof previouslyFocusedElement.current.focus === 'function') {
      previouslyFocusedElement.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // If already suppressed (joined, submitted, or dismissed in last 7 days), don't attach triggers
    if (feedbackService.isSuppressed()) return;

    let isInteractingWithForm = false;
    let inactivityTimer: ReturnType<typeof setTimeout> | null = null;

    // Detect when user is actively completing a form input
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        if (!target.closest('#exit-intent-feedback-modal')) {
          isInteractingWithForm = true;
        }
      }
    };

    const handleFocusOut = () => {
      isInteractingWithForm = false;
    };

    // 1. INACTIVITY TRIGGER (10 seconds without action)
    const resetInactivityTimer = () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }

      inactivityTimer = setTimeout(() => {
        // Do not trigger if user is actively filling out a form or already suppressed
        if (isInteractingWithForm) return;
        if (feedbackService.isSuppressed()) return;

        openPopup();
      }, inactivityMs);
    };

    // User action events that reset the 10-second inactivity counter
    const userActionEvents = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    const handleUserActivity = () => {
      resetInactivityTimer();
    };

    userActionEvents.forEach((evt) => {
      window.addEventListener(evt, handleUserActivity, { passive: true });
    });

    // Start initial 10s timer upon page load
    resetInactivityTimer();

    // 2. EXIT INTENT TRIGGER: Cursor leaving top of the browser viewport (desktop)
    const handleMouseLeave = (e: MouseEvent) => {
      if (isDesktopCursorSupported() && e.clientY <= 0) {
        if (isInteractingWithForm) return;
        if (feedbackService.isSuppressed()) return;

        openPopup();
      }
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      userActionEvents.forEach((evt) => {
        window.removeEventListener(evt, handleUserActivity);
      });
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled, inactivityMs, isDesktopCursorSupported, openPopup]);

  return {
    isOpen,
    setIsOpen,
    openPopup,
    closePopup,
  };
}
