import React from 'react';
import { motion } from 'framer-motion';
import { Search, MessageSquare, Truck, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Pick Your Products or Prescription",
      desc: "Browse our online catalog to add items to your enquiry list, or simply snap a photo of your doctor's prescription."
    },
    {
      number: "02",
      icon: MessageSquare,
      title: "Tap WhatsApp to Connect",
      desc: "Click 'Order on WhatsApp'. A pre-filled message with your selected items or prescription request will open instantly."
    },
    {
      number: "03",
      icon: Truck,
      title: "Get Delivered or Pick Up",
      desc: "Our pharmacist confirms availability and price. Receive prompt home delivery in Borivali or collect at our counter."
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
    <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto space-y-3 mb-14"
        >
          <span className="text-xs font-bold text-flora-700 uppercase tracking-widest bg-flora-50 px-3 py-1 rounded-full border border-flora-100">
            Simple & Transparent
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            How It Works in 3 Quick Steps
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            No complicated account registrations or payment gateways. Directly speak with your neighbourhood chemist.
          </p>
        </motion.div>

        {/* 3 Step Flow */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="relative bg-surface-light rounded-3xl p-6 sm:p-8 border border-slate-100 flex flex-col justify-between hover:shadow-soft transition-shadow group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <motion.div 
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="w-14 h-14 rounded-2xl bg-flora-700 text-white flex items-center justify-center shadow-md shadow-flora-700/20"
                    >
                      <Icon className="w-7 h-7" />
                    </motion.div>
                    <span className="font-heading font-black text-3xl text-slate-200 group-hover:text-flora-200 transition-colors">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-slate-900 text-lg mb-2 group-hover:text-flora-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-flora-700">
                  <span>Fast & Direct</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}

        </motion.div>

      </div>
    </section>
  );
}
