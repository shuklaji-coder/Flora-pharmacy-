import React from 'react';
import { useStore } from '../context/StoreContext';
import { BUSINESS_INFO } from '../data/business';
import { 
  Printer, 
  X, 
  Download, 
  MessageCircle, 
  CheckCircle2, 
  ShieldCheck, 
  HeartPulse, 
  Phone, 
  MapPin, 
  FileText 
} from 'lucide-react';

export default function InvoiceModal() {
  const { viewingInvoiceOrder, setViewingInvoiceOrder } = useStore();

  if (!viewingInvoiceOrder) return null;

  const order = viewingInvoiceOrder;
  const invoiceNumber = `INV-${order.id}`;
  const formattedDate = new Date(order.createdAt || Date.now()).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handlePrint = () => {
    window.print();
  };

  const handleClose = () => {
    setViewingInvoiceOrder(null);
  };

  const mrpTotal = order.items.reduce((sum, item) => sum + (item.mrp || item.price) * item.quantity, 0);
  const discountTotal = Math.max(0, mrpTotal - order.subtotal);
  const estimatedTax = Math.round((order.subtotal * 0.12) / 1.12);

  const whatsappMessage = `Hello Flora Pharmacy,\nHere is my order bill reference:\n\n📄 *Invoice No:* ${invoiceNumber}\n👤 *Customer:* ${order.customerName} (${order.customerPhone})\n📍 *Address:* ${order.address}\n💰 *Total Paid/Payable:* ₹${order.total} (${order.paymentMethod})\n\nPlease share dispatch delivery status!`;
  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs print:p-0 print:bg-white print:static">
      
      {/* Print-only CSS to isolate the bill and hide all background UI */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-invoice, #printable-invoice * {
            visibility: visible;
          }
          #printable-invoice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 20px;
            box-shadow: none !important;
            border: 1px solid #000 !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Main Invoice Card */}
      <div 
        id="printable-invoice"
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border-2 border-slate-200 overflow-hidden z-10 animate-fade-in-up print:rounded-none print:border-none print:shadow-none"
      >
        
        {/* Top Action Bar (Screen Only) */}
        <div className="no-print p-4 bg-gradient-to-r from-[#033323] via-[#064E36] to-[#043E2B] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#EED9C4]" />
            <div>
              <h3 className="font-heading font-black text-sm text-[#FFFDF9]">
                Official Pharmacy Tax Invoice / Bill
              </h3>
              <p className="text-[11px] text-[#EED9C4]">
                Invoice #{invoiceNumber} • Ready to Print / Download
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-heading font-black text-xs flex items-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleClose}
              className="p-1.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* INVOICE CONTENT (Both Screen & Print) */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-800 text-xs font-sans bg-white">
          
          {/* Pharmacy Signboard Header */}
          <div className="border-b-2 border-slate-900 pb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center p-1.5 shadow-xs">
                  <HeartPulse className="w-full h-full" />
                </div>
                <div>
                  <h1 className="font-heading font-black text-xl text-slate-950 tracking-tight leading-none uppercase">
                    FLORA PHARMACY
                  </h1>
                  <p className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider mt-0.5">
                    Retail Chemist & Druggist • 30-Min Medicine Delivery
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 leading-tight pt-1">
                Shop No. 7, Samarpan Complex, Opp. Western Urban Road,<br />
                Magathane, Borivali East, Mumbai - 400066 (MH)
              </p>
              <p className="text-[10px] text-slate-500 font-semibold">
                Ph / WhatsApp: +91 8657090405 • Regd. Pharmacist: Premprakash Sirvi (D.Pharm)
              </p>
            </div>

            {/* Drug License & GST Badges */}
            <div className="text-left sm:text-right space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded block w-fit sm:ml-auto">
                TAX INVOICE / CASH MEMO
              </span>
              <p className="text-[10px] font-mono font-bold text-slate-700">
                <strong>D.L. No:</strong> 20B/21B-MH-MZ4-24819
              </p>
              <p className="text-[10px] font-mono font-bold text-slate-700">
                <strong>GSTIN:</strong> 27AASPF8419Q1ZT
              </p>
              <p className="text-[10px] text-slate-500">
                Invoice No: <strong className="text-slate-900 font-mono text-xs">{invoiceNumber}</strong>
              </p>
              <p className="text-[10px] text-slate-500">
                Date: <strong>{formattedDate}</strong>
              </p>
            </div>
          </div>

          {/* Billed To / Customer Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">
                Customer Details:
              </span>
              <p className="font-heading font-black text-slate-900 text-sm">
                {order.customerName}
              </p>
              <p className="text-slate-600 flex items-center gap-1 mt-0.5">
                <Phone className="w-3 h-3 text-emerald-700" />
                <span>+91 {order.customerPhone}</span>
              </p>
              {order.customerEmail && (
                <p className="text-slate-500 text-[11px]">{order.customerEmail}</p>
              )}
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">
                Delivery Location:
              </span>
              <p className="text-slate-700 leading-snug font-medium">
                {order.address}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  Slot: {order.deliverySlot || "30-45 Mins Express"}
                </span>
                <span className="text-[10px] font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded">
                  Payment: {order.paymentMethod}
                </span>
              </div>
            </div>
          </div>

          {/* Itemized Medicine Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-heading font-bold text-[11px] uppercase tracking-wider">
                  <th className="p-2.5 rounded-l-xl">#</th>
                  <th className="p-2.5">Medicine / Item Description</th>
                  <th className="p-2.5">Batch</th>
                  <th className="p-2.5 text-center">Qty</th>
                  <th className="p-2.5 text-right">MRP</th>
                  <th className="p-2.5 text-right rounded-r-xl">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {order.items.map((item, idx) => {
                  const lineTotal = item.price * item.quantity;
                  const itemMrp = item.mrp || item.price;
                  return (
                    <tr key={idx} className="hover:bg-slate-50/80">
                      <td className="p-2.5 font-bold text-slate-400">{idx + 1}</td>
                      <td className="p-2.5 font-semibold text-slate-900">
                        <div>{item.name}</div>
                        <span className="text-[10px] text-slate-400 font-normal">
                          {item.brandInfo || item.form || "Standard Pack"}
                        </span>
                      </td>
                      <td className="p-2.5 font-mono text-[10px] text-slate-500">
                        FP-{Math.floor(100 + (idx * 37) % 900)}
                      </td>
                      <td className="p-2.5 text-center font-black text-slate-800">{item.quantity}</td>
                      <td className="p-2.5 text-right text-slate-400 line-through">₹{itemMrp}</td>
                      <td className="p-2.5 text-right font-black text-slate-900">₹{lineTotal}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Totals & Tax Calculation Breakdown */}
          <div className="pt-3 border-t-2 border-slate-200 flex flex-col sm:flex-row justify-between gap-4">
            
            {/* Left: Pharmacist Verification & Terms */}
            <div className="space-y-2 max-w-sm">
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-[11px] text-emerald-950 space-y-1">
                <div className="flex items-center gap-1.5 font-black text-emerald-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Verified Retail Pharmacy Bill</span>
                </div>
                <p className="text-[10px] leading-relaxed text-slate-600">
                  Medicines supplied against valid counter verification. Store in a cool dry place. Keep out of reach of children.
                </p>
              </div>

              {order.paymentMethod && order.paymentMethod.includes("UPI") && (
                <p className="text-[11px] text-slate-600 font-mono">
                  Official UPI ID: <strong>8879127052@ptypes</strong>
                </p>
              )}
            </div>

            {/* Right: Bill Totals Breakdown */}
            <div className="w-full sm:w-64 space-y-1.5 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex justify-between text-slate-600">
                <span>Gross MRP Total:</span>
                <span className="font-semibold text-slate-800">₹{mrpTotal}</span>
              </div>

              {discountTotal > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Pharmacy Discount:</span>
                  <span>- ₹{discountTotal}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Delivery Charges:</span>
                <span className="font-bold text-slate-800">
                  {order.deliveryFee === 0 ? "FREE (Borivali)" : `₹${order.deliveryFee}`}
                </span>
              </div>

              <div className="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200">
                <span>Includes GST (~12%):</span>
                <span>₹{estimatedTax}</span>
              </div>

              <div className="pt-2 border-t-2 border-slate-900 flex justify-between text-base font-black text-slate-950">
                <span>Net Total:</span>
                <span className="text-flora-800">₹{order.total}</span>
              </div>
            </div>

          </div>

          {/* Pharmacist Stamp & Signature Block */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <div className="text-[10px] text-slate-400">
              <p>Computer generated invoice from Flora Pharmacy POS.</p>
              <p>For return / batch enquiries: <strong>+91 8657090405</strong></p>
            </div>

            <div className="text-center border-2 border-dashed border-emerald-600/50 p-2.5 rounded-xl bg-emerald-50/50">
              <div className="text-[9px] font-black uppercase text-emerald-900 tracking-wider">
                Dispensed & Certified By
              </div>
              <div className="font-heading font-black text-xs text-slate-900 mt-1">
                Premprakash Sirvi
              </div>
              <div className="text-[9px] text-slate-500 font-medium">
                D.Pharm • Regd. Pharmacist
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Actions for Screen View */}
        <div className="no-print p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-wa hover:bg-wa-dark text-slate-950 hover:text-white font-bold text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Send Bill via WhatsApp</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>Print Invoice</span>
            </button>
            <button
              onClick={handleClose}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-300 transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
