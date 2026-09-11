import React from 'react';
import { motion } from 'motion/react';
import {
  Home,
  Wallet,
  Briefcase,
  Building2,
  GraduationCap,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { TOPIC_CATEGORIES, FACEBOOK_COMMUNITY_URL } from '../data/communityData';

interface SectionTwoCategoriesProps {
  onOpenJoin?: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="w-5 h-5 text-[#F59E0B]" />,
  Wallet: <Wallet className="w-5 h-5 text-[#153826]" />,
  Briefcase: <Briefcase className="w-5 h-5 text-[#18191B]" />,
  Building2: <Building2 className="w-5 h-5 text-[#153826]" />,
  GraduationCap: <GraduationCap className="w-5 h-5 text-[#F59E0B]" />,
  Sparkles: <Sparkles className="w-5 h-5 text-[#18191B]" />,
};

export const SectionTwoCategories: React.FC<SectionTwoCategoriesProps> = () => {
  return (
    <section id="topics-section" className="py-14 sm:py-24 bg-[#FDFBF7] border-y border-[#18191B]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[#153826] bg-[#153826]/8 px-3 py-1 rounded-full inline-block mb-2.5 sm:mb-3">
            Real Topics • Real Answers
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#18191B] tracking-tight leading-tight mb-2.5 sm:mb-4">
            The questions are easier when you ask people living it.
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#18191B]/70 leading-relaxed max-w-2xl">
            Relocating comes with unvarnished questions. Make Africa Home gives you a candid space to get the real answers before you spend a dime.
          </p>
        </div>

        {/* 6 Compact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
          {TOPIC_CATEGORIES.map((category, index) => {
            return (
              <motion.a
                key={category.id}
                id={`topic-card-${category.id}`}
                href={FACEBOOK_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                whileHover={{ y: -3 }}
                className="group relative p-4 sm:p-7 rounded-2xl bg-[#FAF7F2] border border-[#18191B]/8 hover:border-[#F59E0B]/50 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  {/* Icon */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white border border-[#18191B]/8 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                      {iconMap[category.iconName] || <Home className="w-5 h-5 text-[#153826]" />}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-xl font-extrabold text-[#18191B] group-hover:text-[#153826] transition-colors mb-1.5 sm:mb-2">
                    {category.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#18191B]/75 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Sub-label action */}
                <div className="mt-3.5 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[#18191B]/6 flex items-center justify-between text-xs font-bold text-[#153826]">
                  <span>Ask in community</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#F59E0B]" />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
