import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { MEMBER_STORIES } from '../data/communityData';

interface SectionSixStoriesProps {
  onOpenJoin: () => void;
}

export const SectionSixStories: React.FC<SectionSixStoriesProps> = ({ onOpenJoin }) => {
  return (
    <section id="stories-section" className="py-14 sm:py-24 bg-[#FAF7F2] border-t border-[#18191B]/8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#153826]/8 border border-[#153826]/15 text-[#153826] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3">
            <span>Ground Realities • Early Members</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#18191B] tracking-tight leading-tight mb-2.5 sm:mb-3">
            People are already making Africa home.
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#18191B]/70 leading-relaxed">
            Honest reflections from early diaspora returnees sharing what they wish they knew before landing.
          </p>
        </div>

        {/* Exactly 2 Clean, Shortened, Authentic Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          {MEMBER_STORIES.map((story, index) => {
            return (
              <motion.div
                key={story.id}
                id={`story-card-${story.id}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.35, delay: index * 0.1 }}
                className="rounded-2xl sm:rounded-3xl bg-[#FDFBF7] border border-[#18191B]/12 p-5 sm:p-8 flex flex-col justify-between shadow-2xs"
              >
                <div>
                  {/* Top route line */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5 sm:mb-4 pb-2.5 sm:pb-3 border-b border-[#18191B]/8">
                    <div className="inline-flex items-center gap-1.5 font-bold text-xs text-[#153826]">
                      <span>{story.flagFrom}</span>
                      <span>{story.fromCity}</span>
                      <ArrowRight className="w-3 h-3 text-[#C58B38] shrink-0" />
                      <span>{story.flagTo}</span>
                      <span>{story.toCity}</span>
                    </div>

                    <span className="text-[10px] sm:text-[11px] font-bold text-[#C58B38] uppercase tracking-wider">
                      {story.year}
                    </span>
                  </div>

                  {/* Member Name & Role */}
                  <div className="mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-2xl font-bold text-[#18191B] tracking-tight">
                      {story.names}
                    </h3>
                    <p className="text-xs font-semibold text-[#18191B]/60 uppercase tracking-wider mt-0.5">
                      {story.roles}
                    </p>
                  </div>

                  {/* Raw Shortened Quote */}
                  <div className="relative mb-3.5 sm:mb-4 pl-3 sm:pl-3.5 border-l-2 border-[#F59E0B]">
                    <p className="text-xs sm:text-base text-[#18191B] font-medium leading-relaxed italic">
                      “{story.quote}”
                    </p>
                  </div>

                  {/* Ground Context */}
                  <p className="text-xs sm:text-sm text-[#18191B]/70 leading-relaxed">
                    {story.fullStory}
                  </p>
                </div>

                {/* Subdued community note */}
                <div className="pt-3.5 sm:pt-4 mt-4 sm:mt-5 border-t border-[#18191B]/8 flex items-center justify-between text-xs text-[#18191B]/50 font-medium">
                  <span>Founding Community Member</span>
                  <span className="text-[#153826] font-bold">{story.toCity} Circle</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
