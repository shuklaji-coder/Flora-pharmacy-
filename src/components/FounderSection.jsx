import React from 'react';
import { motion } from 'framer-motion';
import { BUSINESS_INFO } from '../data/business';
import { 
  Award, 
  ShieldCheck, 
  HeartHandshake, 
  GraduationCap, 
  MessageCircle, 
  Phone, 
  Quote, 
  CheckCircle2,
  Sparkles,
  MapPin
} from 'lucide-react';

export default function FounderSection() {
  const consultWhatsApp = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    "Hello Premprakash Sirvi ji (Flora Pharmacy), I would like to consult regarding my medicines / prescription."
  )}`;

  const pillars = [
    {
      title: "D.Pharm Clinical Knowledge",
      desc: "Expert understanding of pharmacology, salts & dosages.",
      icon: CheckCircle2,
    },
    {
      title: "100% Asli Dawai Guarantee",
      desc: "Only authorized company distributors with batch tracking.",
      icon: ShieldCheck,
    },
    {
      title: "Personal Patient Counseling",
      desc: "Friendly advice on dosage timings and chronic disease care.",
      icon: HeartHandshake,
    },
    {
      title: "Borivali East Dedicated Service",
      desc: "Samarpan, Magathane, Rivali Park doorstep availability.",
      icon: MapPin,
    },
  ];

  return (
    <section id="founder" className="py-14 sm:py-24 bg-gradient-to-b from-white via-surface-light to-white relative overflow-hidden">
      
      {/* Decorative ambient background rings */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-24 w-96 h-96 rounded-full bg-emerald-100/50 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 -mr-24 w-80 h-80 rounded-full bg-teal-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Founder Card */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white rounded-3xl border-2 border-emerald-200/90 shadow-soft-lg overflow-hidden p-6 sm:p-10 lg:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Founder High-Res Portrait */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                
                {/* Glow ring behind photo with pulse animation */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-flora-600 via-emerald-400 to-tealAccent-500 rounded-3xl opacity-40 blur-lg animate-pulse-glow pointer-events-none"></div>

                {/* Photo frame */}
                <div className="relative rounded-3xl overflow-hidden bg-slate-100 border-2 border-emerald-300 shadow-xl group">
                  <img
                    src="/images/founder-premprakash-sirvi.jpg"
                    alt="Premprakash Sirvi - Founder & Registered Pharmacist (D.Pharm) at Flora Pharmacy"
                    className="w-full h-auto object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                  {/* Badge over photo bottom */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-lg inline-block mb-1 border border-emerald-500/30">
                      Licensed Pharmacist
                    </span>
                    <h3 className="text-lg font-bold font-heading">
                      Premprakash Sirvi
                    </h3>
                    <p className="text-xs text-slate-200">
                      D.Pharm • Founder, Flora Pharmacy
                    </p>
                  </div>
                </div>

                {/* Floating Qualification Pill with Gentle Float */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                  className="absolute -top-3 -right-3 bg-white rounded-2xl p-2.5 sm:p-3 shadow-lg border border-emerald-200 flex items-center gap-2"
                >
                  <div className="w-9 h-9 rounded-xl bg-flora-50 text-flora-800 flex items-center justify-center font-bold">
                    <GraduationCap className="w-5 h-5 text-flora-700" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block uppercase">Qualification</span>
                    <span className="text-xs font-black text-slate-900">D.Pharma Certified</span>
                  </div>
                </motion.div>

              </div>
            </motion.div>

            {/* Right: Founder Credentials, Vision & Message */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              
              {/* Top Tag */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-flora-100 text-flora-800 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-flora-700" />
                <span>Meet Our Founder</span>
              </div>

              {/* Title & Qualification */}
              <div className="space-y-1.5">
                <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
                  Premprakash Sirvi
                </h2>
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-flora-800">
                  <span className="bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                    🎓 D.Pharm (Diploma in Pharmacy)
                  </span>
                  <span>•</span>
                  <span className="text-slate-600">Founder & Chief Pharmacist</span>
                </div>
              </div>

              {/* Founder Personal Quote */}
              <div className="relative p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50/80 via-surface-light to-emerald-50/40 border border-emerald-200/80 text-slate-700 text-xs sm:text-sm leading-relaxed italic">
                <Quote className="w-7 h-7 text-emerald-600/30 absolute top-2 right-3 -scale-x-100" />
                <p>
                  "Hamara maqsad sirf dawai bechna nahi, balki har patient ko sahi guidance, 100% asli dawai aur samay par delivery dena hai. Doctor ke prescription ko samajh kar sahi dosage aur timing batana humari sabse pehli zimmedari hai. Aapki aur aapke parivaar ki achhi sehat hi humari pehchan hai."
                </p>
                <div className="mt-2.5 not-italic font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <span>— Premprakash Sirvi</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-flora-700 font-semibold">Flora Pharmacy, Borivali East</span>
                </div>
              </div>

              {/* 4 Professional Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {pillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -3, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 transition hover:shadow-xs"
                    >
                      <Icon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{pillar.title}</h4>
                        <p className="text-[11px] text-slate-500">{pillar.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Direct Actions with Founder */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href={consultWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shimmer-button w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-wa hover:bg-wa-dark text-slate-950 hover:text-white font-bold text-xs sm:text-sm shadow-md transition"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Consult Premprakash Sirvi on WhatsApp</span>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm border border-slate-300 transition"
                >
                  <Phone className="w-4 h-4 text-flora-700" />
                  <span>Call Counter ({BUSINESS_INFO.phone})</span>
                </motion.a>
              </div>

            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
