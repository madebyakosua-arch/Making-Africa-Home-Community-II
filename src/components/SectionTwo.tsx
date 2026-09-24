import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HandDrawnCircle,
  HandDrawnButton,
  HandDrawnArrow,
  HandDrawnStrikeThrough,
  HandDrawnCheckmark,
  HandDrawnPlaneLanding,
  FinalWhiteboardIllustration,
  DigitalTape,
  HandDrawnStar,
  HandDrawnHouseIcon,
  HandDrawnPeopleConnectedIcon,
  HandDrawnSpeechBubblesIcon,
} from './WhiteboardElements';
import { Logo } from './Logo';
import { AboutCollectiveModal } from './AboutCollectiveModal';
import {
  X,
  CheckCircle,
  Mail,
  Shield,
  Users,
  Video,
  Clock,
  ChevronRight,
  Heart,
  Briefcase,
  HelpCircle,
} from 'lucide-react';
import womanOnStreetImg from '../assets/images/african_woman_street_1790258865129.jpg';

const FACEBOOK_COMMUNITY_URL = 'https://www.facebook.com/share/g/1Bua3PKEEQ/';

const SCATTERED_TOPICS = [
  { word: 'Finding a Home', color: '#0A5C36', rotate: '-2deg' },
  { word: 'Realistic Rent', color: '#D97706', rotate: '3deg' },
  { word: 'Solar & Steady Light', color: '#EA580C', rotate: '-3deg' },
  { word: 'Fast Wi-Fi', color: '#0284C7', rotate: '2deg' },
  { word: 'Shipping Your Things', color: '#0A5C36', rotate: '-1deg' },
  { word: 'Good Schools for Kids', color: '#E11D48', rotate: '3deg' },
  { word: 'Bank Accounts', color: '#9333EA', rotate: '-2deg' },
  { word: 'Healthcare & Clinics', color: '#EA580C', rotate: '2deg' },
  { word: 'Avoiding Diaspora Tax', color: '#0284C7', rotate: '-2deg' },
  { word: 'Making Local Friends', color: '#0A5C36', rotate: '3deg' },
  { word: 'Starting a Business', color: '#E11D48', rotate: '-3deg' },
  { word: 'Markets & Fresh Food', color: '#D97706', rotate: '2deg' },
  { word: 'Safe Neighbourhoods', color: '#0A5C36', rotate: '-1deg' },
  { word: 'Weekend Meetups', color: '#EA580C', rotate: '3deg' },
  { word: 'Daily Peace of Mind', color: '#111827', rotate: '-2deg' },
];

const REAL_DISCUSSIONS = [
  {
    question: 'Which neighbourhoods have good roads and reliable power?',
    replies: 'Members shared peaceful areas in Accra, Nairobi, Lagos, and Kigali with great security, solar backups, and fast internet.',
    tag: 'Safe Neighbourhoods',
    tapeColor: '#FDE047',
  },
  {
    question: 'Has anyone moved back with young children?',
    replies: 'Parents shared international school fees, local curriculum choices, nanny costs, and family clinics.',
    tag: 'Family & Children',
    tapeColor: '#86EFAC',
  },
  {
    question: 'How do you avoid getting overcharged on rent & building?',
    replies: 'Experienced diasporians and trusted local members shared how to deal directly with landlords and avoid the "diaspora markup".',
    tag: 'Money & Housing',
    tapeColor: '#93C5FD',
  },
  {
    question: 'Anyone free for lunch or coffee this Saturday?',
    replies: 'Relaxed meetups organized by members happening in cafes, art centres, and local restaurants every weekend.',
    tag: 'Community Hangouts',
    tapeColor: '#F472B6',
  },
];

const CHECKLIST_ITEMS = [
  'Thinking about moving to Africa?',
  'Saving up and doing your research?',
  'Packing your suitcases or shipping a container?',
  'Already landed and finding your feet?',
  'A local brother or sister who loves welcoming people home?',
];

