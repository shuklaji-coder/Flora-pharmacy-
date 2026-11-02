import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { useStore } from '../context/StoreContext';
import { BUSINESS_INFO } from '../data/business';
import { 
  User, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Truck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  HeartPulse, 
  MessageCircle, 
  KeyRound, 
  UserPlus, 
  LogIn 
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
    loginCustomer, 
    isGoogleAuthLoading, 
    googleAuthError, 
    setGoogleAuthError,
    enterGuestMode 
  } = useStore();

  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [mascotKey, setMascotKey] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [locality, setLocality] = useState("Samarpan Tower, Borivali East");
  const [errorMsg, setErrorMsg] = useState("");

  const borivaliLocalities = [
    "Samarpan Tower, Borivali East",
    "Magathane Metro Station Area",
    "Rivali Park, Western Urban Rd",
    "Nancy Colony, Borivali East",
    "Carter Road 1 to 9",
    "Ashokvan & Kulupwadi",
    "Kandivali East Border"
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Kripya apna poora naam darj karein.");
      return;
    }
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setErrorMsg("Kripya 10-digit valid mobile number darj karein.");
      return;
    }

    const fullAddress = address.trim() 
      ? `${address.trim()}, ${locality}` 
      : locality;

    loginCustomer({
      name: name.trim(),
      phone: cleanPhone.slice(-10),
      address: fullAddress,
      locality,
      provider: "phone",
      registeredMode: authMode
    });
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-hidden bg-gradient-to-tr from-[#022317] via-[#043E2B] to-[#085239] selection:bg-[#EED9C4] selection:text-[#043E2B]">
      
      {/* Background Graphic & Texture Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 filter blur-xs scale-105 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: "url('/images/flora-interior-banner.jpg')" }}
      />
      
      {/* Ambient Champagne & Emerald Radial Glow Highlights */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#EED9C4]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-[#10B981]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] bg-[#F5E9D8]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Champagne & Emerald Glass Box */}
      <div className="relative z-10 w-full max-w-4xl rounded-3xl sm:rounded-[36px] shadow-[0_25px_80px_rgba(2,35,23,0.55),0_0_35px_rgba(223,192,158,0.2)] border-2 border-[#DFC09E]/70 overflow-hidden grid grid-cols-1 lg:grid-cols-12 animate-fade-in-up">
        
        {/* Left Column: Royal Emerald Gradient with Champagne Accents & Mascot (Desktop lg:col-span-5) */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#033323] via-[#064E36] to-[#022418] p-6 sm:p-7 text-white flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-[#DFC09E]/30">
          
          {/* Subtle Golden Pattern */}
          <div 
            className="absolute inset-0 opacity-10 bg-repeat pointer-events-none"
            style={{ backgroundImage: "radial-gradient(#DFC09E 1px, transparent 1px)", backgroundSize: "22px 22px" }}
          />

          <div className="relative z-10 space-y-4">
            
            {/* Header Tag with Champagne Sheen */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EED9C4]/15 border border-[#DFC09E]/40 text-[#F5E9D8] text-[11px] font-black uppercase tracking-wider shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#EED9C4] animate-pulse" />
                <span>Patient Gateway</span>
              </div>
              <span className="text-[11px] text-[#EED9C4]/80 font-bold tracking-wide">Borivali East</span>
            </div>

            {/* Brand Title */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#10B981] via-[#059669] to-[#043E2B] flex items-center justify-center p-2.5 shadow-lg shadow-emerald-950/60 border border-[#DFC09E]/40 shrink-0">
                <HeartPulse className="w-full h-full text-[#F5E9D8]" />
              </div>
              <div>
                <h1 className="font-heading font-black text-xl text-[#FFFDF9] tracking-tight leading-none">
                  Flora Pharmacy
                </h1>
                <p className="text-[#EED9C4] text-xs font-semibold mt-1">
                  Care Today. Healthier Tomorrow.
                </p>
              </div>
            </div>

            {/* 3D MASCOT HERO CARD ON CHAMPAGNE SILK PEDESTAL - ANIMATED FROM LEFT TO RIGHT */}
            <motion.div 
              key={`mascot-${authMode}-${mascotKey}`}
              initial={{ x: -280, opacity: 0, scale: 0.82, rotate: -12 }}
              animate={{ x: 0, opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 75,
                damping: 14,
                mass: 1.1,
                delay: 0.2
              }}
              className="relative flex flex-col items-center text-center my-3 group"
            >
              {/* Soft circular champagne aura */}
              <motion.div 
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 max-w-[220px] max-h-[220px] m-auto bg-gradient-to-tr from-[#DFC09E]/30 to-[#10B981]/25 rounded-full blur-2xl pointer-events-none" 
              />
              
              {/* Champagne Silk Mascot Card */}
              <motion.div 
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setMascotKey(k => k + 1)}
                title="Click Mascot to replay animation"
                className="relative bg-gradient-to-b from-[#FFFDF9] via-[#FAF4EA] to-[#F5EBE0] rounded-3xl p-4 sm:p-5 shadow-2xl border-2 border-[#DFC09E] backdrop-blur-md max-w-[240px] w-full flex flex-col items-center cursor-pointer select-none"
              >
                
                {/* Champagne Gold Key Badge */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6, type: "spring" }}
                  className="absolute -top-3 px-3 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F5E2B8] to-[#C5A059] text-[#022418] text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1 border border-[#DFC09E]"
                >
                  <KeyRound className="w-3 h-3 text-[#022418]" />
                  <span>Your Key to Health</span>
                </motion.div>

                {/* 3D Doctor/Pharmacist Mascot with Golden Key - Idle Floating Animation */}
                <motion.img 
                  animate={{
                    y: [0, -6, 0],
                    rotate: [0, 1.5, 0, -1.5, 0]
                  }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  src="/images/flora-mascot-key.png" 
                  alt="Flora Pharmacy Pharmacist Mascot with Golden Key" 
                  className="w-36 sm:w-40 h-auto object-contain select-none drop-shadow-md"
                  loading="eager"
                />

                <div className="mt-1 text-center">
                  <p className="font-heading font-black text-[#043E2B] text-xs sm:text-sm">
                    {authMode === 'login' ? "Welcome Back!" : "Join Flora Family!"}
                  </p>
                  <p className="text-[10px] text-[#059669] font-black flex items-center justify-center gap-1">
                    <span>Official Flora Care Buddy</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  </p>
                </div>
              </motion.div>

              {/* Speech bubble with Champagne border */}
              <motion.div 
                initial={{ opacity: 0, y: 15, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.75, type: "spring" }}
                className="mt-3 px-3 py-1.5 rounded-xl bg-[#022317]/85 border border-[#DFC09E]/35 backdrop-blur-xs text-[11px] text-[#F5E9D8] font-medium inline-flex items-center gap-1.5 text-center shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#DFC09E] shrink-0" />
                <span>
                  {authMode === 'login' 
                    ? "Unlock your saved prescriptions & fast orders!" 
                    : "Get 30-min delivery on your first order!"}
                </span>
              </motion.div>
            </motion.div>

            {/* 3 Value Points with Champagne borders */}
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

          {/* Pharmacist Signature Note */}
          <div className="relative z-10 pt-4 mt-3 border-t border-[#DFC09E]/25 flex items-center justify-between text-[11px] text-[#EED9C4]/80">
            <span>Shop 7, Samarpan Tower</span>
            <span className="text-[#EED9C4] font-bold">Western Urban Rd, Borivali</span>
          </div>

        </div>

        {/* Right Column: Warm Champagne Silk with Emerald Green Actions (Desktop lg:col-span-7) */}
        <div className="lg:col-span-7 bg-gradient-to-b from-[#FCFBF7] via-[#FAF5EC] to-[#F3ECE0] p-5 sm:p-7 lg:p-9 flex flex-col justify-between space-y-5">
          
          <div>
            
            {/* Mobile Brand & Mascot Welcome Strip */}
            <div className="lg:hidden mb-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#10B981] to-[#043E2B] flex items-center justify-center p-1.5 shadow-md border border-[#DFC09E]/40">
                    <HeartPulse className="w-full h-full text-[#F5E9D8]" />
                  </div>
                  <div>
                    <h2 className="font-heading font-black text-base text-[#043E2B] leading-none">
                      Flora Pharmacy
                    </h2>
                    <span className="text-[10px] text-[#6D5533] font-semibold">Borivali East • 30-Min Delivery</span>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase text-[#045238] bg-[#EAE0D0] px-2 py-0.5 rounded-full border border-[#DFC09E]">
                  ⚡ 30m Express
                </span>
              </div>

              <motion.div 
                key={`mobile-mascot-${authMode}-${mascotKey}`}
                initial={{ x: -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 85, damping: 14, delay: 0.15 }}
                onClick={() => setMascotKey(k => k + 1)}
                className="flex items-center gap-3 p-2.5 bg-gradient-to-r from-[#F5EBE0] via-[#FAF4EA] to-[#F5EBE0] rounded-2xl border-2 border-[#DFC09E]/60 shadow-2xs overflow-hidden cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-white p-1 border border-[#DFC09E] shadow-2xs shrink-0 flex items-center justify-center">
                  <img 
                    src="/images/flora-mascot-key.png" 
                    alt="Flora Mascot with Key" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-[#043E2B]">
                      {authMode === 'login' ? "Welcome Back!" : "New Patient Registration"}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#DFC09E]/50 text-[#043E2B] font-black">
                      🔑 Flora Buddy
                    </span>
                  </div>
                  <p className="text-[10.5px] text-[#6D5533] truncate mt-0.5">
                    {authMode === 'login' 
                      ? "Sign in for 30-min doorstep medicine delivery" 
                      : "Register to get verified medicine batches"}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* TAB SWITCHER: LOGIN vs SIGN UP (EMERALD & CHAMPAGNE) */}
            <div className="bg-[#EFE5D8] p-1.5 rounded-2xl flex items-center mb-5 border border-[#DFC09E]/60 shadow-inner">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setErrorMsg("");
                  if (setGoogleAuthError) setGoogleAuthError("");
                }}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-heading font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  authMode === 'login'
                    ? 'bg-gradient-to-r from-[#045238] to-[#066144] text-[#FAF5EC] shadow-md shadow-emerald-950/20 border border-[#047857]'
                    : 'text-[#6D5533] hover:text-[#043E2B] hover:bg-[#FAF5EC]/70'
                }`}
              >
                <LogIn className={`w-4 h-4 ${authMode === 'login' ? 'text-[#EED9C4]' : 'text-[#065F46]'}`} />
                <span>Sign In (Login)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthMode('signup');
                  setErrorMsg("");
                  if (setGoogleAuthError) setGoogleAuthError("");
                }}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-heading font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  authMode === 'signup'
                    ? 'bg-gradient-to-r from-[#045238] to-[#066144] text-[#FAF5EC] shadow-md shadow-emerald-950/20 border border-[#047857]'
                    : 'text-[#6D5533] hover:text-[#043E2B] hover:bg-[#FAF5EC]/70'
                }`}
              >
                <UserPlus className={`w-4 h-4 ${authMode === 'signup' ? 'text-[#EED9C4]' : 'text-[#065F46]'}`} />
                <span>Create Account (Sign Up)</span>
              </button>
            </div>

            {/* Dynamic Header based on active tab */}
            <div className="space-y-1 mb-5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-[#045238] bg-[#EAE0D0] px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-[#DFC09E]/70">
                  {authMode === 'login' ? "🔑 Registered Access" : "✨ New Patient"}
                </span>
                <span className="text-xs font-bold text-[#9C8A74]">
                  Flora Pharmacy 400066
                </span>
              </div>
              <h2 className="font-heading font-black text-[#043E2B] text-xl sm:text-2xl tracking-tight mt-1">
                {authMode === 'login' ? "Sign In to Your Account" : "Register as New Customer"}
              </h2>
              <p className="text-xs text-[#6D5533] font-medium">
                {authMode === 'login'
                  ? "Access your past orders, active prescriptions & 30-min express checkout."
                  : "Join Flora Pharmacy Borivali East to unlock express delivery and discounts."}
              </p>
            </div>

            {/* Error notifications */}
            {(googleAuthError || errorMsg) && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-2 mb-4 animate-shake">
                <span className="shrink-0 font-bold text-base leading-none">⚠️</span>
                <p className="font-medium leading-relaxed">{googleAuthError || errorMsg}</p>
              </div>
            )}

            {/* 1. GOOGLE 1-CLICK INSTANT LOGIN/SIGNUP (PRIMARY) */}
            <div className="space-y-2">
              <button
                type="button"
                disabled={isGoogleAuthLoading}
                onClick={loginWithGoogle}
                className="w-full py-3.5 px-5 rounded-2xl bg-[#FFFDF9] hover:bg-[#FAF4EA] text-[#043E2B] font-heading font-black text-xs sm:text-sm border-2 border-[#DFC09E] hover:border-[#C5A059] shadow-sm flex items-center justify-center gap-3 transition-all active:scale-98 disabled:opacity-60 cursor-pointer group"
              >
                {isGoogleAuthLoading ? (
                  <div className="w-5 h-5 border-2 border-[#DFC09E] border-t-[#065F46] rounded-full animate-spin" />
                ) : (
                  <GoogleIcon />
                )}
                <span>
                  {isGoogleAuthLoading 
                    ? "Connecting to Google..." 
                    : authMode === 'login' 
                      ? "Continue with Google (1-Click Login)" 
                      : "Sign Up with Google (Instant)"}
                </span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#9C8A74] font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Instant 1-Click with your Google account • No password required</span>
              </div>
            </div>

            {/* OR DIVIDER WITH CHAMPAGNE ACCENT */}
            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-[#DFC09E]/60 w-full" />
              <span className="bg-[#FAF5EC] px-3 text-[10px] font-black text-[#8C7558] uppercase tracking-widest relative shrink-0">
                {authMode === 'login' ? "Or Sign In with Phone" : "Or Register with Phone"}
              </span>
            </div>

            {/* 2. FORM (LOGIN / SIGN UP) */}
            <form onSubmit={handleFormSubmit} className="space-y-3">
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#043E2B] block">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#065F46] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errorMsg) setErrorMsg("");
                    }}
                    placeholder="e.g. Rajesh K. Sharma"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border-2 border-[#E5D7C6] focus:border-[#059669] focus:outline-none focus:ring-2 focus:ring-[#059669]/20 bg-white/95 text-[#043E2B] placeholder:text-[#9C8A74] font-medium transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#043E2B] block">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 flex items-center gap-1 text-xs font-black text-[#065F46] pointer-events-none">
                    <Phone className="w-3.5 h-3.5 text-[#065F46]" />
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errorMsg) setErrorMsg("");
                    }}
                    placeholder="98200XXXXX"
                    className="w-full pl-16 pr-3 py-2 text-xs sm:text-sm rounded-xl border-2 border-[#E5D7C6] focus:border-[#059669] focus:outline-none focus:ring-2 focus:ring-[#059669]/20 bg-white/95 text-[#043E2B] placeholder:text-[#9C8A74] font-medium tracking-wide transition"
                  />
                </div>
              </div>

              {/* Additional Sign Up fields */}
              {authMode === 'signup' && (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#043E2B] block">
                      Borivali Delivery Locality <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#065F46] absolute left-3 top-1/2 -translate-y-1/2" />
                      <select
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border-2 border-[#E5D7C6] focus:border-[#059669] focus:outline-none focus:ring-2 focus:ring-[#059669]/20 bg-white/95 text-[#043E2B] font-medium appearance-none transition"
                      >
                        {borivaliLocalities.map((loc) => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#043E2B] block flex items-center justify-between">
                      <span>Flat No. / Building / Landmark</span>
                      <span className="text-[10px] text-[#9C8A74] font-normal">Optional</span>
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Flat 402, B-Wing, Opp Western Urban Rd"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border-2 border-[#E5D7C6] focus:border-[#059669] focus:outline-none focus:ring-2 focus:ring-[#059669]/20 bg-white/95 text-[#043E2B] placeholder:text-[#9C8A74] font-medium transition"
                    />
                  </div>
                </>
              )}

              {/* Login Address field (optional) */}
              {authMode === 'login' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#043E2B] block flex items-center justify-between">
                    <span>Delivery Address / Landmark</span>
                    <span className="text-[10px] text-[#9C8A74] font-normal">Optional</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#065F46] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Samarpan, Magathane, Nancy Colony"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border-2 border-[#E5D7C6] focus:border-[#059669] focus:outline-none focus:ring-2 focus:ring-[#059669]/20 bg-white/95 text-[#043E2B] placeholder:text-[#9C8A74] font-medium transition"
                    />
                  </div>
                </div>
              )}

              {/* ROYAL EMERALD WITH CHAMPAGNE ACCENTS SUBMIT BUTTON */}
              <button
                type="submit"
                className="shimmer-button w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#045238] via-[#065F46] to-[#0B6E4A] hover:from-[#033F2B] hover:to-[#05573C] text-[#FFFDF9] font-heading font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/25 border border-[#DFC09E]/50 transition active:scale-98 cursor-pointer mt-1"
              >
                <span>
                  {authMode === 'login' ? "Sign In & Unlock Pharmacy" : "Create Account & Unlock Store 🔑"}
                </span>
                <ArrowRight className="w-4 h-4 text-[#EED9C4]" />
              </button>

            </form>

          </div>

          {/* GUEST MODE BYPASS & TRUST FOOTER WITH CHAMPAGNE TINT */}
          <div className="pt-3 border-t border-[#DFC09E]/40 space-y-2.5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <p className="text-xs text-[#6D5533] font-medium">
                {authMode === 'login' ? "New to Flora Pharmacy?" : "Already registered?"}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode(authMode === 'login' ? 'signup' : 'login');
                    setErrorMsg("");
                  }}
                  className="ml-1 text-[#045238] hover:text-[#022317] font-black underline underline-offset-2 cursor-pointer"
                >
                  {authMode === 'login' ? "Create an Account" : "Sign In here"}
                </button>
              </p>

              <button
                type="button"
                onClick={enterGuestMode}
                className="text-xs font-black text-[#045238] hover:text-[#022317] transition cursor-pointer flex items-center gap-1 bg-[#EAE0D0] hover:bg-[#E2D5C3] px-2.5 py-1 rounded-lg border border-[#DFC09E]/60 shadow-2xs"
              >
                <span>Explore as Guest</span>
                <span>→</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#8C7558] pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
                <span className="font-semibold">256-Bit SSL Encrypted</span>
              </span>
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                  "Hello Flora Pharmacy, I have a question regarding account login / registration."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#045238] transition flex items-center gap-1 font-bold text-[#059669]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-wa" />
                <span>WhatsApp Counter</span>
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
