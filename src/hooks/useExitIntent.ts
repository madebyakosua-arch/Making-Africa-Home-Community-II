import { useEffect, useRef, useState, useCallback } from 'react';
import { feedbackService } from '../utils/feedbackService';

interface UseExitIntentOptions {
  onTrigger?: () => void;
  enabled?: boolean;
}

export function useExitIntent({ onTrigger, enabled = true }: UseExitIntentOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  // Check if device supports accurate exit intent cursor leave
  const isDesktopCursorSupported = useCallback(() => {
    if (typeof window === 'undefined') return false;
    // Check if pointer is fine (mouse/trackpad cursor) and hover is available
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

    // Do not attach on touch or non-fine pointer devices
    if (!isDesktopCursorSupported()) return;

    // If already suppressed, don't listen
    if (feedbackService.isSuppressed()) return;

    let isInteractingWithForm = false;

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
        // Exclude inputs inside our own exit popup if open
        if (!target.closest('#exit-intent-feedback-modal')) {
          isInteractingWithForm = true;
        }
      }
    };

    const handleFocusOut = () => {
      isInteractingWithForm = false;
    };

    // Exit intent: cursor leaves top of the browser viewport
    const handleMouseLeave = (e: MouseEvent) => {
      // Must leave through the top of the viewport (clientY <= 0)
      if (e.clientY <= 0) {
        // Do NOT trigger while completing a form
        if (isInteractingWithForm) return;

        // Check again suppression
        if (feedbackService.isSuppressed()) return;

        openPopup();
      }
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled, isDesktopCursorSupported, openPopup]);

  return {
    isOpen,
    setIsOpen,
    openPopup,
    closePopup,
  };
}
