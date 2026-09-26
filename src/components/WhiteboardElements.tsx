import React, { useState } from 'react';

// Hand-drawn Underline
export const HandDrawnUnderline: React.FC<{
  className?: string;
  color?: string;
  delay?: number;
}> = ({ className = '', color = '#C2410C' }) => {
  return (
    <svg
      viewBox="0 0 200 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block overflow-visible ${className}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M3 13C45 6 95 14 197 8M15 15C65 11 130 16 185 13"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="draw-path"
      />
    </svg>
  );
};

// Hand-drawn Circle / Ellipse
export const HandDrawnCircle: React.FC<{
  children: React.ReactNode;
  className?: string;
  strokeColor?: string;
}> = ({ children, className = '', strokeColor = '#C2410C' }) => {
  return (
    <span className={`relative inline-block px-2.5 py-1 ${className}`}>
      <span className="relative z-10">{children}</span>
      <svg
        viewBox="0 0 260 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible -top-1 -left-1"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M12 40 C 15 10, 110 5, 235 15 C 265 20, 260 65, 220 72 C 150 82, 35 78, 15 58 C 2 45, 18 20, 75 14"
          stroke={strokeColor}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="draw-path opacity-90"
        />
      </svg>
    </span>
  );
};

// Hand-drawn Curved Arrow
export const HandDrawnArrow: React.FC<{
  className?: string;
  color?: string;
  direction?: 'down' | 'right' | 'curved-down-right' | 'curved-up-right';
}> = ({ className = '', color = '#111827', direction = 'curved-down-right' }) => {
  return (
    <svg
      viewBox="0 0 100 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`overflow-visible pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {direction === 'curved-down-right' && (
        <>
          <path
            d="M10 12 C 40 8, 70 20, 85 45"
            stroke={color}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="4 2"
          />
          <path
            d="M72 44 L 86 46 L 85 32"
            stroke={color}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
      {direction === 'curved-up-right' && (
        <>
          <path
            d="M10 50 C 35 48, 65 38, 85 18"
            stroke={color}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="4 2"
          />
          <path
            d="M70 18 L 86 16 L 82 30"
            stroke={color}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
      {direction === 'right' && (
        <>
          <path
            d="M5 30 Q 50 25 90 30"
            stroke={color}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeDasharray="3 2"
          />
          <path
            d="M78 20 L 92 30 L 78 40"
            stroke={color}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
      {direction === 'down' && (
        <>
          <path
            d="M50 5 Q 46 30 50 50"
            stroke={color}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeDasharray="3 2"
          />
          <path
            d="M40 40 L 50 52 L 60 40"
            stroke={color}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
};

// Hand-drawn Button with imperfect border & hover second-line drawing
export const HandDrawnButton: React.FC<{
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'subtle';
  className?: string;
  id?: string;
}> = ({
  href,
  onClick,
  children,
  variant = 'primary',
  className = '',
  id,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles =
    'relative inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200 select-none group text-center cursor-pointer max-w-full break-words';

  const variantStyles =
    variant === 'primary'
      ? 'bg-[#0A5C36] text-white hover:bg-[#07472A] px-5 py-3 sm:px-8 sm:py-4 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5'
      : variant === 'outline'
      ? 'bg-white text-[#111827] hover:text-[#0A5C36] border border-gray-200 hover:border-[#0A5C36] px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl hover:-translate-y-0.5'
      : 'bg-slate-100 text-[#111827] hover:bg-slate-200 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl';

  const content = (
    <>
      {/* Hand-drawn organic border overlay */}
      <svg
        viewBox="0 0 200 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Base rough organic rectangle */}
        <path
          d="M6 8 C 45 4, 155 7, 194 6 C 198 15, 196 45, 194 54 C 150 57, 48 55, 6 54 C 3 45, 4 18, 6 8 Z"
          stroke={variant === 'primary' ? 'rgba(255,255,255,0.4)' : '#111827'}
          strokeWidth={variant === 'primary' ? '1.5' : '1.8'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Second sketch line that draws on hover */}
        {isHovered && (
          <path
            d="M3 5 C 60 2, 140 8, 197 4 C 201 20, 198 42, 196 56 C 145 59, 50 56, 3 56 C 1 40, 2 20, 3 5 Z"
            stroke={variant === 'primary' ? '#F59E0B' : '#C2410C'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="draw-path"
          />
        )}
      </svg>

      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        id={id}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`${baseStyles} ${variantStyles} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {content}
    </button>
  );
};

/* --- Hand-Drawn SVG Icons (Sketchbook Style) --- */

// House with chimney & subtle smoke doodle
export const HandDrawnHouseIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-6 h-6',
  color = '#18191B',
}) => (
  <svg
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block overflow-visible shrink-0 ${className}`}
    aria-hidden="true"
  >
    {/* Chimney smoke curl */}
    <path
      d="M24 10 Q 25 6 23 3 Q 21 1 25 0"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      fill="none"
    />
    {/* Roof */}
    <path
      d="M4 16 L 18 5 L 32 16"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Chimney */}
    <path
      d="M23 9 L 23 6 L 27 6 L 27 12"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Walls */}
    <path
      d="M8 15 L 8 30 L 28 30 L 28 15"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Door */}
    <path
      d="M15 30 L 15 21 Q 18 19 21 21 L 21 30"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Door handle dot */}
    <circle cx="19.5" cy="25" r="0.9" fill={color} />
  </svg>
);

// Location Pin Sketch
export const HandDrawnPinIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-6 h-6',
  color = '#C85A32',
}) => (
  <svg
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    aria-hidden="true"
  >
    <path
      d="M18 4 C 11 4, 8 9, 8 15 C 8 23, 18 33, 18 33 C 18 33, 28 23, 28 15 C 28 9, 25 4, 18 4 Z"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="18" cy="14" r="3.5" stroke={color} strokeWidth="2" />
  </svg>
);

// Lightbulb (Curious)
export const HandDrawnLightbulbIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-7 h-7',
  color = '#D98E2A',
}) => (
  <svg
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    aria-hidden="true"
  >
    {/* Rays */}
    <path d="M18 2 L 18 5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M7 8 L 9 10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M29 8 L 27 10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M3 18 L 6 18" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M30 18 L 33 18" stroke={color} strokeWidth="2" strokeLinecap="round" />
    {/* Bulb glass */}
    <path
      d="M12 24 C 9 20, 8 16, 9 13 C 11 8, 15 6, 18 6 C 22 6, 26 9, 27 13 C 28 16, 27 20, 24 24"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    {/* Base */}
    <path d="M13 25 L 23 25" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M14 28 L 22 28" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M16 31 L 20 31" stroke={color} strokeWidth="2" strokeLinecap="round" />
    {/* Filament doodle */}
    <path d="M15 15 Q 18 11 21 15" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

// Notebook (Planning)
export const HandDrawnNotebookIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-7 h-7',
  color = '#1E4532',
}) => (
  <svg
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    aria-hidden="true"
  >
    {/* Book Cover */}
    <rect
      x="8"
      y="5"
      width="20"
      height="26"
      rx="2"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Spine line */}
    <line x1="12" y1="5" x2="12" y2="31" stroke={color} strokeWidth="1.6" />
    {/* Notes lines */}
    <line x1="16" y1="11" x2="24" y2="11" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <line x1="16" y1="16" x2="24" y2="16" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <line x1="16" y1="21" x2="22" y2="21" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    {/* Bookmark ribbon */}
    <path d="M21 5 L 21 13 L 23.5 11 L 26 13 L 26 5" stroke="#C85A32" strokeWidth="1.4" fill="none" />
  </svg>
);

