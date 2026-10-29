import React from 'react';
import Logo from './Logo';
import { BUSINESS_INFO } from '../data/business';
import { Phone, MessageCircle, MapPin, Clock, ShieldAlert, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const medicineSpecialities = [
    "Prescription Medicines (Rx)",
    "Fever, Cold & Cough",
    "Diabetes & BP Chronic Care",
    "Vitamins & Supplements",
    "Pain Relief Ointments & Sprays",
    "Digital BP & Sugar Monitors",
    "Baby Care & Nutrition",
    "First Aid & Antiseptics"
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-28 md:pb-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo textClassName="text-xl text-white" />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mt-3">
              Flora Pharmacy is your trusted neighborhood healthcare store in Borivali East, Mumbai. Providing authentic medicines, clinical supplies, and prompt home delivery.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                  "Hello Flora Pharmacy, I have an enquiry."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-wa/20 text-wa hover:bg-wa hover:text-white flex items-center justify-center transition"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
              </a>
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition"
                aria-label="Call Store"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }} className="hover:text-emerald-400 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#order-medicines" onClick={(e) => { e.preventDefault(); handleNavClick('#order-medicines'); }} className="hover:text-emerald-400 transition">
                  Order Medicines
                </a>
              </li>
              <li>
                <a href="#prescription" onClick={(e) => { e.preventDefault(); handleNavClick('#prescription'); }} className="hover:text-emerald-400 transition">
                  Upload Prescription
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('#services'); }} className="hover:text-emerald-400 transition">
                  Services
                </a>
              </li>
              <li>
                <a href="#founder" onClick={(e) => { e.preventDefault(); handleNavClick('#founder'); }} className="hover:text-emerald-400 transition">
                  Our Founder
                </a>
              </li>
              <li>
                <a href="#reviews" onClick={(e) => { e.preventDefault(); handleNavClick('#reviews'); }} className="hover:text-emerald-400 transition">
                  Customer Reviews
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => { e.preventDefault(); handleNavClick('#faq'); }} className="hover:text-emerald-400 transition">
                  Frequently Asked Questions (FAQ)
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }} className="hover:text-emerald-400 transition">
                  Store & Directions
                </a>
              </li>
            </ul>
          </div>

          {/* Medicines & Healthcare Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Available Categories
            </h4>
            <ul className="grid grid-cols-1 gap-2 text-xs text-slate-400">
              {medicineSpecialities.map((item) => (
                <li key={item}>
                  <a
                    href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                      `Hello Flora Pharmacy, I want to enquire about ${item}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs sm:text-sm text-slate-400">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Store Info
            </h4>

            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">
                  Shop No. 7, Samarpan, Western Urban Rd, near Magathane Metro, Borivali East, Mumbai 400066
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs">Mon – Sun: 9:00 AM – 11:00 PM</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-xs hover:text-white transition">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Local Area Coverage for Local Search SEO */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-slate-400 text-xs">
          <span className="font-bold text-slate-300 block mb-1">
            📍 Prompt Medicine Home Delivery Across Borivali & Kandivali:
          </span>
          <p className="text-[11px] leading-relaxed text-slate-400">
            Samarpan Tower, Western Urban Road, Magathane Metro Station, Rivali Park, Nancy Colony, Carter Road, Ashokvan, Kulupwadi, Rajendra Nagar, Borivali East (400066), Kandivali East (400101), and Dahisar East.
          </p>
        </div>

        {/* Legal Medical Disclaimer Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-400 text-xs leading-relaxed space-y-1.5">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Important Medical Disclaimer</span>
          </div>
          <p>
            Information on this website is for general informational purposes only and is not intended to replace professional medical advice, diagnosis, or treatment. Always consult a licensed physician or healthcare specialist before starting any medication or treatment. Prescription medications are dispensed strictly against a valid prescription issued by a registered medical practitioner.
          </p>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} Flora Pharmacy. All rights reserved. Borivali East, Mumbai.
          </p>
          <div className="flex items-center gap-1">
            <span>Crafted for patient care in Mumbai</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current ml-0.5" />
          </div>
        </div>

      </div>
    </footer>
  );
}