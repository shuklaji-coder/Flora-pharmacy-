import React, { useState, useRef, useEffect } from 'react';
import Logo from './Logo';
import { useStore } from '../context/StoreContext';
import { BUSINESS_INFO } from '../data/business';
import { 
  Search, 
  ShoppingBag, 
  User, 
  MapPin, 
  ChevronDown, 
  ShieldCheck, 
  Clock, 
  Phone, 
  Lock, 
  Sparkles,
  X,
  Zap,
  Plus,
  Minus,
  Check,
  TrendingUp,
  Layers
} from 'lucide-react';
import ProductPackshot from './ProductPackshot';

export default function Navbar() {
  const { 
    cartCount, 
    cartSubtotal, 
    setIsCartOpen, 
    setIsAuthModalOpen, 
    currentUser,
    exitGuestMode,
    selectedLocation,
    setSelectedLocation,
    searchQuery,
    setSearchQuery,
    products,
    selectedCategory,
    setSelectedCategory,
    addToCart,
    getItemQuantity,
    updateCartQuantity
  } = useStore();

  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  // Rotating search placeholders to engage users
  const searchPlaceholders = [
    "Search 'Dolo 650' or 'Paracetamol'...",
    "Search 'Omron BP Monitor'...",
    "Search 'Shelcal 500' or 'Calcium'...",
    "Search 'Volini Pain Relief'...",
    "Search 'Digene' or 'Eno'...",
    "Search 'Pampers' or 'Baby Diapers'..."
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchPlaceholders.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [searchPlaceholders.length]);

  // Click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const localities = [
    { name: "Samarpan Tower, Borivali East", landmark: "Opp. Western Urban Road", time: "20-30 Mins" },
    { name: "Magathane Metro Station", landmark: "Near Metro Gate 2", time: "25-35 Mins" },
    { name: "Rivali Park, Borivali East", landmark: "Western Express Hwy", time: "25-35 Mins" },
    { name: "Nancy Colony, Borivali East", landmark: "Near Bus Depot", time: "30-40 Mins" },
    { name: "Carter Road 1 to 9", landmark: "Borivali East (400066)", time: "30-40 Mins" },
    { name: "Ashokvan & Kulupwadi", landmark: "Near National Park", time: "30-45 Mins" },
    { name: "Kandivali East", landmark: "Akurli Road (400101)", time: "35-45 Mins" }
  ];

  // Quick popular search tags
  const popularTags = ["Dolo 650", "Volini", "BP Monitor", "Shelcal 500", "Digene", "Baby Care"];

  // Search results
  const searchSuggestions = searchQuery.trim()
    ? products
        .filter(p => 
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.brandInfo && p.brandInfo.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 6)
    : [];

  const handleSelectProduct = (product) => {
    setSearchQuery(product.name);
    setIsSearchFocused(false);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Sub-Navigation Categories (Wellness Forever / Tata 1mg style)
  const subNavItems = [
    { label: "All Items", value: "All" },
    { label: "Fever & Cold", value: "OTC & Fever/Cold" },
    { label: "Pain Relief", value: "Pain Relief & Balms" },
    { label: "Acidity & Digestion", value: "Digestion & Acidity" },
    { label: "Health Devices", value: "Health Devices" },
    { label: "Baby Care", value: "Baby Care" },
    { label: "Vitamins & Calcium", value: "Vitamins & Supplements" },
    { label: "Diabetic Care", value: "Diabetic Care" },
    { label: "Ayurveda", value: "Ayurvedic & Herbal" }
  ];

  const handleSubNavClick = (catValue) => {
    setSelectedCategory(catValue);
    setSearchQuery("");
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. TOP MICRO-ANNOUNCEMENT BAR */}
      <div className="bg-slate-950 text-slate-300 text-[11px] py-1.5 px-4 border-b border-slate-900 select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-extrabold text-emerald-400 uppercase tracking-wider text-[10px] bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
              ⚡ 30-Min Express
            </span>
            <span className="hidden sm:inline text-slate-300 font-medium">
              Free medicine delivery in Samarpan & Borivali East on orders above ₹299
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold text-slate-200">Open 9:00 AM – 11:00 PM</span>
            </div>
            <span className="hidden md:inline text-slate-700">|</span>
            <a 
              href={`tel:${BUSINESS_INFO.phoneRaw}`} 
              className="hidden md:flex items-center gap-1 text-slate-300 hover:text-white transition font-bold"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
          </div>

        </div>
      </div>

      {/* 2. MAIN WELLNESS STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-slate-200/90 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex items-center justify-between gap-3 md:gap-5">
            
            {/* Logo */}
            <div className="shrink-0 flex items-center gap-3">
              <a href="#home" className="focus:outline-none group">
                <Logo />
              </a>
            </div>

            {/* Location Selector (Deliver to Pill) */}
            <div className="relative hidden lg:block shrink-0">
              <button
                type="button"
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-slate-50 hover:bg-slate-100/90 border border-slate-200 text-left transition hover:border-emerald-300 shadow-2xs"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-flora-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Deliver To</span>
                    <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-emerald-100 text-flora-800">30m</span>
                  </div>
                  <span className="text-xs font-black text-slate-800 flex items-center gap-1 mt-0.5">
                    <span className="max-w-[140px] truncate">{selectedLocation}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  </span>
                </div>
              </button>

              {/* Locality Dropdown list */}
              {isLocationDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-3xl shadow-2xl border border-slate-200 p-2.5 z-50 animate-scale-in">
                  <div className="p-2.5 border-b border-slate-100 mb-1">
                    <p className="text-xs font-black text-slate-900">Select Borivali Locality:</p>
                    <p className="text-[11px] text-slate-500">Express delivery dispatched directly from Samarpan store counter</p>
                  </div>
                  <div className="max-h-56 overflow-y-auto space-y-1 custom-scrollbar">
                    {localities.map((loc) => (
                      <button
                        key={loc.name}
                        onClick={() => {
                          setSelectedLocation(loc.name);
                          setIsLocationDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-2xl text-xs transition flex items-center justify-between ${
                          selectedLocation.includes(loc.name.split(",")[0]) 
                            ? 'bg-flora-50 text-flora-900 font-black border border-emerald-200' 
                            : 'hover:bg-slate-50 text-slate-700 font-semibold'
                        }`}
                      >
                        <div>
                          <p className="leading-tight">{loc.name}</p>
                          <p className="text-[10px] text-slate-400 font-normal">{loc.landmark}</p>
                        </div>
                        <span className="text-[10px] font-black text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full shrink-0">
                          {loc.time}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Central Predictive Medicine Search Bar */}
            <div className="flex-1 max-w-2xl relative" ref={searchRef}>
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder={searchPlaceholders[placeholderIndex]}
                  className="w-full pl-10 pr-9 py-2.5 sm:py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-flora-600 focus:border-flora-600 transition shadow-inner font-medium"
                />
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="absolute right-3 text-[10px] font-bold text-slate-400 hidden sm:inline bg-slate-100 px-1.5 py-0.5 rounded">
                    ESC
                  </span>
                )}
              </div>

              {/* Instant Search Predictive Dropdown */}
              {isSearchFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-scale-in">
                  
                  {/* Popular Tags when search is empty */}
                  {!searchQuery.trim() && (
                    <div className="p-4 bg-slate-50/70 border-b border-slate-100">
                      <div className="flex items-center gap-1.5 text-xs font-black text-slate-600 uppercase tracking-wider mb-2.5">
                        <TrendingUp className="w-3.5 h-3.5 text-flora-700" />
                        <span>Popular Searches in Borivali</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {popularTags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => {
                              setSearchQuery(tag);
                              setIsSearchFocused(false);
                              const el = document.getElementById('products-section');
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-3 py-1.5 rounded-full bg-white hover:bg-flora-50 text-slate-700 hover:text-flora-800 text-xs font-bold border border-slate-200 hover:border-emerald-300 transition shadow-2xs"
                          >
                            🔍 {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggestions List when user typed */}
                  {searchQuery.trim() && (
                    <>
                      <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <span>Medicines & Health Products ({searchSuggestions.length})</span>
                        <span className="text-emerald-700 lowercase text-[10px]">100% Genuine In-Stock</span>
                      </div>

                      {searchSuggestions.length > 0 ? (
                        <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto custom-scrollbar">
                          {searchSuggestions.map((item) => {
                            const qty = getItemQuantity(item.id);
                            return (
                              <div
                                key={item.id}
                                className="p-3 hover:bg-emerald-50/40 flex items-center justify-between gap-3 transition group"
                              >
                                <div 
                                  onClick={() => handleSelectProduct(item)}
                                  className="flex items-center gap-3 flex-1 cursor-pointer"
                                >
                                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 p-1 flex items-center justify-center">
                                    <ProductPackshot product={item} />
                                  </div>
                                  <div>
                                    <p className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-flora-700 transition-colors">
                                      {item.name}
                                    </p>
                                    <p className="text-[11px] text-slate-500 font-medium">
                                      {item.brandInfo} • {item.form}
                                    </p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                      <span className="text-xs font-black text-slate-900">₹{item.price}</span>
                                      {item.mrp > item.price && (
                                        <span className="text-[11px] text-slate-400 line-through">₹{item.mrp}</span>
                                      )}
                                      {item.discount > 0 && (
                                        <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                                          {item.discount}% OFF
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {/* Direct Add / Quantity Control Inside Search Results! */}
                                <div className="shrink-0">
                                  {qty === 0 ? (
                                    <button
                                      onClick={() => addToCart(item, 1)}
                                      className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-emerald-50 hover:bg-flora-700 text-flora-800 hover:text-white border border-emerald-300 hover:border-flora-700 transition active:scale-95 flex items-center gap-1 shadow-2xs"
                                    >
                                      <Plus className="w-3.5 h-3.5" />
                                      <span>ADD</span>
                                    </button>
                                  ) : (
                                    <div className="flex items-center bg-flora-700 text-white rounded-xl shadow-2xs overflow-hidden">
                                      <button
                                        onClick={() => updateCartQuantity(item.id, qty - 1)}
                                        className="w-7 h-7 flex items-center justify-center hover:bg-flora-800 transition"
                                      >
                                        <Minus className="w-3 h-3" />
                                      </button>
                                      <span className="w-6 text-center text-xs font-black">{qty}</span>
                                      <button
                                        onClick={() => updateCartQuantity(item.id, qty + 1)}
                                        className="w-7 h-7 flex items-center justify-center hover:bg-flora-800 transition"
                                      >
                                        <Plus className="w-3 h-3" />
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="p-6 text-center text-slate-500 space-y-2">
                          <p className="text-sm font-bold text-slate-700">No exact match for "{searchQuery}"</p>
                          <p className="text-xs text-slate-400">
                            Our counter stocks 5,000+ medicines. WhatsApp us directly to get it dispatched!
                          </p>
                          <a
                            href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                              `Hello Flora Pharmacy, is ${searchQuery} available in your Borivali store?`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-wa hover:bg-wa-dark text-white text-xs font-bold transition shadow-xs mt-1"
                          >
                            Check Availability on WhatsApp
                          </a>
                        </div>
                      )}
                    </>
                  )}

                </div>
              )}
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              
              {/* Customer Account Button */}
              <button
                onClick={() => {
                  if (!currentUser) {
                    exitGuestMode();
                  } else {
                    setIsAuthModalOpen(true);
                  }
                }}
                className={`flex items-center gap-1.5 p-2 sm:px-3 sm:py-2.5 rounded-2xl text-xs font-bold transition ${
                  !currentUser
                    ? 'bg-flora-50 text-flora-900 border border-emerald-300 hover:bg-flora-100 shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-100 border border-transparent hover:border-slate-200'
                }`}
                title={currentUser ? "Customer Account & Order History" : "Click to Sign In / Login"}
              >
                {currentUser?.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt={currentUser.name} 
                    className="w-8 h-8 rounded-xl object-cover border-2 border-emerald-500 shadow-2xs" 
                  />
                ) : (
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    !currentUser ? 'bg-flora-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <User className="w-4 h-4" />
                  </div>
                )}
                <div className="hidden md:flex flex-col text-left leading-none">
                  <span className="text-[10px] text-slate-400 font-medium">
                    {currentUser ? "Account" : "Customer"}
                  </span>
                  <span className="text-xs font-black text-slate-800 mt-0.5 truncate max-w-[85px]">
                    {currentUser ? currentUser.name.split(" ")[0] : "Sign In"}
                  </span>
                </div>
              </button>

              {/* Cart Button with Live Count & Price Badge */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="shimmer-button flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2.5 rounded-2xl bg-gradient-to-r from-flora-700 via-flora-800 to-flora-900 hover:from-flora-800 hover:to-flora-950 text-white font-heading font-black text-xs sm:text-sm shadow-md transition active:scale-95"
                aria-label="View Shopping Cart"
              >
                <div className="relative flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-200" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-wa text-slate-950 font-black text-[10px] flex items-center justify-center shadow-xs animate-scale-in">
                      {cartCount}
                    </span>
                  )}
                </div>
                <div className="hidden sm:flex flex-col text-left leading-none">
                  <span className="text-[10px] text-emerald-200 font-medium">Cart</span>
                  <span className="font-extrabold text-xs text-white mt-0.5">₹{cartSubtotal}</span>
                </div>
              </button>

            </div>

          </div>
        </div>

        {/* 3. SUB-NAVIGATION RIBBON (Wellness Forever / Tata 1mg Style) */}
        <div className="bg-slate-50/90 border-t border-slate-200/80 px-4 sm:px-6 lg:px-8 py-1.5 overflow-x-auto no-scrollbar">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs font-bold">
            
            {/* Category Quick Chips */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {subNavItems.map((item) => {
                const isActive = selectedCategory === item.value;
                return (
                  <button
                    key={item.value}
                    onClick={() => handleSubNavClick(item.value)}
                    className={`px-3 py-1 rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-flora-700 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-flora-800 hover:bg-slate-200/60'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Quick Pharmacist Hotline Badge */}
            <div className="hidden lg:flex items-center gap-2 text-slate-500 text-[11px] font-semibold shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Pharmacist Desk:</span>
              <a 
                href={`tel:${BUSINESS_INFO.phoneRaw}`} 
                className="text-flora-800 font-black hover:underline"
              >
                {BUSINESS_INFO.phone}
              </a>
            </div>

          </div>
        </div>

      </header>
    </>
  );
}
