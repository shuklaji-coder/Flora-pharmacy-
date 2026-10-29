import React from 'react';

/**
 * Authentic Flora Pharmacy Logo matching the real storefront signage:
 * Green medical crosses with bold red/coral and emerald lettering.
 */
export default function Logo({ className = "h-10 w-10", textClassName = "text-xl", showText = true }) {
  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Real Signboard Style Green Cross Badge */}
      <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-flora-800 text-white shadow-md shadow-emerald-700/25 p-2 ${className}`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-label="Flora Pharmacy Logo"
        >
          {/* Medical Cross matching real signage */}
          <path
            d="M19 8H29V19H40V29H29V40H19V29H8V19H19V8Z"
            fill="white"
            stroke="white"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          {/* Subtle leaf accent inside */}
          <circle cx="24" cy="24" r="3.5" fill="#10B981" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5 font-heading">
            <span className={`font-black tracking-tight text-[#E03A1E] ${textClassName}`}>
              FLORA
            </span>
            <span className={`font-black tracking-tight text-flora-800 ${textClassName}`}>
              PHARMACY
            </span>
          </div>
          <span className="text-[9.5px] uppercase tracking-wider font-extrabold text-slate-500 mt-1">
            Shop 7, Samarpan • Borivali East
          </span>
        </div>
      )}
    </div>
  );
}