// Suitcase (Moving)
export const HandDrawnSuitcaseIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-7 h-7',
  color = '#C85A32',
}) => (
  <svg
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    aria-hidden="true"
  >
    {/* Handle */}
    <path
      d="M14 9 L 14 5 C 14 4, 15 3, 17 3 L 19 3 C 21 3, 22 4, 22 5 L 22 9"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Case Body */}
    <rect
      x="5"
      y="9"
      width="26"
      height="21"
      rx="3"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Straps */}
    <line x1="12" y1="9" x2="12" y2="30" stroke={color} strokeWidth="1.6" />
    <line x1="24" y1="9" x2="24" y2="30" stroke={color} strokeWidth="1.6" />
    {/* Center clasp */}
    <circle cx="18" cy="19" r="1.5" stroke={color} strokeWidth="1.4" />
  </svg>
);

// House Key (Settling)
export const HandDrawnKeyIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-7 h-7',
  color = '#D98E2A',
}) => (
  <svg
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    aria-hidden="true"
  >
    {/* Key Ring Head */}
    <circle cx="12" cy="16" r="7" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="12" cy="16" r="2.8" stroke={color} strokeWidth="1.5" />
    {/* Key Shaft */}
    <path d="M19 16 L 31 16" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    {/* Teeth */}
    <path d="M26 16 L 26 21" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M29 16 L 29 23" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

// House with People (Home)
export const HandDrawnHomeCommunityIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-8 h-8',
  color = '#1E4532',
}) => (
  <svg
    viewBox="0 0 44 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    aria-hidden="true"
  >
    {/* Center House */}
    <path
      d="M14 17 L 22 10 L 30 17"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 17 L 17 29 L 27 29 L 27 17"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M20 29 L 20 23 L 24 23 L 24 29" stroke={color} strokeWidth="1.6" />

    {/* Person Left */}
    <circle cx="8" cy="20" r="2.2" stroke={color} strokeWidth="1.6" />
    <path d="M5 29 C 5 25, 11 25, 11 29" stroke={color} strokeWidth="1.6" strokeLinecap="round" />

    {/* Person Right */}
    <circle cx="36" cy="20" r="2.2" stroke={color} strokeWidth="1.6" />
    <path d="M33 29 C 33 25, 39 25, 39 29" stroke={color} strokeWidth="1.6" strokeLinecap="round" />

    {/* Warm Heart above roof */}
    <path
      d="M22 6 C 20.5 4, 18 5, 19 7 C 20 9, 22 10, 22 10 C 22 10, 24 9, 25 7 C 26 5, 23.5 4, 22 6 Z"
      fill="#C85A32"
    />
  </svg>
);

