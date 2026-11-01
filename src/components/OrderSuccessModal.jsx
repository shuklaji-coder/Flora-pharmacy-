import React from 'react';
import { useStore } from '../context/StoreContext';
import { BUSINESS_INFO } from '../data/business';
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
  FileText
} from 'lucide-react';

export default function OrderSuccessModal() {
  const { lastPlacedOrder, setLastPlacedOrder, setViewingInvoiceOrder } = useStore();

  if (!lastPlacedOrder) return null;

  const handleClose = () => {
    setLastPlacedOrder(null);
  };

  const itemsListText = lastPlacedOrder.items
    .map((item, idx) => `${idx + 1}. ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`)
    .join('\n');

  const whatsappMessage = `Hello Flora Pharmacy,\nI just placed an order on the website:\n\n📦 *Order ID:* ${lastPlacedOrder.id}\n👤 *Customer:* ${lastPlacedOrder.customerName} (${lastPlacedOrder.customerPhone})\n📍 *Address:* ${lastPlacedOrder.address}\n\n💊 *Items:*\n${itemsListText}\n\n💰 *Total Amount:* ₹${lastPlacedOrder.total} (${lastPlacedOrder.paymentMethod})\n⏰ *Delivery Slot:* ${lastPlacedOrder.deliverySlot}\n\nPlease confirm availability and dispatch!`;

  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={handleClose}
      />

      <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden z-10 animate-fade-in-up">
        
        {/* Top Celebration Header */}
        <div className="p-6 bg-gradient-to-br from-emerald-600 to-flora-800 text-white text-center space-y-3 relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto shadow-lg animate-scale-in">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>

          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-emerald-200 bg-emerald-950/40 px-3 py-1 rounded-full">
              Order Confirmed & Received!
            </span>
            <h3 className="text-2xl font-black font-heading mt-2">
              Dawai Jald Hi Aapke Ghar Par!
            </h3>
            <p className="text-xs text-emerald-100">
              Estimated Delivery: <strong>30-45 Minutes</strong> (Borivali East Counter)
            </p>
          </div>

          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Details Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          
          {/* Order ID & Status Tracker */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Order Tracking ID
              </span>
              <span className="font-heading font-black text-sm text-slate-900">
                #{lastPlacedOrder.id}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Payment Status
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-block">
                {lastPlacedOrder.paymentMethod}
              </span>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="flex items-start gap-2.5 text-xs text-slate-600">
            <MapPin className="w-4 h-4 text-flora-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">Delivery Address:</span>
              <span>{lastPlacedOrder.address}</span>
            </div>
          </div>

          {/* Items Summary */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-black text-slate-900 uppercase tracking-wider block">
              Items in Order ({lastPlacedOrder.items.length})
            </span>
            <div className="divide-y divide-slate-100 max-h-40 overflow-y-auto text-xs">
              {lastPlacedOrder.items.map((item, idx) => (
                <div key={idx} className="py-2 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-800">{item.name}</span>
                    <span className="text-slate-400 text-[11px] block">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-extrabold text-slate-900">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Total Bill Box */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between text-sm font-black text-slate-900">
            <span>Total Payable Amount:</span>
            <span className="text-flora-800 text-lg">₹{lastPlacedOrder.total}</span>
          </div>

          {/* UPI Payment ID Info Box */}
          {lastPlacedOrder.paymentMethod && lastPlacedOrder.paymentMethod.includes("UPI") && (
            <div className="p-3.5 rounded-2xl bg-slate-900 text-white flex items-center justify-between border border-slate-800 shadow-sm">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-black text-emerald-400 block">
                  Pay via UPI ID / GPay / PhonePe:
                </span>
                <code className="text-emerald-300 font-mono font-bold text-xs select-all bg-slate-800 px-2 py-0.5 rounded">
                  8879127052@ptypes
                </code>
              </div>
              <span className="text-xs font-black text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800">
                ₹{lastPlacedOrder.total}
              </span>
            </div>
          )}

          {/* Action CTAs */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => setViewingInvoiceOrder(lastPlacedOrder)}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-slate-900 to-black hover:from-black hover:to-slate-900 text-white font-heading font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition active:scale-95 cursor-pointer border border-slate-700"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>View & Print Official Pharmacy Bill (Invoice)</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-button w-full py-3.5 px-4 rounded-xl bg-wa hover:bg-wa-dark text-slate-950 hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Get WhatsApp Bill & Live Tracking</span>
            </a>

            <button
              onClick={handleClose}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
