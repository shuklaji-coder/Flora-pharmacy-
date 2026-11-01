import React from 'react';
import { motion } from 'framer-motion';
import { BUSINESS_INFO } from '../data/business';
import { useStore } from '../context/StoreContext';
import { MessageCircle, Phone, ShoppingBag } from 'lucide-react';

export default function FloatingActions() {
  const { cartCount, cartSubtotal, setIsCartOpen } = useStore();

  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    "Hello Flora Pharmacy, I would like to order medicines / check product availability."
  )}`;

  return (
    <>
      {/* Desktop & Tablet Floating Actions (Bottom Right) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-end gap-3"
      >
        {/* Floating Cart Button when cart has items */}
        {cartCount > 0 && (
          <motion.button
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900 text-white border border-slate-700 shadow-xl hover:bg-black transition"
            aria-label="View Cart"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 rounded-full bg-wa text-slate-950 font-black text-[9px] flex items-center justify-center">
                {cartCount}
              </span>
            </div>
            <span className="text-xs font-bold text-slate-200">
              View Cart • ₹{cartSubtotal}
            </span>
          </motion.button>
        )}

        {/* Pulsing WhatsApp Button */}
        <div className="relative flex items-center justify-center">
          <span className="absolute inline-flex h-16 w-16 rounded-full bg-wa/40 animate-pulse-ring pointer-events-none" />

          <motion.a
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shimmer-button relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-wa hover:bg-wa-dark text-white font-bold text-sm shadow-glow hover:shadow-xl transition"
            aria-label="Chat on WhatsApp with Flora Pharmacy"
          >
            <MessageCircle className="w-6 h-6 fill-current" />
            <span className="hidden md:inline">Order on WhatsApp</span>
          </motion.a>
        </div>
      </motion.div>

      {/* Mobile Sticky Bottom Bar (Visible only on small screens) */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-2xl"
      >
        <div className="grid grid-cols-3 gap-2">
          {/* Call Store CTA */}
          <motion.a
            whileTap={{ scale: 0.95 }}
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold transition"
          >
            <Phone className="w-4 h-4 text-flora-700 mb-0.5" />
            <span>Call Store</span>
          </motion.a>

          {/* Cart CTA */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
            className="relative flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-flora-50 text-flora-800 border border-flora-200 text-[11px] font-bold transition"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-flora-700 mb-0.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2.5 w-3.5 h-3.5 rounded-full bg-wa text-slate-950 font-black text-[9px] flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span>{cartCount > 0 ? `Cart (₹${cartSubtotal})` : 'Cart'}</span>
          </motion.button>

          {/* WhatsApp CTA */}
          <motion.a
            whileTap={{ scale: 0.95 }}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shimmer-button flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-wa hover:bg-wa-dark text-white text-[11px] font-bold transition shadow-xs"
          >
            <MessageCircle className="w-4 h-4 fill-current mb-0.5" />
            <span>WhatsApp</span>
          </motion.a>
        </div>
      </motion.div>
    </>
  );
}
