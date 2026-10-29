import React from 'react';
import { BUSINESS_INFO } from '../data/business';
import { MessageCircle, Phone, Navigation, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const defaultWhatsAppOrder = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    "Hello Flora Pharmacy, I would like to order medicines / check product availability."
  )}`;

  return (
    <section id="home" className="relative w-full bg-white animate-fade-in">
      
      {/* 
        OFFICIAL FLORA PHARMACY BANNER
        100% visible, unblurred, no cropping, clean white background
      */}
      <div className="w-full relative overflow-hidden bg-white flex items-center justify-center group">
        <img
          src="/images/flora-banner.jpg"
          alt="Flora Pharmacy - Quality Medicines for a Healthier Tomorrow - फ्लोर फार्मेसी"
          className="w-full h-auto max-h-[85vh] object-contain block mx-auto shadow-xs transition-transform duration-700 group-hover:scale-[1.008]"
          loading="eager"
        />
      </div>

      {/* Sleek Action Bar Directly Below Banner */}
      <div className="bg-slate-900 text-white py-4 px-4 sm:px-6 border-t border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Store status & timings with animated pulse beacon */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 text-xs sm:text-sm text-slate-300">
            <div className="relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="absolute w-4 h-4 rounded-full bg-emerald-400/50 animate-ping"></span>
            </div>
            <span className="font-bold text-white">Open 7 Days:</span>
            <span className="text-emerald-300 font-medium">9:00 AM – 11:00 PM</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-400">Shop No. 7, Samarpan, Magathane, Borivali East</span>
          </div>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition border border-white/15 shadow-xs hover:-translate-y-0.5"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Call Store</span>
            </a>

            <a
              href={BUSINESS_INFO.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition border border-white/15 shadow-xs hover:-translate-y-0.5"
            >
              <Navigation className="w-3.5 h-3.5 text-emerald-400" />
              <span>Directions</span>
            </a>

            <a
              href={defaultWhatsAppOrder}
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-button inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-wa hover:bg-wa-dark text-slate-950 hover:text-white text-xs sm:text-sm font-bold transition shadow-md hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Order on WhatsApp</span>
            </a>
          </div>

        </div>
      </div>

    </section>
  );
}