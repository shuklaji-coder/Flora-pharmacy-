import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShieldCheck, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  BadgeCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const BRANDS = [
    {
      id: "cipla",
      name: "Cipla",
      logo: "/images/brands/cipla.svg",
      category: "Chronic, Inhalers & OTC",
      offer: "Up to 15% OFF",
      searchTerm: "Cipla",
      tagline: "Caring for Life",
      colorRing: "hover:border-red-400 group-hover:shadow-red-500/10"
    },
    {
      id: "sun-pharma",
      name: "Sun Pharma",
      logo: "/images/brands/sun-pharma.svg",
      category: "Pain Relief & Daily Care",
      offer: "Up to 20% OFF",
      searchTerm: "Volini",
      tagline: "Volini, Revital & More",
      colorRing: "hover:border-orange-400 group-hover:shadow-orange-500/10"
    },
    {
      id: "abbott",
      name: "Abbott",
      logo: "/images/brands/abbott.svg",
      category: "Acidity, Digestion & Nutrition",
      offer: "Flat 12% OFF",
      searchTerm: "Digene",
      tagline: "Digene & Ensure",
      colorRing: "hover:border-blue-400 group-hover:shadow-blue-500/10"
    },
    {
      id: "omron",
      name: "Omron Healthcare",
      logo: "/images/brands/omron.svg",
      category: "Clinical BP & Nebulizers",
      offer: "Up to 25% OFF",
      searchTerm: "Omron",
      tagline: "Japan's #1 BP Monitor",
      colorRing: "hover:border-sky-400 group-hover:shadow-sky-500/10"
    },
    {
      id: "dabur",
      name: "Dabur",
      logo: "/images/brands/dabur.svg",
      category: "Ayurveda & Daily Immunity",
      offer: "Up to 18% OFF",
      searchTerm: "Chyawanprash",
      tagline: "Chyawanprash & Honey",
      colorRing: "hover:border-emerald-400 group-hover:shadow-emerald-500/10"
    },
    {
      id: "pampers",
      name: "Pampers",
      logo: "/images/brands/pampers.svg",
      category: "Baby Diapers & Sensitive Care",
      offer: "Up to 20% OFF",
      searchTerm: "Pampers",
      tagline: "All Night Absorbency",
      colorRing: "hover:border-teal-400 group-hover:shadow-teal-500/10"
    },
    {
      id: "johnsons-baby",
      name: "Johnson's Baby",
      logo: "/images/brands/johnsons.svg",
      category: "Ultra Gentle Baby Skincare",
      offer: "Flat 10% OFF",
      searchTerm: "Johnson",
      tagline: "No More Tears & Powder",
      colorRing: "hover:border-sky-400 group-hover:shadow-sky-500/10"
    },
    {
      id: "cadbury",
      name: "Cadbury",
      logo: "/images/brands/cadbury.svg",
      category: "Celebrations & Dairy Milk",
      offer: "Up to 10% OFF",
      searchTerm: "Cadbury",
      tagline: "Silk & Gift Boxes",
      colorRing: "hover:border-purple-400 group-hover:shadow-purple-500/10"
    },
    {
      id: "amul",
      name: "Amul",
      logo: "/images/brands/amul.svg",
      category: "Real Milk Ice Creams & Dairy",
      offer: "Deep Frozen Delivery",
      searchTerm: "Amul",
      tagline: "The Taste of India",
      colorRing: "hover:border-rose-400 group-hover:shadow-rose-500/10"
    },
    {
      id: "dettol",
      name: "Dettol",
      logo: "/images/brands/dettol.svg",
      category: "Antiseptic Liquid & Hygiene",
      offer: "Flat 10% OFF",
      searchTerm: "Dettol",
      tagline: "100% Germ Protection",
      colorRing: "hover:border-green-400 group-hover:shadow-green-500/10"
    },
    {
      id: "vicks",
      name: "Vicks",
      logo: "/images/brands/vicks.svg",
      category: "Cold, Cough & Inhalers",
      offer: "Best Counter Rates",
      searchTerm: "Vicks",
      tagline: "VapoRub & Inhaler",
      colorRing: "hover:border-blue-400 group-hover:shadow-blue-500/10"
    },
    {
      id: "accu-chek",
      name: "Accu-Chek",
      logo: "/images/brands/accu-chek.svg",
      category: "Diabetes Sugar Meters & Strips",
      offer: "Up to 22% OFF",
      searchTerm: "Accu-Chek",
      tagline: "Roche Accurate Testing",
      colorRing: "hover:border-amber-400 group-hover:shadow-amber-500/10"
    },
    {
      id: "himalaya",
      name: "Himalaya Wellness",
      logo: "/images/brands/himalaya.svg",
      category: "Herbal Care, Liv.52 & Face Care",
      offer: "Flat 15% OFF",
      searchTerm: "Himalaya",
      tagline: "Since 1930 Pure Herbs",
      colorRing: "hover:border-emerald-400 group-hover:shadow-emerald-500/10"
    },
    {
      id: "volini",
      name: "Volini",
      logo: "/images/brands/volini.svg",
      category: "Instant Muscle & Joint Relief",
      offer: "Up to 20% OFF",
      searchTerm: "Volini",
      tagline: "Sprays & Ointments",
      colorRing: "hover:border-orange-400 group-hover:shadow-orange-500/10"
    },
    {
      id: "cetaphil",
      name: "Cetaphil",
      logo: "/images/brands/cetaphil.svg",
      category: "Sensitive Skincare & Hydration",
      offer: "Flat 15% OFF",
      searchTerm: "Cetaphil",
      tagline: "Cleansers & Lotions",
      colorRing: "hover:border-sky-400 group-hover:shadow-sky-500/10"
    },
    {
      id: "sebamed",
      name: "Sebamed",
      logo: "/images/brands/sebamed.svg",
      category: "pH 5.5 Pediatric Skincare",
      offer: "Flat 15% OFF",
      searchTerm: "Sebamed",
      tagline: "Dermatologist Approved",
      colorRing: "hover:border-rose-400 group-hover:shadow-rose-500/10"
    }
  ];