// 3 People Connected by a Line
export const HandDrawnPeopleConnectedIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-9 h-9',
  color = '#18191B',
}) => (
  <svg
    viewBox="0 0 48 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    aria-hidden="true"
  >
    {/* Connecting hand-drawn baseline */}
    <path
      d="M10 27 Q 24 33 38 27"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeDasharray="3 2"
    />

    {/* Person 1 Left */}
    <circle cx="11" cy="13" r="3.5" stroke={color} strokeWidth="2.2" />
    <path d="M5 26 C 5 20, 17 20, 17 26" stroke={color} strokeWidth="2.2" strokeLinecap="round" />

    {/* Person 2 Center (Taller) */}
    <circle cx="24" cy="10" r="4" stroke="#1E4532" strokeWidth="2.4" />
    <path d="M17 25 C 17 18, 31 18, 31 25" stroke="#1E4532" strokeWidth="2.4" strokeLinecap="round" />

    {/* Person 3 Right */}
    <circle cx="37" cy="13" r="3.5" stroke={color} strokeWidth="2.2" />
    <path d="M31 26 C 31 20, 43 20, 43 26" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

// Speech Bubbles / Dialogue
export const HandDrawnSpeechBubblesIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-9 h-9',
  color = '#C85A32',
}) => (
  <svg
    viewBox="0 0 44 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    aria-hidden="true"
  >
    {/* Left bubble */}
    <path
      d="M6 14 C 6 8, 13 6, 20 6 C 27 6, 32 10, 32 16 C 32 21, 26 25, 20 25 L 14 28 L 16 24 C 10 23, 6 19, 6 14 Z"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="14" cy="15" r="1.2" fill={color} />
    <circle cx="19" cy="15" r="1.2" fill={color} />
    <circle cx="24" cy="15" r="1.2" fill={color} />

    {/* Right small replying bubble */}
    <path
      d="M26 21 C 30 19, 38 20, 38 25 C 38 29, 33 32, 29 32 L 27 34 L 28 31 C 25 30, 24 27, 25 24"
      stroke="#18191B"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Checklist Icon
export const HandDrawnChecklistIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-9 h-9',
  color = '#1E4532',
}) => (
  <svg
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    aria-hidden="true"
  >
    {/* Clipboard Outline */}
    <rect
      x="8"
      y="8"
      width="26"
      height="30"
      rx="3"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Clip Top */}
    <path
      d="M15 8 L 15 5 C 15 4, 16 3, 18 3 L 24 3 C 26 3, 27 4, 27 5 L 27 8"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Check 1 */}
    <path d="M12 16 L 15 19 L 20 13" stroke="#D98E2A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="22" y1="16" x2="30" y2="16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />

    {/* Check 2 */}
    <path d="M12 23 L 15 26 L 20 20" stroke="#D98E2A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="22" y1="23" x2="30" y2="23" stroke={color} strokeWidth="1.8" strokeLinecap="round" />

    {/* Check 3 */}
    <path d="M12 30 L 15 33 L 20 27" stroke="#D98E2A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="22" y1="30" x2="28" y2="30" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// Door Opening / Rising Sun (Discover Opportunities)
