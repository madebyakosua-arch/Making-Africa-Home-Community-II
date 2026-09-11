import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { FACEBOOK_COMMUNITY_URL } from '../data/communityData';

interface FinalCTAProps {
  onOpenJoin?: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = () => {
  return (
    <section id="final-cta-section" className="py-14 sm:py-24 bg-[#153826] text-[#FAF7F2] relative overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FAF7F2_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#0E3321] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#C58B38]/25 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Subtle Pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-[#F59E0B]/40 text-[#FAF7F2] text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-4 sm:mb-8 max-w-full"
        >
          <span className="w-2 h-2 rounded-full bg-[#F59E0B] shrink-0" />
          <span className="truncate">Free Community for Diaspora & African Diaspora</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-2xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-3.5 sm:mb-6"
        >
          Thinking about making the move?
        </motion.h2>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-sm sm:text-xl lg:text-2xl text-[#FAF7F2]/90 font-normal max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-12"
        >
          Making Africa Home is 100% free. You don’t have to work it all out by yourself.
        </motion.p>

        {/* Direct Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 sm:mb-8"
        >
          <a
            id="final-cta-join-btn"
            href={FACEBOOK_COMMUNITY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 sm:px-10 sm:py-4.5 rounded-full bg-[#F59E0B] hover:bg-[#FBBF24] text-[#0E3321] font-extrabold text-sm sm:text-base tracking-tight transition-all duration-150 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span>Join Our FREE Community</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#0E3321]" />
          </a>
        </motion.div>

        {/* Small Line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="text-[11px] sm:text-sm text-[#FAF7F2]/60 font-medium tracking-wide uppercase"
        >
          Making Africa Home • Free Community for Diaspora & African Diaspora
        </motion.p>
      </div>
    </section>
  );
};
