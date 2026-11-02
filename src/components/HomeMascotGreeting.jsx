import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Sparkles, 
  ShoppingBag, 
  MessageCircle, 
  Clock, 
  Truck, 
  ShieldCheck, 
  KeyRound, 
  ArrowRight,
  HeartPulse
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';

export default function HomeMascotGreeting() {
  const [isVisible, setIsVisible] = useState(() => {
    try {
      return sessionStorage.getItem('flora_mascot_intro_seen') !== 'true';
    } catch (e) {
      return true;
    }
  });
  const [hasStoppedInCenter, setHasStoppedInCenter] = useState(false);
  const [isMinimized, setIsMinimized] = useState(() => {
    try {
      return sessionStorage.getItem('flora_mascot_intro_seen') === 'true';
    } catch (e) {
      return false;
    }
  });

  const handleDismiss = () => {
    setIsVisible(false);
    setIsMinimized(true);
    try {
      sessionStorage.setItem('flora_mascot_intro_seen', 'true');
    } catch (e) {}
  };

  const handleReplay = () => {
    setIsMinimized(false);
    setHasStoppedInCenter(false);
    setIsVisible(true);
  };

  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    "Hello Flora Pharmacy! I saw your welcome mascot on the website. I want to enquire about medicines / delivery."
  )}`;

  return (
    <>
      {/* 1. CENTER SCREEN ANIMATION OVERLAY */}
      <AnimatePresence>
        {isVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto pointer-events-auto no-scrollbar">
            
            {/* Ambient Backdrop with soft blur and champagne tint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={handleDismiss}
              className="fixed inset-0 bg-[#022317]/70 backdrop-blur-sm"
            />

            {/* Ambient Radial Lights behind the Mascot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-[28rem] h-72 sm:h-[28rem] bg-[#DFC09E]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 sm:w-80 h-60 sm:h-80 bg-[#10B981]/25 rounded-full blur-3xl pointer-events-none" />

            {/* MASCOT SLIDING FROM FAR LEFT TO CENTER & STOPPING IN MIDDLE */}
            <motion.div
              initial={{ x: '-100vw', rotate: -10, scale: 0.85, opacity: 0 }}
              animate={{ x: 0, rotate: 0, scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0, y: 100, transition: { duration: 0.4 } }}
              transition={{
                type: 'spring',
                stiffness: 110,
                damping: 17,
                mass: 0.9
              }}
              onAnimationComplete={() => {
                setHasStoppedInCenter(true);
              }}
              className="relative z-10 flex flex-col items-center max-w-lg w-full my-auto py-4"
            >
              
              {/* Mascot Floating Box with Champagne Gold Border */}
              <div className="relative flex flex-col items-center">
                
                {/* Floating Champagne Glow Aura */}
                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.6, 0.9, 0.6]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 m-auto w-52 sm:w-64 h-52 sm:h-64 bg-gradient-to-tr from-[#DFC09E]/40 via-[#10B981]/30 to-[#F5E9D8]/30 rounded-full blur-2xl pointer-events-none"
                />

                {/* Golden Key Sparkles Indicator */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={hasStoppedInCenter ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="absolute -top-3 z-20 px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F5E2B8] to-[#C5A059] text-[#022418] text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5 border border-[#DFC09E]"
                >
                  <KeyRound className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#022418]" />
                  <span>Flora Buddy • 30m Express</span>
                </motion.div>

                {/* 3D Mascot Character holding Key & Waving */}
                <motion.div
                  animate={hasStoppedInCenter ? {
                    y: [0, -6, 0],
                    rotate: [0, 1.5, 0, -1.5, 0]
                  } : {}}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F5EBE0] p-3 sm:p-5 rounded-3xl sm:rounded-[36px] border-2 sm:border-3 border-[#DFC09E] shadow-[0_20px_60px_rgba(2,35,23,0.5)] flex flex-col items-center"
                >
                  <img
                    src="/images/flora-mascot-namaste.png"
                    alt="Flora Pharmacy Pharmacist Mascot"
                    className="w-32 sm:w-48 md:w-56 h-auto object-contain select-none drop-shadow-xl"
                  />
                  
                  {/* Mascot Stand base reflection */}
                  <div className="w-28 sm:w-36 h-2.5 sm:h-3 bg-[#DFC09E]/40 rounded-full blur-xs mt-1" />
                </motion.div>

              </div>

              {/* WELCOME SPEECH CARD (APPEARS ONCE STOPPED IN CENTER) */}
              <AnimatePresence>
                {hasStoppedInCenter && (
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.15 }}
                    className="w-full mt-4 bg-gradient-to-b from-[#FCFBF7] via-[#FAF5EC] to-[#F3ECE0] rounded-3xl p-5 sm:p-6 border-2 border-[#DFC09E] shadow-2xl relative text-center"
                  >
                    {/* Close Button in corner */}
                    <button
                      onClick={handleDismiss}
                      className="absolute top-3.5 right-3.5 p-1.5 rounded-full text-[#6D5533] hover:text-[#043E2B] hover:bg-[#EAE0D0] transition cursor-pointer"
                      title="Skip / Close"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    {/* Headline */}
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#045238] bg-[#EAE0D0] px-3 py-0.5 rounded-full border border-[#DFC09E]/70 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>Namaste Borivali!</span>
                      </div>
                      
                      <h3 className="font-heading font-black text-[#043E2B] text-xl sm:text-2xl tracking-tight">
                        Welcome to Flora Pharmacy
                      </h3>
                      
                      <p className="text-xs sm:text-sm text-[#6D5533] font-medium max-w-sm mx-auto leading-relaxed">
                        I am your official counter buddy! We deliver 100% genuine medicines, baby care & health devices in <strong>30 minutes</strong> across Borivali East.
                      </p>
                    </div>

                    {/* 3 Trust Badges */}
                    <div className="grid grid-cols-3 gap-2 my-4 text-center">
                      <div className="p-2 rounded-xl bg-white/90 border border-[#DFC09E]/60 shadow-2xs">
                        <Truck className="w-4 h-4 text-[#065F46] mx-auto mb-0.5" />
                        <span className="block text-[11px] font-black text-[#043E2B]">30 Mins</span>
                        <span className="text-[9px] text-[#8C7558]">Express Counter</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white/90 border border-[#DFC09E]/60 shadow-2xs">
                        <ShieldCheck className="w-4 h-4 text-[#065F46] mx-auto mb-0.5" />
                        <span className="block text-[11px] font-black text-[#043E2B]">100% Genuine</span>
                        <span className="text-[9px] text-[#8C7558]">Batch Expiry Guarantee</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white/90 border border-[#DFC09E]/60 shadow-2xs">
                        <Clock className="w-4 h-4 text-[#065F46] mx-auto mb-0.5" />
                        <span className="block text-[11px] font-black text-[#043E2B]">9 AM – 11 PM</span>
                        <span className="text-[9px] text-[#8C7558]">Premprakash Sirvi</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={handleDismiss}
                        className="shimmer-button flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#045238] via-[#065F46] to-[#0B6E4A] hover:from-[#033F2B] hover:to-[#05573C] text-white font-heading font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/25 border border-[#DFC09E]/50 transition cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4 text-[#EED9C4]" />
                        <span>Explore Store Now</span>
                        <ArrowRight className="w-4 h-4 text-[#EED9C4]" />
                      </button>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3 px-3.5 rounded-xl bg-wa hover:bg-wa-dark text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </a>
                    </div>

                    <p className="text-[10px] text-[#8C7558] font-medium mt-2.5">
                      💡 Tap anywhere outside or click 'Explore Store' to start browsing.
                    </p>

                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

      {/* 2. MINIMIZED FLOATING MASCOT BUDDY (BOTTOM-LEFT / BOTTOM-RIGHT HELPER) */}
      <AnimatePresence>
        {isMinimized && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed bottom-20 left-3 sm:bottom-24 sm:left-6 z-40"
          >
            <motion.button
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReplay}
              className="group relative flex items-center gap-2.5 p-2 bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F5EBE0] border-2 border-[#DFC09E] rounded-full shadow-xl shadow-emerald-950/20 cursor-pointer"
              title="Click to replay Mascot Intro & Store Overview"
            >
              {/* Mascot Mini Image */}
              <div className="w-11 h-11 rounded-full bg-white p-0.5 border border-[#DFC09E] shadow-2xs overflow-hidden flex items-center justify-center shrink-0">
                <img
                  src="/images/flora-mascot-namaste.png"
                  alt="Flora Mascot"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Text Pill */}
              <div className="hidden sm:flex flex-col text-left pr-2 leading-none">
                <span className="text-[10px] font-black text-[#043E2B] flex items-center gap-1">
                  <span>Flora Buddy</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                </span>
                <span className="text-[9px] text-[#8C7558] font-bold mt-0.5">
                  🔑 30-Min Delivery
                </span>
              </div>

              {/* Pulse Ring */}
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white animate-pulse" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