export const HandDrawnDoorSunIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-9 h-9',
  color = '#D98E2A',
}) => (
  <svg
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    aria-hidden="true"
  >
    {/* Door Frame */}
    <path
      d="M10 36 L 10 9 C 10 7, 12 6, 14 6 L 28 6 C 30 6, 32 7, 32 9 L 32 36"
      stroke="#18191B"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Open Door Swinging inside */}
    <path
      d="M10 36 L 25 32 L 25 9 L 10 9 Z"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#FAF8F5"
    />
    {/* Light rays shining from inside doorway */}
    <line x1="28" y1="14" x2="36" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="28" y1="20" x2="38" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="28" y1="26" x2="36" y2="28" stroke={color} strokeWidth="2" strokeLinecap="round" />
    {/* Doorknob */}
    <circle cx="22" cy="21" r="1.3" fill="#18191B" />
  </svg>
);

// Location Pin Beside House (Find your feet faster)
export const HandDrawnPinBesideHouseIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-9 h-9',
  color = '#C85A32',
}) => (
  <svg
    viewBox="0 0 44 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    aria-hidden="true"
  >
    {/* House on Left */}
    <path
      d="M6 19 L 17 10 L 28 19"
      stroke="#18191B"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 19 L 10 32 L 24 32 L 24 19"
      stroke="#18191B"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M14 32 L 14 25 L 19 25 L 19 32" stroke="#18191B" strokeWidth="1.8" />

    {/* Location Pin on Right */}
    <path
      d="M33 7 C 28 7, 26 11, 26 16 C 26 23, 33 32, 33 32 C 33 32, 40 23, 40 16 C 40 11, 38 7, 33 7 Z"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="33" cy="15" r="3" stroke={color} strokeWidth="2" />
  </svg>
);

// Circle of People Around Africa Outline (Belong to something)
export const HandDrawnAfricaCommunityIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-10 h-10',
  color = '#0A5C36',
}) => (
  <svg
    viewBox="0 0 54 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    aria-hidden="true"
  >
    {/* Minimalist Africa Outline in Center */}
    <path
      d="M24 13 C 27 12, 32 14, 34 17 C 32 20, 31 23, 33 26 C 31 31, 28 36, 27 38 C 25 36, 23 30, 22 26 C 18 24, 17 20, 20 18 C 22 16, 21 14, 24 13 Z"
      stroke="#111827"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="rgba(10, 92, 54, 0.08)"
    />

    {/* People Ring Dots around continent */}
    <circle cx="27" cy="6" r="2.4" stroke={color} strokeWidth="1.8" />
    <circle cx="41" cy="13" r="2.4" stroke={color} strokeWidth="1.8" />
    <circle cx="44" cy="27" r="2.4" stroke={color} strokeWidth="1.8" />
    <circle cx="37" cy="41" r="2.4" stroke={color} strokeWidth="1.8" />
    <circle cx="27" cy="46" r="2.4" stroke={color} strokeWidth="1.8" />
    <circle cx="16" cy="41" r="2.4" stroke={color} strokeWidth="1.8" />
    <circle cx="10" cy="26" r="2.4" stroke={color} strokeWidth="1.8" />
    <circle cx="14" cy="13" r="2.4" stroke={color} strokeWidth="1.8" />

    {/* Holding hands connection loop */}
    <path
      d="M27 9 C 38 9, 45 18, 45 28 C 45 38, 38 45, 27 45 C 16 45, 9 38, 9 28 C 9 18, 16 9, 27 9"
      stroke={color}
      strokeWidth="1.4"
      strokeDasharray="2 3"
      strokeLinecap="round"
    />
  </svg>
);

