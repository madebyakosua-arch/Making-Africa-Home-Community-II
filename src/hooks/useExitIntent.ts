import { useEffect, useRef, useState, useCallback } from 'react';
import { feedbackService } from '../utils/feedbackService';

interface UseExitIntentOptions {
  onTrigger?: () => void;
  enabled?: boolean;
  inactivityMs?: number; // Inactivity delay (defaults to 5,000ms = 5s)
}

export function useExitIntent({
  onTrigger,
  enabled = true,
  inactivityMs = 5000,
}: UseExitIntentOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  const hasTriggeredRef = useRef<boolean>(false);

  const openPopup = useCallback(() => {
    if (hasTriggeredRef.current) return;
    if (!feedbackService.isSuppressed()) {
      hasTriggeredRef.current = true;
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
    if (hasTriggeredRef.current) return;

    // Check suppression
    if (feedbackService.isSuppressed()) return;

    let isInteractingWithForm = false;
    let inactivityTimer: ReturnType<typeof setTimeout> | null = null;

    // Track cursor velocity & position
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

    // 1. INACTIVITY TRIGGER (5 seconds without user action)
    const resetInactivityTimer = () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }

      inactivityTimer = setTimeout(() => {
        if (isInteractingWithForm) return;
        if (hasTriggeredRef.current) return;
        if (feedbackService.isSuppressed()) return;

        openPopup();
      }, inactivityMs);
    };

    // User action events that reset the 5s timer
    const userActionEvents = ['mousedown', 'keydown', 'touchstart', 'click'];
    const handleUserActivity = () => {
      resetInactivityTimer();
    };

    userActionEvents.forEach((evt) => {
      window.addEventListener(evt, handleUserActivity, { passive: true });
    });

    // Start 5s inactivity countdown
    resetInactivityTimer();

    // 2. EXIT INTENT: Cursor moving towards browser chrome / top bar (e.g. tabs or close button)
    const handleMouseMove = (e: MouseEvent) => {
      resetInactivityTimer();

      if (isInteractingWithForm) return;
      if (hasTriggeredRef.current) return;
      if (feedbackService.isSuppressed()) return;

      const now = Date.now();
      const dt = now - lastTime;
      const dy = e.clientY - lastY;

      // If cursor is within top 40px of the viewport
      if (e.clientY <= 40) {
        // Either near top (<=15px) or moving up (dy < 0)
        if (e.clientY <= 15 || (dt > 0 && dy < 0)) {
          openPopup();
        }
      }

      lastY = e.clientY;
      lastTime = now;
    };

    // 3. EXIT INTENT: Cursor leaves the document through the top window boundaries
    const handleMouseLeave = (e: MouseEvent) => {
      if (isInteractingWithForm) return;
      if (hasTriggeredRef.current) return;
      if (feedbackService.isSuppressed()) return;

      // Leaving top edge or leaving window
      if (e.clientY <= 10 || e.relatedTarget === null) {
        openPopup();
      }
    };

    // 4. WINDOW BLUR (User clicks away to another tab, devtools, or address bar)
    const handleWindowBlur = () => {
      if (isInteractingWithForm) return;
      if (hasTriggeredRef.current) return;
      if (feedbackService.isSuppressed()) return;

      // If user switches tab or clicks address bar
      openPopup();
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      userActionEvents.forEach((evt) => {
        window.removeEventListener(evt, handleUserActivity);
      });
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [enabled, inactivityMs, openPopup]);

  return {
    isOpen,
    setIsOpen,
    openPopup,
    closePopup,
  };
}
