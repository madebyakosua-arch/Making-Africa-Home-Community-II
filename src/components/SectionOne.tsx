import React, { useState } from 'react';
import {
  HandDrawnUnderline,
  HandDrawnCircle,
  HandDrawnButton,
  HandDrawnArrow,
  HandDrawnLightbulbIcon,
  HandDrawnNotebookIcon,
  HandDrawnSuitcaseIcon,
  HandDrawnPlaneIcon,
  HandDrawnKeyIcon,
  HandDrawnSpeechBubblesIcon,
  HandDrawnPeopleConnectedIcon,
  HandDrawnHouseIcon,
  SmilingHouseIcon,
  DigitalTape,
  HandDrawnStar,
} from './WhiteboardElements';
import { Logo } from './Logo';
import { AboutCollectiveModal } from './AboutCollectiveModal';
import { Users, Heart, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import womanInAfricaImg from '../assets/images/african_woman_africa_1790258843292.jpg';

const FACEBOOK_COMMUNITY_URL = 'https://www.facebook.com/share/g/1Bua3PKEEQ/';

const JOURNEY_STEPS = [
  {
    title: 'Just thinking',
    desc: 'Wondering if moving is for you',
    icon: <HandDrawnLightbulbIcon className="w-7 h-7 sm:w-8 sm:h-8" color="#D97706" />,
    color: '#D97706',
    step: '1',
  },
  {
    title: 'Making a plan',
    desc: 'Picking a country & budget',
    icon: <HandDrawnNotebookIcon className="w-7 h-7 sm:w-8 sm:h-8" color="#0A5C36" />,
    color: '#0A5C36',
    step: '2',
  },
  {
    title: 'Packing bags',
    desc: '3 mos out? Get a Relocation Buddy',
    icon: <HandDrawnSuitcaseIcon className="w-7 h-7 sm:w-8 sm:h-8" color="#C2410C" />,
    color: '#C2410C',
    step: '3',
  },
  {
    title: 'Landing in Africa',
    desc: 'First flights, visas, and keys in hand',
    icon: <HandDrawnPlaneIcon className="w-7 h-7 sm:w-8 sm:h-8" color="#0284C7" />,
    color: '#0284C7',
    step: '4',
  },
  {
    title: 'Finding your feet',
    desc: 'Bank accounts, Wi-Fi, and neighbours',
    icon: <HandDrawnKeyIcon className="w-7 h-7 sm:w-8 sm:h-8" color="#9333EA" />,
    color: '#9333EA',
    step: '5',
  },
  {
    title: 'Feeling at home',
    desc: 'Real friends, peace of mind, thriving',
    icon: <SmilingHouseIcon className="w-7 h-7 sm:w-8 sm:h-8" />,
    color: '#0A5C36',
    step: '6',
  },
];

export const SectionOne: React.FC = () => {
  const [showCollectiveModal, setShowCollectiveModal] = useState(false);

  return (
    <section
      id="section-one"
      className="relative w-full pt-3 sm:pt-6 pb-14 sm:pb-20 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-white overflow-hidden"
    >
      {/* 1. Header: Africa Link Collective Logo + Community link + Join Button */}
      <header className="flex flex-wrap items-center justify-between gap-3 py-3 sm:py-4 border-b-2 border-dashed border-gray-200 mb-8 sm:mb-12">
        {/* Left: Africa Link Collective Logo (Changed as requested) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Logo variant="dark" showText={true} className="scale-95 sm:scale-100 origin-left" />
          <div className="hidden md:flex flex-col border-l-2 border-gray-200 pl-3 py-0.5">
            <span className="font-handwriting text-base font-bold text-[#0A5C36] leading-none">
              Making Africa Home
            </span>
            <span className="text-[11px] text-[#6B7280] font-semibold mt-0.5">
              Diaspora & Local Community
            </span>
          </div>
        </div>

        {/* Right: Quick info button + Join Button */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setShowCollectiveModal(true)}
            className="text-xs sm:text-sm font-bold text-[#4B5563] hover:text-[#0A5C36] transition-colors cursor-pointer underline decoration-wavy decoration-[#D97706]/60 underline-offset-4 px-1"
          >
            About Collective
          </button>

          <a
            href={FACEBOOK_COMMUNITY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#0A5C36] hover:bg-[#07472A] text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all cursor-pointer select-none"
          >
            <Users className="w-4 h-4 shrink-0" />
            <span>Join the Community</span>
          </a>
        </div>
      </header>

      {/* 2. THE BIG IDEA (Everyday language for diasporians + Photo of a beautiful African woman in Africa) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-14 sm:mb-20">
        {/* Left: Main Copy (Grade 5, friendly, honest diasporian language) */}
        <div className="lg:col-span-7 text-left">
          {/* Handwritten greeting */}
          <div className="mb-2">
            <span className="font-handwriting text-2xl sm:text-3xl lg:text-4xl text-[#EA580C] font-bold block -rotate-1">
              Thinking about moving back home to Africa?
            </span>
          </div>

          {/* Large bold text */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-[#111827] tracking-tight leading-[1.18] mb-4 break-words">
            You do not have to figure it{' '}
            <span className="relative inline-block">
              all alone.
              <HandDrawnUnderline
                className="absolute left-0 -bottom-2 w-full h-3 sm:h-4"
                color="#EA580C"
              />
            </span>
          </h1>

          {/* Handwritten note with arrow */}
          <div className="flex items-center gap-2 mb-5 text-[#0A5C36]">
            <HandDrawnArrow direction="curved-down-right" className="w-6 h-5 rotate-12 shrink-0" color="#0A5C36" />
            <span className="font-handwriting text-base sm:text-xl font-bold">
              Ask people who have already packed their bags and done it.
            </span>
          </div>

          {/* Everyday Diasporian Story & Scope */}
          <div className="space-y-3 mb-6 text-base sm:text-lg text-[#374151] leading-relaxed max-w-xl">
            <p className="font-medium text-[#111827]">
              <strong>Making Africa Home</strong> is a warm, honest community for people in the diaspora who want to move to Africa, get ready to move, or are already living here.
            </p>
            <p>
              And yes — <strong>locals are warmly welcome too!</strong> Having local friends who know the real city and how things work makes settling in ten times easier.
            </p>
          </div>

          {/* 4 simple things you get */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 mb-7 text-sm sm:text-base font-semibold text-[#1F2937]">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-orange-50/70 border border-orange-100">
              <span className="text-[#EA580C] text-lg">💬</span>
              <span>Ask questions without feeling silly</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50/70 border border-emerald-100">
              <span className="text-[#0A5C36] text-lg">🤝</span>
              <span>The "Relocation Buddy" (3 mos out)</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-sky-50/70 border border-sky-100">
              <span className="text-[#0284C7] text-lg">💡</span>
              <span>Learn what rent & life really cost</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-purple-50/70 border border-purple-100">
              <span className="text-[#9333EA] text-lg">🏡</span>
              <span>Build a peaceful life you love</span>
            </div>
          </div>

          {/* Big colourful button + Next step note */}
          <div className="relative flex flex-col items-start gap-2 pt-1 w-full sm:w-auto">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
              <HandDrawnButton
                id="section-one-join-btn"
                href={FACEBOOK_COMMUNITY_URL}
                variant="primary"
                className="w-full sm:w-auto text-center text-base sm:text-lg px-7 py-3.5 bg-[#0A5C36] hover:bg-[#07472A] text-white rounded-2xl shadow-md cursor-pointer select-none"
              >
                Join Making Africa Home
              </HandDrawnButton>

              {/* Arrow pointing to button */}
              <div className="flex items-center gap-1.5 text-[#C2410C] self-start sm:self-auto">
                <HandDrawnArrow direction="curved-up-right" className="w-5 h-4 -rotate-90 hidden sm:block shrink-0" color="#C2410C" />
                <span className="font-handwriting text-base sm:text-lg font-bold">
                  Free to join. Say hello!
                </span>
              </div>
            </div>

            {/* Explaining what happens next */}
            <div className="pt-1 text-xs sm:text-sm text-[#4B5563] font-medium flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[#D97706] font-bold bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md">
                🌱 Opening Our Doors
              </span>
              <span>•</span>
              <span className="text-[#0A5C36] font-bold">Join as a Founding Member</span>
              <span>•</span>
              <span className="text-gray-500">Free forever</span>
            </div>
          </div>
        </div>

        {/* Right: PHOTO of a beautiful African woman in Africa */}
        <div className="lg:col-span-5 relative mt-4 lg:mt-0 w-full max-w-md mx-auto lg:max-w-none">
          <div className="relative">
            {/* Colourful digital masking tape */}
            <DigitalTape color="#FDE047" angle="-10deg" className="-top-3 left-4" />
            <DigitalTape color="#F472B6" angle="8deg" className="-bottom-3 right-6" />

            {/* Photo Card styled like a print pinned/taped to whiteboard */}
            <div className="relative p-2.5 sm:p-3 pb-7 sm:pb-8 bg-white rounded-3xl shadow-lg border-2 border-gray-200 rotate-1 hover:rotate-0 transition-transform">
              <img
                src={womanInAfricaImg}
                alt="Beautiful radiant African woman smiling warmly at an outdoor cafe in Africa"
                className="w-full h-72 sm:h-84 md:h-96 object-cover rounded-2xl"
                loading="eager"
              />

              {/* Handwritten note below photo */}
              <div className="mt-3 px-2 flex items-center justify-between">
                <div>
                  <span className="font-handwriting text-lg sm:text-xl font-bold text-[#111827] block">
                    Living, smiling, and feeling at home in Africa.
                  </span>
                  <span className="text-xs text-[#0A5C36] font-bold flex items-center gap-1 mt-0.5">
                    <Heart className="w-3.5 h-3.5 fill-[#0A5C36]" />
                    <span>Your people are already waiting for you.</span>
                  </span>
                </div>
                <HandDrawnStar className="w-5 h-5 text-[#F59E0B] shrink-0" />
              </div>
            </div>

            {/* Small quirky sticky note next to photo */}
            <div className="absolute -bottom-5 -left-2 sm:-left-4 bg-[#FEF08A] border border-[#FACC15] p-2 sm:p-2.5 rounded-xl shadow-sm rotate-[-4deg] max-w-[170px] sm:max-w-[200px]">
              <span className="font-handwriting text-xs sm:text-sm font-bold text-[#854D0E] block leading-tight">
                "Moving was scary. Having friends made it an adventure." ✨
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. WHAT ACTUALLY HAPPENS INSIDE? (Clear everyday diasporian scenarios) */}
      <div className="my-14 sm:my-20 pt-6 border-t-2 border-dashed border-gray-200">
        {/* Whiteboard handwritten question heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#0A5C36] bg-[#0A5C36]/10 px-3 py-1 rounded-full mb-2 inline-block">
            Inside The Community
          </span>
          <h2 className="font-handwriting text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight -rotate-1 break-words">
            What do people actually do in there?
          </h2>
          <p className="text-sm sm:text-base text-[#4B5563] mt-2 max-w-xl mx-auto">
            No boring lectures. No sales pitches. Just everyday diasporians and helpful locals helping each other thrive.
          </p>
        </div>

        {/* 4 Loose Whiteboard Ideas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 max-w-5xl mx-auto">
          {/* 1. ASK: Real Questions */}
          <div className="relative p-6 sm:p-7 rounded-3xl bg-[#FFFBEB] border-2 border-[#FDE68A] shadow-xs rotate-[-0.6deg] hover:rotate-0 transition-transform">
            <DigitalTape color="#FDE047" angle="-5deg" className="-top-3 right-8" />
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EA580C]/10 flex items-center justify-center">
                <HandDrawnSpeechBubblesIcon className="w-7 h-7" color="#EA580C" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#EA580C] bg-[#EA580C]/10 px-2.5 py-0.5 rounded-full">
                Ask Anything
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-[#111827] mb-2">
              Ask the real things on your mind.
            </h3>
            <p className="text-xs sm:text-sm text-[#4B5563] mb-4">
              Questions members ask every day in plain, honest words:
            </p>

            <div className="space-y-1.5 text-sm sm:text-base text-[#374151]">
              <p className="font-handwriting text-base sm:text-lg text-[#0A5C36]">
                • "Which area is safe, peaceful, and has good roads?"
              </p>
              <p className="font-handwriting text-base sm:text-lg text-[#EA580C]">
                • "How much rent are you actually paying each month?"
              </p>
              <p className="font-handwriting text-base sm:text-lg text-[#0284C7]">
                • "How do you handle power cuts and steady solar?"
              </p>
              <p className="font-handwriting text-base sm:text-lg text-[#9333EA]">
                • "Can I bring my kids? Which schools are good?"
              </p>
              <p className="font-handwriting text-base sm:text-lg text-[#111827]">
                • "How did you open your bank account without stress?"
              </p>
            </div>
          </div>

          {/* 2. MEET: Your People */}
          <div className="relative p-6 sm:p-7 rounded-3xl bg-[#F0FDF4] border-2 border-[#BBF7D0] shadow-xs rotate-[0.6deg] hover:rotate-0 transition-transform">
            <DigitalTape color="#86EFAC" angle="4deg" className="-top-3 left-8" />
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0A5C36]/10 flex items-center justify-center">
                <HandDrawnPeopleConnectedIcon className="w-7 h-7" color="#0A5C36" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#0A5C36] bg-[#0A5C36]/10 px-2.5 py-0.5 rounded-full">
                Meet People
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-[#111827] mb-2">
              Find friends who understand your walk.
            </h3>
            <p className="text-xs sm:text-sm text-[#4B5563] mb-4">
              People who get why you want to move back:
            </p>

            <div className="space-y-2 text-sm sm:text-base text-[#374151] mb-5 leading-relaxed">
              <p>• <strong>The "Relocation Buddy":</strong> Paired 3 months before your move with someone who moved last year or a reliable local.</p>
              <p>• <strong>Diasporians planning:</strong> Moving on the same timeline as you.</p>
              <p>• <strong>Diasporians settled:</strong> Already living there and happy to guide you.</p>
              <p>• <strong>Warm locals:</strong> Giving you the true local perspective with open arms.</p>
            </div>

            <div className="pt-2 border-t border-[#0A5C36]/20">
              <span className="font-handwriting text-lg sm:text-xl font-bold text-[#0A5C36]">
                "Future coffee or Sunday lunch buddy? ☕"
              </span>
            </div>
          </div>

          {/* 3. LEARN: Honest Experience */}
          <div className="relative p-6 sm:p-7 rounded-3xl bg-[#EFF6FF] border-2 border-[#BFDBFE] shadow-xs rotate-[0.5deg] hover:rotate-0 transition-transform">
            <DigitalTape color="#93C5FD" angle="-3deg" className="-top-3 right-10" />
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0284C7]/10 flex items-center justify-center">
                <HandDrawnNotebookIcon className="w-7 h-7" color="#0284C7" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#0284C7] bg-[#0284C7]/10 px-2.5 py-0.5 rounded-full">
                Learn
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-[#111827] mb-2">
              Learn the honest truth before you spend money.
            </h3>
            <p className="text-xs sm:text-sm text-[#4B5563] mb-4">
              Save thousands of dollars and avoid common traps:
            </p>

            <div className="space-y-2 text-sm sm:text-base text-[#374151] mb-5 leading-relaxed">
              <p>• Find out what shipping items actually costs.</p>
              <p>• Learn how to avoid the "diaspora tax" when buying or renting.</p>
              <p>• Hear what members wish they knew in their first 30 days.</p>
            </div>

            <div className="pt-2 border-t border-[#0284C7]/20">
              <span className="font-handwriting text-lg sm:text-xl font-bold text-[#0284C7]">
                Save yourself headaches and costly mistakes. 💡
              </span>
            </div>
          </div>

          {/* 4. SETTLE IN: Build your everyday life */}
          <div className="relative p-6 sm:p-7 rounded-3xl bg-[#FAF5FF] border-2 border-[#E9D5FF] shadow-xs rotate-[-0.5deg] hover:rotate-0 transition-transform">
            <DigitalTape color="#D8B4FE" angle="5deg" className="-top-3 left-10" />
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-[#9333EA]/10 flex items-center justify-center">
                <HandDrawnKeyIcon className="w-7 h-7" color="#9333EA" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#9333EA] bg-[#9333EA]/10 px-2.5 py-0.5 rounded-full">
                Settle In
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-[#111827] mb-2">
              Get support after the flight lands too.
            </h3>
            <p className="text-xs sm:text-sm text-[#4B5563] mb-4">
              Moving is only day one — then life begins:
            </p>

            <div className="space-y-2 text-sm sm:text-base text-[#374151] mb-4 leading-relaxed">
              <p>• Find good handymen, clean water services, and trusted mechanics.</p>
              <p>• Discover local farmers markets, gyms, and favourite weekend getaways.</p>
              <p>• Settle in with a smile knowing you have people to call.</p>
            </div>

            <div className="pt-2 border-t border-[#9333EA]/20">
              <span className="font-handwriting text-lg sm:text-xl font-bold text-[#9333EA]">
                "Africa becomes home when you have community." 🏡
              </span>
            </div>
          </div>
        </div>

        {/* NEW COMMUNITY ANNOUNCEMENT: A & B (Positioned directly after 'Get support after the flight lands' box) */}
        <div className="relative mt-8 sm:mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#FEFCE8] via-white to-[#F0FDF4] border-2 border-[#D97706]/60 shadow-sm max-w-5xl mx-auto">
          {/* Digital Tape decoration */}
          <DigitalTape color="#FDE047" angle="-3deg" className="-top-3.5 left-8 sm:left-14" />
          <DigitalTape color="#86EFAC" angle="4deg" className="-top-3.5 right-8 sm:right-14" />

          {/* Top Header Tag */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-5 pb-3 border-b border-amber-200/80">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#92400E] bg-amber-200/70 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#D97706] fill-[#D97706]" />
                New Free Community • Early Access
              </span>
              <span className="hidden sm:inline-block text-xs font-bold text-[#0A5C36] bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                Just Opening Our Doors
              </span>
            </div>
            <span className="font-handwriting text-sm sm:text-base font-bold text-[#D97706]">
              "Be part of the early circle" ✨
            </span>
          </div>

          {/* 2 Visible Feature Columns: A & B */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* A: Founding Members */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border-2 border-amber-200/90 shadow-2xs hover:border-[#D97706] transition-colors relative">
              <div className="flex items-center gap-2 mb-2 text-[#D97706]">
                <span className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-lg">
                  🌟
                </span>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#92400E] bg-amber-50 px-2 py-0.5 rounded-md">
                    Founding Member Invitation
                  </span>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#111827] leading-tight">
                    Join as a Founding Member
                  </h3>
                </div>
              </div>
              <p className="text-sm sm:text-base font-medium text-[#1F2937] leading-relaxed">
                We’re just opening our doors! Join as one of our <strong>Founding Members</strong> and help us shape this space from day one.
              </p>
              <p className="text-xs text-[#6B7280] mt-2.5 leading-relaxed">
                Because you are here at the beginning, you get direct personal support, early Relocation Buddy pairing, and an active voice in shaping our meetups and resources.
              </p>
            </div>

            {/* B: Intimate & No-Spam Advantage */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border-2 border-emerald-200/90 shadow-2xs hover:border-[#0A5C36] transition-colors relative">
              <div className="flex items-center gap-2 mb-2 text-[#0A5C36]">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-lg">
                  🛡️
                </span>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#065F46] bg-emerald-50 px-2 py-0.5 rounded-md">
                    Intimate & Safe
                  </span>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#111827] leading-tight">
                    Small, Intimate & No Noise
                  </h3>
                </div>
              </div>
              <p className="text-sm sm:text-base font-medium text-[#1F2937] leading-relaxed">
                We are intentionally starting small and intimate. No spam, no aggressive property agents, no noise—just genuine diasporians and locals connecting directly and helping each other move home.
              </p>
              <p className="text-xs text-[#6B7280] mt-2.5 leading-relaxed">
                You will never get lost in a noisy crowd of thousands. Every post is read, every question gets answered, and everyone is treated with genuine warmth.
              </p>
            </div>
          </div>

          {/* Footer Ribbon inside the card */}
          <div className="mt-4 pt-3.5 border-t border-amber-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-[#0A5C36] font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>100% Free • Safe & respectful space • No agency fees</span>
            </div>

            <a
              href={FACEBOOK_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#0A5C36] hover:bg-[#07472A] text-white font-bold transition-all shadow-xs cursor-pointer self-start sm:self-auto"
            >
              <span>Claim Your Founding Member Spot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 4. SHOW THE JOURNEY (Inclusive, welcoming, anyone can join at any stage) */}
      <div className="mt-14 sm:mt-20 pt-8 border-t-2 border-dashed border-gray-200">
        <div className="text-center mb-6">
          <span className="font-handwriting text-xl sm:text-2xl font-bold text-[#EA580C] inline-block -rotate-1">
            "You can join at any point on this journey." ✍️
          </span>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
            Whether you just had the idea yesterday or you unpacked 5 years ago, you belong here.
          </p>
        </div>

        {/* 6 Steps Roadmap */}
        <div className="relative">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 relative z-10">
            {JOURNEY_STEPS.map((step) => (
              <div
                key={step.title}
                className="relative p-3.5 sm:p-4 rounded-2xl border-2 border-gray-200 bg-white hover:border-[#0A5C36] transition-all flex flex-col items-center text-center justify-between shadow-2xs hover:shadow-sm"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-2">
                  {step.icon}
                </div>

                <div className="mt-auto w-full">
                  <span className="font-extrabold text-xs sm:text-sm text-[#111827] block leading-snug">
                    {step.title}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-[#6B7280] block mt-0.5 leading-tight">
                    {step.desc}
                  </span>
                  <span className="inline-block mt-1 text-[10px] font-bold text-[#0A5C36] bg-[#0A5C36]/10 px-2 py-0.5 rounded-full">
                    Step {step.step}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Africa Link Collective & Making Africa Home Info Modal */}
      <AboutCollectiveModal
        isOpen={showCollectiveModal}
        onClose={() => setShowCollectiveModal(false)}
      />
    </section>
  );
};
