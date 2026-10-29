import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle, ExternalLink, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/business';

export const REVIEWS = [
  {
    id: 1,
    name: "Dr. Rajesh K. Sharma",
    location: "Rivali Park, Borivali East",
    rating: 5,
    date: "1 week ago",
    comment: "Extremely reliable medical store in our neighborhood. I regularly order chronic diabetes & BP medicines for my parents. They always check prescriptions carefully, deliver within 30 minutes, and stocks are 100% genuine with long expiry dates.",
    verified: true,
    tag: "Prescription Delivery"
  },
  {
    id: 2,
    name: "Pooja Varma",
    location: "Samarpan Complex, Magathane",
    rating: 5,
    date: "2 weeks ago",
    comment: "Location is super convenient right next to Magathane Metro. I purchased an Omron BP monitor from them; the pharmacist patiently showed me how to use the cuff and take accurate readings. Excellent customer service!",
    verified: true,
    tag: "Health Devices & Demo"
  },
  {
    id: 3,
    name: "Amit Solanki",
    location: "Nancy Colony, Borivali East",
    rating: 5,
    date: "3 weeks ago",
    comment: "WhatsApp ordering is a game-changer! Sent photo of Dolo, Volini spray, and baby diapers at 10 PM, got instant confirmation on WhatsApp, and the order was delivered to my flat in 20 minutes without any advance payment hassle.",
    verified: true,
    tag: "WhatsApp Delivery"
  },
  {
    id: 4,
    name: "Sneha Mehta",
    location: "Western Urban Rd, Borivali East",
    rating: 5,
    date: "1 month ago",
    comment: "Clean, air-conditioned and well-stocked pharmacy. All baby care items (Pampers, Sebamed, Gripe water) are readily available. Plus staying open till 11:00 PM every single day is a lifesaver for night emergencies.",
    verified: true,
    tag: "Open Till 11 PM"
  }
];

export default function ReviewsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="reviews" className="py-12 sm:py-20 bg-surface-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Rating Summary Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-soft mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-amber-50/80 border border-amber-200 min-w-[130px] shadow-xs">
                <span className="text-4xl sm:text-5xl font-black font-heading text-slate-900">
                  {BUSINESS_INFO.rating.score}
                </span>
                <div className="flex items-center gap-1 text-amber-500 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-slate-600 mt-1">
                  Google Rating
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-flora-700 uppercase tracking-widest bg-flora-50 px-2.5 py-1 rounded-full border border-flora-100">
                  Verified Local Reviews
                </span>
                <h2 className="text-xl sm:text-3xl font-extrabold font-heading text-slate-900 mt-1.5">
                  Borivali East Ka Bharosemand Chemist
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Over {BUSINESS_INFO.rating.totalReviews} verified 5-star patient reviews on Google Maps for genuine medicines & fast delivery.
                </p>
              </div>
            </div>

            {/* Direct Google Reviews Link */}
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={BUSINESS_INFO.rating.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition shrink-0 shadow-xs"
            >
              <span>See all 34 reviews on Google</span>
              <ExternalLink className="w-4 h-4 text-slate-600" />
            </motion.a>

          </div>
        </motion.div>

        {/* Reviews Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
        >
          {REVIEWS.map((review) => (
            <motion.div
              key={review.id}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-soft hover:shadow-soft-lg transition-shadow duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-slate-400">
                    {review.date}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-5">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-sm text-slate-900">
                    {review.name}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                    <MapPin className="w-3 3 text-flora-600" />
                    <span>{review.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  <CheckCircle className="w-3 h-3" />
                  <span>{review.tag}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
