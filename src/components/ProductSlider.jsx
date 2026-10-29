import React, { useState, useRef, useEffect } from 'react';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { getProductWhatsAppUrl } from '../data/business';
import ProductPackshot from './ProductPackshot';
import { 
  ChevronLeft, 
  ChevronRight, 
  MessageCircle, 
  Plus, 
  Check, 
  Search, 
  LayoutGrid, 
  SlidersHorizontal,
  FileText,
  Sparkles,
  Info
} from 'lucide-react';

export default function ProductSlider({ 
  onAddToList, 
  isItemInList, 
  onOpenCart,
  activeCategory = "All",
  onCategoryChange,
  activeSearchQuery = "",
  onSearchChange
}) {
  const [selectedCategory, setSelectedCategory] = useState(activeCategory);
  const [searchQuery, setSearchQuery] = useState(activeSearchQuery);
  const [viewMode, setViewMode] = useState("carousel"); // "carousel" or "grid"
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef(null);

  // Sync with parent props when changed externally
  useEffect(() => {
    if (activeCategory) {
      setSelectedCategory(activeCategory);
    }
  }, [activeCategory]);

  useEffect(() => {
    if (activeSearchQuery !== undefined) {
      setSearchQuery(activeSearchQuery);
    }
  }, [activeSearchQuery]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    if (onCategoryChange) onCategoryChange(cat);
  };

  const handleSearchUpdate = (query) => {
    setSearchQuery(query);
    if (onSearchChange) onSearchChange(query);
  };

  // Filter products based on Category and Search Query
  const filteredProducts = PRODUCTS.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.brandInfo && item.brandInfo.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.tag && item.tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate product counts per category for the chips
  const categoryCounts = {};
  CATEGORIES.forEach((cat) => {
    if (cat === "All") {
      categoryCounts[cat] = PRODUCTS.length;
    } else {
      categoryCounts[cat] = PRODUCTS.filter(p => p.category === cat).length;
    }
  });

  // Autoplay for carousel
  useEffect(() => {
    if (viewMode !== "carousel" || isPaused || filteredProducts.length <= 3) return;

    const interval = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 15) {
          sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          sliderRef.current.scrollBy({ left: 330, behavior: 'smooth' });
        }
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [viewMode, isPaused, filteredProducts.length]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <section id="products" className="py-12 sm:py-20 bg-slate-50/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-flora-100 text-flora-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-flora-700" />
            <span>Real Indian Medical Store Products</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Order Genuine Medicines on WhatsApp
          </h2>
          <p className="text-xs sm:text-base text-slate-600">
            Dolo 650, Vicks VapoRub, Inhaler, Volini, Electral, Becosules, Omron BP monitor aur daily household health essentials. 
            Tap <strong className="text-wa-dark font-bold">"Order on WhatsApp"</strong> for instant availability.
          </p>
        </div>

        {/* Search Bar & View Mode Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 bg-white p-3 rounded-2xl shadow-xs border border-slate-200">
          
          {/* Search Bar */}
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchUpdate(e.target.value)}
              placeholder="Search Vicks, Dolo 650, BP Monitor, Volini, Diapers..."
              className="w-full pl-10 pr-12 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-flora-600 focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchUpdate("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Right Controls: View Switcher & Carousel Arrows */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode("carousel")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  viewMode === "carousel"
                    ? "bg-white text-flora-800 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Slider View"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Slider</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  viewMode === "grid"
                    ? "bg-white text-flora-800 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
            </div>

            {/* Desktop Carousel Arrows */}
            {viewMode === "carousel" && (
              <div className="hidden sm:flex items-center gap-1.5">
                <button
                  onClick={scrollLeft}
                  className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-flora-700 transition shadow-xs"
                  aria-label="Previous products"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={scrollRight}
                  className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-flora-700 transition shadow-xs"
                  aria-label="Next products"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Category Filter Chips with counts */}
        <div className="relative mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2.5 custom-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              const count = categoryCounts[category] || 0;
              return (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`shrink-0 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-flora-700 text-white shadow-sm'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                  }`}
                >
                  <span>{category}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Display (Carousel OR Grid) */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200 p-8 shadow-xs">
            <p className="text-slate-600 font-medium">
              No products found matching "{searchQuery}" in {selectedCategory}.
            </p>
            <button
              onClick={() => {
                handleCategorySelect("All");
                handleSearchUpdate("");
              }}
              className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-flora-700 bg-flora-50 hover:bg-flora-100 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === "carousel" ? (
          /* Smooth Horizontal Carousel */
          <div
            ref={sliderRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className="flex items-stretch gap-5 overflow-x-auto pb-6 pt-2 px-1 snap-x snap-mandatory custom-scrollbar"
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="w-[280px] sm:w-[315px] shrink-0 snap-start flex flex-col"
              >
                <ProductCard
                  product={product}
                  onAddToList={onAddToList}
                  isInList={isItemInList(product.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToList={onAddToList}
                isInList={isItemInList(product.id)}
              />
            ))}
          </div>
        )}

        {/* Slider Controls Hint for Mobile */}
        {viewMode === "carousel" && filteredProducts.length > 0 && (
          <div className="flex sm:hidden items-center justify-center gap-2 pt-2 text-xs text-slate-400">
            <span>← Swipe left/right to view more items →</span>
          </div>
        )}

        {/* Bottom Banner Notice */}
        <div className="mt-8 p-4 rounded-2xl bg-white border border-emerald-100 shadow-xs flex items-center justify-between flex-wrap gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-flora-600 shrink-0" />
            <span>
              <strong>Note:</strong> We stock all doctor-prescribed brands & generic salts. Agar koi dawai list me na mile, bas WhatsApp par photo bhej dijiye!
            </span>
          </div>
          <span className="font-bold text-flora-800 bg-flora-50 px-2.5 py-1 rounded-lg">
            Showing {filteredProducts.length} items
          </span>
        </div>

      </div>
    </section>
  );
}

