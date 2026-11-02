import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  User, 
  Phone, 
  MapPin, 
  X, 
  ShoppingBag, 
  Clock, 
  LogOut, 
  CheckCircle2, 
  ArrowRight, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  KeyRound, 
  LogIn, 
  UserPlus 
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

export default function CustomerAuthModal() {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    currentUser, 
    loginCustomer, 
    loginWithGoogle, 
    logoutCustomer, 
    isGoogleAuthLoading, 
    googleAuthError, 
    setGoogleAuthError, 
    orders,
    setViewingInvoiceOrder
  } = useStore();

  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [locality, setLocality] = useState("Samarpan Tower, Borivali East");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [updatedAddress, setUpdatedAddress] = useState("");
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

  if (!isAuthModalOpen) return null;

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

  const handleSaveUpdatedAddress = () => {
    if (currentUser) {
      loginCustomer({
        ...currentUser,
        address: updatedAddress.trim()
      });
      setIsEditingAddress(false);
    }
  };

  // Find user's past orders matching their phone, email, or name
  const customerOrders = currentUser
    ? orders.filter(o => 
        (currentUser.phone && o.customerPhone === currentUser.phone) || 
        (currentUser.email && o.customerEmail === currentUser.email) ||
        o.customerName === currentUser.name
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-0 sm:p-6 flex items-end sm:items-center justify-center">
      {/* Backdrop with Emerald Tint */}
      <div 
        className="fixed inset-0 bg-[#022317]/75 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={() => {
          if (setGoogleAuthError) setGoogleAuthError("");
          setIsAuthModalOpen(false);
        }}
      />

      <div className="relative bg-gradient-to-b from-[#FCFBF7] via-[#FAF5EC] to-[#F3ECE0] rounded-t-3xl sm:rounded-[32px] max-w-md w-full shadow-[0_25px_70px_rgba(2,35,23,0.55)] border-2 border-[#DFC09E] overflow-hidden z-10 animate-fade-in-up max-h-[92vh] sm:max-h-[88vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#033323] via-[#064E36] to-[#043E2B] text-white border-b border-[#DFC09E]/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {currentUser?.photoURL ? (
              <img 
                src={currentUser.photoURL} 
                alt={currentUser.name} 
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl object-cover border-2 border-[#DFC09E] shadow-xs" 
              />
            ) : (
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#FAF4EA] p-1 border-2 border-[#DFC09E] shadow-2xs flex items-center justify-center shrink-0">
                <img 
                  src="/images/flora-mascot-key.png" 
                  alt="Flora Mascot" 
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div>
              <h3 className="font-heading font-black text-[#FFFDF9] text-sm sm:text-base leading-tight">
                {currentUser ? "My Customer Account" : (authMode === 'login' ? "Customer Sign In" : "Create New Account")}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-[#EED9C4] font-medium">
                Flora Pharmacy • Borivali East
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (setGoogleAuthError) setGoogleAuthError("");
              setIsAuthModalOpen(false);
            }}
            className="p-2 rounded-xl text-[#EED9C4] hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
          
          {currentUser ? (
            /* Logged in state */
            <div className="space-y-4">
              
              {/* Profile Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-b from-[#FFFDF9] to-[#F5EBE0] border-2 border-[#DFC09E]/80 space-y-3 shadow-xs">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {currentUser.photoURL ? (
                      <img 
                        src={currentUser.photoURL} 
                        alt={currentUser.name} 
                        className="w-12 h-12 rounded-2xl object-cover border-2 border-[#059669] shadow-xs" 
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-2xl bg-[#065F46] text-[#FFFDF9] flex items-center justify-center font-black text-base shadow-xs">
                        {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "F"}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-heading font-black text-[#043E2B] text-base">
                          {currentUser.name}
                        </h4>
                        {currentUser.provider === "google" && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-white text-blue-700 border border-blue-200 shadow-2xs">
                            <GoogleIcon />
                            <span>Google Verified</span>
                          </span>
                        )}
                      </div>
                      {currentUser.email && (
                        <p className="text-xs text-[#6D5533] flex items-center gap-1 mt-0.5 font-medium">
                          <Mail className="w-3 h-3 text-[#065F46]" />
                          <span>{currentUser.email}</span>
                        </p>
                      )}
                      {currentUser.phone && (
                        <p className="text-xs text-[#6D5533] flex items-center gap-1 mt-0.5 font-medium">
                          <Phone className="w-3 h-3 text-[#065F46]" />
                          <span>+91 {currentUser.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      logoutCustomer();
                      setIsAuthModalOpen(false);
                    }}
                    className="p-2 rounded-xl text-red-700 hover:bg-red-50 border border-red-200 text-xs font-bold flex items-center gap-1 transition shadow-2xs cursor-pointer"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>

                {/* Delivery Address Row */}
                <div className="pt-2 border-t border-[#DFC09E]/40">
                  <div className="flex items-center justify-between text-xs font-bold text-[#043E2B] mb-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#065F46]" />
                      <span>Default Borivali Delivery Address:</span>
                    </span>
                    {!isEditingAddress && (
                      <button 
                        onClick={() => {
                          setUpdatedAddress(currentUser.address || "");
                          setIsEditingAddress(true);
                        }}
                        className="text-[#065F46] hover:text-[#043E2B] hover:underline text-[11px] font-bold cursor-pointer"
                      >
                        {currentUser.address ? "Edit" : "+ Add Address"}
                      </button>
                    )}
                  </div>

                  {isEditingAddress ? (
                    <div className="space-y-2 mt-1">
                      <textarea
                        rows={2}
                        value={updatedAddress}
                        onChange={(e) => setUpdatedAddress(e.target.value)}
                        placeholder="Flat no, building, road, Borivali East landmark"
                        className="w-full p-2 text-xs rounded-xl border-2 border-[#DFC09E] focus:outline-none focus:ring-2 focus:ring-[#059669] bg-white font-medium text-[#043E2B]"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleSaveUpdatedAddress}
                          className="px-3 py-1 rounded-xl bg-[#065F46] text-white text-xs font-bold hover:bg-[#045238] transition cursor-pointer"
                        >
                          Save Address
                        </button>
                        <button
                          onClick={() => setIsEditingAddress(false)}
                          className="px-3 py-1 rounded-xl bg-[#EAE0D0] text-[#043E2B] text-xs font-bold hover:bg-[#DFC09E]/50 transition cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-[#6D5533] font-medium">
                      {currentUser.address || "No address saved yet. Add address for 30-min express checkout."}
                    </p>
                  )}
                </div>

              </div>

              {/* Order History */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-heading font-black text-[#043E2B] text-sm">
                    Recent Orders ({customerOrders.length})
                  </h5>
                  <span className="text-[11px] text-[#8C7558] font-semibold">Live Counter Sync</span>
                </div>

                {customerOrders.length === 0 ? (
                  <div className="text-center py-6 bg-white/70 rounded-2xl border border-[#DFC09E]/60 space-y-2">
                    <ShoppingBag className="w-7 h-7 text-[#DFC09E] mx-auto" />
                    <p className="text-xs text-[#6D5533] font-medium">No past orders found on your account.</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-52 overflow-y-auto">
                    {customerOrders.map((ord) => (
                      <div
                        key={ord.id}
                        className="p-3 rounded-2xl bg-white/80 border border-[#DFC09E]/60 flex items-center justify-between text-xs hover:border-[#059669] transition"
                      >
                        <div>
                          <span className="font-heading font-black text-[#043E2B] block">
                            #{ord.id}
                          </span>
                          <span className="text-[10px] text-[#8C7558] block font-medium">
                            {new Date(ord.createdAt).toLocaleDateString()} • {ord.items.length} items
                          </span>
                        </div>
                        <div className="text-right flex flex-col items-end">
                          <span className="font-black text-[#043E2B] block">₹{ord.total}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                            ord.status === "Delivered" ? "bg-emerald-100 text-[#045238]" : "bg-amber-100 text-amber-900"
                          }`}>
                            {ord.status}
                          </span>
                          <button
                            onClick={() => {
                              setIsAuthModalOpen(false);
                              setViewingInvoiceOrder(ord);
                            }}
                            className="mt-1 text-[10px] font-bold text-flora-800 bg-flora-50 hover:bg-flora-100 border border-emerald-300 px-2 py-0.5 rounded-lg flex items-center gap-1 transition cursor-pointer"
                          >
                            <span>📄 Bill</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          ) : (
            /* Unauthenticated: Mascot Showcase + Login/Sign Up Tabs (Champagne & Emerald) */
            <div className="space-y-4">
              
              {/* Mascot Welcome Card with Golden Key on Champagne Silk */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#F5EBE0] via-[#FAF4EA] to-[#F5EBE0] border-2 border-[#DFC09E] flex items-center gap-3.5 shadow-xs">
                <div className="w-16 h-16 rounded-2xl bg-white p-1 border-2 border-[#DFC09E] shadow-xs shrink-0 flex items-center justify-center">
                  <img 
                    src="/images/flora-mascot-key.png" 
                    alt="Flora Pharmacy Pharmacist Mascot with Key" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-[#043E2B]">
                      Flora Care Buddy
                    </span>
                    <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#022418] border border-[#DFC09E] flex items-center gap-0.5 shadow-2xs">
                      <KeyRound className="w-2.5 h-2.5" />
                      <span>Golden Key</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6D5533] mt-0.5 leading-snug font-medium">
                    {authMode === 'login'
                      ? "Sign in to unlock 30-min express medicine delivery & prescription records."
                      : "Create your free account for batch discounts & instant re-orders!"}
                  </p>
                </div>
              </div>

              {/* TAB SWITCHER: LOGIN vs SIGN UP (EMERALD & CHAMPAGNE) */}
              <div className="bg-[#EFE5D8] p-1.5 rounded-2xl flex items-center border border-[#DFC09E]/70 shadow-inner">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setErrorMsg("");
                    if (setGoogleAuthError) setGoogleAuthError("");
                  }}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-heading font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    authMode === 'login'
                      ? 'bg-gradient-to-r from-[#045238] to-[#066144] text-[#FAF5EC] shadow-md shadow-emerald-950/20 border border-[#047857]'
                      : 'text-[#6D5533] hover:text-[#043E2B] hover:bg-[#FAF5EC]/70'
                  }`}
                >
                  <LogIn className={`w-3.5 h-3.5 ${authMode === 'login' ? 'text-[#EED9C4]' : 'text-[#065F46]'}`} />
                  <span>Sign In</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setErrorMsg("");
                    if (setGoogleAuthError) setGoogleAuthError("");
                  }}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-heading font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    authMode === 'signup'
                      ? 'bg-gradient-to-r from-[#045238] to-[#066144] text-[#FAF5EC] shadow-md shadow-emerald-950/20 border border-[#047857]'
                      : 'text-[#6D5533] hover:text-[#043E2B] hover:bg-[#FAF5EC]/70'
                  }`}
                >
                  <UserPlus className={`w-3.5 h-3.5 ${authMode === 'signup' ? 'text-[#EED9C4]' : 'text-[#065F46]'}`} />
                  <span>Create Account</span>
                </button>
              </div>

              {/* GOOGLE 1-CLICK OAUTH BUTTON */}
              <div className="space-y-1.5">
                <button
                  type="button"
                  disabled={isGoogleAuthLoading}
                  onClick={loginWithGoogle}
                  className="w-full py-3 px-4 rounded-2xl bg-[#FFFDF9] hover:bg-[#FAF4EA] text-[#043E2B] font-heading font-black text-xs sm:text-sm border-2 border-[#DFC09E] hover:border-[#C5A059] shadow-sm flex items-center justify-center gap-2.5 transition-all active:scale-98 disabled:opacity-60 cursor-pointer"
                >
                  {isGoogleAuthLoading ? (
                    <div className="w-4 h-4 border-2 border-[#DFC09E] border-t-[#065F46] rounded-full animate-spin" />
                  ) : (
                    <GoogleIcon />
                  )}
                  <span>
                    {isGoogleAuthLoading 
                      ? "Connecting..." 
                      : authMode === 'login' 
                        ? "Continue with Google (1-Click)" 
                        : "Sign Up with Google (Instant)"}
                  </span>
                </button>

                {(googleAuthError || errorMsg) && (
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-[11px] flex items-start gap-1.5">
                    <span className="shrink-0 font-bold">⚠️</span>
                    <p className="leading-tight">{googleAuthError || errorMsg}</p>
                  </div>
                )}
              </div>

              {/* DIVIDER */}
              <div className="relative flex items-center justify-center">
                <div className="border-t border-[#DFC09E]/60 w-full" />
                <span className="bg-[#FAF5EC] px-2.5 text-[10px] font-black text-[#8C7558] uppercase tracking-wider relative shrink-0">
                  {authMode === 'login' ? "Or with Mobile" : "Or Register with Mobile"}
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleFormSubmit} className="space-y-3">
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#043E2B] block">
                    Full Name *
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
                      placeholder="e.g. Ramesh Shah"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border-2 border-[#E5D7C6] focus:border-[#059669] focus:outline-none focus:ring-2 focus:ring-[#059669]/20 bg-white/95 text-[#043E2B] placeholder:text-[#9C8A74] font-medium transition"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#043E2B] block">
                    Mobile Number *
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
                      className="w-full pl-16 pr-3 py-2 text-xs rounded-xl border-2 border-[#E5D7C6] focus:border-[#059669] focus:outline-none focus:ring-2 focus:ring-[#059669]/20 bg-white/95 text-[#043E2B] placeholder:text-[#9C8A74] font-medium tracking-wide transition"
                    />
                  </div>
                </div>

                {authMode === 'signup' && (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#043E2B] block">
                      Borivali Locality
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#065F46] absolute left-3 top-1/2 -translate-y-1/2" />
                      <select
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border-2 border-[#E5D7C6] focus:border-[#059669] focus:outline-none focus:ring-2 focus:ring-[#059669]/20 bg-white/95 text-[#043E2B] font-medium appearance-none transition"
                      >
                        {borivaliLocalities.map((loc) => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#043E2B] block">
                    Delivery Address (Optional)
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#065F46] absolute left-3 top-2.5" />
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Flat no, building name, Borivali East landmark"
                      className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border-2 border-[#E5D7C6] focus:border-[#059669] focus:outline-none focus:ring-2 focus:ring-[#059669]/20 bg-white/95 text-[#043E2B] placeholder:text-[#9C8A74] font-medium transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="shimmer-button w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#045238] via-[#065F46] to-[#0B6E4A] hover:from-[#033F2B] hover:to-[#05573C] text-[#FFFDF9] font-heading font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/25 border border-[#DFC09E]/50 transition cursor-pointer"
                >
                  <span>
                    {authMode === 'login' ? "Sign In with Mobile" : "Create Account & Enter Store 🔑"}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#EED9C4]" />
                </button>

                <p className="text-[10px] text-center text-[#8C7558] font-medium">
                  🔒 Your details are stored safely for fast re-ordering in Borivali East.
                </p>

              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
