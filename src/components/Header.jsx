import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { BUSINESS_INFO } from '../data/business';
import { Phone, MessageCircle, Menu, X, Clock, Camera } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Order Medicines', href: '#order-medicines' },
    { name: 'Prescription', href: '#prescription' },
    { name: 'Services', href: '#services' },
    { name: 'Founder', href: '#founder' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top micro-bar for hours and quick announcement */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-emerald-300">Open 7 Days:</span>
            <span>9:00 AM – 11:00 PM (Magathane, Borivali East)</span>
          </div>
          <div className="flex items-center gap-6">
            <a 
              href={`tel:${BUSINESS_INFO.phoneRaw}`} 
              className="hover:text-white transition flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">Fast Doorstep Delivery in Borivali & Kandivali</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3'
            : 'bg-white/90 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#home" className="focus:outline-none focus:ring-2 focus:ring-flora-600 rounded-xl">
              <Logo />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-sm font-medium text-slate-600 hover:text-flora-700 transition relative py-1 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-flora-600 transition-all duration-200 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Call Now Button */}
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-slate-700 hover:text-flora-800 bg-slate-100 hover:bg-slate-200 transition"
              >
                <Phone className="w-4 h-4 text-flora-700" />
                <span>Call Counter</span>
              </motion.a>

              {/* Upload Rx Pill */}
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#prescription"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#prescription');
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-flora-800 bg-flora-50 hover:bg-flora-100 border border-flora-200 transition"
              >
                <Camera className="w-3.5 h-3.5 text-flora-700" />
                <span>Upload Rx</span>
              </motion.a>

              {/* WhatsApp Order Button with Shimmer */}
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                  "Hello Flora Pharmacy, I would like to enquire about medicines and home delivery."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shimmer-button inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white bg-wa hover:bg-wa-dark shadow-sm hover:shadow transition"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Order on WhatsApp</span>
              </motion.a>
            </div>

            {/* Mobile Header Actions */}
            <div className="flex sm:hidden items-center gap-2">
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                  "Hello Flora Pharmacy, I would like to enquire about medicines and home delivery."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-wa text-white transition active:scale-95"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu with AnimatePresence */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 shadow-xl overflow-hidden"
            >
              <div className="space-y-1 py-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:text-flora-700 hover:bg-flora-50 transition"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2.5">
                <div className="flex items-center gap-2 px-3 text-xs text-slate-500 mb-2">
                  <Clock className="w-3.5 h-3.5 text-flora-600" />
                  <span>Open Today: 9:00 AM – 11:00 PM</span>
                </div>

                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 transition"
                >
                  <Phone className="w-4 h-4 text-flora-700" />
                  <span>Call Counter ({BUSINESS_INFO.phone})</span>
                </a>

                <a
                  href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
                    "Hello Flora Pharmacy, I would like to order medicines / check availability."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-wa hover:bg-wa-dark shadow-sm transition"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
