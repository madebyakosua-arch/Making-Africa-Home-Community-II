import { useEffect, useRef, useState, useCallback } from 'react';
import { feedbackService } from '../utils/feedbackService';

interface UseExitIntentOptions {
  onTrigger?: () => void;
  enabled?: boolean;
  inactivityMs?: number; // Inactivity delay (now 5,000ms = 5s)
}

export function useExitIntent({
  onTrigger,
  enabled = true,
  inactivityMs = 5000,
}: UseExitIntentOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  // Check if device supports desktop cursor
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

    // Track cursor velocity/direction to catch fast upward motion toward browser tab bar
    let lastY = 0;
    let lastTime = Date.now();

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

    // 1. INACTIVITY TRIGGER (5 seconds without action)
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

    // User action events that reset the 5-second inactivity counter
    const userActionEvents = ['mousedown', 'keydown', 'touchstart', 'click'];
    const handleUserActivity = () => {
      resetInactivityTimer();
    };

    userActionEvents.forEach((evt) => {
      window.addEventListener(evt, handleUserActivity, { passive: true });
    });

    // Start initial 5-second inactivity timer upon page load
    resetInactivityTimer();

    // 2. EXIT INTENT TRIGGERS:
    // A. Detect when hovering cursor toward the top of the browser window (clientY <= 25px moving up fast)
    const handleMouseMove = (e: MouseEvent) => {
      resetInactivityTimer();

      if (!isDesktopCursorSupported()) return;
      if (isInteractingWithForm) return;
      if (feedbackService.isSuppressed()) return;

      const now = Date.now();
      const dt = now - lastTime;
      const dy = e.clientY - lastY;

      // If cursor is near top of viewport (clientY <= 30px) and moving upwards fast
      if (e.clientY <= 30 && dt > 0) {
        const speedY = dy / dt; // negative when moving up
        if (speedY < -0.2 || e.clientY <= 10) {
          openPopup();
        }
      }

      lastY = e.clientY;
      lastTime = now;
    };

    // B. Detect cursor leaving the document entirely through the top (clientY <= 0)
    const handleMouseLeave = (e: MouseEvent) => {
      if (!isDesktopCursorSupported()) return;
      if (isInteractingWithForm) return;
      if (feedbackService.isSuppressed()) return;

      // Mouse left through the top edge (or into browser chrome/tabs/close button)
      if (e.clientY <= 0 || e.relatedTarget === null) {
        openPopup();
      }
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      userActionEvents.forEach((evt) => {
        window.removeEventListener(evt, handleUserActivity);
      });
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
      window.removeEventListener('mousemove', handleMouseMove);
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
