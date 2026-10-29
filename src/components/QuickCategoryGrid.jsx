import React from 'react';
import { motion } from 'framer-motion';
import { BUSINESS_INFO } from '../data/business';
import { 
  Flame, 
  Pill, 
  HeartPulse, 
  Baby, 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  ArrowRight,
  Leaf,
  MessageCircle
} from 'lucide-react';

export default function QuickCategoryGrid() {
  const popularCategories = [
    {
      name: "OTC & Fever/Cold",
      label: "Fever, Cough & Cold",
      examples: "Dolo 650, Crocin, Vicks, Sinarest",
      icon: Flame,
      gradient: "from-rose-50 to-orange-50 text-rose-600 border-rose-200/80 group-hover:border-rose-300"
    },
    {
      name: "Vitamins & Supplements",
      label: "Vitamins & Energy",
      examples: "Becosules Z, Shelcal 500, Limcee",
      icon: Sparkles,
      gradient: "from-amber-50 to-yellow-50 text-amber-600 border-amber-200/80 group-hover:border-amber-300"
    },
    {
      name: "Pain Relief & Balms",
      label: "Pain Relief & Balms",
      examples: "Volini Spray, Moov, Amrutanjan",
      icon: HeartPulse,
      gradient: "from-blue-50 to-indigo-50 text-blue-600 border-blue-200/80 group-hover:border-blue-300"
    },
    {
      name: "Digestion & Acidity",
      label: "Acidity & Digestion",
      examples: "Digene, Eno Sachets, Pudin Hara",
      icon: Pill,
      gradient: "from-emerald-50 to-teal-50 text-emerald-600 border-emerald-200/80 group-hover:border-emerald-300"
    },
    {
      name: "Health Devices",
      label: "BP & Sugar Monitors",
      examples: "Omron BP, Accu-Chek, Oximeter",
      icon: Activity,
      gradient: "from-sky-50 to-cyan-50 text-sky-600 border-sky-200/80 group-hover:border-sky-300"
    },
    {
      name: "Baby Care",
      label: "Baby Care & Diapers",
      examples: "Pampers Pants, Gripe Water, Sebamed",
      icon: Baby,
      gradient: "from-pink-50 to-fuchsia-50 text-pink-600 border-pink-200/80 group-hover:border-pink-300"
    },
    {
      name: "Ayurvedic & Herbal",
      label: "Ayurvedic Immunity",
      examples: "Dabur Chyawanprash, Liv.52, Honey",
      icon: Leaf,
      gradient: "from-lime-50 to-emerald-50 text-lime-700 border-lime-200/80 group-hover:border-lime-300"
    },
    {
      name: "First Aid & Antiseptic",
      label: "First Aid & Antiseptic",
      examples: "Dettol, Betadine, Hansaplast",
      icon: ShieldCheck,
      gradient: "from-red-50 to-amber-50 text-red-600 border-red-200/80 group-hover:border-red-300"
    }
  ];

  const handleCategoryClick = (item) => {
    const message = `Hello Flora Pharmacy,\nI would like to order / enquire about *${item.label}* medicines (${item.examples}). Please confirm availability and price.`;
    const url = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <section className="py-8 sm:py-12 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6"
        >
          <div>
            <span className="text-xs font-bold text-flora-700 uppercase tracking-widest bg-flora-50 px-2.5 py-1 rounded-full border border-flora-100">
              Ghar Ghar Ki Zaroorat
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold font-heading text-slate-900 mt-1.5">
              Popular Chemist Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Kisi bhi category par click karke direct WhatsApp par availability check aur order karein.
            </p>
          </div>

          <a
            href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
              "Hello Flora Pharmacy, I would like to enquire about medicine availability."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-bold text-flora-700 hover:text-flora-800 flex items-center gap-1 group self-start sm:self-auto transition-colors"
          >
            <span>Ask Any Product on WhatsApp</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
          </a>
        </motion.div>

        {/* 8 Categories Grid with Direct WhatsApp Enquiry */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {popularCategories.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={index}
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleCategoryClick(item)}
                className={`p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br ${item.gradient} border text-left shadow-xs transition-shadow duration-300 group flex flex-col justify-between hover:shadow-md`}
                title={`Order ${item.label} on WhatsApp`}
              >
                <div>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white shadow-xs flex items-center justify-center mb-2.5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-slate-900 text-xs sm:text-sm leading-snug group-hover:text-slate-950">
                    {item.label}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                    {item.examples}
                  </p>
                </div>

                <div className="pt-3 mt-2 flex items-center justify-between text-[11px] font-bold text-emerald-800 group-hover:text-emerald-950">
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3 text-wa fill-current" />
                    <span>Order on WhatsApp</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </motion.button>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
