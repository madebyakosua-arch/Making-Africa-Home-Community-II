import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowUp, ArrowRight } from 'lucide-react';
import { FREQUENT_FAQS, FACEBOOK_COMMUNITY_URL } from '../data/communityData';
import { Logo } from './Logo';

interface FooterProps {
  onOpenJoin?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer id="main-footer" className="bg-[#FAF7F2] border-t border-[#18191B]/10 pt-12 sm:pt-16 pb-10 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick FAQ Accordion */}
        <div className="max-w-3xl mx-auto mb-10 sm:mb-16 pb-10 sm:pb-16 border-b border-[#18191B]/8">
          <div className="text-center mb-6 sm:mb-8">
            <span className="text-xs uppercase font-bold tracking-widest text-[#153826] bg-[#153826]/8 px-3 py-1 rounded-full inline-block mb-2">
              Common Questions
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold text-[#18191B] tracking-tight">
              Straightforward answers about joining
            </h3>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {FREQUENT_FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl sm:rounded-2xl bg-white border border-[#18191B]/8 overflow-hidden transition-all shadow-xs"
                >
                  <button
                    id={`faq-toggle-${index}`}
                    onClick={() => toggleFaq(index)}
                    className="w-full p-3.5 sm:p-5 text-left flex items-center justify-between gap-3 font-bold text-xs sm:text-base text-[#18191B] hover:text-[#153826] cursor-pointer"
                  >
                    <span className="pr-1">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#153826] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#18191B]/40 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-3.5 sm:px-5 pb-3.5 sm:pb-5 text-xs sm:text-sm text-[#18191B]/75 leading-relaxed pt-1 border-t border-[#18191B]/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 sm:mb-12 items-start">
          {/* Brand & Mission Column */}
          <div className="md:col-span-2 space-y-3.5 sm:space-y-4">
            <div>
              <Logo variant="dark" />
            </div>

            <p className="text-xs sm:text-sm text-[#18191B]/70 max-w-md leading-relaxed">
              Making Africa Home is a free community for diaspora and African diaspora. Connect with verified returnees and locals sharing practical, raw answers for building your life across Africa.
            </p>

            <div className="pt-1 flex items-center gap-3">
              <a
                id="footer-join-btn"
                href={FACEBOOK_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#153826] hover:bg-[#1D4B34] text-[#FAF7F2] text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Join Our FREE Community</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Sections */}
          <div className="md:text-right">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#18191B]/50 mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#18191B]/80 font-medium">
              <li>
                <button
                  onClick={() => scrollToSection('topics-section')}
                  className="hover:text-[#153826] transition-colors cursor-pointer"
                >
                  Discussion Topics
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('countries-section')}
                  className="hover:text-[#153826] transition-colors cursor-pointer"
                >
                  Destinations & Word Bank
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('stories-section')}
                  className="hover:text-[#153826] transition-colors cursor-pointer"
                >
                  Member Stories
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-6 sm:pt-8 border-t border-[#18191B]/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#18191B]/55 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
            <span>© {new Date().getFullYear()} Africa Link Collective.</span>
            <span>•</span>
            <span>Making Africa Home Community</span>
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span className="text-[11px] sm:text-xs">Free Community for Diaspora & African Diaspora</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 sm:p-2 rounded-full bg-white border border-[#18191B]/10 hover:border-[#18191B]/30 transition-colors text-[#18191B] cursor-pointer shadow-2xs"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
