import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  MapPin, 
  Clock, 
  Truck, 
  ArrowRight,
  Activity,
  HeartPulse,
  CheckCircle2
} from 'lucide-react';

export default function LoadingScreen({ onFinish }) {
  // Phase state: 'signal' (0s - 1.6s) -> 'mascot' (1.6s - 4.2s)
  const [phase, setPhase] = useState('signal');
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Status ticker messages
  const statusMessages = [
    "📡 Connecting to Borivali East Store Network...",
    "⚡ Initializing 30-Minute Express Dispatch Counter...",
    "💊 Verifying 100% Genuine Medicine & Batch Expiry...",
    "🙏 Swagat Hai! Chief Pharmacist Premprakash Sirvi ready to serve..."
  ];
  const [statusIdx, setStatusIdx] = useState(0);

  useEffect(() => {
    // Phase 1 to Phase 2 transition at 1.5s
    const phaseTimer = setTimeout(() => {
      setPhase('mascot');
    }, 1500);

    // Smooth progress counter from 0 to 100% over 4.0s
    const totalDuration = 4000;
    const intervalTime = 30;
    const totalSteps = totalDuration / intervalTime;
    let currentStep = 0;

    const progressTimer = setInterval(() => {
      currentStep++;
      const pct = Math.min(100, Math.round((currentStep / totalSteps) * 100));
      setProgress(pct);

      if (pct < 30) {
        setStatusIdx(0);
      } else if (pct < 55) {
        setStatusIdx(1);
      } else if (pct < 85) {
        setStatusIdx(2);
      } else {
        setStatusIdx(3);
      }

      if (currentStep >= totalSteps) {
        clearInterval(progressTimer);
        // Seamless exit transition
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsVisible(false);
            if (onFinish) onFinish();
          }, 500);
        }, 300);
      }
    }, intervalTime);

    return () => {
      clearTimeout(phaseTimer);
      clearInterval(progressTimer);
    };
  }, [onFinish]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, 350);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#02190F] via-[#042E1D] to-[#01140B] text-white overflow-hidden transition-all duration-700 ease-out select-none ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 sm:w-[32rem] h-96 sm:h-[32rem] rounded-full bg-emerald-500/20 blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-amber-400/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-60 h-60 rounded-full bg-teal-400/15 blur-[80px] pointer-events-none" />

      {/* Floating subtle medical particles */}
      <div className="absolute top-12 left-10 w-7 h-7 text-emerald-400/30 animate-particle-1 pointer-events-none">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
        </svg>
      </div>
      <div className="absolute bottom-16 left-16 w-8 h-8 text-amber-300/25 animate-particle-2 pointer-events-none">
        <Sparkles className="w-full h-full fill-current" />
      </div>
      <div className="absolute top-20 right-14 w-6 h-6 text-teal-300/30 animate-particle-3 pointer-events-none">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
        </svg>
      </div>

      {/* Top Header: Skip Button & Location Pill */}
      <div className="absolute top-5 inset-x-6 z-30 flex items-center justify-between pointer-events-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10.5px] sm:text-xs text-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-semibold">Borivali East Counter • Live</span>
        </div>

        <button
          type="button"
          onClick={handleSkip}
          className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 hover:text-white transition border border-white/15 backdrop-blur-md cursor-pointer active:scale-95 shadow-md"
        >
          <span>Skip</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Main Dynamic Stage: Switches from Signal to Mascot */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-lg w-full px-4 text-center my-auto">
        <AnimatePresence mode="wait">
          
          {/* ============================================================== */}
          {/* PHASE 1: FLORA PHARMACY RADAR SIGNAL & BEACON (0.0s - 1.5s)   */}
          {/* ============================================================== */}
          {phase === 'signal' && (
            <motion.div
              key="phase-signal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92, y: -20, transition: { duration: 0.35 } }}
              className="flex flex-col items-center"
            >
              {/* Radar Beacon with Concentric Ripple Rings */}
              <div className="relative mb-6">
                <span className="absolute -inset-4 rounded-full bg-emerald-400/25 animate-ping opacity-40 pointer-events-none" />
                <span className="absolute -inset-10 rounded-full bg-emerald-500/20 blur-2xl pointer-events-none" />
                <span className="absolute -inset-2 rounded-3xl border-2 border-emerald-400/40 animate-pulse pointer-events-none" />

                {/* Glowing Medical Cross Shield */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-emerald-500 via-flora-700 to-emerald-950 p-4 shadow-[0_0_50px_rgba(16,185,129,0.5)] border-2 border-emerald-300/50 flex items-center justify-center animate-heartbeat">
                  <svg
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-lg"
                  >
                    <path
                      d="M19 8H29V19H40V29H29V40H19V29H8V19H19V8Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <circle cx="24" cy="24" r="4.5" fill="#10B981" />
                  </svg>
                </div>
              </div>

              {/* Cardiac ECG Line Pulse Animation */}
              <div className="w-60 sm:w-72 h-8 sm:h-9 mb-3 flex items-center justify-center">
                <svg
                  viewBox="0 0 300 50"
                  className="w-full h-full stroke-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                  fill="none"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d="M 0 25 L 70 25 L 85 25 L 95 10 L 110 40 L 125 5 L 140 45 L 150 25 L 165 25 L 175 18 L 185 25 L 300 25"
                    className="animate-ecg-line"
                  />
                </svg>
              </div>

              {/* Brand Typography */}
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2 font-heading tracking-tight">
                  <span className="text-3xl sm:text-4xl font-black text-[#FF4D30] drop-shadow-[0_2px_12px_rgba(255,77,48,0.4)]">
                    FLORA
                  </span>
                  <span className="text-3xl sm:text-4xl font-black text-emerald-400 drop-shadow-[0_2px_12px_rgba(52,211,153,0.4)]">
                    PHARMACY
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-emerald-200/90 tracking-wide">
                  फ्लोर फार्मेसी • Borivali East, Mumbai
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-[10.5px] font-bold text-emerald-300 mt-1">
                  <Activity className="w-3 h-3 animate-pulse" />
                  <span>Medical Signal Broadcast Active</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* ============================================================== */}
          {/* PHASE 2: ADORABLE MASCOT ARRIVES & DOES NAMASKAR 🙏 (1.5s - 4s)*/}
          {/* ============================================================== */}
          {phase === 'mascot' && (
            <motion.div
              key="phase-mascot"
              initial={{ opacity: 0, y: 35, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
              transition={{
                type: 'spring',
                stiffness: 140,
                damping: 16,
                mass: 0.9
              }}
              className="flex flex-col items-center w-full"
            >
              {/* Mascot Floating Pedestal Frame */}
              <div className="relative mb-3 flex flex-col items-center">
                
                {/* Radiant Champagne & Emerald Glowing Aura */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.85, 0.5]
                  }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 m-auto w-48 sm:w-56 h-48 sm:h-56 bg-gradient-to-tr from-amber-400/35 via-emerald-400/40 to-teal-300/30 rounded-full blur-2xl pointer-events-none"
                />

                {/* Golden Badge floating on top of Mascot */}
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="absolute -top-3.5 z-20 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 text-[11px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5 border border-amber-300"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-current text-slate-950" />
                  <span>Namaskar! Welcome</span>
                </motion.div>

                {/* 3D Mascot Character with Traditional Namaste 🙏 Greeting */}
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 1, 0, -1, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-b from-white via-emerald-50/90 to-amber-50/80 p-2 border-3 border-amber-300/80 shadow-[0_15px_45px_rgba(0,0,0,0.45)] flex items-center justify-center overflow-hidden"
                >
                  <img
                    src="/images/flora-mascot-namaste.png"
                    alt="Flora Pharmacy Mascot Namaskar Greeting"
                    className="w-full h-full object-contain filter drop-shadow-md transform hover:scale-105 transition-transform"
                  />
                  
                  {/* Subtle Inner Lens Vignette */}
                  <div className="absolute inset-0 rounded-full border border-white/60 pointer-events-none" />
                </motion.div>

                {/* Soft Pedestal Shadow */}
                <div className="w-28 sm:w-36 h-2 bg-black/30 rounded-full blur-xs mt-1" />
              </div>

              {/* Warm Indian Namaskar Speech Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 180 }}
                className="w-full max-w-sm bg-gradient-to-b from-white via-slate-50 to-amber-50/60 rounded-3xl p-4 sm:p-5 text-slate-900 shadow-2xl border-2 border-amber-200/80 relative"
              >
                {/* Greeting Header */}
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300/70 text-[11px] font-black uppercase tracking-wider">
                    <span>🙏 Namaste Borivali East!</span>
                  </div>

                  <h3 className="font-heading font-black text-slate-900 text-base sm:text-lg leading-tight mt-1">
                    Flora Pharmacy me Aapka Swagat Hai
                  </h3>

                  <p className="text-[11.5px] sm:text-xs text-slate-600 font-medium leading-relaxed max-w-xs mx-auto">
                    Aapke Chief Pharmacist <strong className="text-emerald-800">Premprakash Sirvi</strong> dwara 100% Genuine Medicines & 30-Minute Fast Delivery.
                  </p>
                </div>

                {/* 3 Quick Trust Guarantees */}
                <div className="grid grid-cols-3 gap-1.5 mt-3 pt-2.5 border-t border-slate-200/80 text-center">
                  <div className="p-1.5 rounded-xl bg-slate-100/90 border border-slate-200/70">
                    <Truck className="w-3.5 h-3.5 text-emerald-700 mx-auto mb-0.5" />
                    <span className="block text-[10px] font-black text-slate-900">30 Mins</span>
                    <span className="text-[8.5px] text-slate-500 font-semibold">Express</span>
                  </div>
                  <div className="p-1.5 rounded-xl bg-slate-100/90 border border-slate-200/70">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 mx-auto mb-0.5" />
                    <span className="block text-[10px] font-black text-slate-900">100% Genuine</span>
                    <span className="text-[8.5px] text-slate-500 font-semibold">Fresh Stock</span>
                  </div>
                  <div className="p-1.5 rounded-xl bg-slate-100/90 border border-slate-200/70">
                    <Clock className="w-3.5 h-3.5 text-emerald-700 mx-auto mb-0.5" />
                    <span className="block text-[10px] font-black text-slate-900">9 AM – 11 PM</span>
                    <span className="text-[8.5px] text-slate-500 font-semibold">Open Daily</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* ============================================================== */}
        {/* SHARED DYNAMIC PROGRESS BAR & STATUS TICKER                    */}
        {/* ============================================================== */}
        <div className="w-64 sm:w-80 mt-5 space-y-2">
          
          {/* Progress Track */}
          <div className="w-full h-2.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 overflow-hidden relative shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-300 to-amber-400 rounded-full relative"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            >
              {/* Shimmer light sweep */}
              <div className="absolute inset-0 bg-white/35 animate-shimmer-sweep" />
            </motion.div>
          </div>

          {/* Progress Percentage & Status */}
          <div className="flex items-center justify-between text-[11px] text-emerald-300 font-mono">
            <span className="font-bold flex items-center gap-1">
              <span>{progress}%</span>
              {progress === 100 && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
            </span>
            <span className="text-[10px] text-emerald-400/90 flex items-center gap-1 font-sans font-semibold">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> Borivali East Counter
            </span>
          </div>

          {/* Live Status Message */}
          <div className="h-5 flex items-center justify-center">
            <p className="text-[11px] text-slate-300/90 font-medium animate-fade-in truncate">
              {statusMessages[statusIdx]}
            </p>
          </div>

        </div>

        {/* Store Location Footer Badge */}
        <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9.5px] text-slate-400">
          <MapPin className="w-3 h-3 text-emerald-400" />
          <span>Shop 7, Samarpan, Next to Magathane Metro, Borivali East</span>
        </div>

      </div>

    </div>
  );
}
