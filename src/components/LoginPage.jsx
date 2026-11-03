import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import { BUSINESS_INFO } from '../data/business';
import { 
  ShieldCheck, 
  Clock, 
  Truck, 
  Sparkles, 
  CheckCircle2, 
  HeartPulse, 
  MessageCircle, 
  ArrowRight,
  KeyRound,
  Lock,
  ChevronRight,
  MapPin,
  Star
} from 'lucide-react';

function GoogleIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export default function LoginPage() {
  const { 
    loginWithGoogle, 
    isGoogleAuthLoading, 
    googleAuthError, 
    enterGuestMode 
  } = useStore();

  return (
    <div className="min-h-screen relative flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-hidden bg-gradient-to-tr from-[#021f14] via-[#043E2B] to-[#065037] selection:bg-[#EED9C4] selection:text-[#043E2B] select-none">
      
      {/* Background Graphic & Texture Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 filter blur-xs scale-105 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: "url('/images/flora-interior-banner.jpg')" }}
      />
      
      {/* Ambient Radial Glow Highlights */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#EED9C4]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-[#10B981]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-[#F5E9D8]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Luxury Glass Card Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.93, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        className="relative z-10 w-full max-w-4xl rounded-3xl sm:rounded-[36px] shadow-[0_25px_80px_rgba(2,35,23,0.6),0_0_40px_rgba(223,192,158,0.25)] border-2 border-[#DFC09E]/70 overflow-hidden grid grid-cols-1 lg:grid-cols-12"
      >
        
        {/* LEFT COLUMN: 3D Mascot Showcase & Brand Authority (Desktop lg:col-span-5) */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#022418] via-[#043E2B] to-[#032d1e] p-7 text-white flex-col justify-between relative overflow-hidden border-r border-[#DFC09E]/30">
          
          {/* Subtle Golden Pattern Background */}
          <div 
            className="absolute inset-0 opacity-10 bg-repeat pointer-events-none"
            style={{ backgroundImage: "radial-gradient(#DFC09E 1px, transparent 1px)", backgroundSize: "22px 22px" }}
          />

          <div className="relative z-10 space-y-4">
            
            {/* Top Pill */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EED9C4]/15 border border-[#DFC09E]/40 text-[#F5E9D8] text-[10.5px] font-black uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Verified Pharmacy</span>
              </div>
              <span className="text-[11px] text-[#EED9C4]/80 font-bold">Borivali East</span>
            </div>

            {/* Brand Logo & Tagline */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#10B981] via-[#059669] to-[#043E2B] flex items-center justify-center p-2.5 shadow-lg shadow-emerald-950/60 border border-[#DFC09E]/40 shrink-0">
                <HeartPulse className="w-full h-full text-[#F5E9D8]" />
              </div>
              <div>
                <h1 className="font-heading font-black text-2xl text-[#FFFDF9] tracking-tight leading-none">
                  Flora Pharmacy
                </h1>
                <p className="text-[#EED9C4] text-xs font-semibold mt-1">
                  Care Today. Healthier Tomorrow.
                </p>
              </div>
            </div>

            {/* 3D Mascot Hero Floating Pedestal */}
            <div className="relative flex flex-col items-center text-center my-4 group">
              
              {/* Soft Golden Aura */}
              <div className="absolute inset-0 max-w-[210px] max-h-[210px] m-auto bg-gradient-to-tr from-[#DFC09E]/30 to-[#10B981]/25 rounded-full blur-2xl pointer-events-none" />

              <div className="relative bg-gradient-to-b from-[#FFFDF9] via-[#FAF4EA] to-[#F5EBE0] rounded-3xl p-4 shadow-2xl border-2 border-[#DFC09E] backdrop-blur-md max-w-[230px] w-full flex flex-col items-center">
                
                {/* Mascot Golden Key Pill */}
                <div className="absolute -top-3 px-3 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F5E2B8] to-[#C5A059] text-[#022418] text-[9.5px] font-black uppercase tracking-wider shadow-md flex items-center gap-1 border border-[#DFC09E]">
                  <KeyRound className="w-3 h-3 text-[#022418]" />
                  <span>Flora Care Buddy</span>
                </div>

                {/* Mascot Floating Image */}
                <motion.img 
                  animate={{
                    y: [0, -6, 0],
                    rotate: [0, 1.2, 0, -1.2, 0]
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  src="/images/flora-mascot-key.png" 
                  alt="Flora Pharmacy Mascot with Key" 
                  className="w-36 h-auto object-contain select-none drop-shadow-md mt-1"
                />

                <div className="text-center mt-1">
                  <p className="font-heading font-black text-[#043E2B] text-xs">
                    Welcome to Flora!
                  </p>
                  <p className="text-[10px] text-[#059669] font-black flex items-center justify-center gap-1">
                    <span>100% Genuine Care</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  </p>
                </div>
              </div>

              {/* Speech Bubble */}
              <div className="mt-3 px-3.5 py-1.5 rounded-xl bg-[#022317]/85 border border-[#DFC09E]/35 backdrop-blur-xs text-[11px] text-[#F5E9D8] font-medium inline-flex items-center gap-1.5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#DFC09E] shrink-0" />
                <span>30-min express medicine delivery at your doorstep!</span>
              </div>
            </div>

            {/* 3 Value Badges */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="p-2 rounded-xl bg-[#022317]/60 border border-[#DFC09E]/25 backdrop-blur-xs">
                <span className="block text-xs font-black text-[#EED9C4]">⚡ 30 Mins</span>
                <span className="text-[9.5px] text-[#F5E9D8]/80 font-medium">Delivery</span>
              </div>
              <div className="p-2 rounded-xl bg-[#022317]/60 border border-[#DFC09E]/25 backdrop-blur-xs">
                <span className="block text-xs font-black text-[#EED9C4]">💯 100%</span>
                <span className="text-[9.5px] text-[#F5E9D8]/80 font-medium">Genuine</span>
              </div>
              <div className="p-2 rounded-xl bg-[#022317]/60 border border-[#DFC09E]/25 backdrop-blur-xs">
                <span className="block text-xs font-black text-[#EED9C4]">🩺 Certified</span>
                <span className="text-[9.5px] text-[#F5E9D8]/80 font-medium">Pharmacist</span>
              </div>
            </div>

          </div>

          {/* Footer Note */}
          <div className="relative z-10 pt-4 mt-2 border-t border-[#DFC09E]/25 flex items-center justify-between text-[11px] text-[#EED9C4]/80">
            <span>Shop 7, Samarpan Tower</span>
            <span className="text-[#EED9C4] font-bold">Western Urban Rd, Borivali</span>
          </div>

        </div>

        {/* RIGHT COLUMN: Ultra-Clean 1-Click Google Sign-In (Desktop lg:col-span-7) */}
        <div className="lg:col-span-7 bg-gradient-to-b from-[#FCFBF7] via-[#FAF5EC] to-[#F3ECE0] p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          
          <div className="space-y-6">
            
            {/* Mobile Header with Mascot */}
            <div className="lg:hidden flex items-center justify-between pb-3 border-b border-[#DFC09E]/40">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#043E2B] flex items-center justify-center p-2 shadow-md border border-[#DFC09E]/40">
                  <HeartPulse className="w-full h-full text-[#F5E9D8]" />
                </div>
                <div>
                  <h2 className="font-heading font-black text-lg text-[#043E2B] leading-none">
                    Flora Pharmacy
                  </h2>
                  <span className="text-[11px] text-[#6D5533] font-semibold">Borivali East • 30m Express</span>
                </div>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-white p-1 border border-[#DFC09E] shadow-2xs shrink-0 flex items-center justify-center">
                <img 
                  src="/images/flora-mascot-key.png" 
                  alt="Flora Mascot" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Clean Section Header */}
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE0D0] text-[#045238] border border-[#DFC09E]/70 text-[11px] font-black uppercase tracking-wider">
                <Lock className="w-3 h-3 text-[#059669]" />
                <span>Secure Patient Login</span>
              </div>
              
              <h2 className="font-heading font-black text-[#043E2B] text-2xl sm:text-3xl tracking-tight leading-tight">
                Welcome to Flora Pharmacy
              </h2>

              <p className="text-xs sm:text-sm text-[#6D5533] leading-relaxed max-w-md mx-auto lg:mx-0 font-medium">
                Sign in with your Google account to access your prescription records, past orders, and instant 30-min express checkout.
              </p>
            </div>

            {/* Error Notification if Google Auth Fails */}
            {googleAuthError && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-2 shadow-xs">
                <span className="shrink-0 font-bold text-sm">⚠️</span>
                <p className="font-medium leading-relaxed">{googleAuthError}</p>
              </div>
            )}

            {/* HERO 1-CLICK GOOGLE SIGN-IN BOX */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white/95 border-2 border-[#DFC09E] shadow-lg shadow-[#022418]/5 space-y-4">
              
              <div className="text-center space-y-1">
                <span className="text-[11px] font-black text-[#059669] uppercase tracking-wider block">
                  ⚡ 1-Click Fast Access
                </span>
                <p className="text-xs text-[#8C7558] font-medium">
                  No password to remember • No OTP delay
                </p>
              </div>

              {/* The Google Sign-In Action Button */}
              <button
                type="button"
                disabled={isGoogleAuthLoading}
                onClick={loginWithGoogle}
                className="w-full py-4 px-5 rounded-2xl bg-[#FFFDF9] hover:bg-[#FAF4EA] active:bg-[#F3ECE0] text-[#043E2B] font-heading font-black text-sm sm:text-base border-2 border-[#DFC09E] hover:border-[#059669] shadow-md hover:shadow-xl flex items-center justify-center gap-3.5 transition-all duration-200 active:scale-98 disabled:opacity-60 cursor-pointer group"
              >
                {isGoogleAuthLoading ? (
                  <div className="w-5 h-5 border-2 border-[#DFC09E] border-t-[#065F46] rounded-full animate-spin shrink-0" />
                ) : (
                  <GoogleIcon />
                )}
                <span className="group-hover:text-[#045238] transition-colors">
                  {isGoogleAuthLoading ? "Signing In with Google..." : "Continue with Google"}
                </span>
                <ArrowRight className="w-4 h-4 text-[#8C7558] group-hover:text-[#045238] group-hover:translate-x-0.5 transition-all ml-auto shrink-0" />
              </button>

              {/* Security Pill */}
              <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-[#8C7558]">
                <ShieldCheck className="w-4 h-4 text-[#059669]" />
                <span className="font-medium">Google Verified Security • 256-Bit SSL Protected</span>
              </div>

            </div>

            {/* EXPLORE AS GUEST ALTERNATIVE */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={enterGuestMode}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#EAE0D0]/80 hover:bg-[#E2D5C3] text-[#043E2B] font-heading font-black text-xs sm:text-sm border border-[#DFC09E] transition-all cursor-pointer shadow-2xs hover:shadow-sm active:scale-98"
              >
                <span>Or Explore Store as Guest</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#045238]" />
              </button>
              <p className="text-[10.5px] text-[#9C8A74] mt-1.5 font-medium">
                You can browse medicines and add items to cart without signing in
              </p>
            </div>

            {/* Store Location & Fast Delivery Guarantee Strip */}
            <div className="p-3.5 rounded-2xl bg-white/70 border border-[#DFC09E]/60 flex items-center justify-between text-xs text-[#6D5533]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#059669] shrink-0" />
                <span className="text-[11px] font-semibold">
                  Shop 7, Samarpan, Western Urban Rd, Borivali East
                </span>
              </div>
              <span className="text-[10px] font-black text-[#045238] bg-[#EAE0D0] px-2 py-0.5 rounded-md shrink-0">
                Open 9 AM – 11 PM
              </span>
            </div>

          </div>

          {/* Bottom Help Desk & WhatsApp */}
          <div className="pt-4 mt-4 border-t border-[#DFC09E]/40 flex items-center justify-between text-xs text-[#8C7558]">
            <span className="text-[11px] font-medium">
              Need assistance?
            </span>
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                "Hello Flora Pharmacy, I have a question regarding login."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-[#059669] hover:text-[#043E2B] transition"
            >
              <MessageCircle className="w-3.5 h-3.5 text-wa" />
              <span>WhatsApp Counter Desk</span>
            </a>
          </div>

        </div>

      </motion.div>

    </div>
  );
}
