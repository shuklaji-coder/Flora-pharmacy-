import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Truck, 
  ArrowRight,
  Activity,
  CheckCircle2
} from 'lucide-react';

export default function LoadingScreen({ onFinish }) {
  // Phase state: 'signal' (0s - 1.4s) -> 'mascot' (1.4s - 4.2s)
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
    // Transition from Signal to Mascot at 1.4s
    const phaseTimer = setTimeout(() => {
      setPhase('mascot');
    }, 1400);

    // Smooth progress counter from 0 to 100%
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
      className={`fixed inset-0 z-50 flex flex-col justify-between items-center bg-gradient-to-br from-[#02180E] via-[#042E1D] to-[#01140B] text-white overflow-hidden p-4 sm:p-6 transition-all duration-700 ease-out select-none ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[32rem] sm:w-[44rem] h-[32rem] sm:h-[44rem] rounded-full bg-emerald-500/20 blur-[130px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-400/15 blur-[110px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-teal-400/15 blur-[90px] pointer-events-none" />

      {/* Floating subtle medical particles */}
      <div className="absolute top-14 left-10 w-7 h-7 text-emerald-400/30 animate-particle-1 pointer-events-none">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
        </svg>
      </div>
      <div className="absolute bottom-20 left-12 w-8 h-8 text-amber-300/30 animate-particle-2 pointer-events-none">
        <Sparkles className="w-full h-full fill-current" />
      </div>
      <div className="absolute top-20 right-12 w-7 h-7 text-teal-300/30 animate-particle-3 pointer-events-none">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
        </svg>
      </div>

      {/* TOP HEADER: Store Pill & Skip Button */}
      <header className="relative z-30 w-full max-w-4xl flex items-center justify-between shrink-0 pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-emerald-200 shadow-md">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold text-white tracking-wide">Flora Pharmacy</span>
          <span className="text-emerald-300/70">• Borivali East</span>
        </div>

        <button
          type="button"
          onClick={handleSkip}
          className="group flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-100 hover:text-white transition border border-white/20 backdrop-blur-md cursor-pointer active:scale-95 shadow-md"
        >
          <span>Skip</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </header>

      {/* CENTER STAGE: Dynamic Transition from Signal to FULL-SCREEN HERO MASCOT */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-2xl my-auto text-center px-2">
        <AnimatePresence mode="wait">
          
          {/* ============================================================== */}
          {/* PHASE 1: FLORA PHARMACY RADAR SIGNAL & BEACON (0.0s - 1.4s)   */}
          {/* ============================================================== */}
          {phase === 'signal' && (
            <motion.div
              key="phase-signal"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92, y: -25, transition: { duration: 0.35 } }}
              className="flex flex-col items-center justify-center my-auto"
            >
              {/* Radar Beacon with Concentric Ripple Rings */}
              <div className="relative mb-6">
                <span className="absolute -inset-6 rounded-full bg-emerald-400/25 animate-ping opacity-40 pointer-events-none" />
                <span className="absolute -inset-14 rounded-full bg-emerald-500/20 blur-2xl pointer-events-none" />
                <span className="absolute -inset-3 rounded-3xl border-2 border-emerald-400/40 animate-pulse pointer-events-none" />

                {/* Glowing Medical Cross Shield */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-emerald-500 via-flora-700 to-emerald-950 p-4 shadow-[0_0_60px_rgba(16,185,129,0.55)] border-2 border-emerald-300/50 flex items-center justify-center animate-heartbeat">
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
              <div className="w-64 sm:w-80 h-9 sm:h-10 mb-3 flex items-center justify-center">
                <svg
                  viewBox="0 0 300 50"
                  className="w-full h-full stroke-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.85)]"
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
              <div className="space-y-1.5">
                <div className="flex items-center justify-center gap-2 font-heading tracking-tight">
                  <span className="text-3xl sm:text-5xl font-black text-[#FF4D30] drop-shadow-[0_2px_14px_rgba(255,77,48,0.5)]">
                    FLORA
                  </span>
                  <span className="text-3xl sm:text-5xl font-black text-emerald-400 drop-shadow-[0_2px_14px_rgba(52,211,153,0.5)]">
                    PHARMACY
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-emerald-200/90 tracking-wide">
                  फ्लोर फार्मेसी • Borivali East, Mumbai
                </p>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-xs font-bold text-emerald-300 mt-1">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  <span>Activating Store Counter Signal...</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* ============================================================== */}
          {/* PHASE 2: FULL-SCREEN HERO MASCOT WITH NAMASKAR 🙏 (1.4s - 4.2s)*/}
          {/* ============================================================== */}
          {phase === 'mascot' && (
            <motion.div
              key="phase-mascot"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 14,
                mass: 0.9
              }}
              className="flex flex-col items-center justify-center w-full h-full max-h-[72vh]"
            >
              {/* Golden Pill Banner at top of Mascot */}
              <motion.div
                initial={{ opacity: 0, y: -15, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.15, type: 'spring' }}
                className="z-20 px-4 py-1 mb-2.5 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 text-xs sm:text-sm font-black uppercase tracking-wider shadow-xl flex items-center gap-2 border-2 border-amber-300/80"
              >
                <Sparkles className="w-4 h-4 fill-current text-slate-950" />
                <span>🙏 Namaste Borivali East!</span>
              </motion.div>

              {/* HUGE HERO 3D MASCOT CHARACTER (DOMINATES FULL SCREEN) */}
              <div className="relative flex flex-col items-center justify-center my-auto">
                
                {/* Massive Radiant Glow Halo */}
                <motion.div
                  animate={{
                    scale: [1, 1.12, 1],
                    opacity: [0.55, 0.9, 0.55]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 m-auto w-72 sm:w-[26rem] h-72 sm:h-[26rem] bg-gradient-to-tr from-amber-400/40 via-emerald-400/45 to-teal-300/35 rounded-full blur-3xl pointer-events-none"
                />

                {/* Hero Mascot Framed Luxury Podium */}
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 0.8, 0, -0.8, 0]
                  }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative rounded-[32px] sm:rounded-[40px] bg-gradient-to-b from-white via-emerald-50/90 to-amber-50/80 p-3 sm:p-5 border-3 border-amber-300/90 shadow-[0_25px_80px_rgba(0,0,0,0.6)] flex items-center justify-center overflow-hidden"
                >
                  {/* FULL SCREEN HERO HEIGHT IMAGE */}
                  <img
                    src="/images/flora-mascot-namaste.png"
                    alt="Flora Pharmacy Pharmacist Mascot Namaskar"
                    className="h-[38vh] sm:h-[46vh] md:h-[50vh] max-h-[440px] w-auto object-contain select-none filter drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
                  />
                </motion.div>

                {/* Grounding Pedestal Shadow */}
                <div className="w-48 sm:w-64 h-3 bg-black/40 rounded-full blur-xs mt-2" />
              </div>

              {/* Headline & Welcoming Subtext */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="mt-2.5 space-y-1"
              >
                <h3 className="font-heading font-black text-white text-lg sm:text-2xl drop-shadow-md">
                  Flora Pharmacy Me Aapka Swagat Hai!
                </h3>
                <p className="text-xs sm:text-sm text-emerald-200/90 font-medium max-w-md mx-auto">
                  Chief Pharmacist <strong className="text-amber-300 font-bold">Premprakash Sirvi</strong> • 100% Genuine Medicines in 30 Mins
                </p>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* BOTTOM FOOTER: Dynamic Progress Bar, Status Ticker & Location */}
      <footer className="relative z-30 w-full max-w-md flex flex-col items-center space-y-2 shrink-0">
        
        {/* Progress Track */}
        <div className="w-full h-2.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 overflow-hidden relative shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-300 to-amber-400 rounded-full relative"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          >
            {/* Shimmer light sweep */}
            <div className="absolute inset-0 bg-white/40 animate-shimmer-sweep" />
          </motion.div>
        </div>

        {/* Progress Percentage & Status */}
        <div className="w-full flex items-center justify-between text-xs text-emerald-300 font-mono">
          <span className="font-bold flex items-center gap-1.5">
            <span>{progress}%</span>
            {progress === 100 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          </span>
          <span className="text-[11px] text-emerald-300/90 font-sans font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Genuine Certified
          </span>
        </div>

        {/* Live Status Message Ticker */}
        <div className="h-5 flex items-center justify-center">
          <p className="text-xs text-slate-200 font-medium animate-fade-in truncate">
            {statusMessages[statusIdx]}
          </p>
        </div>

        {/* Store Location Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-400">
          <MapPin className="w-3 h-3 text-emerald-400" />
          <span>Shop 7, Samarpan, Next to Magathane Metro, Borivali East</span>
        </div>

      </footer>
    </div>
  );
}
