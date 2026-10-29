import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/business';
import { Search, MessageCircle, Camera, Check, Sparkles, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

export default function QuickMedicineOrder() {
  const [medicineText, setMedicineText] = useState("");

  const popularMedicines = [
    "Dolo 650",
    "Shelcal 500",
    "Becosules Z",
    "Volini Spray",
    "Digene Gel",
    "Eno Sachets",
    "Electral ORS",
    "Omron BP Monitor",
    "Pampers Pants",
    "Betadine Ointment"
  ];

  const handleAddMedicine = (med) => {
    if (!medicineText.trim()) {
      setMedicineText(med);
    } else if (!medicineText.includes(med)) {
      setMedicineText(`${medicineText.trim()}, ${med}`);
    }
  };

  const handleSendToWhatsApp = (e) => {
    e.preventDefault();
    const query = medicineText.trim();
    if (!query) {
      alert("Kripya dawai ka naam ya list likhein!");
      return;
    }

    const message = `Hello Flora Pharmacy,\nI would like to order / check availability for the following medicines:\n\n💊 *Medicine / Items:* ${query}\n\nPlease confirm availability, total bill, and delivery time to Borivali East.`;
    const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleScrollToPrescription = () => {
    const el = document.getElementById('prescription');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="order-medicines" className="py-10 sm:py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Box */}
        <div className="bg-gradient-to-br from-emerald-50/70 via-white to-tealAccent-50/50 rounded-3xl border-2 border-emerald-200/90 shadow-soft-lg p-6 sm:p-10 relative overflow-hidden">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-emerald-200/30 blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center space-y-3 relative z-10">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-flora-100 text-flora-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-flora-700" />
              <span>Instant Medicine Order</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
              Koi Bhi Dawai Chahiye? Bas Naam Likhein
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              Borivali East & Kandivali me sabhi 100% genuine branded aur generic medicines available hain. Dawai ka naam likhiye aur 1-tap me WhatsApp par bhejiye!
            </p>

            {/* Quick Medicine Order Input Box */}
            <form onSubmit={handleSendToWhatsApp} className="pt-4 max-w-2xl mx-auto">
              <div className="relative flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl bg-white border-2 border-emerald-300 shadow-md focus-within:border-flora-600 transition">
                <div className="relative flex-1 w-full flex items-center pl-3">
                  <Search className="w-5 h-5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={medicineText}
                    onChange={(e) => setMedicineText(e.target.value)}
                    placeholder="Dawai ka naam likhein (e.g. Dolo 650, Shelcal 500, Sugar Strips)..."
                    className="w-full py-2.5 px-3 text-xs sm:text-sm text-slate-900 bg-transparent placeholder-slate-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="shimmer-button w-full sm:w-auto px-6 py-3 rounded-xl bg-wa hover:bg-wa-dark text-slate-950 hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition shrink-0 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Order on WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Popular Fast-Click Pills */}
            <div className="pt-4 space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Frequently Ordered:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                {popularMedicines.map((med) => {
                  const isSelected = medicineText.includes(med);
                  return (
                    <button
                      key={med}
                      type="button"
                      onClick={() => handleAddMedicine(med)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
                        isSelected
                          ? 'bg-flora-700 text-white border-flora-700 shadow-xs'
                          : 'bg-white hover:bg-emerald-50 text-slate-700 hover:text-flora-800 border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      <span>+ {med}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Doctor's Prescription Callout Pill */}
            <div className="pt-6 border-t border-emerald-200/60 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/80 p-4 rounded-2xl border border-emerald-100">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-flora-100 text-flora-800 flex items-center justify-center shrink-0">
                  <Camera className="w-5 h-5 text-flora-700" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Doctor Ki Parchi (Prescription) Hai?
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Photo kheecho aur website par upload karke direct WhatsApp par send karo.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleScrollToPrescription}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-flora-700 hover:bg-flora-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition shrink-0"
              >
                <span>Upload Prescription</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 3 Quick Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-[11px] text-slate-600 font-medium">
              <div className="flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Genuine Branded & Generic</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Fast Doorstep Delivery in Borivali East</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Long Expiry Date Verified</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}