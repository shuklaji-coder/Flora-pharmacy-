import React, { useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Flame, 
  Pill, 
  HeartPulse, 
  Baby, 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  Leaf,
  Layers,
  Heart,
  ChevronLeft,
  ChevronRight,
  Gift,
  IceCreamCone
} from 'lucide-react';

export default function WellnessCategories() {
  const { selectedCategory, setSelectedCategory, setSearchQuery } = useStore();
  const scrollContainerRef = useRef(null);

  const categories = [
    { 
      name: "All", 
      label: "All Items", 
      badge: "Full Catalog",
      icon: Layers, 
      color: "bg-emerald-50 text-flora-800 border-emerald-200" 
    },
    { 
      name: "OTC & Fever/Cold", 
      label: "Fever & Cold", 
      badge: "Dolo, Crocin",
      icon: Flame, 
      color: "bg-rose-50 text-rose-700 border-rose-200" 
    },
    { 
      name: "Pain Relief & Balms", 
      label: "Pain Relief", 
      badge: "Volini, Moov",
      icon: HeartPulse, 
      color: "bg-blue-50 text-blue-700 border-blue-200" 
    },
    { 
      name: "Digestion & Acidity", 
      label: "Acidity & Gas", 
      badge: "Digene, Eno",
      icon: Pill, 
      color: "bg-amber-50 text-amber-700 border-amber-200" 
    },
    { 
      name: "Health Devices", 
      label: "BP & Devices", 
      badge: "Omron, Accu-Chek",
      icon: Activity, 
      color: "bg-sky-50 text-sky-700 border-sky-200" 
    },
    { 
      name: "Baby Care", 
      label: "Baby Care", 
      badge: "Pampers, Diapers",
      icon: Baby, 
      color: "bg-pink-50 text-pink-700 border-pink-200" 
    },
    { 
      name: "Vitamins & Supplements", 
      label: "Vitamins & Calcium", 
      badge: "Shelcal, Becosules",
      icon: Sparkles, 
      color: "bg-purple-50 text-purple-700 border-purple-200" 
    },
    { 
      name: "Diabetic Care", 
      label: "Diabetic Care", 
      badge: "Sugar & Strips",
      icon: Heart, 
      color: "bg-emerald-50 text-emerald-700 border-emerald-200" 
    },
    { 
      name: "Ayurvedic & Herbal", 
      label: "Ayurveda", 
      badge: "Chyawanprash",
      icon: Leaf, 
      color: "bg-lime-50 text-lime-800 border-lime-200" 
    },
    { 
      name: "First Aid & Antiseptic", 
      label: "First Aid", 
      badge: "Dettol, Bandages",
      icon: ShieldCheck, 
      color: "bg-red-50 text-red-700 border-red-200" 
    },
    { 
      name: "Chocolates & Treats", 
      label: "Cadbury Treats", 
      badge: "Silk, Celebrations",
      icon: Gift, 
      color: "bg-purple-50 text-purple-700 border-purple-200" 
    },
    { 
      name: "Ice Creams & Dairy", 
      label: "Amul Ice Creams", 
      badge: "TriCone, Tubs",
      icon: IceCreamCone, 
      color: "bg-rose-50 text-rose-700 border-rose-200" 
    }
  ];

  const handleSelect = (catName) => {
    setSelectedCategory(catName);
    setSearchQuery("");
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-6 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title row with navigation chevrons */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black text-flora-800 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Shop by Health Condition</span>
            </div>
            <h2 className="font-heading font-black text-slate-900 text-lg sm:text-xl tracking-tight mt-0.5">
              Explore Popular Pharmacy Shelves
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs text-slate-500 font-medium mr-2">
              Scroll categories
            </span>
            <button
              onClick={() => scroll('left')}
              className="w-8 h-8 rounded-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center transition shadow-2xs"
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-8 h-8 rounded-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-600 flex items-center justify-center transition shadow-2xs"
              aria-label="Scroll categories right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable category circles / pills */}
        <div 
          ref={scrollContainerRef}
          className="flex items-stretch gap-2.5 sm:gap-4 overflow-x-auto pb-2 pt-1 no-scrollbar select-none touch-pan-x"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.name;

            return (
              <button
                key={cat.name}
                onClick={() => handleSelect(cat.name)}
                className={`group shrink-0 min-w-[96px] sm:min-w-[125px] p-2.5 sm:p-3 rounded-2xl border transition-all duration-200 flex flex-col items-center justify-between text-center active:scale-95 ${
                  isSelected
                    ? 'bg-flora-700 text-white border-flora-700 shadow-soft scale-102 ring-2 ring-emerald-400/40'
                    : 'bg-surface-light hover:bg-slate-50 border-slate-200/90 text-slate-800 hover:border-emerald-300 hover:shadow-2xs'
                }`}
              >
                {/* Icon Container */}
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 border shadow-2xs mb-1.5 sm:mb-2 ${
                    isSelected ? 'bg-white/20 text-white border-white/30' : cat.color
                  }`}
                >
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>

                {/* Title */}
                <span
                  className={`text-xs font-black leading-tight block mb-1 ${
                    isSelected ? 'text-white' : 'text-slate-900 group-hover:text-flora-800'
                  }`}
                >
                  {cat.label}
                </span>

                {/* Micro Sub-badge */}
                <span
                  className={`text-[9.5px] font-bold block px-1.5 py-0.2 rounded-md ${
                    isSelected
                      ? 'bg-emerald-800/80 text-emerald-100'
                      : 'bg-slate-200/70 text-slate-500'
                  }`}
                >
                  {cat.badge}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
