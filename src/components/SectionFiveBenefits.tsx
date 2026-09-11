import React from 'react';
import { motion } from 'motion/react';
import { Compass, ShieldCheck, Users } from 'lucide-react';

interface SectionFiveBenefitsProps {
  onOpenJoin: () => void;
}

export const SectionFiveBenefits: React.FC<SectionFiveBenefitsProps> = ({ onOpenJoin }) => {
  return (
    <section id="benefits-section" className="py-14 sm:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-[#153826] bg-[#153826]/8 px-3 py-1 rounded-full inline-block mb-2.5 sm:mb-3">
            Why Community Matters
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#18191B] tracking-tight leading-tight mb-2.5 sm:mb-4">
            Move with more than just a plan.
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#18191B]/75 leading-relaxed max-w-2xl mx-auto">
            Making Africa Home is a free community for diaspora and African diaspora. Logistics get you on the flight. Having a trusted circle helps you actually thrive once you land.
          </p>
        </div>

        {/* Three Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          {/* Card 1: Raw Unvarnished Truth */}
          <motion.div
            id="benefit-card-real-experiences"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#FDFBF7] border border-[#18191B]/10 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#F59E0B]/15 text-[#F59E0B] flex items-center justify-center mb-4 sm:mb-5">
                <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-[#F59E0B]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#F59E0B] block mb-1">
                Zero Filter
              </span>
              <h3 className="text-lg sm:text-2xl font-extrabold text-[#18191B] tracking-tight mb-2 sm:mb-2.5">
                Raw, unvarnished truth
              </h3>
              <p className="text-xs sm:text-base text-[#18191B]/75 leading-relaxed">
                Hear what life is actually like from people living it. Real costs, real bureaucratic bottlenecks, and real solutions.
              </p>
            </div>

            <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-[#18191B]/8">
              <p className="text-xs text-[#18191B]/60 italic leading-relaxed">
                “No brochures or travel influencers. Just honest breakdowns of daily power, healthcare, and rental realities.”
              </p>
            </div>
          </motion.div>

          {/* Card 2: Avoid Expensive Mistakes */}
          <motion.div
            id="benefit-card-better-decisions"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#FDFBF7] border border-[#18191B]/10 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#153826]/10 text-[#153826] flex items-center justify-center mb-4 sm:mb-5">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#153826]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#153826] block mb-1">
                Protect Your Peace & Capital
              </span>
              <h3 className="text-lg sm:text-2xl font-extrabold text-[#18191B] tracking-tight mb-2 sm:mb-2.5">
                Avoid expensive mistakes
              </h3>
              <p className="text-xs sm:text-base text-[#18191B]/75 leading-relaxed">
                Save thousands on advance leases, unreliable contractors, and currency snags by learning from people who navigated it first.
              </p>
            </div>

            <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-[#18191B]/8">
              <p className="text-xs text-[#18191B]/60 italic leading-relaxed">
                “Understand multi-currency reserves, school waitlists, and neighborhood commute realities well in advance.”
              </p>
            </div>
          </motion.div>

          {/* Card 3: Find your real tribe */}
          <motion.div
            id="benefit-card-find-people"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#FDFBF7] border border-[#18191B]/10 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#18191B]/10 text-[#18191B] flex items-center justify-center mb-4 sm:mb-5">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#18191B]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#18191B]/60 block mb-1">
                Emotional & Practical Support
              </span>
              <h3 className="text-lg sm:text-2xl font-extrabold text-[#18191B] tracking-tight mb-2 sm:mb-2.5">
                Find your real tribe
              </h3>
              <p className="text-xs sm:text-base text-[#18191B]/75 leading-relaxed">
                Moving is deeply personal. Connect with returnees, families, and builders navigating the exact same cultural transition.
              </p>
            </div>

            <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-[#18191B]/8">
              <p className="text-xs text-[#18191B]/60 italic leading-relaxed">
                “Local meetups, safe neighborhood walking groups, and verified recommendations for everyday life.”
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