export const SectionTwo: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'contact' | 'collective' | null>(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactMessage, setContactMessage] = useState({ name: '', email: '', note: '' });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setActiveModal(null);
      setContactMessage({ name: '', email: '', note: '' });
    }, 2000);
  };

  return (
    <section
      id="section-two"
      className="relative w-full pt-8 sm:pt-14 pb-12 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-white overflow-hidden"
    >
      {/* 1. WHY JOIN? (Clear everyday diasporian comparison) */}
      <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#EA580C] bg-[#EA580C]/10 px-3 py-1 rounded-full mb-2 inline-block">
          Why Community Matters
        </span>
        <h2 className="font-handwriting text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight mb-4 -rotate-1 break-words">
          Why join Making Africa Home?
        </h2>

        <div className="space-y-3 text-lg sm:text-2xl font-bold text-[#111827] max-w-2xl mx-auto leading-relaxed">
          <p>Google can give you flight tickets and currency rates.</p>

          <p className="text-gray-400">
            <HandDrawnStrikeThrough color="#E11D48">
              But Google will not invite you over for Sunday lunch.
            </HandDrawnStrikeThrough>
          </p>

          <p className="pt-2 text-xl sm:text-3xl font-extrabold text-[#111827]">
            When you move, you just need{' '}
            <HandDrawnCircle strokeColor="#0A5C36">
              <span className="text-[#0A5C36]">real people</span>
            </HandDrawnCircle>{' '}
            who have your back.
          </p>
        </div>

        {/* Doodle of people talking */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <HandDrawnSpeechBubblesIcon className="w-7 h-7 text-[#EA580C] shrink-0" color="#EA580C" />
          <span className="font-handwriting text-sm sm:text-base font-bold text-[#EA580C]">
            Diasporians & locals having real conversations
          </span>
        </div>
      </div>

      {/* 2. WHAT YOU GET (Loose whiteboard layout with arrows and drawings) */}
      <div className="space-y-10 sm:space-y-14 max-w-5xl mx-auto mb-14 sm:mb-20">
        {/* IDEA 1: PEOPLE WHO GET IT */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-[#F0FDF4] border-2 border-[#BBF7D0] shadow-xs rotate-[-0.5deg]">
          <DigitalTape color="#86EFAC" angle="-3deg" className="-top-3 left-8 sm:left-12" />
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0A5C36]/10 flex items-center justify-center shrink-0">
                <HandDrawnPeopleConnectedIcon className="w-7 h-7" color="#0A5C36" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
                Meet people who actually understand.
              </h3>
            </div>
            <span className="self-start text-xs font-bold text-[#0A5C36] bg-[#0A5C36]/15 px-3 py-1 rounded-full">
              Real Friendship
            </span>
          </div>

          <div className="space-y-1.5 text-base sm:text-lg text-[#374151] mb-5 leading-relaxed">
            <p>• Connect with people who left London, New York, Toronto, or Paris just like you.</p>
            <p>• Make friends before you leave so you never arrive to an empty phone.</p>
            <p>• Connect with warm locals who help you learn the town with open arms.</p>
          </div>

          <div className="pt-3 border-t border-[#0A5C36]/20">
            <span className="font-handwriting text-lg sm:text-xl font-bold text-[#0A5C36]">
              "Starting a new chapter is sweeter when you have good people around you."
            </span>
          </div>
        </div>

        {/* IDEA 2: REAL ANSWERS (Scattered colourful words) */}
        <div className="relative p-5 sm:p-9 rounded-3xl bg-white border-2 border-dashed border-[#D97706] shadow-xs text-center">
          <DigitalTape color="#FDE047" angle="4deg" className="-top-3 right-8 sm:right-12" />
          <div className="max-w-2xl mx-auto mb-5">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#111827] mb-2">
              Ask about everyday life.
            </h3>
            <p className="text-base sm:text-lg text-[#4B5563]">
              The real topics members talk about every day in the group:
            </p>
          </div>

          {/* Scattered colourful words */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-3xl mx-auto mb-5">
            {SCATTERED_TOPICS.map((item) => (
              <span
                key={item.word}
                style={{
                  borderColor: item.color,
                  color: item.color,
                  transform: `rotate(${item.rotate})`,
                }}
                className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl border-2 bg-white font-bold text-xs sm:text-sm select-none shadow-2xs inline-block"
              >
                ★ {item.word}
              </span>
            ))}
          </div>

          <p className="font-handwriting text-xs sm:text-sm text-[#6B7280] max-w-md mx-auto">
            Members share lived experience, everyday wisdom, and helpful contacts.
          </p>
        </div>

        {/* IDEA 3: PHOTO OF AFRICAN WOMAN IN AFRICA + REAL LIFE EXPERIENCE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Photo on left */}
          <div className="lg:col-span-6 relative w-full max-w-md mx-auto lg:max-w-none">
            <DigitalTape color="#F472B6" angle="-6deg" className="-top-3 left-6 sm:left-10" />
            <DigitalTape color="#86EFAC" angle="7deg" className="-bottom-3 right-6 sm:right-10" />

            <div className="relative p-2.5 sm:p-3 pb-7 sm:pb-8 bg-white rounded-3xl shadow-lg border-2 border-gray-200 rotate-[-1deg] hover:rotate-0 transition-transform">
              <img
                src={womanOnStreetImg}
                alt="Beautiful African diaspora woman smiling and enjoying life on an African city street"
                className="w-full h-72 sm:h-84 md:h-96 object-cover rounded-2xl"
                loading="eager"
              />

              <div className="mt-3 px-2">
                <span className="font-handwriting text-base sm:text-xl font-bold text-[#EA580C] block">
                  "This is the part they do not put on moving checklists:"
                </span>
                <span className="font-handwriting text-lg sm:text-2xl font-extrabold text-[#0A5C36] block mt-0.5">
                  Finding your people and feeling at peace. 🌟
                </span>
              </div>
            </div>
          </div>

          {/* Details on right */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 sm:p-7 rounded-3xl bg-[#FFFBEB] border-2 border-[#FDE68A] shadow-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-[#D97706]/10 flex items-center justify-center shrink-0">
                  <HandDrawnSpeechBubblesIcon className="w-7 h-7" color="#D97706" />
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#111827]">
                  Learn from people who already moved.
                </h3>
              </div>

              <div className="space-y-2 text-sm sm:text-base text-[#374151] mb-4 leading-relaxed">
                <p>• "What went well during your move?"</p>
                <p>• "What do you wish you packed, and what should you have left behind?"</p>
                <p>• "How did you find trusted workers and a good landlord?"</p>
              </div>

              <p className="font-bold text-sm sm:text-base text-[#0A5C36]">
                Listen to real stories. Ask what you need. Then make your move with confidence.
              </p>
            </div>

            {/* Plane landing and life building */}
            <div className="p-5 sm:p-6 rounded-3xl bg-[#FAF5FF] border-2 border-[#E9D5FF] shadow-xs">
              <div className="flex items-center gap-3 mb-2">
                <HandDrawnPlaneLanding className="w-10 h-8 shrink-0" />
                <h4 className="text-lg sm:text-xl font-extrabold text-[#111827]">
                  The flight is only the beginning.
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-3">
                Landing in Africa is exciting, but settling down is about finding your regular grocery shop, local friends, Sunday routine, and feeling truly at peace.
              </p>
              <span className="font-handwriting text-base sm:text-lg font-bold text-[#9333EA]">
                We are with you before, during, and long after you land. ✈️
              </span>
            </div>
          </div>
        </div>

        {/* 4. REAL COMMUNITY QUESTIONS (Inside the community board) */}
        <div className="p-5 sm:p-8 rounded-3xl border-2 border-dashed border-[#0A5C36] bg-white">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#0A5C36] bg-[#0A5C36]/10 px-3 py-1 rounded-full mb-2 inline-block">
              Community Board
            </span>
            <h3 className="font-handwriting text-2xl sm:text-4xl font-extrabold text-[#111827]">
              What members are talking about this week:
            </h3>
            <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
              Honest questions asked inside our private group:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REAL_DISCUSSIONS.map((item) => (
              <div
                key={item.question}
                className="relative p-4 sm:p-5 rounded-2xl bg-white border-2 border-gray-200 shadow-2xs hover:border-[#0A5C36] transition-colors"
              >
                <DigitalTape color={item.tapeColor} angle="-3deg" className="-top-2.5 left-4 !w-16 !h-4" />
                <span className="text-[11px] font-bold text-[#0A5C36] uppercase tracking-wider block mb-1">
                  {item.tag}
                </span>
                <p className="font-extrabold text-sm sm:text-base text-[#111827] mb-1.5">
                  "{item.question}"
                </p>
                <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                  {item.replies}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. WHO CAN JOIN? (Inclusive checklist) */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#FFFBEB] border-2 border-[#FDE68A] shadow-xs text-center">
          <h3 className="font-handwriting text-2xl sm:text-4xl font-extrabold text-[#111827] mb-5 -rotate-1">
            Is this community for you?
          </h3>

          <div className="space-y-2.5 max-w-md mx-auto text-left mb-6">
            {CHECKLIST_ITEMS.map((item) => (
              <div key={item} className="flex items-center justify-between text-sm sm:text-base font-bold text-[#111827] p-2 bg-white/70 rounded-xl border border-yellow-200/80">
                <span className="pr-2">{item}</span>
                <HandDrawnCheckmark className="w-5 h-5 text-[#0A5C36] shrink-0" color="#0A5C36" />
              </div>
            ))}
          </div>

          <p className="font-handwriting text-xl sm:text-3xl font-extrabold text-[#0A5C36] mb-2">
            Then you are in the right place!
          </p>

          <div className="flex items-center justify-center gap-1.5 text-[#EA580C]">
            <HandDrawnArrow direction="curved-up-right" className="w-5 h-4 shrink-0" color="#EA580C" />
            <span className="font-handwriting text-sm sm:text-base font-bold">
              No need to have every detail planned. Just come say hello.
            </span>
          </div>
        </div>

        {/* 6. WHY JOIN NOW? */}
        <div className="p-5 sm:p-7 rounded-3xl bg-white border-2 border-gray-200 shadow-xs">
          <div className="max-w-2xl mb-5">
            <h3 className="font-handwriting text-2xl sm:text-3xl font-extrabold text-[#111827]">
              Why join today?
            </h3>
            <p className="text-sm sm:text-base font-semibold text-[#0A5C36] mt-1">
              Because the best time to meet friends is before you pack your bags.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-5">
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-2 text-xs font-bold text-[#EA580C] mb-1">
                <Video className="w-4 h-4 shrink-0" />
                <span>Monthly Online Q&A</span>
              </div>
              <p className="font-extrabold text-sm sm:text-base text-[#111827] mb-1">
                Moving with family & finding schools
              </p>
              <p className="text-xs text-[#4B5563]">
                Diaspora parents share what school choices, healthcare, and daily budgets really look like.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0A5C36] mb-1">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Sunday Welcome Chat</span>
              </div>
              <p className="font-extrabold text-sm sm:text-base text-[#111827] mb-1">
                New member introductions
              </p>
              <p className="text-xs text-[#4B5563]">
                Introduce yourself, tell us which country you are looking at, and meet people heading there too.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#0A5C36]/10 text-center">
            <p className="font-bold text-xs sm:text-sm text-[#0A5C36]">
              Join today and join our next community catchup.
            </p>
          </div>
        </div>
      </div>

      {/* 7. FINAL CALL TO ACTION (Clean, mobile friendly, no clipped text) */}
      <div className="max-w-3xl mx-auto text-center pt-6 sm:pt-12 pb-12 sm:pb-16 border-t-2 border-dashed border-gray-200 px-2">
        <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-3 break-words">
          You do not have to make Africa home alone.
        </h3>

        <p className="text-sm sm:text-base text-[#374151] max-w-xl mx-auto mb-6 leading-relaxed">
          Come meet good people. Ask the things you are wondering about. Share what you know. And make real friends for the road ahead.
        </p>

        {/* Big colourful button */}
        <div className="relative inline-flex flex-col items-center mb-6 w-full sm:w-auto">
          <HandDrawnButton
            id="final-join-making-africa-home-btn"
            href={FACEBOOK_COMMUNITY_URL}
            variant="primary"
            className="w-full sm:w-auto text-base sm:text-xl px-7 py-3.5 sm:px-10 sm:py-4 bg-[#0A5C36] hover:bg-[#07472A] text-white rounded-2xl shadow-lg relative cursor-pointer select-none"
          >
            <span>Join Making Africa Home</span>
          </HandDrawnButton>

          <span className="font-handwriting text-base sm:text-lg font-bold text-[#EA580C] mt-2 block">
            Come say hello! ✍️ Free & open to diasporians and locals.
          </span>
        </div>

        {/* 8. FINAL WHITEBOARD MOMENT */}
        <FinalWhiteboardIllustration />
      </div>

      {/* 9. OUR CORE VALUES (Requested at bottom of homepage, before the footer) */}
      <div className="mb-10 sm:mb-14 p-6 sm:p-8 rounded-3xl bg-[#F8FAF8] border-2 border-dashed border-[#0A5C36]/30 max-w-4xl mx-auto relative text-center">
        <DigitalTape color="#FDE047" angle="-3deg" className="-top-3 left-6 sm:left-12" />
        <DigitalTape color="#86EFAC" angle="4deg" className="-top-3 right-6 sm:right-12" />

        <div className="max-w-xl mx-auto mb-6 sm:mb-8">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0A5C36] bg-[#0A5C36]/10 px-3 py-1 rounded-full inline-block mb-1.5">
            What Guides Us
          </span>
          <h3 className="font-handwriting text-2xl sm:text-4xl font-extrabold text-[#111827] -rotate-0.5">
            Our Core Values
          </h3>
          <p className="text-xs sm:text-sm text-[#4B5563] mt-1 leading-relaxed">
            Every conversation, meetup, and piece of advice in <strong>Making Africa Home</strong> is guided by four principles:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 text-left">
          {/* 1. Genuine */}
          <div className="p-4 rounded-2xl bg-white border border-amber-200/90 shadow-2xs hover:border-[#D97706] transition-colors">
            <div className="w-8 h-8 rounded-xl bg-amber-100/70 text-[#D97706] flex items-center justify-center mb-2.5">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <h4 className="font-extrabold text-base text-[#111827] mb-1">Genuine</h4>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              Real stories and honest advice. No exaggerated hype, sales pitches, or sugarcoating—just true lived experience.
            </p>
          </div>

          {/* 2. Professional */}
          <div className="p-4 rounded-2xl bg-white border border-emerald-200/90 shadow-2xs hover:border-[#0A5C36] transition-colors">
            <div className="w-8 h-8 rounded-xl bg-emerald-100/70 text-[#0A5C36] flex items-center justify-center mb-2.5">
              <Briefcase className="w-4 h-4" />
            </div>
            <h4 className="font-extrabold text-base text-[#111827] mb-1">Professional</h4>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              Well-moderated, dependable, and respectful. We value your time, privacy, and plans, ensuring discussions remain safe and constructive.
            </p>
          </div>

          {/* 3. Helpful */}
          <div className="p-4 rounded-2xl bg-white border border-sky-200/90 shadow-2xs hover:border-[#0284C7] transition-colors">
            <div className="w-8 h-8 rounded-xl bg-sky-100/70 text-[#0284C7] flex items-center justify-center mb-2.5">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h4 className="font-extrabold text-base text-[#111827] mb-1">Helpful</h4>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              Action-oriented answers that move you forward—from navigating rent and reliable utilities to good schools and trusted contacts.
            </p>
          </div>

          {/* 4. Approachable */}
          <div className="p-4 rounded-2xl bg-white border border-purple-200/90 shadow-2xs hover:border-[#9333EA] transition-colors">
            <div className="w-8 h-8 rounded-xl bg-purple-100/70 text-[#9333EA] flex items-center justify-center mb-2.5">
              <Users className="w-4 h-4" />
            </div>
            <h4 className="font-extrabold text-base text-[#111827] mb-1">Approachable</h4>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              Warm, kind, and zero gatekeeping. Everyone is welcomed like family, whether you are just exploring ideas or already unpacked.
            </p>
          </div>
        </div>
      </div>

      {/* 10. DEDICATED PRIVACY POLICY BOX RIGHT ABOVE FOOTER (Requested explicitly) */}
      <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gray-50 border border-gray-200 max-w-4xl mx-auto text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-[#0A5C36] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
            <strong className="text-[#111827]">Privacy First:</strong> We never sell your data or send spam. Our community group is a safe, respectful space.
          </div>
        </div>
        <button
          onClick={() => setActiveModal('privacy')}
          className="self-start sm:self-auto shrink-0 inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0A5C36] hover:text-[#07472A] underline underline-offset-4 cursor-pointer"
        >
          <span>Read Privacy Policy</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 10. FOOTER (Inside Section Two - Clean, No Instagram, Africa Link Collective logo) */}
      <footer className="pt-6 border-t-2 border-dashed border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 text-center sm:text-left">
          {/* Logo and Tagline */}
          <div className="flex items-center gap-3">
            <Logo variant="dark" showText={true} className="scale-90 sm:scale-95 origin-left" />
            <div className="hidden md:block h-6 w-[1.5px] bg-gray-200" />
            <span className="hidden md:inline-block text-xs text-[#6B7280]">
              Making Africa Home Community
            </span>
          </div>

          {/* Simple Links: Collective, Contact, Privacy (NO Instagram!) */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold text-[#374151]">
            <button
              onClick={() => setActiveModal('collective')}
              className="hover:text-[#0A5C36] transition-colors cursor-pointer"
            >
              Africa Link Collective
            </button>

            <button
              onClick={() => setActiveModal('contact')}
              className="hover:text-[#0284C7] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </button>

            <button
              onClick={() => setActiveModal('privacy')}
              className="hover:text-[#0A5C36] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Privacy Policy</span>
            </button>
          </div>
        </div>

        <div className="text-center text-[11px] text-[#9CA3AF] pt-2">
          © {new Date().getFullYear()} Africa Link Collective & Making Africa Home. All rights reserved.
        </div>
      </footer>

      {/* MODALS: Privacy, Contact, Africa Link Collective (No Instagram modal) */}
      <AboutCollectiveModal
        isOpen={activeModal === 'collective'}
        onClose={() => setActiveModal(null)}
      />

      <AnimatePresence>

        {/* FULL PRIVACY POLICY MODAL */}
        {activeModal === 'privacy' && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs flex items-center justify-center p-3 sm:p-4">
            <div className="fixed inset-0" onClick={() => setActiveModal(null)} aria-hidden="true" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-5 sm:p-8 max-w-lg w-full shadow-2xl border-2 border-[#111827] max-h-[90vh] flex flex-col relative z-10"
            >
              <DigitalTape color="#FDE047" angle="-3deg" className="-top-3 left-6 sm:left-10" />
              <DigitalTape color="#86EFAC" angle="3deg" className="-top-3 right-6 sm:right-10" />

              <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100 shrink-0">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#0A5C36]" />
                  <h4 className="font-handwriting text-2xl sm:text-3xl font-extrabold text-[#111827]">Privacy Policy</h4>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 rounded-full text-gray-500 hover:text-gray-900 border border-gray-200 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#4B5563] leading-relaxed overflow-y-auto pr-1">
                <div>
                  <h5 className="font-bold text-[#111827] mb-1">1. Who We Are</h5>
                  <p>
                    <strong>Making Africa Home</strong> is a community initiative powered by <strong>Africa Link Collective</strong>. We are dedicated to providing a safe, authentic space for African diasporians and locals to connect, share relocation experiences, and support one another.
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-[#111827] mb-1">2. Information We Collect</h5>
                  <p>
                    We believe in minimal data collection:
                  </p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li><strong>Contact Form:</strong> If you send us a message, we only use your name and email to reply directly to your inquiry.</li>
                    <li><strong>Facebook Community:</strong> Our community discussions take place on Facebook. When you join, your profile information is governed by Facebook’s own privacy settings.</li>
                    <li><strong>No Tracking Cookies:</strong> We do not track your activity across other websites or sell your personal details.</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-bold text-[#111827] mb-1">3. We Never Sell Your Data</h5>
                  <p>
                    We never sell, rent, or trade your personal information or email address to advertisers, marketers, or third-party agencies. Ever.
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-[#111827] mb-1">4. Community Confidentiality & Respect</h5>
                  <p>
                    What is shared in the community stays in the community. Members are expected to respect each other's privacy and personal stories about moving and everyday life.
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-[#111827] mb-1">5. Your Rights</h5>
                  <p>
                    You can contact us anytime to ask what data we hold, or to request the complete deletion of any messages you have sent us. You can also leave the Facebook community whenever you wish with one click.
                  </p>
                </div>

                <div className="text-[11px] text-[#9CA3AF] pt-2 border-t border-gray-100">
                  Last updated: September 2026. For questions regarding privacy, please use our contact form.
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="font-handwriting text-xs text-[#0A5C36] font-bold">
                  Your privacy is 100% respected 🔒
                </span>
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-5 py-2 rounded-xl bg-[#0A5C36] hover:bg-[#07472A] text-white font-bold text-sm cursor-pointer transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* CONTACT MODAL */}
        {activeModal === 'contact' && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs flex items-center justify-center p-3 sm:p-4">
            <div className="fixed inset-0" onClick={() => setActiveModal(null)} aria-hidden="true" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-5 sm:p-8 max-w-md w-full shadow-2xl border-2 border-[#111827] relative z-10"
            >
              <DigitalTape color="#FDE047" angle="-3deg" className="-top-3 left-6 sm:left-10" />
              <DigitalTape color="#93C5FD" angle="3deg" className="-top-3 right-6 sm:right-10" />

              <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#0A5C36]" />
                  <h4 className="font-handwriting text-2xl sm:text-3xl font-extrabold text-[#111827]">Contact Us</h4>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 rounded-full text-gray-500 hover:text-gray-900 border border-gray-200 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {contactSubmitted ? (
                <div className="py-8 text-center">
                  <CheckCircle className="w-10 h-10 text-[#0A5C36] mx-auto mb-2" />
                  <p className="font-handwriting text-2xl font-bold text-[#111827]">Message sent!</p>
                  <p className="text-sm text-[#4B5563] mt-1">We will get back to you soon. Thank you!</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#111827] mb-1">Your Name</label>
                    <input
                      required
                      type="text"
                      value={contactMessage.name}
                      onChange={(e) => setContactMessage({ ...contactMessage, name: e.target.value })}
                      placeholder="e.g. Akosua or Malik"
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-300 focus:outline-hidden focus:border-[#0A5C36]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#111827] mb-1">Email</label>
                    <input
                      required
                      type="email"
                      value={contactMessage.email}
                      onChange={(e) => setContactMessage({ ...contactMessage, email: e.target.value })}
                      placeholder="you@email.com"
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-300 focus:outline-hidden focus:border-[#0A5C36]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#111827] mb-1">Message</label>
                    <textarea
                      required
                      rows={3}
                      value={contactMessage.note}
                      onChange={(e) => setContactMessage({ ...contactMessage, note: e.target.value })}
                      placeholder="How can we help you?"
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-300 focus:outline-hidden focus:border-[#0A5C36]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#0A5C36] text-white font-bold text-sm hover:bg-[#07472A] cursor-pointer transition-colors shadow-sm"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
