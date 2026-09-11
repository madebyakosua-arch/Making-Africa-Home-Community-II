import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Coins,
  Languages,
  Home,
  ArrowRight,
  Globe2,
  Building,
  Check,
} from 'lucide-react';
import { AFRICAN_COUNTRIES_DATA, CountryWordBankItem, FACEBOOK_COMMUNITY_URL } from '../data/communityData';

interface SectionFourCountriesProps {
  onOpenJoin?: (countryName?: string) => void;
}

export const SectionFourCountries: React.FC<SectionFourCountriesProps> = () => {
  const [selectedRegion, setSelectedRegion] = useState<'All' | 'West Africa' | 'East Africa' | 'Southern Africa'>('All');
  const [selectedCountryId, setSelectedCountryId] = useState<string>('south-africa');

  const filteredCountries = AFRICAN_COUNTRIES_DATA.filter((country) => {
    if (selectedRegion === 'All') return true;
    return country.region === selectedRegion;
  });

  const activeCountry: CountryWordBankItem =
    AFRICAN_COUNTRIES_DATA.find((c) => c.id === selectedCountryId) ||
    AFRICAN_COUNTRIES_DATA[0];

  const regionsList: ('All' | 'Southern Africa' | 'West Africa' | 'East Africa')[] = [
    'All',
    'Southern Africa',
    'West Africa',
    'East Africa',
  ];

  return (
    <section
      id="countries-section"
      className="py-14 sm:py-24 bg-[#FAF7F2] border-b border-[#18191B]/8"
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#153826]/8 border border-[#153826]/15 text-[#153826] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3">
              <span>Destinations & City Circles</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#18191B] tracking-tight leading-tight mb-2.5 sm:mb-3">
              Where are you thinking of calling home?
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-[#18191B]/75 leading-relaxed">
              Explore honest ground insights, typical living expenses, and popular neighborhoods across Southern, West, and East Africa.
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 sm:p-1.5 rounded-2xl bg-[#EFECE6] border border-[#18191B]/8 self-start md:self-auto w-full sm:w-auto">
            {regionsList.map((region) => {
              const isSelected = selectedRegion === region;
              const count =
                region === 'All'
                  ? AFRICAN_COUNTRIES_DATA.length
                  : AFRICAN_COUNTRIES_DATA.filter((c) => c.region === region).length;

              return (
                <button
                  key={region}
                  id={`filter-${region.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#153826] text-[#FAF7F2] shadow-xs'
                      : 'text-[#18191B]/70 hover:text-[#18191B] hover:bg-[#FAF7F2]/60'
                  }`}
                >
                  <span>{region}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#18191B]/8 text-[#18191B]/60'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Country Word Bank */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-2.5 sm:mb-3 text-xs font-bold uppercase tracking-wider text-[#18191B]/60">
            <Globe2 className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
            <span>Select a Country Circle</span>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {filteredCountries.map((country) => {
              const isActive = activeCountry.id === country.id;
              return (
                <button
                  key={country.id}
                  id={`country-btn-${country.id}`}
                  onClick={() => setSelectedCountryId(country.id)}
                  className={`group px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#153826] text-[#FAF7F2] shadow-xs ring-1 ring-[#153826]'
                      : 'bg-[#FDFBF7] hover:bg-white border border-[#18191B]/10 text-[#18191B] hover:border-[#18191B]/25'
                  }`}
                >
                  <span className="text-base leading-none">{country.flag}</span>
                  <span className="font-semibold whitespace-nowrap">{country.name}</span>
                  {isActive && <Check className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial Country Feature Dossier */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCountry.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl sm:rounded-3xl bg-[#FDFBF7] border border-[#18191B]/12 p-4 sm:p-8 lg:p-10 shadow-xs"
          >
            {/* Country Header Info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-[#18191B]/8">
              <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                <span className="text-3xl sm:text-5xl leading-none shrink-0 drop-shadow-2xs mt-0.5 sm:mt-0">
                  {activeCountry.flag}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <h3 className="text-xl sm:text-3xl font-extrabold text-[#18191B] tracking-tight">
                      {activeCountry.name}
                    </h3>
                    <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-[#153826]/8 text-[#153826] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                      {activeCountry.region}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#18191B]/70 font-medium mt-1 leading-normal">
                    Capital: <strong className="text-[#18191B]">{activeCountry.capital}</strong> • Major Hubs: {activeCountry.majorHubs.join(', ')}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <a
                id={`join-country-circle-btn-${activeCountry.id}`}
                href={FACEBOOK_COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-full bg-[#153826] hover:bg-[#1D4B34] text-[#FAF7F2] font-semibold text-xs sm:text-sm tracking-tight transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Connect with {activeCountry.name} Circle</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 py-4 sm:py-6 border-b border-[#18191B]/8">
              <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-[#18191B]/8">
                <div className="flex items-center gap-1.5 text-xs text-[#18191B]/60 font-semibold mb-1">
                  <Coins className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                  <span>Currency & Banking</span>
                </div>
                <p className="text-sm font-bold text-[#18191B]">{activeCountry.currency}</p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-[#18191B]/8">
                <div className="flex items-center gap-1.5 text-xs text-[#18191B]/60 font-semibold mb-1">
                  <Home className="w-3.5 h-3.5 text-[#153826] shrink-0" />
                  <span>Typical Rent (2-Bed)</span>
                </div>
                <p className="text-sm font-bold text-[#18191B]">{activeCountry.avgRent}</p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-[#18191B]/8">
                <div className="flex items-center gap-1.5 text-xs text-[#18191B]/60 font-semibold mb-1">
                  <Languages className="w-3.5 h-3.5 text-[#18191B] shrink-0" />
                  <span>Languages</span>
                </div>
                <p className="text-sm font-bold text-[#18191B] break-words">{activeCountry.languages.join(', ')}</p>
              </div>
            </div>

            {/* In-Depth Context Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 pt-5 sm:pt-6 items-start">
              {/* Left Column: Quick Reality & Highlights */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-[#F59E0B] mb-1.5">
                    What You Should Know
                  </h4>
                  <p className="text-xs sm:text-sm text-[#18191B]/85 leading-relaxed bg-white p-3.5 sm:p-4 rounded-xl border border-[#18191B]/8">
                    {activeCountry.quickFact}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-[#153826] mb-1.5">
                    Why Diaspora Choose {activeCountry.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#18191B]/75 leading-relaxed">
                    {activeCountry.whyDiasporaLoveIt}
                  </p>
                </div>
              </div>

              {/* Right Column: Popular Neighborhoods */}
              <div>
                <div className="flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-[#18191B]/70 mb-2">
                  <Building className="w-3.5 h-3.5 text-[#153826] shrink-0" />
                  <span>Popular Neighborhoods</span>
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3.5 sm:mb-4">
                  {activeCountry.popularNeighborhoods.map((n) => (
                    <span
                      key={n}
                      className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white border border-[#18191B]/10 text-xs font-semibold text-[#18191B] shadow-2xs"
                    >
                      {n}
                    </span>
                  ))}
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-[#153826]/5 border border-[#153826]/12 text-xs text-[#18191B]/80 leading-relaxed">
                  <strong className="text-[#153826] font-bold">Community Note:</strong> Rental contracts, advance deposit customs, and utility backups vary significantly between estates. Ask in the {activeCountry.name} circle before committing to a lease.
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
