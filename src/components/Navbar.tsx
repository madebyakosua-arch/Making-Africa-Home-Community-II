import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { FACEBOOK_COMMUNITY_URL } from '../data/communityData';

interface NavbarProps {
  onOpenJoin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#18191B]/8 py-3 sm:py-3.5 shadow-sm text-[#18191B]'
          : 'bg-gradient-to-b from-black/85 via-black/45 to-transparent py-3.5 sm:py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Official Africa Link Collective Logo */}
          <a
            href="#"
            id="brand-logo"
            className="flex items-center group focus:outline-none"
          >
            <Logo variant={scrolled ? 'dark' : 'light'} />
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className={`hidden md:flex items-center gap-8 text-sm font-semibold transition-colors ${
              scrolled ? 'text-[#18191B]/75' : 'text-white/90'
            }`}
          >
            <button
              id="nav-link-topics"
              onClick={() => scrollToSection('topics-section')}
              className={`transition-colors cursor-pointer ${
                scrolled ? 'hover:text-[#153826]' : 'hover:text-white'
              }`}
            >
              Topics
            </button>
            <button
              id="nav-link-destinations"
              onClick={() => scrollToSection('countries-section')}
              className={`transition-colors cursor-pointer ${
                scrolled ? 'hover:text-[#153826]' : 'hover:text-white'
              }`}
            >
              Destinations
            </button>
            <button
              id="nav-link-stories"
              onClick={() => scrollToSection('stories-section')}
              className={`transition-colors cursor-pointer ${
                scrolled ? 'hover:text-[#153826]' : 'hover:text-white'
              }`}
            >
              Member Stories
            </button>
          </nav>

          {/* Single Primary Action Button */}
          <div className="hidden sm:flex items-center">
            <a
              id="header-join-btn"
              href={FACEBOOK_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-tight transition-all duration-150 shadow-sm flex items-center gap-2 cursor-pointer ${
                scrolled
                  ? 'bg-[#153826] hover:bg-[#1D4B34] text-[#FAF7F2]'
                  : 'bg-white hover:bg-[#FAF7F2] text-[#153826]'
              }`}
            >
              <span>Join FREE Community</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Toggle & Quick Action */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              id="mobile-join-shortcut-btn"
              href={FACEBOOK_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${
                scrolled
                  ? 'bg-[#153826] text-[#FAF7F2]'
                  : 'bg-white text-[#153826]'
              }`}
            >
              Join Free
            </a>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1.5 rounded-lg focus:outline-none ${
                scrolled
                  ? 'text-[#18191B] hover:bg-[#18191B]/5'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-[#FAF7F2] text-[#18191B] border-b border-[#18191B]/10 px-6 py-6 shadow-xl space-y-4"
        >
          <div className="pb-3 border-b border-[#18191B]/8">
            <Logo variant="dark" />
          </div>

          <div className="flex flex-col space-y-3 font-semibold text-[#18191B] text-sm">
            <button
              onClick={() => scrollToSection('topics-section')}
              className="text-left py-2 border-b border-[#18191B]/5 hover:text-[#153826]"
            >
              Topics
            </button>
            <button
              onClick={() => scrollToSection('countries-section')}
              className="text-left py-2 border-b border-[#18191B]/5 hover:text-[#153826]"
            >
              Destinations & Word Bank
            </button>
            <button
              onClick={() => scrollToSection('stories-section')}
              className="text-left py-2 border-b border-[#18191B]/5 hover:text-[#153826]"
            >
              Member Stories
            </button>
          </div>

          <div className="pt-2">
            <a
              href={FACEBOOK_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-full bg-[#153826] text-[#FAF7F2] font-bold text-sm text-center flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Join Our FREE Community</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