// Hand-drawn Plane (Moving Step)
export const HandDrawnPlaneIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-7 h-7',
  color = '#0284C7',
}) => (
  <svg
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    aria-hidden="true"
  >
    <path
      d="M5 21 L 14 17 L 14 6 C 14 4.5, 16 4, 17 5 L 20 15 L 29 12 C 31 11, 33 13, 31 15 L 22 20 L 22 28 L 18 26 L 17 22 L 9 24 L 5 21 Z"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M4 27 C 9 26, 12 28, 15 27" stroke="#F59E0B" strokeWidth="1.8" strokeDasharray="2 2" strokeLinecap="round" />
  </svg>
);

// Hand-drawn Coffee Cup & Chat (Meeting people)
export const HandDrawnCoffeeIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-9 h-9',
  color = '#EA580C',
}) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    aria-hidden="true"
  >
    {/* Steam curls */}
    <path d="M14 8 Q 16 4 14 2" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <path d="M19 9 Q 21 5 19 3" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M24 8 Q 26 4 24 2" stroke={color} strokeWidth="1.6" strokeLinecap="round" />

    {/* Cup Body */}
    <path
      d="M10 12 L 11 26 C 11 29, 14 31, 19 31 C 24 31, 27 29, 27 26 L 28 12 Z"
      stroke="#111827"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Handle */}
    <path
      d="M28 15 C 32 15, 34 18, 33 21 C 32 23, 29 23, 27.5 22"
      stroke="#111827"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Saucer */}
    <path d="M7 32 C 13 34, 25 34, 31 32" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

// Hand-drawn Star
export const HandDrawnStar: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-4 h-4',
  color = '#F59E0B',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block overflow-visible shrink-0 ${className}`}
    aria-hidden="true"
  >
    <path
      d="M12 2 L 14.5 8.5 L 21.5 9 L 16.5 13.5 L 18 20.5 L 12 16.5 L 6 20.5 L 7.5 13.5 L 2.5 9 L 9.5 8.5 Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={color}
      fillOpacity="0.2"
    />
  </svg>
);

// Hand-drawn Africa shape with a cute home inside (Logo)
export const HandDrawnAfricaLogoIcon: React.FC<{ className?: string }> = ({
  className = 'w-8 h-8',
}) => (
  <svg
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block overflow-visible shrink-0 ${className}`}
    aria-hidden="true"
  >
    {/* Africa Outline */}
    <path
      d="M12 4 C 18 3, 26 5, 27 9 C 28 12, 24 15, 26 18 C 28 21, 25 28, 20 33 C 18 33, 17 28, 16 25 C 13 23, 10 20, 11 16 C 8 13, 8 8, 12 4 Z"
      stroke="#0A5C36"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#0A5C36"
      fillOpacity="0.1"
    />

    {/* Little House inside */}
    <path d="M16 16 L 20 12 L 24 16" stroke="#C2410C" strokeWidth="2" strokeLinecap="round" />
    <path d="M17 16 L 17 22 L 23 22 L 23 16" stroke="#C2410C" strokeWidth="2" strokeLinecap="round" />
    <path d="M19 22 L 19 18 L 21 18 L 21 22" stroke="#D97706" strokeWidth="1.5" />
  </svg>
);

