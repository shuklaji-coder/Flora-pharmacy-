import React, { useState, useEffect, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from './ProductCard';
import ProductAutoSlider from './ProductAutoSlider';
import { 
  Sparkles, 
  Activity, 
  Baby, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Layers, 
  ArrowRight,
  Flame,
  CheckCircle2,
  Clock,
  Zap,
  MessageCircle,
  HelpCircle,
  HeartHandshake,
  LayoutGrid,
  Rows3
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';

// Isolated self-updating countdown to avoid re-rendering entire catalog tree every second
const FlashSaleCountdown = React.memo(function FlashSaleCountdown() {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 bg-slate-950 text-white px-4 py-2.5 rounded-2xl shadow-md border border-slate-800 self-start md:self-auto select-none">
      <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
      <div className="text-xs font-bold text-slate-300">
        Offer Ends in:
      </div>
      <div className="flex items-center gap-1 font-mono font-black text-amber-400 text-sm">
        <span className="bg-slate-800 px-1.5 py-0.5 rounded">{String(timeLeft.hours).padStart(2, '0')}h</span>
        <span>:</span>
        <span className="bg-slate-800 px-1.5 py-0.5 rounded">{String(timeLeft.minutes).padStart(2, '0')}m</span>
        <span>:</span>
        <span className="bg-slate-800 px-1.5 py-0.5 rounded">{String(timeLeft.seconds).padStart(2, '0')}s</span>
      </div>
    </div>
  );
});

export default function WellnessProductSection() {
  const { 
    products, 
    categories, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery 
  } = useStore();

  const [sortBy, setSortBy] = useState("popular"); // "popular", "price-low", "price-high", "discount"
  const [catalogViewMode, setCatalogViewMode] = useState("slider"); // "slider" (continuous auto slide) or "grid"
  const [sliderTracksMode, setSliderTracksMode] = useState("dual"); // "dual" (2-row sync) or "single"
  const [catalogSpeed, setCatalogSpeed] = useState("slow"); // "slow" (ultra calm & readable) or "medium"

  // Filter products by selected category and search query (memoized to prevent re-filtering)
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        (item.brandInfo && item.brandInfo.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        (item.tag && item.tag.toLowerCase().includes(q)) ||
        (item.description && item.description.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Sort products (memoized)
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "discount") return (b.discount || 0) - (a.discount || 0);
      return 0; // Default popular
    });
  }, [filteredProducts, sortBy]);

  // Curated collections (memoized)
  const trendingProducts = useMemo(() => products.slice(0, 8), [products]);
  const healthDevices = useMemo(() => 
    products.filter(p => (p.category || "").includes("Device") || (p.name || "").includes("Monitor") || (p.name || "").includes("Meter")).slice(0, 4),
    [products]
  );
  const babyCare = useMemo(() => 
    products.filter(p => (p.category || "").includes("Baby")).slice(0, 4),
    [products]
  );
  const flashSaleItems = useMemo(() => 
    products.filter(p => (p.discount || 0) >= 15).slice(0, 4),
    [products]
  );

  // Speed calculation for All Products continuous auto-slider
  const catalogSpeedSec = catalogSpeed === "slow" ? 50 : 34;

  const subCategoriesList = [
    { label: "All Items", value: "All" },
    { label: "Fever & Cold", value: "OTC & Fever/Cold" },
    { label: "Pain Relief", value: "Pain Relief & Balms" },
    { label: "Digestion", value: "Digestion & Acidity" },
    { label: "Health Devices", value: "Health Devices" },
    { label: "Baby Care", value: "Baby Care" },
    { label: "Vitamins", value: "Vitamins & Supplements" },
    { label: "Diabetic Care", value: "Diabetic Care" },
    { label: "Ayurveda", value: "Ayurvedic & Herbal" },
    { label: "First Aid", value: "First Aid & Antiseptic" }
  ];

  return (
    <div id="products-section" className="py-8 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* 1. DAILY SUPER SAVER FLASH DEALS (Wellness Forever / Tata 1mg Style) */}
      {!searchQuery && selectedCategory === "All" && (
        <section className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-50 to-orange-50/60 border border-amber-200/80 shadow-soft space-y-6 overflow-hidden">
          {/* Decorative amber glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider mb-2 shadow-2xs">
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Borivali Today's Flash Deals</span>
              </div>
              <h3 className="font-heading font-black text-slate-900 text-xl sm:text-2xl tracking-tight">
                Super Saver Combos & Daily Essentials
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Extra discounts direct from our Samarpan chemist inventory. Auto-sliding deals!
              </p>
            </div>

            {/* Countdown Clock Widget (Isolated) */}
            <FlashSaleCountdown />
          </div>

          {/* Flash Sale Auto-Slider */}
          <div className="relative z-10">
            <ProductAutoSlider 
              products={flashSaleItems}
              variant="flash"
              speedSeconds={40}
            />
          </div>
        </section>
      )}

      {/* 2. TRENDING IN BORIVALI EAST & MAGATHANE (AUTO-SLIDING SHELF) */}
      {!searchQuery && selectedCategory === "All" && (
        <ProductAutoSlider 
          title="Trending in Borivali East & Magathane"
          subtitle="Frequently re-ordered medicines packed and dispatched within 30 minutes from Samarpan counter."
          badge="🔥 Most Re-ordered Essentials"
          badgeIcon={Flame}
          badgeColor="text-rose-700 bg-rose-50 border-rose-200"
          products={trendingProducts}
          categoryTarget="All"
          variant="normal"
          speedSeconds={46}
        />
      )}

      {/* 3. HEALTH DEVICES & HOME DIAGNOSTICS (AUTO-SLIDING SHELF) */}
      {!searchQuery && selectedCategory === "All" && healthDevices.length > 0 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-sky-50 via-white to-blue-50/70 border border-sky-200/80 shadow-soft">
          <ProductAutoSlider 
            title="BP Monitors, Glucometers & Nebulizers"
            subtitle="Accurate clinical readings with official manufacturer warranty & free counter demo guidance."
            badge="🩺 Diagnostics & Chronic Monitors"
            badgeIcon={Activity}
            badgeColor="text-sky-800 bg-sky-100 border-sky-200"
            products={healthDevices}
            categoryTarget="Health Devices"
            variant="slow"
            speedSeconds={52}
          />
        </div>
      )}

      {/* 4. MAIN INTERACTIVE STORE CATALOG */}
      <section className="space-y-6 pt-6 border-t border-slate-200/80">
        
        {/* Category Sticky / Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-soft space-y-4">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-black text-flora-800 uppercase tracking-widest bg-flora-50 px-2.5 py-0.5 rounded-full border border-flora-100">
                  Complete Pharmacy Store
                </span>
                {catalogViewMode === "slider" && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>Continuous Auto-Slide Active</span>
                  </span>
                )}
              </div>
              <h3 className="font-heading font-black text-slate-900 text-lg sm:text-2xl">
                {searchQuery ? `Search Results for "${searchQuery}"` : `${selectedCategory} Products`}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Showing {sortedProducts.length} verified products available in our Borivali East store. {catalogViewMode === "slider" ? "Hover any card to pause." : ""}
              </p>
            </div>

            {/* Controls: View Mode Switcher + Sort Dropdown */}
            <div className="flex flex-wrap items-center gap-2.5">
              
              {/* View Switcher: Continuous Slider vs Grid */}
              <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-inner">
                <button
                  onClick={() => setCatalogViewMode("slider")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    catalogViewMode === "slider"
                      ? "bg-white text-flora-800 shadow-2xs border border-emerald-200 scale-102"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  title="Smooth non-stop sliding product carousel"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>🎠 Auto Slider</span>
                </button>
                <button
                  onClick={() => setCatalogViewMode("grid")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    catalogViewMode === "grid"
                      ? "bg-white text-flora-800 shadow-2xs border border-emerald-200 scale-102"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  title="Traditional grid view of all products"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>⊞ Grid View</span>
                </button>
              </div>

              {/* Slider Track Option (Dual Row vs Single Row) when in Slider Mode and >= 8 items */}
              {catalogViewMode === "slider" && sortedProducts.length >= 8 && (
                <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 text-[11px] font-bold">
                  <button
                    onClick={() => setSliderTracksMode("dual")}
                    className={`px-2.5 py-1 rounded-xl transition ${
                      sliderTracksMode === "dual"
                        ? "bg-white text-flora-900 shadow-2xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                    title="2 Synchronized Sliding Rows (Left & Right)"
                  >
                    ⇄ 2 Rows
                  </button>
                  <button
                    onClick={() => setSliderTracksMode("single")}
                    className={`px-2.5 py-1 rounded-xl transition ${
                      sliderTracksMode === "single"
                        ? "bg-white text-flora-900 shadow-2xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                    title="1 Continuous Sliding Row"
                  >
                    ➔ 1 Row
                  </button>
                </div>
              )}

              {/* Slider Speed Selector (Smooth vs Fast) */}
              {catalogViewMode === "slider" && (
                <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 text-[11px] font-bold">
                  <button
                    onClick={() => setCatalogSpeed("slow")}
                    className={`px-2.5 py-1 rounded-xl transition ${
                      catalogSpeed === "slow"
                        ? "bg-white text-emerald-800 shadow-2xs font-black"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                    title="Balanced smooth glide"
                  >
                    🌿 Smooth Speed
                  </button>
                  <button
                    onClick={() => setCatalogSpeed("medium")}
                    className={`px-2.5 py-1 rounded-xl transition ${
                      catalogSpeed === "medium"
                        ? "bg-white text-slate-800 shadow-2xs font-black"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                    title="Slightly faster slide pace"
                  >
                    ⚡ Fast
                  </button>
                </div>
              )}

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5 shrink-0 bg-slate-50 px-3 py-1.5 rounded-2xl border border-slate-200">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-xs font-bold text-slate-500">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-black text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="popular">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="discount">Biggest Discount %</option>
                </select>
              </div>

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-2xl border border-rose-200 transition"
                >
                  Clear Search ✕
                </button>
              )}
            </div>
          </div>

          {/* Quick-Switch Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar pt-1 border-t border-slate-100">
            {subCategoriesList.map((cat) => {
              const isActive = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => {
                    setSelectedCategory(cat.value);
                    setSearchQuery("");
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-flora-700 text-white shadow-2xs'
                      : 'bg-slate-100/80 hover:bg-slate-200 text-slate-700 hover:text-flora-800'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

        </div>

        {/* Product Display: Auto Slider or Grid View */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4 shadow-soft">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
              <Search className="w-8 h-8" />
            </div>
            <h4 className="font-heading font-black text-slate-900 text-lg">
              {products.length === 0 ? "Catalog is Being Restocked" : `No exact match found for "${searchQuery}"`}
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              {products.length === 0
                ? "All medicines have been cleared. Chief Pharmacist Premprakash Sirvi is updating stock. Send your prescription directly on WhatsApp for instant 30-min delivery!"
                : "Our store holds over 5,000+ authentic medicines and hospital supplies. WhatsApp our pharmacist directly to verify counter stock!"}
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              {products.length > 0 && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="px-5 py-2.5 rounded-2xl text-xs font-black bg-slate-900 text-white hover:bg-black transition shadow-xs cursor-pointer"
                >
                  Reset Catalog Filter
                </button>
              )}
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                  `Hello Flora Pharmacy, I want to order medicines in Borivali East.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shimmer-button inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-wa hover:bg-wa-dark text-slate-950 text-xs font-black transition shadow-xs"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Order via WhatsApp Direct</span>
              </a>
            </div>
          </div>
        ) : catalogViewMode === "slider" ? (
          /* CONTINUOUS AUTO SLIDER FOR ALL PRODUCTS */
          <div className="space-y-6">
            {sortedProducts.length >= 8 && sliderTracksMode === "dual" ? (
              /* DUAL SYNCHRONIZED CONTINUOUS SLIDING TRACKS */
              <div className="space-y-8">
                {/* Track 1: Gliding Left */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-2 text-xs font-extrabold text-slate-500">
                    <span className="flex items-center gap-1.5 text-flora-800">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Row 1: Top Prescriptions & OTC Fast-Movers (Continuous Glide ➔)</span>
                    </span>
                    <span className="text-[11px] text-slate-400 hidden sm:inline">
                      Hover card to pause • Smooth 60fps
                    </span>
                  </div>
                  <ProductAutoSlider 
                    products={sortedProducts.slice(0, Math.ceil(sortedProducts.length / 2))}
                    direction="left"
                    variant="catalog"
                    hideHeader={true}
                    speedSeconds={catalogSpeedSec}
                  />
                </div>

                {/* Track 2: Gliding Right (Opposite Direction) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-2 text-xs font-extrabold text-slate-500">
                    <span className="flex items-center gap-1.5 text-flora-800">
                      <Zap className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Row 2: Chronic Care, Baby & Wellness Essentials (Reverse Glide ⬅)</span>
                    </span>
                    <span className="text-[11px] text-slate-400 hidden sm:inline">
                      Auto-loops infinitely
                    </span>
                  </div>
                  <ProductAutoSlider 
                    products={sortedProducts.slice(Math.ceil(sortedProducts.length / 2))}
                    direction="right"
                    hideHeader={true}
                    speedSeconds={catalogSpeedSec}
                  />
                </div>
              </div>
            ) : (
              /* SINGLE CONTINUOUS SLIDING TRACK */
              <ProductAutoSlider 
                products={sortedProducts}
                direction="left"
                variant="catalog"
                hideHeader={true}
                speedSeconds={catalogSpeedSec}
              />
            )}

            {/* Quick helper info banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-flora-50/70 border border-flora-100 text-slate-700 text-xs">
              <div className="flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>
                  <strong>Non-Stop Continuous Slider:</strong> All items in this category are smoothly moving. Hover over any product card to pause and click <strong>[+ ADD]</strong>!
                </span>
              </div>
              <button
                onClick={() => setCatalogViewMode("grid")}
                className="shrink-0 font-black text-flora-800 hover:text-flora-900 underline underline-offset-2"
              >
                Switch to Grid View ⊞
              </button>
            </div>
          </div>
        ) : (
          /* CLASSIC GRID VIEW */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </section>

      {/* 5. EMERGENCY MEDICINE DISPATCH CALLOUT (High Conversion Pharmacist Banner) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-flora-950 text-white shadow-soft-lg border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-emerald-400/60 shadow-glow bg-slate-800">
            <img 
              src="/images/founder-premprakash-sirvi.jpg" 
              alt="Premprakash Sirvi Chief Pharmacist" 
              className="w-full h-full object-cover" 
            />
            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900" title="Online Pharmacist on Duty" />
          </div>

          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-black uppercase tracking-wider border border-emerald-500/30">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Direct Chief Pharmacist Consultation</span>
            </div>
            <h3 className="font-heading font-extrabold text-white text-lg sm:text-2xl">
              Can't find your exact medicine or dosage?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              WhatsApp <strong>Premprakash Sirvi</strong> (D.Pharm, Reg No. 147514) directly. We procure all rare, chronic, and hospital prescription medications within 2 hours in Borivali & Kandivali.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <a
            href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
              "Hello Flora Pharmacy, I am looking for a specific medicine not shown on your site."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shimmer-button inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-wa hover:bg-wa-dark text-slate-950 hover:text-white text-xs sm:text-sm font-black transition-all shadow-glow hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>WhatsApp Pharmacist Directly</span>
          </a>
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition"
          >
            <span>Call Store Counter</span>
          </a>
        </div>
      </section>

    </div>
  );
}
