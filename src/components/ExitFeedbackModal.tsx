import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Shield, AlertCircle, Sparkles, Send } from 'lucide-react';
import { DigitalTape } from './WhiteboardElements';
import { feedbackService } from '../utils/feedbackService';

interface ExitFeedbackModalProps {
  isOpen: boolean;
  onClose: (dismiss?: boolean) => void;
  onOpenPrivacyPolicy?: () => void;
}

const FEEDBACK_OPTIONS = [
  'I’m just browsing.',
  'I’m not ready to move to Africa yet.',
  'I need more information about the community.',
  'I’m not sure the community is right for me.',
  'I’m worried about spam or privacy.',
  'I had trouble signing up.',
  'I’m already a member.',
  'Other.',
];

export const ExitFeedbackModal: React.FC<ExitFeedbackModalProps> = ({
  isOpen,
  onClose,
  onOpenPrivacyPolicy,
}) => {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [otherFeedback, setOtherFeedback] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [consent, setConsent] = useState<boolean>(false);
  const [honeypot, setHoneypot] = useState<string>('');

  const [firstNameError, setFirstNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [reasonError, setReasonError] = useState<string>('');
  const [consentError, setConsentError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [hasEmailProvided, setHasEmailProvided] = useState<boolean>(false);
  const [confirmationLink, setConfirmationLink] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap and keyboard Esc handling
  useEffect(() => {
    if (!isOpen) return;

    // Focus close button or first option upon opening
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose(true); // Treat Escape as dismissal (hide for 7 days)
      }

      // Trap Tab key inside modal
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Frontend email format validation (RFC 5322 compliant)
  const validateEmailFormat = (emailVal: string): boolean => {
    if (!emailVal.trim()) return false;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return emailRegex.test(emailVal.trim());
  };

  const handleReasonSelect = (option: string) => {
    setSelectedReason(option);
    setReasonError('');
  };

  const handleFirstNameChange = (val: string) => {
    setFirstName(val);
    if (val.trim()) {
      setFirstNameError('');
    }
  };

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (val.trim()) {
      if (!validateEmailFormat(val)) {
        setEmailError('Please enter a valid email format (e.g. name@example.com)');
      } else {
        setEmailError('');
      }
    } else {
      setEmailError('Please enter your email address');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Mandatory Validation
    let hasError = false;

    if (!selectedReason) {
      setReasonError('Please select one of the options above.');
      hasError = true;
    }

    const trimmedName = firstName.trim();
    if (!trimmedName) {
      setFirstNameError('Please enter your first name.');
      hasError = true;
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setEmailError('Please enter your email address.');
      hasError = true;
    } else if (!validateEmailFormat(trimmedEmail)) {
      setEmailError('Please enter a valid email format.');
      hasError = true;
    }

    if (!consent) {
      setConsentError('Please tick the consent box to allow us to reply to your feedback.');
      hasError = true;
    }

    if (hasError) return;

    setIsSubmitting(true);

    try {
      const response = await feedbackService.submitFeedback({
        reason: selectedReason,
        additionalFeedback: selectedReason === 'Other.' ? otherFeedback : undefined,
        firstName: firstName.trim() || undefined,
        email: trimmedEmail || undefined,
        consent: Boolean(trimmedEmail && consent),
        pageUrl: window.location.href,
        honeypot: honeypot || undefined,
      });

      feedbackService.markFeedbackSubmitted({
        id: response.id,
        reason: selectedReason,
        emailProvided: Boolean(trimmedEmail),
        submissionTime: new Date().toISOString(),
      });

      setHasEmailProvided(Boolean(trimmedEmail));
      setConfirmationLink(response.confirmationLink || null);
      setIsSubmitted(true);
    } catch (err: any) {
      alert(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="exit-intent-feedback-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-feedback-title"
        className="fixed inset-0 z-50 bg-black/55 backdrop-blur-2xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      >
        {/* Backdrop click dismisses */}
        <div
          className="fixed inset-0"
          onClick={() => onClose(true)}
          aria-hidden="true"
        />

        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="bg-white rounded-3xl p-5 sm:p-8 max-w-xl w-full shadow-2xl border-2 border-[#111827] my-auto relative z-10 max-h-[92vh] flex flex-col overflow-y-auto"
        >
          {/* Playful Whiteboard Digital Tape at Top Corners */}
          <DigitalTape color="#FDE047" angle="-3deg" className="-top-3 left-6 sm:left-10" />
          <DigitalTape color="#86EFAC" angle="3deg" className="-top-3 right-6 sm:right-10" />

          {/* Modal Header */}
          <div className="flex items-start justify-between pb-3.5 border-b border-gray-100 shrink-0">
            <div>
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#0A5C36] bg-[#0A5C36]/10 px-2.5 py-0.5 rounded-full inline-block mb-1">
                Feedback
              </span>
              <h2
                id="exit-feedback-title"
                className="font-handwriting text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#111827] leading-tight"
              >
                Before you go, could you tell us why?
              </h2>
              <p className="text-xs sm:text-sm text-[#4B5563] mt-1 leading-relaxed">
                What stopped you from joining our free community today? Your feedback will help us improve.
              </p>
            </div>

            <button
              ref={closeButtonRef}
              onClick={() => onClose(true)}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200 shrink-0 ml-3"
              aria-label="Close feedback modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success View */}
          {isSubmitted ? (
            <div className="py-8 sm:py-10 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-[#0A5C36] rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="font-handwriting text-3xl font-extrabold text-[#111827]">
                  Thank you! Your feedback helps us improve.
                </h3>
                {hasEmailProvided ? (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/90 text-left space-y-2 mt-4">
                    <div className="flex items-start gap-2.5">
                      <Sparkles className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-[#92400E]">
                          Please check your inbox and confirm your email so we can get in touch.
                        </p>
                        <p className="text-[11px] text-[#78350F] mt-1">
                          We sent a verification link to confirm inbox access. We do not send community updates before confirmation.
                        </p>
                      </div>
                    </div>

                    {/* Quick test link in dev environment */}
                    {confirmationLink && (
                      <div className="pt-2 border-t border-amber-200/60 text-[11px]">
                        <span className="text-gray-500 font-medium">Test link: </span>
                        <a
                          href={confirmationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[#0A5C36] underline break-all"
                        >
                          Confirm email now
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-xs sm:text-sm text-[#4B5563]">
                    We truly appreciate your honesty. Safe travels and we hope to see you around!
                  </p>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => onClose(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#0A5C36] hover:bg-[#07472A] text-white font-bold text-sm cursor-pointer shadow-sm transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Form View */
            <form onSubmit={handleSubmit} className="pt-4 space-y-5">
              {/* Invisible Honeypot Spam Protection */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website_trap">Leave this blank</label>
                <input
                  type="text"
                  id="website_trap"
                  name="website_trap"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Single Choice Options */}
              <div>
                <fieldset className="space-y-2">
                  <legend className="sr-only">Choose a reason why you decided not to join</legend>
                  {FEEDBACK_OPTIONS.map((option) => {
                    const isSelected = selectedReason === option;
                    return (
                      <label
                        key={option}
                        className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer select-none text-xs sm:text-sm font-medium ${
                          isSelected
                            ? 'bg-[#0A5C36]/5 border-[#0A5C36] text-[#0A5C36] font-bold shadow-2xs'
                            : 'bg-white border-gray-200 text-[#1F2937] hover:border-gray-300 hover:bg-gray-50/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="feedback_reason"
                          value={option}
                          checked={isSelected}
                          onChange={() => handleReasonSelect(option)}
                          className="w-4 h-4 text-[#0A5C36] border-gray-300 focus:ring-[#0A5C36] focus:ring-1 cursor-pointer"
                        />
                        <span>{option}</span>
                      </label>
                    );
                  })}
                </fieldset>

                {reasonError && (
                  <p className="text-xs text-rose-600 font-bold mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{reasonError}</span>
                  </p>
                )}
              </div>

              {/* Conditional 'Other' Text Box */}
              {selectedReason === 'Other.' && (
                <div className="space-y-1.5 animate-fadeIn">
                  <label
                    htmlFor="other-feedback-textarea"
                    className="block text-xs font-bold text-[#111827]"
                  >
                    Please tell us more.
                  </label>
                  <textarea
                    id="other-feedback-textarea"
                    rows={3}
                    value={otherFeedback}
                    onChange={(e) => setOtherFeedback(e.target.value)}
                    placeholder="Tell us what’s on your mind..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-hidden focus:border-[#0A5C36] focus:ring-1 focus:ring-[#0A5C36] transition-colors"
                  />
                </div>
              )}

              {/* Optional Contact Details Section */}
              <div className="pt-3 border-t border-gray-100 space-y-3">
                <p className="text-xs sm:text-sm font-bold text-[#111827]">
                  Would you like us to get in touch? Leave your details below.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="feedback-first-name"
                      className="block text-[11px] font-bold text-gray-700 mb-1"
                    >
                      First name <span className="text-[#E11D48]">*</span>
                    </label>
                    <input
                      id="feedback-first-name"
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => handleFirstNameChange(e.target.value)}
                      placeholder="e.g. Kwame or Sarah"
                      className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border transition-colors focus:outline-hidden ${
                        firstNameError
                          ? 'border-rose-400 bg-rose-50/30'
                          : 'border-gray-300 focus:border-[#0A5C36] focus:ring-1 focus:ring-[#0A5C36]'
                      }`}
                    />
                    {firstNameError && (
                      <p className="text-[11px] text-rose-600 mt-1">{firstNameError}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="feedback-email"
                      className="block text-[11px] font-bold text-gray-700 mb-1"
                    >
                      Email address <span className="text-[#E11D48]">*</span>
                    </label>
                    <input
                      id="feedback-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      placeholder="you@email.com"
                      className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl border transition-colors focus:outline-hidden ${
                        emailError
                          ? 'border-rose-400 bg-rose-50/30'
                          : 'border-gray-300 focus:border-[#0A5C36] focus:ring-1 focus:ring-[#0A5C36]'
                      }`}
                    />
                    {emailError && (
                      <p className="text-[11px] text-rose-600 mt-1">{emailError}</p>
                    )}
                  </div>
                </div>

                {/* Disclaimer + Privacy Policy Link */}
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200/80 text-[11px] text-[#4B5563] leading-relaxed">
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-[#0A5C36] shrink-0 mt-0.5" />
                    <div>
                      <span>
                        We respect your privacy and won’t spam you. If you leave your email, we may contact you about your feedback and our free community. You can unsubscribe at any time.{' '}
                      </span>
                      {onOpenPrivacyPolicy ? (
                        <button
                          type="button"
                          onClick={onOpenPrivacyPolicy}
                          className="font-bold text-[#0A5C36] hover:underline underline-offset-2 cursor-pointer inline-block ml-1"
                        >
                          Privacy policy
                        </button>
                      ) : (
                        <a
                          href="#main-footer"
                          className="font-bold text-[#0A5C36] hover:underline underline-offset-2 inline-block ml-1"
                        >
                          Privacy policy
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Consent Checkbox: mandatory */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 text-xs text-[#1F2937] cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        if (e.target.checked) setConsentError('');
                      }}
                      className="mt-0.5 w-4 h-4 text-[#0A5C36] rounded border-gray-300 focus:ring-[#0A5C36] cursor-pointer"
                    />
                    <span className="font-medium leading-snug">
                      I agree to receive emails about my feedback and the free community. <span className="text-[#E11D48]">*</span>
                    </span>
                  </label>

                  {consentError && (
                    <p className="text-xs text-rose-600 font-bold mt-1 pl-6.5">
                      {consentError}
                    </p>
                  )}
                </div>
              </div>

              {/* Footer Buttons: Submit & No thanks */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => onClose(true)}
                  className="order-2 sm:order-1 text-xs sm:text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors cursor-pointer py-2 px-1"
                >
                  No thanks
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="order-1 sm:order-2 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#0A5C36] hover:bg-[#07472A] text-white text-xs sm:text-sm font-bold shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending...' : 'Send feedback'}</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
