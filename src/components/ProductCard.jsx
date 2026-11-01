import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Plus, 
  Minus, 
  Star, 
  ShieldCheck, 
  Heart, 
  Zap, 
  MessageCircle, 
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  Clock
} from 'lucide-react';
import ProductPackshot from './ProductPackshot';
import { BUSINESS_INFO } from '../data/business';

function ProductCardComponent({ product }) {
  const { addToCart, updateCartQuantity, getItemQuantity } = useStore();
  const [isLiked, setIsLiked] = useState(false);
  const quantity = getItemQuantity(product.id);

  const whatsappDirect = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    `Hello Flora Pharmacy, I want to order / enquire about ${product.name} (₹${product.price}). Is it available for fast delivery in Borivali?`
  )}`;

  const discountAmount = Math.max(0, (product.mrp || product.price) - product.price);

  return (
    <div className="card-hover-lift h-full w-full bg-white rounded-[26px] border border-slate-200/90 hover:border-emerald-400 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_18px_36px_-6px_rgba(15,123,79,0.16)] flex flex-col justify-between overflow-hidden group relative select-none will-change-transform">
      
      {/* Top Accent Line on Hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-flora-600 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20" />

      {/* Top Left: Discount & Specialty Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 pointer-events-none">
        {product.discount > 0 && (
          <span className="px-2.5 py-1 rounded-xl text-[10.5px] font-black uppercase tracking-wider bg-gradient-to-r from-emerald-600 via-emerald-700 to-flora-800 text-white shadow-xs flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-amber-300 fill-current" />
            <span>{product.discount}% OFF</span>
          </span>
        )}
        {product.badge && (
          <span className="px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider bg-slate-900 text-white shadow-2xs">
            {product.badge}
          </span>
        )}
      </div>

      {/* Top Right: Express 30m Delivery Badge & Heart Wishlist Button */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9.5px] font-black bg-amber-100 text-amber-950 border border-amber-300/80 shadow-2xs">
          <Zap className="w-2.5 h-2.5 fill-current text-amber-600" />
          <span>30m</span>
        </span>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition shadow-2xs cursor-pointer ${
            isLiked 
              ? 'bg-rose-50 text-rose-600 border border-rose-200 scale-110' 
              : 'bg-white hover:bg-slate-50 text-slate-400 hover:text-rose-500 border border-slate-200/80 active:scale-90'
          }`}
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current text-rose-600' : ''}`} />
        </button>
      </div>

      {/* Product Packshot Showcase (Clean White & Soft Studio Vignette) */}
      <div className="relative h-44 sm:h-50 w-full bg-gradient-to-b from-slate-50/70 via-white to-emerald-50/15 overflow-hidden border-b border-slate-100 flex items-center justify-center p-4">
        
        {/* Soft Pedestal Shadow */}
        <div className="absolute bottom-3 w-32 h-2.5 bg-slate-400/15 rounded-full blur-xs pointer-events-none" />
        
        <div className="w-full h-full transform group-hover:scale-108 transition-transform duration-500 ease-out flex items-center justify-center">
          <ProductPackshot product={product} />
        </div>

        {/* Rx / OTC Indicator Tag (Bottom Left of Image) */}
        <div className="absolute bottom-2 left-2.5 z-10">
          {product.requiresPrescription ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-black bg-rose-50 text-rose-700 border border-rose-200/80 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              <span>Rx Required</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs">
              <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" />
              <span>100% Genuine</span>
            </span>
          )}
        </div>
      </div>

      {/* Product Content & Details Area */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Brand Tagline & Customer Rating Row */}
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            <span className="text-flora-800 font-extrabold truncate max-w-[130px]">
              {product.brandInfo || "Flora Certified"}
            </span>
            <span className="text-amber-500 flex items-center gap-1 shrink-0 bg-amber-50/90 px-1.5 py-0.5 rounded-md border border-amber-200/60">
              <Star className="w-3 h-3 fill-current text-amber-500" />
              <span className="font-black text-[10px] text-amber-900">{product.rating || "4.8"}</span>
            </span>
          </div>

          {/* Product Name */}
          <h4 className="font-heading font-black text-slate-900 text-xs sm:text-sm leading-snug line-clamp-2 group-hover:text-flora-800 transition-colors">
            {product.name}
          </h4>

          {/* Form Factor & Fresh Stock Tag */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mt-1.5">
            <span className="truncate max-w-[135px] text-slate-600">{product.form || "Standard Pack"}</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1 text-[10px] shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>In-Stock</span>
            </span>
          </div>
        </div>

        {/* Pricing, Savings & Action Row */}
        <div className="pt-2.5 border-t border-slate-100 space-y-2">
          
          <div className="flex items-center justify-between gap-2">
            {/* Price with Strike-through & Savings */}
            <div>
              <div className="flex items-baseline gap-1.5 leading-none">
                <span className="font-heading font-black text-base sm:text-lg text-slate-950">
                  ₹{product.price}
                </span>
                {product.mrp && product.mrp > product.price && (
                  <span className="text-xs text-slate-400 line-through font-semibold">
                    ₹{product.mrp}
                  </span>
                )}
              </div>
              {discountAmount > 0 ? (
                <span className="text-[10px] text-emerald-800 font-black bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60 block mt-1 w-fit">
                  Save ₹{discountAmount}
                </span>
              ) : (
                <span className="text-[10px] text-slate-400 font-medium block mt-1">
                  Inclusive of all taxes
                </span>
              )}
            </div>

            {/* Interactive Actions: ADD Button vs [-] qty [+] Selector + WhatsApp */}
            <div className="flex items-center gap-1.5 shrink-0">
              {quantity === 0 ? (
                <button
                  onClick={() => addToCart(product, 1)}
                  className="shimmer-button px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl font-heading font-black text-xs bg-gradient-to-r from-flora-700 to-flora-800 hover:from-flora-800 hover:to-flora-950 text-white shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 flex items-center gap-1.5 cursor-pointer"
                  aria-label={`Add ${product.name} to Cart`}
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>ADD</span>
                </button>
              ) : (
                <div className="flex items-center bg-flora-800 text-white rounded-2xl shadow-md overflow-hidden border border-emerald-500">
                  <button
                    onClick={() => updateCartQuantity(product.id, quantity - 1)}
                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-flora-900 active:bg-black transition cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                  <span className="w-6 sm:w-7 text-center font-heading font-black text-xs select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(product.id, quantity + 1)}
                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-flora-900 active:bg-black transition cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                </div>
              )}

              {/* Direct WhatsApp Quick Order */}
              <a
                href={whatsappDirect}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-wa/10 hover:bg-wa text-wa-dark hover:text-white border border-wa/25 hover:border-wa flex items-center justify-center transition shadow-2xs cursor-pointer active:scale-95"
                title="Order directly on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Micro Delivery Guarantee Footer */}
          <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>30-min delivery</span>
            </span>
            <span className="text-emerald-700 font-bold">Borivali East</span>
          </div>

        </div>

      </div>

    </div>
  );
}

const ProductCard = React.memo(ProductCardComponent);
export default ProductCard;
