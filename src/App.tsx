/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SectionOne } from './components/SectionOne';
import { SectionTwo } from './components/SectionTwo';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-[#111827] font-sans selection:bg-[#0A5C36] selection:text-white overflow-x-hidden">
      {/* 
        The website consists of ONLY TWO MAIN SECTIONS:
        - Section One: The idea and the community (Hero, Whiteboard illustration, Philosophy & Illustrated Journey)
        - Section Two: The benefits, final emotional call to action, and minimal embedded footer
      */}
      <main>
        {/* SECTION ONE: Hero and Community Introduction */}
        <SectionOne />

        {/* SECTION TWO: What You Get From The Community + Final Call to Action + Embedded Footer */}
        <SectionTwo />
      </main>
    </div>
  );
}
