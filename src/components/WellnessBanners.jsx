import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Tag, 
  ArrowRight, 
  Zap, 
  HeartHandshake
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BUSINESS_INFO } from '../data/business';

export default function WellnessBanners() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const { setSelectedCategory, setSearchQuery } = useStore();

  const banners = [
    {
      id: "flora-wellness-destination",
      badge: "ONE-STOP HEALTH STORE",
      title: "Your One-Stop Health & Wellness Destination",
      subtitle: "Care for the Whole Family, Every Day. Everything You Need, All in One Place!",
      cta: "Shop All Categories",
      buttonLabel: "Shop All Categories",
      categoryTarget: "All",
      searchQuery: "",
      image: "/images/banner-wellness-destination.png",
      bgClass: "bg-[#e2f4f8]"
    },
    {
      id: "diwali-mega-discount",
      badge: "FESTIVE SALE",
      title: "Happy Diwali - Heavy Discount On All Categories",
      subtitle: "May the Festival of Lights Bring Good Health, Happiness & Wellness!",
      cta: "Shop Diwali Offers",
      buttonLabel: "Shop Diwali Offers",
      categoryTarget: "All",
      searchQuery: "",
      image: "/images/banner-diwali.jpg",
      bgClass: "bg-[#18042b]"
    },
    {
      id: "cadbury-celebration-sweets",
      badge: "SWEET CELEBRATIONS",
      title: "Share Sweetness. Celebrate Together!",
      subtitle: "Treat Yourself To Sweet Happiness. Find All Your Favorite Cadbury Treats.",
      cta: "Shop Cadbury Treats",
      buttonLabel: "Shop Cadbury Treats",
      categoryTarget: "Chocolates & Treats",
      searchQuery: "Cadbury",
      image: "/images/banner-cadbury-celebration.jpg",
      bgClass: "bg-[#250d44]"
    },
    {
      id: "amul-icecreams-joy",
      badge: "DELIVERED FROZEN COLD",
      title: "Celebrate Summer's Best! Pure Creamy Joy!",
      subtitle: "Amul Real Milk Ice Creams for Everyone - Cones, Kulfis, Tubs & Bars.",
      cta: "Shop Amul Ice Creams",
      buttonLabel: "Shop Amul Ice Creams",
      categoryTarget: "Ice Creams & Dairy",
      searchQuery: "Amul",
      image: "/images/banner-amul-icecreams.jpg",
      bgClass: "bg-[#0c2a1a]"
    },
    {
      id: "cetaphil-flora",
      badge: "DERMATOLOGIST RECOMMENDED",
      title: "Cetaphil Gentle Skincare Range",
      subtitle: "Gentle Care. Lasting Protection. For Healthy, Hydrated & Radiant Skin.",
      cta: "Shop Cetaphil",
      buttonLabel: "Shop Cetaphil Range",
      categoryTarget: "Personal Care",
      searchQuery: "Cetaphil",
      image: "/images/banner-cetaphil.jpg",
      bgClass: "bg-[#e0f2fe]"
    },
    {
      id: "johnsons-baby-gentle",
      badge: "PEDIATRICIAN RECOMMENDED",
      title: "Johnson's Baby - Ultra Gentle Care & Pure Protection",
      subtitle: "Tear-Free Formula, Clinically Proven Mild for Your Baby's Delicate Skin.",
      cta: "Shop Baby Care",
      buttonLabel: "Shop Johnson's Baby Range",
      categoryTarget: "Baby Care",
      searchQuery: "Johnson",
      image: "/images/banner-johnsons-baby.png",
      bgClass: "bg-[#e8f7ff]"
    },
    {
      id: "multivitamins-family",
      badge: "FAMILY IMMUNITY",
      title: "Stay Healthy, Stay Strong with Multivitamins",
      subtitle: "Centrum, One A Day, Nature Made & Olly for a Healthier & Happier You.",
      cta: "Shop Multivitamins",
      buttonLabel: "Shop Multivitamins",
      categoryTarget: "Vitamins & Supplements",
      searchQuery: "Multivitamin",
      image: "/images/banner-multivitamins.jpg",
      bgClass: "bg-[#dbeafe]"
    },
    {
      id: "prescription-whatsapp-packing",
      isWhatsApp: true,
      badge: "10-MIN PACKING",
      title: "Order Prescriptions via WhatsApp",
      subtitle: "Send prescription photo to Premprakash Sirvi. Verified counter batch packed instantly.",
      cta: "Send Prescription",
      buttonLabel: "Send Prescription on WhatsApp",
      image: "/images/banner-prescription-whatsapp.png",
      bgClass: "bg-[#f4faf6]"
    }
  ];

  // Continuous auto-sliding timer (3.8 seconds per slide)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [banners.length, isPaused]);

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleDotClick = (i) => {
    setDirection(i > currentSlide ? 1 : -1);
    setCurrentSlide(i);
  };

  const handleBannerAction = (banner) => {
    if (banner.isWhatsApp) {
      window.open(
        `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
          "Hello Flora Pharmacy, I want to send my prescription photo for 10-minute counter packing."
        )}`,
        '_blank'
      );
      return;
    }
    if (banner.searchQuery) {
      setSearchQuery(banner.searchQuery);
      setSelectedCategory("All");
    } else {
      setSelectedCategory(banner.categoryTarget || "All");
      setSearchQuery("");
    }
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const current = banners[currentSlide];

  // Slide variants for physical horizontal sliding
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0.6
    }),
    center: {
      x: 0,
      opacity: 1,
      zIndex: 1
    },
    exit: (dir) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0.6,
      zIndex: 0
    })
  };

  return (
    <section className="relative max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-6">
      
      {/* 1. MAIN HERO CAROUSEL */}
      <div 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative w-full aspect-[16/9] max-h-[660px] xl:max-h-[720px] min-h-[220px] sm:min-h-[340px] md:min-h-[440px] lg:min-h-[520px] xl:min-h-[580px] rounded-3xl sm:rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200/60 bg-slate-950"
      >
        {/* Animated Top Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-30 overflow-hidden pointer-events-none">
          <motion.div
            key={currentSlide + (isPaused ? '-paused' : '-active')}
            initial={{ width: "0%" }}
            animate={{ width: isPaused ? "0%" : "100%" }}
            transition={{ duration: isPaused ? 0 : 3.8, ease: "linear" }}
            className="h-full bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400"
          />
        </div>

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "tween", ease: [0.25, 1, 0.5, 1], duration: 0.6 },
              opacity: { duration: 0.35 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset }) => {
              if (offset.x > 50) handlePrev();
              else if (offset.x < -50) handleNext();
            }}
            className="absolute inset-0 w-full h-full cursor-pointer group flex items-center justify-center overflow-hidden"
            onClick={() => handleBannerAction(current)}
          >
            <div className={`w-full h-full flex items-center justify-center ${current.bgClass || 'bg-slate-950'} relative`}>
              <img 
                src={current.image}
                alt={current.title}
                className="w-full h-full object-contain sm:object-cover md:object-contain xl:object-cover object-center transform group-hover:scale-[1.012] transition-transform duration-700 select-none"
              />

              {/* Subtle gradient vignette at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

              {/* Floating Quick Shop Pill */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 lg:bottom-8 lg:right-10 z-10 flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-2xl bg-slate-950/90 hover:bg-black text-white text-xs sm:text-sm font-black backdrop-blur-md border border-white/25 shadow-2xl group-hover:scale-105 transition-all">
                <span>{current.buttonLabel || current.cta || "Shop Now"}</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Prev/Next Buttons */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/45 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition shadow-xl z-20 border border-white/20 hover:scale-110 active:scale-95"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/45 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition shadow-xl z-20 border border-white/20 hover:scale-110 active:scale-95"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Carousel Dots / Pill Indicators */}
        <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
          {banners.map((b, i) => (
            <button
              key={b.id}
              onClick={(e) => {
                e.stopPropagation();
                handleDotClick(i);
              }}
              className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 shadow-xs ${
                i === currentSlide ? 'w-8 sm:w-10 bg-emerald-400 shadow-glow' : 'w-2 sm:w-2.5 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>

      {/* 2. 4-PILLAR VALUE PROPS TICKER (Tata 1mg / Wellness Forever Style) */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
        
        <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-flora-800 flex items-center justify-center shrink-0 border border-emerald-100">
            <Zap className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900 leading-tight">30-Min Express</h4>
            <p className="text-[11px] text-slate-500">Borivali East & Magathane</p>
          </div>
        </div>

        <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center shrink-0 border border-blue-100">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900 leading-tight">100% Genuine</h4>
            <p className="text-[11px] text-slate-500">Direct licensed distributor</p>
          </div>
        </div>

        <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center shrink-0 border border-purple-100">
            <HeartHandshake className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900 leading-tight">D.Pharm Guidance</h4>
            <p className="text-[11px] text-slate-500">Free dose consultation</p>
          </div>
        </div>

        <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 border border-amber-100">
            <Tag className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900 leading-tight">Best Local Prices</h4>
            <p className="text-[11px] text-slate-500">Up to 25% off daily meds</p>
          </div>
        </div>

      </div>

    </section>
  );
}
