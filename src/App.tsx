/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { SectionOne } from './components/SectionOne';
import { SectionTwo } from './components/SectionTwo';
import { ExitFeedbackModal } from './components/ExitFeedbackModal';
import { useExitIntent } from './hooks/useExitIntent';
import { feedbackService } from './utils/feedbackService';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const { isOpen, closePopup } = useExitIntent();
  const [verificationToast, setVerificationToast] = useState<string | null>(null);

  // Check if page loaded with email verification token ?confirm_feedback=...
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const confirmToken = params.get('confirm_feedback');
    if (confirmToken) {
      feedbackService.verifyEmailToken(confirmToken).then((success) => {
        if (success) {
          setVerificationToast('Email verified successfully! Thank you for confirming.');
          // Clean URL without page refresh
          const cleanUrl = window.location.origin + window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl);
          setTimeout(() => {
            setVerificationToast(null);
          }, 6000);
        }
      });
    }
  }, []);

  const handleOpenPrivacyPolicy = () => {
    // Closes exit popup (without marking 7-day dismissal so user can return if needed)
    closePopup(false);
    // Dispatches event to trigger SectionTwo's comprehensive Privacy Policy modal
    window.dispatchEvent(new CustomEvent('open-privacy-modal'));
  };

  return (
    <div className="min-h-screen bg-white text-[#111827] font-sans selection:bg-[#0A5C36] selection:text-white overflow-x-hidden">
      {/* Email verification notification banner */}
      {verificationToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0A5C36] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-400 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
          <span className="text-xs sm:text-sm font-bold">{verificationToast}</span>
        </div>
      )}

      {/* 
        The website consists of ONLY TWO MAIN SECTIONS:
        - Section One: The idea and the community (Hero, Whiteboard illustration, Philosophy & Illustrated Journey)
        - Section Two: The benefits, final emotional call to action, and minimal embedded footer
      */}
      <main>
        {/* SECTION ONE: Hero and Community Introduction */}
        <SectionOne />

        {/* SECTION TWO: What You Get From The Community + Final Call to Action + Embedded Footer */}
        <SectionTwo />
      </main>

      {/* Exit Intent Feedback Modal */}
      <ExitFeedbackModal
        isOpen={isOpen}
        onClose={closePopup}
        onOpenPrivacyPolicy={handleOpenPrivacyPolicy}
      />
    </div>
  );
}
