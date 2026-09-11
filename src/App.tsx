/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SectionTwoCategories } from './components/SectionTwoCategories';
import { SectionFourCountries } from './components/SectionFourCountries';
import { SectionFiveBenefits } from './components/SectionFiveBenefits';
import { SectionSixStories } from './components/SectionSixStories';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { JoinModal } from './components/JoinModal';

export default function App() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [preselectedJoinCountry, setPreselectedJoinCountry] = useState<string>('');

  const handleOpenJoin = (countryName?: string) => {
    if (countryName) {
      setPreselectedJoinCountry(countryName);
    }
    setIsJoinModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#18191B] font-sans selection:bg-[#153826] selection:text-[#FAF7F2] overflow-x-hidden">
      {/* Top Navigation */}
      <Navbar onOpenJoin={() => handleOpenJoin()} />

      {/* Main Content Sections */}
      <main>
        {/* HERO Section */}
        <Hero onOpenJoin={() => handleOpenJoin()} />

        {/* SECTION 2: 6 Discussion Categories */}
        <SectionTwoCategories onOpenJoin={() => handleOpenJoin()} />

        {/* SECTION 3: Destinations & City Circles (Southern, West, and East Africa) */}
        <SectionFourCountries onOpenJoin={(country) => handleOpenJoin(country)} />

        {/* SECTION 4: Three Benefit Cards */}
        <SectionFiveBenefits onOpenJoin={() => handleOpenJoin()} />

        {/* SECTION 5: Text-Based Member Relocation Stories */}
        <SectionSixStories onOpenJoin={() => handleOpenJoin()} />

        {/* FINAL CTA: Strong Dark Contrasting Section */}
        <FinalCTA onOpenJoin={() => handleOpenJoin()} />
      </main>

      {/* Footer */}
      <Footer onOpenJoin={() => handleOpenJoin()} />

      {/* Interactive Modal */}
      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={() => {
          setIsJoinModalOpen(false);
          setPreselectedJoinCountry('');
        }}
        preselectedCountry={preselectedJoinCountry}
      />
    </div>
  );
}
