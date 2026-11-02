import React, { useRef, useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { 
  ChevronLeft, 
  ChevronRight, 
  Flame, 
  Zap, 
  Sparkles, 
  ArrowRight,
  Play,
  Pause
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

function ProductAutoSliderComponent({ 
  title, 
  subtitle, 
  badge, 
  badgeIcon: BadgeIcon = Flame, 
  badgeColor = "text-rose-600 bg-rose-50 border-rose-200", 
  products = [], 
  categoryTarget = "All",
  variant = "normal", // "normal", "slow", "flash", "catalog"
  direction = "left", // "left" or "right"
  hideHeader = false,
  cardWidth = "w-[230px] sm:w-72",
  speedSeconds = null
}) {
  const { setSelectedCategory, setSearchQuery } = useStore();
  const containerRef = useRef(null);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [speedLevel, setSpeedLevel] = useState("slow"); // "slow" (ultra calm & readable), "medium"

  // Determine continuous marquee animation class
  let animationClass = "animate-marquee-continuous";
  if (direction === "right") {
    animationClass = "animate-marquee-continuous-right";
  } else if (variant === "flash") {
    animationClass = "animate-marquee-continuous-flash";
  } else if (variant === "slow") {
    animationClass = "animate-marquee-continuous-devices";
  } else if (variant === "catalog") {
    animationClass = "animate-marquee-continuous-catalog";
  }

  // Base products ensuring minimum count for marquee
  const base = useMemo(() => {
    return products.length > 0 && products.length < 4 
      ? [...products, ...products] 
      : products;
  }, [products]);

  // Duplicate items for seamless 100% infinite loop with zero gaps (memoized)
  const doubledProducts = useMemo(() => {
    return base.length > 0 ? [...base, ...base] : [];
  }, [base]);

  // Calculate dynamic duration: Sweet spot pace = 6s/card, Fast = 4s/card
  const itemCount = base.length;
  const multiplier = speedLevel === "slow" ? 6 : 4;
  const autoDuration = Math.max(44, itemCount * multiplier);
  const calculatedDuration = speedSeconds ? `${speedSeconds}s` : `${autoDuration}s`;

  const handleManualScroll = (direction) => {
    if (containerRef.current) {
      const step = 280;
      const scrollAmount = direction === 'left' ? -step : step;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleViewAll = () => {
    setSelectedCategory(categoryTarget);
    setSearchQuery("");
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="space-y-3 sm:space-y-4 relative select-none">
      
      {/* Header Row with Badge, Title, Controls */}
      {!hideHeader && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 sm:gap-3 border-b border-slate-200/80 pb-3">
          <div>
            {badge && (
              <div className={`inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border mb-1 ${badgeColor}`}>
                <BadgeIcon className="w-3.5 h-3.5 fill-current" />
                <span>{badge}</span>
              </div>
            )}
            <h3 className="font-heading font-black text-slate-900 text-lg sm:text-2xl tracking-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                {subtitle}
              </p>
            )}
          </div>

          {/* Controls: Continuous Slide Status Indicator + Navigation Arrows + View All */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 self-start sm:self-auto">
            {/* Speed Toggle Pill */}
            <button
              onClick={() => setSpeedLevel(speedLevel === "slow" ? "medium" : "slow")}
              className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold px-2 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
              title="Click to toggle slide speed"
            >
              <span>{speedLevel === "slow" ? "🌿 Smooth" : "⚡ Fast"}</span>
            </button>

            {/* Live Continuous Scroll Status Indicator */}
            <div 
              onClick={() => setIsManuallyPaused(!isManuallyPaused)}
              className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
              title="Click to pause or hover/touch anywhere on cards"
            >
              {isManuallyPaused ? (
                <>
                  <Pause className="w-3 h-3 text-amber-600 fill-current" />
                  <span className="text-amber-700">Paused</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-emerald-800">Auto Slide</span>
                </>
              )}
            </div>

            {/* Left Arrow Button (Desktop/Tablet) */}
            <button
              onClick={() => handleManualScroll('left')}
              className="hidden sm:flex w-9 h-9 rounded-full bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 items-center justify-center transition shadow-2xs active:scale-95"
              aria-label="Slide previous products"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right Arrow Button (Desktop/Tablet) */}
            <button
              onClick={() => handleManualScroll('right')}
              className="hidden sm:flex w-9 h-9 rounded-full bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 items-center justify-center transition shadow-2xs active:scale-95"
              aria-label="Slide next products"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* View All Button */}
            <button
              onClick={handleViewAll}
              className="inline-flex items-center gap-1 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl bg-flora-50 hover:bg-flora-100 text-flora-800 text-[11px] sm:text-xs font-black transition border border-emerald-200 shadow-2xs"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Marquee Wrapper with Pause-on-Hover / Pause-on-Touch and Edge Gradient Fades */}
      <div 
        ref={containerRef}
        onTouchStart={() => setIsManuallyPaused(true)}
        onTouchEnd={() => setIsManuallyPaused(false)}
        className="relative overflow-x-hidden overflow-y-visible py-2 marquee-pause-on-hover touch-pan-y"
      >
        {/* Left & Right Subtle Soft Edge Fade Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 sm:w-14 bg-gradient-to-r from-surface-light via-surface-light/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 sm:w-14 bg-gradient-to-l from-surface-light via-surface-light/80 to-transparent z-10" />

        {/* Continuous Smooth Infinite Marquee Track */}
        <div 
          className={`flex items-stretch gap-3 sm:gap-5 ${animationClass}`}
          style={{
            animationPlayState: isManuallyPaused ? 'paused' : 'running',
            ...(calculatedDuration ? { animationDuration: calculatedDuration } : {})
          }}
        >
          {doubledProducts.map((product, idx) => (
            <div 
              key={`${product.id}-${idx}`}
              className={`shrink-0 ${cardWidth} flex`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

const ProductAutoSlider = React.memo(ProductAutoSliderComponent);
export default ProductAutoSlider;
