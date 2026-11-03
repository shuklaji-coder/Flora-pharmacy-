import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import { BUSINESS_INFO, getUpiPaymentUrl } from '../data/business';
import ProductPackshot from './ProductPackshot';
import { 
  CheckCircle2, 
  X, 
  MessageCircle, 
  Phone, 
  MapPin, 
  Truck, 
  Clock, 
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Printer,
  FileText,
  Copy,
  Check,
  Sparkles,
  Package,
  CheckCircle,
  HelpCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function OrderSuccessModal() {
  const { lastPlacedOrder, setLastPlacedOrder, setViewingInvoiceOrder } = useStore();
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedOrderId, setCopiedOrderId] = useState(false);

  if (!lastPlacedOrder) return null;

  const handleClose = () => {
    setLastPlacedOrder(null);
  };

  const handleCopyOrderId = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(lastPlacedOrder.id);
      setCopiedOrderId(true);
      setTimeout(() => setCopiedOrderId(false), 2200);
    }
  };

  const handleCopyUpi = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(BUSINESS_INFO.upiId);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2200);
    }
  };

  const itemsListText = lastPlacedOrder.items
    .map((item, idx) => `${idx + 1}. ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`)
    .join('\n');

  const whatsappMessage = `Hello Flora Pharmacy,\nI just placed an order on the website:\n\n📦 *Order ID:* #${lastPlacedOrder.id}\n👤 *Customer:* ${lastPlacedOrder.customerName} (${lastPlacedOrder.customerPhone})\n📍 *Delivery Address:* ${lastPlacedOrder.address}\n\n💊 *Items Ordered:*\n${itemsListText}\n\n💰 *Total Payable:* ₹${lastPlacedOrder.total} (${lastPlacedOrder.paymentMethod})\n⏰ *Delivery Slot:* ${lastPlacedOrder.deliverySlot || "Immediate Express (30 Mins)"}\n\nPlease dispatch my medicines!`;

  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // Delivery Progress Stepper
  const orderSteps = [
    {
      title: "Order Received",
      desc: "Logged at Samarpan store desk",
      time: "Just now",
      status: "completed"
    },
    {
      title: "Packing & Quality Check",
      desc: "Pharmacist verifying batch & expiry",
      time: "In progress",
      status: "active"
    },
    {
      title: "Express Dispatch",
      desc: "Rider out across Borivali East",
      time: "30-45 mins",
      status: "pending"
    },
    {
      title: "At Your Doorstep",
      desc: "Delivered with sealed tax invoice",
      time: "Arrival",
      status: "pending"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-2 sm:p-4 md:p-6 flex items-center justify-center select-none">
      {/* Dim Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      {/* Main Order Success Modal Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.92, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[92vh]"
      >
        
        {/* 1. TOP CELEBRATION HERO BANNER */}
        <div className="relative bg-gradient-to-br from-[#022418] via-[#043E2B] to-[#065F46] text-white p-5 sm:p-6 overflow-hidden border-b border-emerald-900/60 shrink-0">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Close X Button */}
          <button
            onClick={handleClose}
            className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition cursor-pointer backdrop-blur-xs"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            
            {/* 3D Namaskar Mascot Hero Avatar */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-gradient-to-tr from-[#EED9C4]/30 via-white/20 to-white/10 p-1 border-2 border-[#DFC09E] shadow-xl backdrop-blur-sm flex items-center justify-center overflow-hidden">
                <img 
                  src="/images/flora-mascot-namaste.png" 
                  alt="Flora Pharmacist Mascot Namaskar" 
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>
              <span className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md border-2 border-slate-900">
                <Check className="w-4 h-4 stroke-[3]" />
              </span>
            </div>

            {/* Header Text */}
            <div className="flex-1 space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-[10.5px] font-black uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
                <span>Order Placed Successfully!</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-heading font-black text-white leading-tight">
                Shukriya! Dawai Jald Hi Aapke Ghar
              </h3>

              <p className="text-xs text-emerald-100/90 leading-relaxed font-medium">
                Chief Pharmacist <strong className="text-white">Premprakash Sirvi</strong> aapka order verify karke packing shuru kar chuke hain.
              </p>
            </div>

          </div>

          {/* Quick Order Badge Ribbon */}
          <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
            
            {/* Order Tracking ID with 1-Click Copy */}
            <div className="flex items-center gap-2 bg-slate-950/40 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-xs">
              <span className="text-[10.5px] text-emerald-300 font-bold uppercase tracking-wider">Order ID:</span>
              <button 
                onClick={handleCopyOrderId}
                className="font-mono font-black text-white hover:text-emerald-300 flex items-center gap-1.5 transition cursor-pointer"
                title="Click to copy Order ID"
              >
                <span>#{lastPlacedOrder.id}</span>
                {copiedOrderId ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3 text-slate-400 hover:text-white" />
                )}
              </button>
            </div>

            {/* Estimated Arrival Badge */}
            <div className="flex items-center gap-1.5 bg-emerald-500/20 px-3 py-1.5 rounded-xl border border-emerald-400/30 text-emerald-200 font-extrabold text-[11px]">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Est. Delivery: 30-45 Mins</span>
            </div>

          </div>

        </div>

        {/* 2. SCROLLABLE CONTENT BODY */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 custom-scrollbar text-xs">
          
          {/* A. SWIGGY / 1MG STYLE LIVE DELIVERY TRACKER STEPPER */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-heading font-black text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-flora-800" />
                <span>Live Delivery Progress</span>
              </span>
              <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Samarpan Counter Express
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1 sm:gap-2 pt-1 relative">
              {orderSteps.map((step, idx) => {
                const isDone = step.status === "completed";
                const isActive = step.status === "active";
                return (
                  <div key={idx} className="flex flex-col items-center text-center space-y-1.5 relative">
                    
                    {/* Circle Node */}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-xs ${
                      isDone 
                        ? 'bg-emerald-600 text-white' 
                        : isActive 
                          ? 'bg-emerald-500 text-white ring-4 ring-emerald-100 animate-pulse' 
                          : 'bg-slate-200 text-slate-400'
                    }`}>
                      {isDone ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : isActive ? (
                        <Package className="w-3.5 h-3.5" />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>

                    {/* Step Title & Description */}
                    <div>
                      <span className={`block text-[10px] sm:text-[11px] font-black leading-tight ${
                        isActive ? 'text-emerald-800' : isDone ? 'text-slate-800' : 'text-slate-400'
                      }`}>
                        {step.title}
                      </span>
                      <span className="text-[9px] text-slate-400 block font-medium mt-0.5 hidden sm:block">
                        {step.desc}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* B. DELIVERY ADDRESS & CUSTOMER INFO */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-start gap-3 shadow-2xs">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-flora-800 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
              <MapPin className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="flex-1 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900 text-xs">
                  {lastPlacedOrder.customerName}
                </span>
                <span className="font-mono text-slate-500 text-[11px]">
                  {lastPlacedOrder.customerPhone}
                </span>
              </div>
              <p className="text-[11.5px] text-slate-600 leading-snug">
                {lastPlacedOrder.address}
              </p>
              {lastPlacedOrder.notes && (
                <p className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block mt-1 font-medium">
                  Note: {lastPlacedOrder.notes}
                </p>
              )}
            </div>
          </div>

          {/* C. ORDERED ITEMS ACCORDION LIST */}
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
            <div className="px-3.5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
              <span className="font-heading font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-flora-800" />
                <span>Medicines Ordered ({lastPlacedOrder.items.length})</span>
              </span>
              <span className="text-[11px] font-bold text-slate-500">
                Genuine Batch Stocks
              </span>
            </div>

            <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto custom-scrollbar p-1">
              {lastPlacedOrder.items.map((item, idx) => (
                <div key={idx} className="p-2.5 flex items-center justify-between gap-3 hover:bg-slate-50/80 transition rounded-xl">
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-white p-1 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                      <ProductPackshot product={item} />
                    </div>
                    <div className="truncate">
                      <span className="font-extrabold text-slate-900 block truncate text-xs">
                        {item.name}
                      </span>
                      <span className="text-[10.5px] text-slate-400 block font-medium">
                        Qty: <strong className="text-slate-700">{item.quantity}</strong> • ₹{item.price} each
                      </span>
                    </div>
                  </div>
                  <span className="font-black text-slate-900 text-xs shrink-0">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Bill Summary Footer */}
            <div className="p-3 bg-emerald-50/50 border-t border-slate-200 space-y-1">
              <div className="flex justify-between text-slate-600 text-[11px]">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-slate-800">₹{lastPlacedOrder.subtotal || lastPlacedOrder.total}</span>
              </div>
              <div className="flex justify-between text-slate-600 text-[11px]">
                <span>Delivery Charge:</span>
                <span className="text-emerald-700 font-bold">
                  {lastPlacedOrder.deliveryFee === 0 ? "FREE (Express Delivery)" : `₹${lastPlacedOrder.deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs font-black text-slate-900 pt-1.5 border-t border-emerald-200/60">
                <span className="text-xs uppercase tracking-wide">Total Payable ({lastPlacedOrder.paymentMethod}):</span>
                <span className="text-base font-black text-flora-800 font-mono">
                  ₹{lastPlacedOrder.total}
                </span>
              </div>
            </div>
          </div>

          {/* D. GOOGLE PAY / UPI QUICK ACTION (If UPI Payment selected) */}
          {lastPlacedOrder.paymentMethod && (lastPlacedOrder.paymentMethod.includes("UPI") || lastPlacedOrder.paymentMethod.includes("Google Pay")) && (
            <div className="space-y-2 p-3.5 rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white border border-emerald-600/30 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Instant UPI Payment</span>
                </span>
                <span className="text-xs font-mono font-black text-emerald-400">
                  ₹{lastPlacedOrder.total}
                </span>
              </div>

              {/* 1-Tap GPay Deep Link */}
              <a
                href={getUpiPaymentUrl(lastPlacedOrder.total, lastPlacedOrder.id)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-heading font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition active:scale-98 cursor-pointer"
              >
                <span className="w-5 h-5 rounded-full bg-white text-slate-900 text-xs font-black flex items-center justify-center">
                  G
                </span>
                <span>Tap to Pay ₹{lastPlacedOrder.total} via Google Pay / PhonePe</span>
              </a>

              {/* Copy UPI ID Bar */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/80 border border-slate-700/80 text-[11px]">
                <div className="flex items-center gap-2 truncate">
                  <span className="text-slate-400 font-medium">Store UPI:</span>
                  <code className="text-emerald-300 font-mono font-bold">{BUSINESS_INFO.upiId}</code>
                </div>
                <button
                  onClick={handleCopyUpi}
                  className="px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-[10.5px] transition flex items-center gap-1 cursor-pointer"
                >
                  {copiedUpi ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedUpi ? "Copied!" : "Copy"}</span>
                </button>
              </div>
            </div>
          )}

          {/* E. CLINICAL QUALITY & SAFETY PLEDGE */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-slate-600 text-[11px]">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            <div className="leading-tight">
              <span className="font-extrabold text-slate-900 block">100% Genuine Pharmacy Guarantee</span>
              <span className="text-[10px] text-slate-500">Dispensed under supervision of Registered Pharmacist Premprakash Sirvi (D.Pharm).</span>
            </div>
          </div>

        </div>

        {/* 3. FOOTER ACTION BUTTONS */}
        <div className="p-4 bg-white border-t border-slate-200 space-y-2 shrink-0">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            
            {/* View Official Tax Invoice Receipt */}
            <button
              type="button"
              onClick={() => {
                setViewingInvoiceOrder(lastPlacedOrder);
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-black text-white font-heading font-black text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-sm active:scale-98"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-400" />
              <span>Print Tax Bill (Invoice)</span>
            </button>

            {/* Live WhatsApp Tracker */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-wa hover:bg-wa-dark text-slate-950 hover:text-white font-heading font-black text-xs flex items-center justify-center gap-2 transition shadow-sm active:scale-98"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Live Tracking</span>
            </a>

          </div>

          {/* Continue Shopping / Dismiss */}
          <button
            type="button"
            onClick={handleClose}
            className="w-full py-2 rounded-xl text-slate-500 hover:text-slate-800 font-bold text-xs transition cursor-pointer hover:bg-slate-100"
          >
            ← Continue Shopping in Flora Pharmacy
          </button>

        </div>

      </motion.div>
    </div>
  );
}
