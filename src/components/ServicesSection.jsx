import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Store, RefreshCw, Activity, UserCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';

export default function ServicesSection() {
  const services = [
    {
      icon: Truck,
      title: "Fast Home Delivery",
      description: "Quick doorstep delivery of medicines and healthcare essentials across Borivali East, Dahisar, and Kandivali.",
      features: ["Prompt dispatch", "Cold-chain insulin pack", "Cash/UPI on delivery"],
      color: "text-emerald-600 bg-emerald-50 border-emerald-100"
    },
    {
      icon: Store,
      title: "In-Store Counter Pharmacy",
      description: "Well-stocked retail counter conveniently situated at Samarpan, right near Magathane Metro Station and Rivali Park.",
      features: ["Open 9 AM – 11 PM daily", "Clean air-conditioned store", "Immediate billing"],
      color: "text-flora-700 bg-flora-50 border-flora-100"
    },
    {
      icon: RefreshCw,
      title: "Monthly Prescription Refills",
      description: "Hassle-free recurring monthly orders for chronic care medicines (BP, Diabetes, Thyroid, Cardiac).",
      features: ["Scheduled reminders", "Never run out of pills", "Priority doorstep delivery"],
      color: "text-tealAccent-600 bg-tealAccent-50 border-tealAccent-100"
    },
    {
      icon: Activity,
      title: "Health Devices & Demos",
      description: "Genuine digital BP monitors, glucometers, nebulizers, and pulse oximeters with battery installation and usage guidance.",
      features: ["Tested calibrated units", "Manufacturer warranty", "Hands-on demo at counter"],
      color: "text-blue-600 bg-blue-50 border-blue-100"
    },
    {
      icon: UserCheck,
      title: "Licensed Pharmacist Guidance",
      description: "Consult our experienced pharmacists regarding dosage timings, potential interactions, and generic alternatives.",
      features: ["Professional advice", "Dietary precautions", "Zero charge guidance"],
      color: "text-purple-600 bg-purple-50 border-purple-100"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="services" className="py-16 sm:py-24 bg-surface-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-3 mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-flora-100 text-flora-800 text-xs font-semibold uppercase tracking-wider">
            <span>Comprehensive Care</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            Our Healthcare Services
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            More than just a dispensary. We are dedicated to providing compassionate, reliable healthcare support for your entire family.
          </p>
        </motion.div>

        {/* Services Grid (3 cols on desktop, responsive) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-soft hover:shadow-soft-lg transition-shadow duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-5 ${service.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-heading font-bold text-slate-900 text-lg sm:text-xl mb-2 group-hover:text-flora-700 transition">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-5">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  {service.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-flora-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* Quick Contact Card inside grid */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-gradient-to-br from-flora-800 to-emerald-900 rounded-3xl p-6 sm:p-7 text-white flex flex-col justify-between shadow-soft-lg group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-300 mb-5 group-hover:scale-110 transition-transform">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2 text-white">
                Visit Us in Borivali East
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Conveniently located at Samarpan, Western Urban Rd. Just a few steps from Magathane Metro Station and Rivali Park.
              </p>
            </div>

            <div className="pt-6">
              <a
                href={BUSINESS_INFO.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-flora-900 text-xs font-bold hover:bg-slate-100 transition shadow hover:scale-105 active:scale-95"
              >
                <span>Get Driving Directions</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
