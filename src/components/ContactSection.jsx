import React from 'react';
import { BUSINESS_INFO } from '../data/business';
import { MapPin, Phone, Clock, MessageCircle, Navigation, ExternalLink, ShieldCheck, Store, BadgeCheck } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-12 sm:py-20 bg-white/90 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-10">
          <span className="text-xs font-bold text-flora-700 uppercase tracking-widest bg-flora-50 px-3 py-1 rounded-full border border-flora-100">
            Visit & Contact Us
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Our Store & Location
          </h2>
          <p className="text-xs sm:text-base text-slate-600">
            Western Urban Road, Magathane Metro ke paas Samarpan Tower me humara chemist counter hai.
          </p>
        </div>

        {/* Real Store Photo Banner */}
        <div className="mb-8 rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-slate-900 to-flora-950 text-white p-4 sm:p-6 shadow-soft flex flex-col md:flex-row items-center gap-6 border border-emerald-900/50">
          <div className="w-full md:w-64 h-48 rounded-2xl overflow-hidden shrink-0 border-2 border-emerald-400/40 shadow-md">
            <img 
              src="/images/flora-storefront.jpg" 
              alt="Flora Pharmacy Real Storefront Signboard"
              className="w-full h-full object-cover object-top hover:scale-105 transition duration-500" 
            />
          </div>
          <div className="space-y-2 flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[11px] font-bold">
              <BadgeCheck className="w-3.5 h-3.5" />
              <span>Official Chemist Signboard</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-heading text-white">
              Look for the "+ FLORA PHARMACY +" Signboard
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Samarpan Tower, Western Urban Road par aate hi green medical crosses wala white board aapko samne dikhega. Metro se sirf 2 minute ki walking distance hai.
            </p>
            <div className="pt-1 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a
                href={BUSINESS_INFO.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-flora-700 hover:bg-flora-800 text-white text-xs font-bold transition shadow"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open Google Maps Directions</span>
              </a>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Store: {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Card (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-5">
            
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-soft space-y-5">
              
              {/* Address item */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-flora-50 border border-flora-100 text-flora-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-slate-900 text-base mb-1">
                    Store Address
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {BUSINESS_INFO.address}
                  </p>
                  <div className="mt-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg inline-block border border-emerald-100">
                    📍 {BUSINESS_INFO.landmark}
                  </div>
                </div>
              </div>

              {/* Operating Hours item */}
              <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                <div className="w-11 h-11 rounded-2xl bg-tealAccent-50 border border-tealAccent-100 text-tealAccent-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-slate-900 text-base mb-1">
                    Pharmacy Working Hours
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-slate-900">
                    {BUSINESS_INFO.hoursFormatted.days}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {BUSINESS_INFO.hoursFormatted.time} (All 7 Days Open)
                  </p>
                </div>
              </div>

              {/* Phone and WhatsApp */}
              <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-slate-900 text-base mb-1">
                    Direct Phone & WhatsApp
                  </h3>
                  <p className="text-sm font-bold text-slate-900">
                    <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="hover:text-flora-700 transition">
                      {BUSINESS_INFO.phone}
                    </a>
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Call or WhatsApp for home delivery anywhere in Borivali East
                  </p>
                </div>
              </div>

              {/* Get Directions CTA Button */}
              <div className="pt-1">
                <a
                  href={BUSINESS_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-sm font-bold text-white bg-flora-700 hover:bg-flora-800 shadow-md transition"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions on Google Maps</span>
                </a>
              </div>

            </div>

            {/* Delivery coverage area notice */}
            <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200 flex items-center gap-3 text-xs text-emerald-950 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>Home Delivery Areas:</strong> Magathane, Borivali East, Rivali Park surroundings, Nancy Colony, Carter Road, and Kandivali East.
              </span>
            </div>

          </div>

          {/* Embedded Google Map (7 cols on lg) */}
          <div className="lg:col-span-7 h-full">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-soft h-[380px] sm:h-[450px] relative bg-slate-100">
              <iframe
                title="Flora Pharmacy Store Location Map"
                src="https://maps.google.com/maps?q=Flora%20Pharmacy%20Shop%207%20Samarpan%20Western%20Urban%20Rd%20Magathane%20Borivali%20East%20Mumbai&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter saturate-110"
              />

              {/* Map Floating Card */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-lg border border-slate-200 text-xs">
                <div className="font-heading font-bold text-slate-900">
                  Flora Pharmacy
                </div>
                <div className="text-slate-600 text-[11px] mt-0.5">
                  Shop 7, Samarpan Tower, Western Urban Rd, Magathane
                </div>
                <a
                  href={BUSINESS_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-flora-700 font-bold flex items-center gap-1 hover:underline text-[11px]"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
