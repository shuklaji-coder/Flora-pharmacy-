import React from 'react';
import { getMultiItemWhatsAppUrl, BUSINESS_INFO } from '../data/business';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  MessageCircle, 
  ShoppingBag, 
  ArrowRight,
  ShieldCheck,
  Package
} from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearList
}) {
  if (!isOpen) return null;

  const totalCount = items.reduce((acc, curr) => acc + (curr.quantity || 1), 0);
  const whatsappUrl = getMultiItemWhatsAppUrl(items);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-flora-100 text-flora-800 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-flora-700" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-slate-900 text-base">
                  My Medicine Enquiry List
                </h3>
                <p className="text-xs text-slate-500">
                  {totalCount} {totalCount === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              aria-label="Close List"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <Package className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-heading font-bold text-slate-800 text-base">
                    Your List is Empty
                  </h4>
                  <p className="text-xs text-slate-500 max-w-xs">
                    Browse the product showcase and tap "Add to My List" on items you wish to order or enquire about.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-flora-700 text-white hover:bg-flora-800 transition"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
                  <span>Selected Products</span>
                  <button
                    onClick={onClearList}
                    className="text-red-500 hover:text-red-700 flex items-center gap-1 font-medium transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-2xl border border-slate-100 bg-surface-light flex items-center justify-between gap-3 shadow-xs"
                    >
                      {/* Thumbnail */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 bg-slate-200"
                      />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading font-bold text-slate-900 text-xs sm:text-sm truncate">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate">
                          {item.category} • {item.form || 'Unit'}
                        </p>
                        
                        {/* Quantity Counter */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="inline-flex items-center border border-slate-200 rounded-lg bg-white">
                            <button
                              onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) - 1)}
                              className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-l-lg transition"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-bold text-slate-800 min-w-[1.75rem] text-center">
                              {item.quantity || 1}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                              className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-r-lg transition"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer / Checkout CTA */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-white space-y-3">
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 text-[11px] text-slate-600 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-flora-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>How Multi-Item Enquiry Works</span>
                </div>
                <p>
                  Clicking below opens WhatsApp with all {totalCount} items pre-listed. Our pharmacist will confirm stock, provide final billing, and arrange doorstep delivery.
                </p>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl text-sm font-bold text-white bg-wa hover:bg-wa-dark shadow-md hover:shadow-glow transition transform active:scale-98"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Send {totalCount} Items to WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <p className="text-center text-[11px] text-slate-400">
                Payment made directly on delivery/store pickup via UPI, Cash, or Cards.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
