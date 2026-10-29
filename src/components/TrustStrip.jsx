import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Truck, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';

export default function TrustStrip() {
  const trustItems = [
    {
      icon: Star,
      iconColor: 'text-amber-500 bg-amber-50 border-amber-200/80 group-hover:bg-amber-100',
      title: '4.8★ Google Rating',
      subtitle: `${BUSINESS_INFO.rating.totalReviews} Verified Customer Reviews`,
    },
    {
      icon: Clock,
      iconColor: 'text-flora-700 bg-flora-50 border-flora-200/80 group-hover:bg-flora-100',
      title: 'Open 9 AM to 11 PM, 7 Days',
      subtitle: 'Open all days including Sundays',
    },
    {
      icon: Truck,
      iconColor: 'text-tealAccent-600 bg-tealAccent-50 border-tealAccent-200/80 group-hover:bg-tealAccent-100',
      title: 'Home Delivery Available',
      subtitle: 'Fast delivery across Borivali East & nearby',
    },
    {
      icon: ShieldCheck,
      iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-200/80 group-hover:bg-emerald-100',
      title: '100% Genuine Medicines',
      subtitle: 'Sourced directly from licensed pharma distributors',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative z-10 py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-white rounded-3xl shadow-soft border border-slate-200/90 p-4 sm:p-6 lg:p-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`group flex items-center gap-4 p-2 rounded-2xl transition duration-300 ${
                  index > 0 ? 'pt-4 sm:pt-0 sm:pl-6 lg:pl-8' : ''
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-110 shadow-xs ${item.iconColor}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-flora-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