/**
 * Single Product Card Component with Authentic Packshot Visual
 */
function ProductCard({ product, onAddToList, isInList }) {
  const whatsappUrl = getProductWhatsAppUrl(product.name);

  return (
    <div className="card-hover-lift h-full bg-white rounded-2xl border border-slate-200/90 shadow-soft hover:shadow-soft-lg hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      
      {/* Authentic Indian Packshot Container */}
      <div className="relative h-44 w-full bg-slate-50 overflow-hidden border-b border-slate-100">
        <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-500">
          <ProductPackshot product={product} />
        </div>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1 z-10 pointer-events-none">
          {product.badge && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-flora-700 text-white shadow-xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Prescription Required Badge */}
        {product.requiresPrescription && (
          <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500 text-white shadow-xs">
              <FileText className="w-3 h-3" />
              <span>Rx Required</span>
            </span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Brand & Manufacturer Info */}
          {product.brandInfo && (
            <p className="text-[11px] font-bold text-flora-800 uppercase tracking-wider line-clamp-1 mb-1">
              {product.brandInfo}
            </p>
          )}

          <h3 className="font-heading font-bold text-slate-900 text-sm leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-flora-700 transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Action Buttons: Order on WhatsApp & Add to List */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          
          {/* Direct WhatsApp Order Button with shimmer shine */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shimmer-button w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-wa hover:bg-wa-dark shadow-xs hover:shadow transition transform active:scale-95"
            aria-label={`Order ${product.name} on WhatsApp`}
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>Order on WhatsApp</span>
          </a>

          {/* Add to List / Multi-item enquiry option */}
          <button
            onClick={() => onAddToList(product)}
            className={`w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-semibold border transition active:scale-95 ${
              isInList
                ? 'bg-flora-50 text-flora-800 border-flora-300 hover:bg-flora-100'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {isInList ? (
              <>
                <Check className="w-3.5 h-3.5 text-flora-700" />
                <span className="font-bold text-flora-700">Added in My List</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-slate-500" />
                <span>Add to My List</span>
              </>
            )}
          </button>

        </div>
      </div>

    </div>
  );
}
