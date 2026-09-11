import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Users } from 'lucide-react';
import { ASSET_IMAGES, FACEBOOK_COMMUNITY_URL } from '../data/communityData';

interface HeroProps {
  onOpenJoin?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section
      id="hero-section"
      className="relative pt-28 sm:pt-40 lg:pt-48 pb-16 sm:pb-28 lg:pb-32 overflow-hidden min-h-[520px] sm:min-h-[640px] flex items-center justify-center"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSET_IMAGES.hero}
          alt="African cityscape and lifestyle"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-105"
        />
        {/* Faded with Black Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Main Text Content */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Top Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-[#F59E0B]/40 text-[#FAF7F2] text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide uppercase mb-4 sm:mb-8 max-w-full text-center"
          >
            <span className="w-2 h-2 rounded-full bg-[#F59E0B] shrink-0" />
            <span className="leading-tight">Free Community for Diaspora & African Diaspora</span>
          </motion.div>

          {/* Catchy Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.15] sm:leading-[1.08] mb-4 sm:mb-8"
          >
            Don’t just move to Africa.{' '}
            <span className="block mt-1 sm:mt-2">
              <span className="font-editorial-serif font-normal italic font-serif text-[#F59E0B]">
                Make it home.
              </span>
            </span>
          </motion.h1>

          {/* Supporting Copy - Raw & Real */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="text-sm sm:text-lg md:text-xl text-white/90 font-normal max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-10 px-1 sm:px-2"
          >
            Making Africa Home is a free community for diaspora and African diaspora. Connect with people on the ground sharing honest, raw answers about housing, money, work, business, and real everyday life.
          </motion.p>

          {/* Single Focused Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-6 sm:mb-8 px-2 sm:px-4"
          >
            <a
              id="hero-primary-cta"
              href={FACEBOOK_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 sm:px-10 sm:py-4.5 rounded-full bg-[#F59E0B] hover:bg-[#FBBF24] text-[#0E3321] font-extrabold text-sm sm:text-base tracking-tight transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <span>Join Our FREE Community</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#0E3321] transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>

          {/* Micro trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm text-white/80 font-medium px-2"
          >
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <span>Verified Returnees & Locals</span>
            </div>
            <div className="hidden sm:inline-block w-1 h-1 rounded-full bg-white/30" />
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#F59E0B] shrink-0" />
              <span>100% Free • Zero Hidden Fees</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