// Hand-drawn Speech Bubble Note
export const HandDrawnSpeechBubbleNote: React.FC<{
  children: React.ReactNode;
  className?: string;
  color?: string;
}> = ({ children, className = '', color = '#C2410C' }) => (
  <div className={`relative inline-block px-5 py-3 rounded-2xl bg-white border-2 border-dashed ${className}`} style={{ borderColor: color }}>
    <span className="font-handwriting text-base sm:text-lg font-bold" style={{ color }}>
      {children}
    </span>
    {/* Small bubble tail */}
    <svg
      viewBox="0 0 20 15"
      fill="none"
      className="absolute -bottom-3 left-6 w-4 h-3 overflow-visible"
    >
      <path
        d="M2 1 L 9 12 L 15 1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="white"
      />
    </svg>
  </div>
);

// Digital Washi / Masking Tape for Whiteboard photos & sticky notes
export const DigitalTape: React.FC<{
  className?: string;
  color?: string;
  angle?: string;
}> = ({ className = '', color = '#FDE68A', angle = '-4deg' }) => {
  return (
    <div
      style={{ transform: `rotate(${angle})`, backgroundColor: color }}
      className={`absolute z-20 h-6 w-24 sm:w-28 opacity-85 shadow-2xs pointer-events-none backdrop-blur-2xs border-t border-b border-black/5 ${className}`}
    >
      {/* Tape rough jagged ends */}
      <div className="absolute inset-y-0 -left-1 w-1.5 bg-white opacity-40 [clip-path:polygon(100%_0%,0%_25%,100%_50%,0%_75%,100%_100%)]" />
      <div className="absolute inset-y-0 -right-1 w-1.5 bg-white opacity-40 [clip-path:polygon(0%_0%,100%_25%,0%_50%,100%_75%,0%_100%)]" />
    </div>
  );
};

// Smiling Little House (at the end of the journey)
export const SmilingHouseIcon: React.FC<{ className?: string }> = ({
  className = 'w-10 h-10',
}) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block overflow-visible ${className}`}
  >
    {/* Roof */}
    <path
      d="M5 18 L 20 6 L 35 18"
      stroke="#0A5C36"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Chimney */}
    <path d="M26 11 L 26 8 L 30 8 L 30 14" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
    {/* Smoke curl */}
    <path d="M28 6 Q 30 3 27 1" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
    {/* Walls */}
    <path
      d="M9 17 L 9 33 L 31 33 L 31 17"
      stroke="#0A5C36"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#F0FDF4"
    />
    {/* Smiling Eyes */}
    <path d="M15 22 Q 17 20 19 22" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
    <path d="M23 22 Q 25 20 27 22" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
    {/* Big Happy Smile */}
    <path d="M17 26 Q 21 31 25 26" stroke="#C2410C" strokeWidth="2.2" strokeLinecap="round" />
    {/* Rosy cheeks */}
    <circle cx="14" cy="25" r="1.5" fill="#F43F5E" fillOpacity="0.5" />
    <circle cx="28" cy="25" r="1.5" fill="#F43F5E" fillOpacity="0.5" />
  </svg>
);

// Hand-drawn Red/Orange Marker Strike-through
export const HandDrawnStrikeThrough: React.FC<{
  children: React.ReactNode;
  color?: string;
  className?: string;
  lineClassName?: string;
}> = ({
  children,
  color = '#E11D48',
  className = '',
  lineClassName = '',
}) => (
  <span className={`relative inline-block ${className}`}>
    <span className="opacity-60">{children}</span>
    <svg
      viewBox="0 0 100 20"
      preserveAspectRatio="none"
      className={`absolute inset-0 pointer-events-none overflow-visible -top-0.5 ${lineClassName || 'w-full h-full'}`}
    >
      <path
        d="M -2 11 Q 50 7 102 12"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  </span>
);

// Hand-drawn Checkmark
export const HandDrawnCheckmark: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-5 h-5',
  color = '#0A5C36',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block overflow-visible ${className}`}
  >
    <path
      d="M4 12 L 9 18 L 21 6"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Hand-drawn Plane Landing Doodle
