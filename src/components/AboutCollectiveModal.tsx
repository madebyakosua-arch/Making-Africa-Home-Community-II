import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Briefcase, HelpCircle, Users, CheckCircle2 } from 'lucide-react';
import { Logo } from './Logo';
import {
  DigitalTape,
  HandDrawnButton,
  HandDrawnUnderline,
  HandDrawnStar,
} from './WhiteboardElements';

interface AboutCollectiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FACEBOOK_COMMUNITY_URL = 'https://www.facebook.com/share/g/1Bua3PKEEQ/';

export const AboutCollectiveModal: React.FC<AboutCollectiveModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-2xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop Click to close */}
          <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

          {/* Whiteboard Board Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 14 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-white rounded-3xl p-5 sm:p-7 max-w-xl w-full shadow-2xl border-2 border-[#111827] my-auto relative z-10 max-h-[92vh] flex flex-col"
          >
            {/* Whiteboard Digital Tape at Top Corners */}
            <DigitalTape color="#FDE047" angle="-3deg" className="-top-3 left-6 sm:left-10" />
            <DigitalTape color="#86EFAC" angle="3deg" className="-top-3 right-6 sm:right-10" />

            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3.5 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-3">
                <Logo variant="dark" showText={false} className="w-10 h-10 shrink-0" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-handwriting text-2xl sm:text-3xl font-extrabold text-[#111827] leading-none">
                      Africa Link Collective
                    </h3>
                    <HandDrawnStar className="w-4 h-4 text-[#D97706]" />
                  </div>
                  <p className="font-handwriting text-sm sm:text-base font-bold text-[#0A5C36] mt-0.5">
                    The team behind the Making Africa Home community 🏡
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Handwritten Greeting Sticky Note */}
            <div className="pt-2 pb-1 shrink-0">
              <span className="font-handwriting text-sm sm:text-base text-[#EA580C] font-bold block -rotate-0.5">
                Grab a seat! Here is our story and how we help you ☕
              </span>
            </div>

            {/* Scrollable Whiteboard Body */}
            <div className="space-y-4 text-sm sm:text-base text-[#374151] overflow-y-auto pr-1 py-2">
              {/* 1. What is Africa Link Collective */}
              <div className="rounded-2xl bg-amber-50/60 p-4 border-2 border-dashed border-[#D97706]/40 relative">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h4 className="font-handwriting text-lg sm:text-xl font-bold text-[#92400E] flex items-center gap-1.5">
                    <span>What is Africa Link Collective?</span>
                  </h4>
                  <span className="text-[10px] font-extrabold uppercase tracking-wide text-[#92400E] bg-amber-100 px-2 py-0.5 rounded-md">
                    Our Network
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#78350F] leading-relaxed">
                  We are a friendly group of diasporians and locals who love connecting people back to Africa. Whether you want to visit, move back for good, work remotely, or build something new—we help you find trusted people, real answers, and good friends.
                </p>
              </div>

              {/* 2. What is Making Africa Home (Specific Details) */}
              <div className="rounded-2xl bg-[#0A5C36]/5 p-4 sm:p-5 border-2 border-dashed border-[#0A5C36]/35 relative">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h4 className="font-handwriting text-lg sm:text-xl font-extrabold text-[#0A5C36] flex items-center gap-1.5">
                    <span>Specifically: What is Making Africa Home?</span>
                  </h4>
                  <span className="text-[10px] font-extrabold uppercase tracking-wide text-[#0A5C36] bg-emerald-100 px-2 py-0.5 rounded-md">
                    Free Community
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#1F2937] leading-relaxed mb-3">
                  <strong>Making Africa Home</strong> is our dedicated, free Facebook community. Moving to a new country can feel scary when you try to figure it all out by yourself. We made this space so you never have to do it alone.
                </p>
                <div className="space-y-2 text-xs sm:text-sm text-[#111827]">
                  {/* Key Feature: The Relocation Buddy */}
                  <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/90 mb-2">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#92400E] bg-amber-100 px-2 py-0.5 rounded-md">
                        Key Community Feature
                      </span>
                      <strong className="text-xs sm:text-sm font-extrabold text-[#111827]">
                        The "Relocation Buddy" 🤝
                      </strong>
                    </div>
                    <p className="text-xs text-[#78350F] leading-relaxed">
                      Pairing someone who is <strong>3 months away from moving</strong> with <strong>someone who moved last year</strong> or a <strong>reliable local in their country</strong>. You get real one-on-one clarity before you fly and a warm friend when you arrive.
                    </p>
                  </div>

                  {/* Founding Members & Intimate Atmosphere Note */}
                  <div className="p-3 rounded-xl bg-emerald-50/90 border border-emerald-200 mb-2.5">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#065F46] bg-emerald-100 px-2 py-0.5 rounded-md">
                        Founding Member Circle
                      </span>
                      <strong className="text-xs sm:text-sm font-extrabold text-[#111827]">
                        Just Opening Our Doors 🌱
                      </strong>
                    </div>
                    <p className="text-xs text-[#065F46] leading-relaxed">
                      We’re just opening our doors! Join as one of our <strong>Founding Members</strong> and help us shape this space from day one. We are intentionally starting small and intimate. No spam, no aggressive property agents, no noise—just genuine diasporians and locals connecting directly and helping each other move home.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0A5C36] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#0A5C36]">Ask the real questions:</strong> Find out about realistic rent, safe areas, steady power, fast Wi-Fi, schools, and visas.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0A5C36] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#0A5C36]">Meet real friends:</strong> Talk to people who are thinking about moving, getting ready to pack, or already unpacked here.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0A5C36] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#0A5C36]">Life after the flight:</strong> Boarding the plane is only step one. We help you build a full, happy everyday life.
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. Core Values: Genuine, Professional, Helpful, Approachable */}
              <div className="pt-1">
                <div className="mb-2.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0A5C36] bg-[#0A5C36]/10 px-2.5 py-0.5 rounded-full inline-block mb-1">
                    What Guides Us
                  </span>
                  <div className="flex items-center gap-2">
                    <h4 className="font-handwriting text-xl sm:text-2xl font-extrabold text-[#111827]">
                      Our 4 Core Values
                    </h4>
                    <HandDrawnUnderline className="w-20 h-2" color="#EA580C" />
                  </div>
                  <p className="text-xs text-[#4B5563]">
                    Every conversation, advice thread, and meetup follows these 4 simple principles:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* 1. Genuine */}
                  <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center text-[#D97706]">
                        <Heart className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <h5 className="font-extrabold text-xs sm:text-sm text-[#92400E]">Genuine</h5>
                    </div>
                    <p className="text-xs text-[#78350F] leading-relaxed">
                      Real stories only. No fake hype, no sales pitch, no sugarcoating. We share what living here is actually like.
                    </p>
                  </div>

                  {/* 2. Professional */}
                  <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center text-[#0A5C36]">
                        <Briefcase className="w-3.5 h-3.5" />
                      </div>
                      <h5 className="font-extrabold text-xs sm:text-sm text-[#065F46]">Professional</h5>
                    </div>
                    <p className="text-xs text-[#064E3B] leading-relaxed">
                      Safe and dependable. We keep the group clean, respectful, and well organized. Your time, plans, and privacy are respected.
                    </p>
                  </div>

                  {/* 3. Helpful */}
                  <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-200">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-lg bg-sky-100 flex items-center justify-center text-[#0284C7]">
                        <HelpCircle className="w-3.5 h-3.5" />
                      </div>
                      <h5 className="font-extrabold text-xs sm:text-sm text-[#075985]">Helpful</h5>
                    </div>
                    <p className="text-xs text-[#0C4A6E] leading-relaxed">
                      Practical answers that actually help you move forward—from steady solar setups and Wi-Fi to good schools and trusted contacts.
                    </p>
                  </div>

                  {/* 4. Approachable */}
                  <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-200">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-lg bg-purple-100 flex items-center justify-center text-[#9333EA]">
                        <Users className="w-3.5 h-3.5" />
                      </div>
                      <h5 className="font-extrabold text-xs sm:text-sm text-[#6B21A8]">Approachable</h5>
                    </div>
                    <p className="text-xs text-[#581C87] leading-relaxed">
                      Warm and zero gatekeeping. Whether you just started daydreaming or unpacked years ago, you are welcomed like family.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions matching Homepage Buttons & Whiteboard Style */}
            <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="text-center sm:text-left">
                <span className="font-handwriting text-xs sm:text-sm font-bold text-[#0A5C36] block">
                  Free to join • All diasporians & locals welcome 💚
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Back to whiteboard
                </button>

                <HandDrawnButton
                  href={FACEBOOK_COMMUNITY_URL}
                  variant="primary"
                  className="text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5 bg-[#0A5C36] hover:bg-[#07472A] text-white rounded-xl shadow-sm cursor-pointer select-none"
                >
                  <span>Join the Community</span>
                </HandDrawnButton>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
