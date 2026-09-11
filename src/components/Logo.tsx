import React from 'react';

interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  className = '',
  showText = true,
}) => {
  const isLight = variant === 'light';
  const primaryTextColor = isLight ? '#FFFFFF' : '#0E3321';
  const collectiveTextColor = isLight ? '#FAF7F2' : '#0E3321';
  const linkGoldColor = '#C58B38';
  const dividerColor = isLight ? 'rgba(255, 255, 255, 0.3)' : 'rgba(14, 51, 33, 0.25)';
  const continentColor = isLight ? '#FAF7F2' : '#0E3321';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* High-fidelity Africa Map Outline with Link Curve */}
      <svg
        className="w-9 h-10 sm:w-10 sm:h-11 shrink-0"
        viewBox="0 0 100 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Continent Boundary Outline */}
        <path
          d="M 28,24 
             C 32,18 42,16 52,18 
             C 62,20 68,23 72,27
             C 74,31 71,35 76,40
             C 80,44 88,48 82,56
             C 78,61 74,68 76,75
             C 77,83 72,92 64,96
             C 58,100 55,93 52,86
             C 49,80 47,68 44,62
             C 41,56 38,50 35,46
             C 30,46 22,46 18,38
             C 14,30 20,28 28,24 Z"
          stroke={continentColor}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Madagascar Accent */}
        <path
          d="M 83,72 C 86,76 84,84 81,87 C 79,84 81,76 83,72 Z"
          stroke={continentColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* The Connection Link Path (Ochre / Gold curve linking West & East nodes) */}
        <path
          d="M 40,58 C 45,58 54,52 56,42 C 57,36 65,34 68,34"
          stroke={linkGoldColor}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* West Node Circle */}
        <circle
          cx="40"
          cy="58"
          r="4.5"
          fill={isLight ? '#153826' : '#FAF7F2'}
          stroke={linkGoldColor}
          strokeWidth="2.8"
        />

        {/* East Node Circle */}
        <circle
          cx="68"
          cy="34"
          r="4.5"
          fill={isLight ? '#153826' : '#FAF7F2'}
          stroke={continentColor}
          strokeWidth="2.8"
        />
      </svg>

      {showText && (
        <>
          {/* Vertical Separator Line */}
          <div
            className="h-9 w-[1.5px] shrink-0"
            style={{ backgroundColor: dividerColor }}
          />

          {/* Typography */}
          <div className="flex flex-col justify-center leading-none">
            <span
              className="text-[13px] sm:text-[15px] font-black tracking-[0.22em] uppercase font-sans leading-tight"
              style={{ color: primaryTextColor }}
            >
              AFRICA
            </span>
            <span
              className="text-[13px] sm:text-[15px] font-black tracking-[0.22em] uppercase font-sans leading-tight"
              style={{ color: linkGoldColor }}
            >
              LINK
            </span>
            <span
              className="text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.38em] uppercase font-sans mt-0.5"
              style={{ color: collectiveTextColor }}
            >
              COLLECTIVE
            </span>
          </div>
        </>
      )}
    </div>
  );
};