export const HandDrawnPlaneLanding: React.FC<{ className?: string }> = ({
  className = 'w-12 h-12',
}) => (
  <svg
    viewBox="0 0 60 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block overflow-visible ${className}`}
  >
    {/* Descent line */}
    <path
      d="M5 8 Q 25 18 45 28"
      stroke="#D97706"
      strokeWidth="2"
      strokeDasharray="3 3"
      strokeLinecap="round"
    />
    {/* Ground runway */}
    <path d="M30 32 L 58 32" stroke="#111827" strokeWidth="2.2" strokeLinecap="round" />
    {/* Touchdown sparks */}
    <path d="M43 30 L 41 27" stroke="#EA580C" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M47 30 L 49 27" stroke="#EA580C" strokeWidth="1.8" strokeLinecap="round" />
    {/* Plane angled down */}
    <g transform="translate(26, 12) rotate(15)">
      <path
        d="M2 12 L 10 10 L 10 3 C 10 2, 11 1.5, 12 2 L 14 9 L 21 7 C 22 6.5, 23.5 7.5, 22.5 8.5 L 16 12 L 16 17 L 13 16 L 12 13 L 6 14 L 2 12 Z"
        stroke="#0284C7"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#E0F2FE"
      />
    </g>
  </svg>
);

// Final Whiteboard Moment:
// 1 person on left -> dotted line -> suitcase -> plane -> Africa -> more people -> house surrounded by people
export const FinalWhiteboardIllustration: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto my-8 p-4 sm:p-6 bg-white rounded-3xl border-2 border-dashed border-gray-300">
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 text-center sm:text-left select-none">
        {/* 1 person on left */}
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-[#EA580C]/10 border border-[#EA580C] flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#EA580C]" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="7" r="4" />
              <path d="M5 21 C 5 16, 8 15, 12 15 C 16 15, 19 16, 19 21" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-handwriting text-xs font-bold text-[#EA580C] mt-1">You</span>
        </div>

        {/* Dotted Arrow */}
        <span className="font-handwriting text-lg text-gray-400 font-bold hidden sm:inline">···→</span>

        {/* Suitcase */}
        <div className="flex flex-col items-center">
          <HandDrawnSuitcaseIcon className="w-8 h-8" color="#D97706" />
          <span className="font-handwriting text-xs font-bold text-[#D97706] mt-1">Packing</span>
        </div>

        {/* Dotted Arrow */}
        <span className="font-handwriting text-lg text-gray-400 font-bold hidden sm:inline">···→</span>

        {/* Plane */}
        <div className="flex flex-col items-center">
          <HandDrawnPlaneIcon className="w-8 h-8" color="#0284C7" />
          <span className="font-handwriting text-xs font-bold text-[#0284C7] mt-1">The Flight</span>
        </div>

        {/* Dotted Arrow */}
        <span className="font-handwriting text-lg text-gray-400 font-bold hidden sm:inline">···→</span>

        {/* Africa Outline */}
        <div className="flex flex-col items-center">
          <HandDrawnAfricaLogoIcon className="w-9 h-9" />
          <span className="font-handwriting text-xs font-bold text-[#0A5C36] mt-1">Arrival</span>
        </div>

        {/* Dotted Arrow */}
        <span className="font-handwriting text-lg text-gray-400 font-bold hidden sm:inline">···→</span>

        {/* House surrounded by people */}
        <div className="flex flex-col items-center bg-[#0A5C36]/5 px-3 py-1.5 rounded-2xl border border-[#0A5C36]/20">
          <HandDrawnHomeCommunityIcon className="w-10 h-10" color="#0A5C36" />
          <span className="font-handwriting text-xs sm:text-sm font-extrabold text-[#0A5C36] mt-0.5">
            Your Community
          </span>
        </div>
      </div>

      <div className="text-center pt-5 mt-4 border-t border-gray-100">
        <p className="font-handwriting text-xl sm:text-2xl font-bold text-[#111827]">
          Moving gets you there.
        </p>
        <p className="font-handwriting text-2xl sm:text-3xl font-extrabold text-[#0A5C36] mt-1">
          People help make it home.
        </p>
      </div>
    </div>
  );
};



