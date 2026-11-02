import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BUSINESS_INFO } from '../data/business';
import { 
  X, 
  MapPin, 
  Phone, 
  User, 
  CreditCard, 
  Banknote, 
  QrCode, 
  MessageCircle, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  ArrowRight,
  Clock
} from 'lucide-react';

export default function CheckoutModal() {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartGrandTotal, 
    cartDiscount, 
    deliveryFee, 
    placeOrder,
    currentUser,
    selectedLocation
  } = useStore();

  const [customerName, setCustomerName] = useState(currentUser ? currentUser.name : "");
  const [customerPhone, setCustomerPhone] = useState(currentUser ? currentUser.phone : "");
  const [flatNumber, setFlatNumber] = useState("");
  const [buildingName, setBuildingName] = useState(currentUser?.address || "");
  const [locality, setLocality] = useState(selectedLocation || "Samarpan, Borivali East");
  const [paymentMethod, setPaymentMethod] = useState("COD"); // "COD", "UPI", "WhatsApp"
  const [deliverySlot, setDeliverySlot] = useState("Immediate (30-45 Mins)");
  const [notes, setNotes] = useState("");

  React.useEffect(() => {
    if (currentUser) {
      if (currentUser.name) setCustomerName(currentUser.name);
      if (currentUser.phone) setCustomerPhone(currentUser.phone);
      if (currentUser.address) setBuildingName(currentUser.address);
    }
  }, [currentUser]);

  const quickLocalities = [
    "Samarpan Tower, Borivali East",
    "Magathane Metro Station Area",
    "Rivali Park, Western Urban Rd",
    "Nancy Colony, Borivali East",
    "Carter Road, Borivali East",
    "Ashokvan, Borivali East"
  ];

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      alert("Kripya apna naam aur phone number bharein!");
      return;
    }

    const fullAddress = `${flatNumber ? flatNumber + ', ' : ''}${buildingName ? buildingName + ', ' : ''}${locality}`;

    const orderData = {
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      address: fullAddress,
      locality,
      paymentMethod: paymentMethod === "COD" ? "Cash on Delivery" : paymentMethod === "UPI" ? "UPI QR Scan" : "WhatsApp Order",
      deliverySlot,
      notes: notes.trim()
    };

    const newOrder = placeOrder(orderData);

    // If WhatsApp payment selected, open WhatsApp with order bill
    if (paymentMethod === "WhatsApp") {
      const itemsText = cart.map((i, idx) => `${idx + 1}. ${i.name} x ${i.quantity} = ₹${i.price * i.quantity}`).join("\n");
      const message = `Hello Flora Pharmacy,\nI have placed an order on the website:\n\n📋 *Order ID:* ${newOrder.id}\n👤 *Customer:* ${customerName.trim()} (${customerPhone.trim()})\n📍 *Address:* ${fullAddress}\n\n💊 *Items Ordered:*\n${itemsText}\n\n💰 *Total Amount:* ₹${cartGrandTotal} (Pay via ${orderData.paymentMethod})\n⏰ *Delivery Slot:* ${deliverySlot}\n\nPlease confirm delivery!`;
      const url = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-0 sm:p-6 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={() => setIsCheckoutOpen(false)}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-t-3xl sm:rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden z-10 animate-fade-in-up max-h-[92vh] sm:max-h-[88vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-flora-700 text-white flex items-center justify-center shadow-md shadow-flora-700/20 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-slate-900 text-base sm:text-lg">
                Express Delivery Checkout
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                Delivering in 30-45 minutes across Borivali East
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto custom-scrollbar flex-1 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
          
          {/* STEP 1: Customer Contact Details */}
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-900 uppercase tracking-wider block">
              1. Customer Details *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Full Name (e.g. Ramesh Shah)"
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-flora-600"
                />
              </div>

              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Mobile Number (10 digits)"
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-flora-600"
                />
              </div>
            </div>
          </div>

          {/* STEP 2: Delivery Address in Borivali */}
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-900 uppercase tracking-wider block">
              2. Delivery Address (Borivali East) *
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={flatNumber}
                onChange={(e) => setFlatNumber(e.target.value)}
                placeholder="Flat / Floor / Wing (e.g. 402, Wing B)"
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-flora-600"
              />

              <input
                type="text"
                value={buildingName}
                onChange={(e) => setBuildingName(e.target.value)}
                placeholder="Building / Society Name"
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-flora-600"
              />
            </div>

            {/* Quick Borivali Localities Selection Pills */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Select Locality / Landmark:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickLocalities.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setLocality(loc)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition border ${
                      locality === loc
                        ? 'bg-flora-700 text-white border-flora-700 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    📍 {loc}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* STEP 3: Delivery Speed & Timings */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-900 uppercase tracking-wider block">
              3. Delivery Speed
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <label className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2 transition ${
                deliverySlot.includes("Immediate") ? "border-flora-600 bg-flora-50/60 font-bold text-flora-900" : "border-slate-200 text-slate-700"
              }`}>
                <input
                  type="radio"
                  name="slot"
                  checked={deliverySlot.includes("Immediate")}
                  onChange={() => setDeliverySlot("Immediate (30-45 Mins)")}
                  className="text-flora-700"
                />
                <div>
                  <span className="block font-bold">⚡ Express Delivery</span>
                  <span className="text-[10px] text-slate-500">Within 30-45 mins</span>
                </div>
              </label>

              <label className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2 transition ${
                deliverySlot.includes("Evening") ? "border-flora-600 bg-flora-50/60 font-bold text-flora-900" : "border-slate-200 text-slate-700"
              }`}>
                <input
                  type="radio"
                  name="slot"
                  checked={deliverySlot.includes("Evening")}
                  onChange={() => setDeliverySlot("Evening (6:00 PM – 9:00 PM)")}
                  className="text-flora-700"
                />
                <div>
                  <span className="block font-bold">🌙 Evening Delivery</span>
                  <span className="text-[10px] text-slate-500">6:00 PM – 9:00 PM</span>
                </div>
              </label>
            </div>
          </div>

          {/* STEP 4: Payment Method Selection */}
          <div className="space-y-2.5">
            <label className="text-xs font-black text-slate-900 uppercase tracking-wider block">
              4. Payment Method
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              
              {/* Cash on Delivery */}
              <label className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between transition ${
                paymentMethod === "COD" ? "border-flora-600 bg-flora-50 font-bold text-flora-900 ring-2 ring-flora-600/20" : "border-slate-200 text-slate-700"
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <Banknote className="w-5 h-5 text-emerald-700" />
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                  />
                </div>
                <span className="font-bold">Cash on Delivery</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Pay cash at doorstep</span>
              </label>

              {/* UPI QR Code */}
              <label className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between transition ${
                paymentMethod === "UPI" ? "border-flora-600 bg-flora-50 font-bold text-flora-900 ring-2 ring-flora-600/20" : "border-slate-200 text-slate-700"
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <QrCode className="w-5 h-5 text-emerald-700" />
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "UPI"}
                    onChange={() => setPaymentMethod("UPI")}
                  />
                </div>
                <span className="font-bold">UPI QR Scan & Pay</span>
                <span className="text-[10px] text-slate-500 mt-0.5">GPay, PhonePe, Paytm</span>
              </label>

              {/* WhatsApp Order */}
              <label className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between transition ${
                paymentMethod === "WhatsApp" ? "border-flora-600 bg-flora-50 font-bold text-flora-900 ring-2 ring-flora-600/20" : "border-slate-200 text-slate-700"
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <MessageCircle className="w-5 h-5 text-wa" />
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "WhatsApp"}
                    onChange={() => setPaymentMethod("WhatsApp")}
                  />
                </div>
                <span className="font-bold">WhatsApp Direct</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Confirm via WhatsApp</span>
              </label>

            </div>

            {/* UPI QR Code Display if UPI is selected */}
            {paymentMethod === "UPI" && (
              <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center gap-4 border border-slate-800 shadow-md">
                <div className="w-24 h-24 bg-white rounded-xl p-1.5 flex items-center justify-center shrink-0 shadow-md">
                  {/* Generated Dynamic QR for 8879127052@ptypes */}
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(`upi://pay?pa=8879127052@ptypes&pn=Flora%20Pharmacy&am=${cartGrandTotal}&cu=INR`)}`}
                    alt="Scan UPI QR Code to pay Flora Pharmacy"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="space-y-1.5 text-xs text-center sm:text-left flex-grow">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-[10px] uppercase font-black text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                      Direct UPI QR
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">Flora Pharmacy Counter</span>
                  </div>
                  <p className="font-extrabold text-base text-white">Amount: <span className="text-emerald-400">₹{cartGrandTotal}</span></p>
                  <div className="flex items-center justify-center sm:justify-start gap-1.5">
                    <span className="text-[11px] text-slate-300">UPI ID:</span>
                    <code className="text-emerald-300 font-mono font-bold bg-slate-800 px-2 py-0.5 rounded select-all text-xs">
                      8879127052@ptypes
                    </code>
                  </div>
                  <p className="text-[10px] text-slate-400">Scan via GPay, PhonePe, Paytm or any UPI app to pay instantly.</p>
                </div>
              </div>
            )}
          </div>

          {/* Delivery Note */}
          <div>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any instructions for delivery boy? (e.g. Ring bell twice, leave at door)"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-flora-600"
            />
          </div>

          {/* Bill Summary Banner */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-600">
            <div className="flex justify-between font-medium">
              <span>Items in Order:</span>
              <span className="font-bold text-slate-900">{cart.length} items</span>
            </div>
            {cartDiscount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>You Save Today:</span>
                <span>₹{cartDiscount}</span>
              </div>
            )}
            <div className="flex justify-between font-medium">
              <span>Delivery Charges:</span>
              <span className="font-bold text-emerald-700">{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-black text-slate-900">
              <span>Payable Amount:</span>
              <span className="text-flora-800">₹{cartGrandTotal}</span>
            </div>
          </div>

          {/* Submit Place Order Button */}
          <button
            type="submit"
            className="shimmer-button w-full py-4 px-6 rounded-2xl bg-flora-700 hover:bg-flora-800 text-white font-heading font-black text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition active:scale-95"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Place Order Now (₹{cartGrandTotal})</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

      </div>
    </div>
  );
}
