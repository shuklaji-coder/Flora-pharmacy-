import React from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, Truck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "1. Search & Add Medicines",
      desc: "Browse our 5,000+ catalog of chronic care, pain relief, baby care & devices. Tap ADD with instant quantity controls."
    },
    {
      number: "02",
      icon: ShoppingBag,
      title: "2. Fast 2-Step Checkout",
      desc: "Select your Borivali locality & express delivery slot. Pay securely via Cash on Delivery (COD) or Instant UPI QR Scan."
    },
    {
      number: "03",
      icon: Truck,
      title: "3. 30-Min Doorstep Delivery",
      desc: "Our verified pharmacist packs fresh batches from Samarpan store counter and dispatches to your doorstep in 30 minutes."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="py-16 sm:py-20 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto space-y-3 mb-14"
        >
          <span className="text-xs font-black text-flora-800 uppercase tracking-widest bg-flora-50 px-3 py-1 rounded-full border border-flora-100">
            Convenient & Reliable
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            How Flora Pharmacy Delivers in 3 Quick Steps
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            Designed for busy families in Borivali East. Quick ordering, zero delays, and 100% genuine pharmacy care.
          </p>
        </motion.div>

        {/* 3 Step Flow */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative"
        >
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="relative bg-surface-light rounded-3xl p-6 sm:p-8 border border-slate-200/80 flex flex-col justify-between hover:shadow-soft transition-all duration-300 group hover:border-emerald-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-flora-600 to-flora-800 text-white flex items-center justify-center shadow-md shadow-flora-700/20"
                    >
                      <Icon className="w-7 h-7" />
                    </motion.div>
                    <span className="font-heading font-black text-3xl text-slate-200 group-hover:text-emerald-300 transition-colors">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-slate-900 text-lg mb-2 group-hover:text-flora-800 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center gap-2 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Borivali East Store Direct</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
