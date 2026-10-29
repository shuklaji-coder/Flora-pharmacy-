import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle, Phone, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Kya Flora Pharmacy Borivali East me medicine home delivery provide karta hai?",
      qEn: "Does Flora Pharmacy provide home delivery in Borivali East?",
      a: "Haan! Flora Pharmacy Samarpan, Magathane Metro, Rivali Park, Nancy Colony, Carter Road, Ashokvan, Kulupwadi aur aas-paas ke sabhi Borivali East & Kandivali areas me fast doorstep delivery provide karta hai. Aap bas WhatsApp par dawai ka naam ya prescription photo bhej kar turant delivery manga sakte hain.",
      tag: "Home Delivery"
    },
    {
      q: "Flora Pharmacy ke store timings aur working hours kya hain?",
      qEn: "What are the pharmacy opening hours?",
      a: "Hum saaton din (Monday to Sunday) subah 9:00 AM se raat 11:00 PM tak khule rehte hain. Sundays aur public holidays par bhi counter open rehta hai taaki night emergencies me aapko dawai ke liye pareshan na hona pade.",
      tag: "Store Timings"
    },
    {
      q: "Doctor ki parchi (Prescription) se dawai kaise order karein?",
      qEn: "How to order medicines using a doctor's prescription?",
      a: "Website ke 'Upload Prescription' section me jakar apne mobile camera se prescription ki photo upload karein aur 1-tap me WhatsApp par send kar dein. Humare Registered Pharmacist (Premprakash Sirvi, D.Pharm) prescription verify karke total bill aur delivery time confirm kar denge.",
      tag: "Prescription Order"
    },
    {
      q: "Kya Flora Pharmacy par 100% genuine aur fresh expiry medicines milti hain?",
      qEn: "Are all medicines 100% genuine with long expiry?",
      a: "Bilkul! Flora Pharmacy direct authorized pharma company distributors (Sun Pharma, Cipla, Abbott, Mankind, Torrent, etc.) se medicines procure karta hai. Sabhi medicines computerized billing, batch verification aur safe storage ke saath di jaati hain.",
      tag: "100% Genuine"
    },
    {
      q: "Digital BP Machine, Sugar Meter aur Nebulizer milta hai kya?",
      qEn: "Do you sell digital BP monitors, Glucometers and medical devices?",
      a: "Haan, hum genuine digital Omron BP Monitors, Accu-Chek Glucometers & Strips, Nebulizers, Pulse Oximeters aur Vaporizers stock karte hain. Counter par Pharmacist dwara demo aur battery installation bhi karke diya jaata hai.",
      tag: "Health Devices"
    },
    {
      q: "Payment ke kaun se options available hain?",
      qEn: "Which payment modes are accepted?",
      a: "Aap Cash on Delivery (COD), UPI (Google Pay, PhonePe, Paytm, BHIM) ya Credit/Debit Card kisi bhi tareeqe se aasaani se payment kar sakte hain.",
      tag: "Payment Modes"
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-14 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto space-y-3 mb-12"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-flora-100 text-flora-800 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-flora-700" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Frequently Asked Questions (FAQ)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Borivali East & Magathane patients dwara sabse zyada pooche gaye sawal aur unke jawab.
          </p>
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-flora-500 bg-flora-50/30 shadow-soft'
                    : 'border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex-1 pr-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-flora-700 bg-flora-100/70 px-2 py-0.5 rounded-md">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-slate-900 text-sm sm:text-base leading-snug">
                      {item.q}
                    </h3>
                    <p className="text-xs text-slate-400 font-normal mt-0.5">
                      {item.qEn}
                    </p>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-flora-700 text-white rotate-180 shadow-xs'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-flora-100/60 mt-1">
                        <p>{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-flora-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-soft border border-emerald-900/50"
        >
          <div className="text-center sm:text-left">
            <h4 className="font-heading font-bold text-base sm:text-lg text-white">
              Koi aur sawal ya dawai check karni hai?
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Humare counter pharmacist se direct WhatsApp par baat karein.
            </p>
          </div>

          <a
            href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
              "Hello Flora Pharmacy, I have a question regarding medicine availability."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shimmer-button inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-wa hover:bg-wa-dark text-slate-950 hover:text-white text-xs sm:text-sm font-bold transition shadow shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Ask on WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
