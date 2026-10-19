import React from 'react';

export const MoroccanCornerOrnament: React.FC<{ className?: string }> = ({ className = 'w-10 h-10 text-[#800020]' }) => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M2 2 H58 M2 2 V58"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M8 8 H40 M8 8 V40"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeOpacity="0.6"
    />
    <path
      d="M2 14 C14 14 14 2 14 2"
      stroke="currentColor"
      strokeWidth="1"
    />
    <g transform="translate(18, 18) scale(0.7)">
      <polygon
        points="10,0 12.5,7.5 20,10 12.5,12.5 10,20 7.5,12.5 0,10 7.5,7.5"
        fill="currentColor"
        fillOpacity="0.3"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <circle cx="10" cy="10" r="2.5" fill="currentColor" />
    </g>
  </svg>
);

export const GoldDivider: React.FC<{ className?: string }> = ({ className = 'w-48 my-4' }) => (
  <div className={`flex items-center justify-center gap-2 ${className}`}>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#800020] to-[#C47B91]/50" />
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#800020] fill-current">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#800020] to-[#C47B91]/50" />
  </div>
);

export const MoroccanZelligeBorder: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`w-full h-2 flex items-center justify-center overflow-hidden opacity-50 ${className}`}>
    <div className="w-full flex justify-between tracking-widest text-[#800020] text-[9px] select-none font-serif">
      ✦ · ✧ · ✦ · ✧ · ✦ · ✧ · ✦ · ✧ · ✦ · ✧ · ✦ · ✧ · ✦ · ✧ · ✦ · ✧ · ✦ · ✧ · ✦ · ✧ · ✦ · ✧ · ✦
    </div>
  </div>
);