const DOUBLED_BRANDS = [...BRANDS, ...BRANDS];

function FeaturedBrandsComponent() {
  const { setSearchQuery, setSelectedCategory } = useStore();
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState("right"); // "right" = Left to Right (continuous stream)

  const handleBrandClick = (searchTerm) => {
    setSelectedCategory("All");
    setSearchQuery(searchTerm);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-6 sm:py-8 bg-white border-b border-slate-200/80">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header (Wellness Forever Style) */}
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-black text-flora-800 uppercase tracking-wider">
              <BadgeCheck className="w-4 h-4 text-flora-700" />
              <span>Official Manufacturer Sourcing</span>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-black uppercase tracking-wider transition cursor-pointer"
                title="Click to play/pause scrolling"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isPaused ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'}`} />
                <span>{isPaused ? "Paused" : "Non-Stop Left-to-Right"}</span>
              </button>
            </div>
            <h2 className="font-heading font-black text-slate-900 text-xl sm:text-2xl tracking-tight mt-0.5">
              Featured Brands at Flora Pharmacy
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
              100% genuine products directly from certified distributors in Mumbai with batch tracking. Hover to pause.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden md:inline text-xs text-slate-500 font-medium mr-1">
              Scroll Direction:
            </span>
            <button
              onClick={() => setDirection("left")}
              className={`w-8 h-8 rounded-full border text-slate-700 flex items-center justify-center transition shadow-2xs hover:scale-105 active:scale-95 ${
                direction === "left" ? "bg-emerald-500 text-white border-emerald-600 shadow-glow" : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
              title="Scroll Right to Left"
              aria-label="Scroll brands left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDirection("right")}
              className={`w-8 h-8 rounded-full border text-slate-700 flex items-center justify-center transition shadow-2xs hover:scale-105 active:scale-95 ${
                direction === "right" ? "bg-emerald-500 text-white border-emerald-600 shadow-glow" : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
              title="Scroll Left to Right"
              aria-label="Scroll brands right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Continuous Infinite Marquee Ribbon with Left & Right Fade Masks */}
        <div 
          className="relative overflow-x-hidden py-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Subtle Edge Fade Gradients for natural entry/exit */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

          {/* Infinite Running Marquee Track */}
          <div 
            className={`flex items-stretch gap-3 sm:gap-4 ${
              direction === "right" 
                ? "animate-marquee-continuous-right" 
                : "animate-marquee-continuous"
            }`}
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
              animationDuration: '40s'
            }}
          >
            {DOUBLED_BRANDS.map((brand, idx) => (
              <div
                key={`${brand.id}-${idx}`}
                onClick={() => handleBrandClick(brand.searchTerm)}
                className={`group shrink-0 w-48 sm:w-56 bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-soft-lg p-3.5 flex flex-col justify-between transition-all duration-300 cursor-pointer ${brand.colorRing} hover:-translate-y-1 hover:scale-102`}
              >
                <div>
                  {/* Brand Logo Container with Clean White Background */}
                  <div className="w-full h-24 sm:h-26 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-center p-3 mb-3 group-hover:bg-white group-hover:scale-102 transition-all">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} official logo`}
                      className="max-h-full max-w-full object-contain filter drop-shadow-2xs transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Offer Pill (e.g. Up to 20% OFF) */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg bg-emerald-100 text-flora-800">
                      {brand.offer}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      In-Stock
                    </span>
                  </div>

                  {/* Brand Name */}
                  <h4 className="font-heading font-black text-slate-900 text-xs sm:text-sm leading-snug group-hover:text-flora-800 transition-colors">
                    {brand.name}
                  </h4>

                  {/* Subtitle / Category */}
                  <p className="text-[10.5px] text-slate-500 font-medium truncate mt-0.5">
                    {brand.category}
                  </p>
                </div>

                {/* Bottom Quick-Action Link */}
                <div className="pt-2 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-flora-800">
                  <span className="text-slate-400 text-[10px] font-medium">{brand.tagline}</span>
                  <div className="flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    <span className="font-black">View</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

const FeaturedBrands = React.memo(FeaturedBrandsComponent);
export default FeaturedBrands;
