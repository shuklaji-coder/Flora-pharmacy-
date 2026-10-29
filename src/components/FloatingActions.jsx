import React from 'react';
import { BUSINESS_INFO } from '../data/business';
import { MessageCircle, Phone, Camera } from 'lucide-react';

export default function FloatingActions() {
  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    "Hello Flora Pharmacy, I would like to order medicines / check product availability."
  )}`;

  const handleScrollToPrescription = () => {
    const el = document.getElementById('prescription');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop & Tablet Floating WhatsApp Button (Bottom Right, Pulsing) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-end gap-3">
        {/* Floating Prescription Quick-Action Button */}
        <button
          onClick={handleScrollToPrescription}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white text-slate-800 border border-emerald-200 shadow-soft hover:shadow-md transition transform hover:-translate-y-0.5"
          aria-label="Upload Doctor Prescription"
        >
          <Camera className="w-4 h-4 text-flora-700 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold text-slate-700 group-hover:text-flora-700">
            Upload Prescription
          </span>
        </button>

        {/* Pulsing WhatsApp Button */}
        <div className="relative flex items-center justify-center">
          {/* Subtle pulse wave */}
          <span className="absolute inline-flex h-16 w-16 rounded-full bg-wa/40 animate-pulse-ring pointer-events-none" />

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shimmer-button relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-wa hover:bg-wa-dark text-white font-bold text-sm shadow-glow hover:shadow-xl transition transform hover:scale-105"
            aria-label="Chat on WhatsApp with Flora Pharmacy"
          >
            <MessageCircle className="w-6 h-6 fill-current" />
            <span className="hidden md:inline">Order on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar (Visible only on small screens) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2.5 shadow-2xl">
        <div className="grid grid-cols-2 gap-2">
          
          {/* Call Store CTA */}
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition active:scale-95"
          >
            <Phone className="w-4 h-4 text-flora-700" />
            <span>Call Store</span>
          </a>

          {/* WhatsApp CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shimmer-button flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-wa hover:bg-wa-dark text-white text-xs font-bold transition shadow-md active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Order on WhatsApp</span>
          </a>

        </div>
      </div>
    </>
  );
}