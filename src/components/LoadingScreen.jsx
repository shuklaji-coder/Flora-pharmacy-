import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, Heart, MapPin } from 'lucide-react';

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const statusMessages = [
    "Checking 100% Genuine Medicine Inventory...",
    "Connecting to Borivali East Store Counter...",
    "Activating Instant WhatsApp Order System...",
    "Welcome to Flora Pharmacy!"
  ];

  useEffect(() => {
    // Progress counter animation from 0 to 100
    const duration = 1800; // 1.8 seconds total
    const intervalTime = 30;
    const totalSteps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      // Easing calculation for smooth acceleration & gentle finish
      const rawProgress = Math.min(100, Math.round((currentStep / totalSteps) * 100));
      setProgress(rawProgress);

      // Cycle status messages
      if (currentStep < totalSteps * 0.3) {
        setStatusIndex(0);
      } else if (currentStep < totalSteps * 0.6) {
        setStatusIndex(1);
      } else if (currentStep < totalSteps * 0.9) {
        setStatusIndex(2);
      } else {
        setStatusIndex(3);
      }

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        // Start exit animation
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsVisible(false);
            if (onFinish) onFinish();
          }, 650); // Matches CSS transition duration
        }, 200);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onFinish]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#021b10] via-[#053b24] to-[#022315] text-white overflow-hidden transition-all duration-700 ease-out select-none ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-emerald-500/20 blur-[100px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-teal-400/15 blur-[90px] pointer-events-none" />

      {/* Floating subtle medical particles */}
      <div className="absolute top-16 left-12 w-6 h-6 text-emerald-400/30 animate-particle-1 pointer-events-none">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
        </svg>
      </div>

      <div className="absolute bottom-24 left-20 w-8 h-8 text-teal-300/25 animate-particle-2 pointer-events-none">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
        </svg>
      </div>

      <div className="absolute top-28 right-16 w-5 h-5 text-emerald-300/30 animate-particle-3 pointer-events-none">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
        </svg>
      </div>

      {/* Skip button in top right */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute top-6 right-6 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold tracking-wider text-slate-300 hover:text-white transition border border-white/10 backdrop-blur-xs"
      >
        Skip ➔
      </button>

      {/* Central Branded Box */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md px-6 animate-scale-in">
        
        {/* Animated Medical Cross Badge with Heartbeat Pulse */}
        <div className="relative mb-6">
          {/* Radar ripple rings */}
          <span className="absolute -inset-3 rounded-3xl bg-emerald-400/30 animate-ping opacity-30 pointer-events-none" />
          <span className="absolute -inset-6 rounded-full bg-emerald-500/15 blur-xl pointer-events-none" />

          {/* Cross container with heartbeat rhythm */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-emerald-500 via-flora-700 to-emerald-900 p-4 shadow-emerald-glow border-2 border-emerald-300/40 flex items-center justify-center animate-heartbeat">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-md"
            >
              {/* Official Medical Cross */}
              <path
                d="M19 8H29V19H40V29H29V40H19V29H8V19H19V8Z"
                fill="white"
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle cx="24" cy="24" r="4" fill="#22C55E" />
            </svg>
          </div>
        </div>

        {/* ECG Heartbeat Line Animation */}
        <div className="w-56 h-8 sm:w-64 sm:h-10 mb-4 flex items-center justify-center">
          <svg
            viewBox="0 0 300 50"
            className="w-full h-full stroke-emerald-400"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Cardiac rhythm path */}
            <path
              d="M 0 25 L 70 25 L 85 25 L 95 10 L 110 40 L 125 5 L 140 45 L 150 25 L 165 25 L 175 18 L 185 25 L 300 25"
              className="animate-ecg-line"
            />
          </svg>
        </div>

        {/* Brand Name Typography */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2 font-heading tracking-tight">
            <span className="text-3xl sm:text-4xl font-black text-[#FF4D30] drop-shadow-md">
              FLORA
            </span>
            <span className="text-3xl sm:text-4xl font-black text-emerald-400 drop-shadow-md">
              PHARMACY
            </span>
          </div>

          <p className="text-xs sm:text-sm font-semibold text-emerald-200/90 tracking-wide">
            फ्लोर फार्मेसी • Borivali East, Mumbai
          </p>

          <p className="text-[11px] text-slate-300/80 max-w-xs mx-auto italic mt-1">
            "Quality Medicines for a Healthier Tomorrow"
          </p>
        </div>

        {/* Dynamic Progress Bar & Percent */}
        <div className="w-64 sm:w-72 mt-8 space-y-2">
          
          {/* Progress Track */}
          <div className="w-full h-2 rounded-full bg-emerald-950/80 border border-emerald-500/30 overflow-hidden relative shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-300 to-emerald-400 rounded-full transition-all duration-75 relative"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer light effect inside progress */}
              <div className="absolute inset-0 bg-white/30 animate-shimmer-sweep" />
            </div>
          </div>

          {/* Percentage & Status Label */}
          <div className="flex items-center justify-between text-[11px] text-emerald-300/90 font-mono">
            <span className="font-bold">{progress}%</span>
            <span className="text-[10px] text-emerald-400/80 flex items-center gap-1 font-sans">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> 100% Genuine
            </span>
          </div>

        </div>

        {/* Live Status Message Ticker */}
        <div className="h-6 mt-4 flex items-center justify-center">
          <p className="text-xs text-slate-300/90 font-medium animate-fade-in transition-all">
            {statusMessages[statusIndex]}
          </p>
        </div>

        {/* Store Location Footer Pill */}
        <div className="mt-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-400">
          <MapPin className="w-3 h-3 text-emerald-400" />
          <span>Shop 7, Samarpan, Magathane Metro, Borivali East</span>
        </div>

      </div>

    </div>
  );
}