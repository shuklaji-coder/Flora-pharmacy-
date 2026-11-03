import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Percent,
  CheckCircle2
} from 'lucide-react';
import ProductPackshot from './ProductPackshot';

export default function CartDrawer() {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    cartCount, 
    cartSubtotal, 
    cartMrpTotal, 
    cartDiscount, 
    deliveryFee, 
    cartGrandTotal, 
    freeDeliveryThreshold,
    updateCartQuantity, 
    removeFromCart, 
    clearCart,
    setIsCheckoutOpen
  } = useStore();

  if (!isCartOpen) return null;

  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartSubtotal);
  const deliveryProgress = Math.min(100, (cartSubtotal / freeDeliveryThreshold) * 100);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10 w-full sm:w-auto">
        <div className="w-full sm:w-screen sm:max-w-md bg-white shadow-2xl flex flex-col h-full animate-fade-in-up">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-flora-100 text-flora-800 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-flora-700" />
              </div>
              <div>
                <h3 className="font-heading font-black text-slate-900 text-base">
                  Your Pharmacy Cart
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'} • Borivali East Store
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 100% Free Express Delivery Banner */}
          {cartCount > 0 && (
            <div className="bg-emerald-50/90 p-3 border-b border-emerald-100 flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>🎉 100% FREE Express Home Delivery!</span>
              </span>
              <span className="text-[10.5px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                ₹0 Charge
              </span>
            </div>
          )}

          {/* Drawer Body / Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-heading font-bold text-slate-900 text-lg">
                    Your Cart is Empty
                  </h4>
                  <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                    Browse our online pharmacy catalog to add medicines, baby care, or health monitors.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-flora-700 text-white hover:bg-flora-800 transition shadow-xs"
                >
                  Explore Medicines
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
                  <span>Selected Medicines ({cartCount})</span>
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 flex items-center gap-1 font-semibold transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Cart</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3 transition hover:border-emerald-200"
                    >
                      {/* Product Thumbnail */}
                      <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 shrink-0 flex items-center justify-center p-1 overflow-hidden">
                        <ProductPackshot product={item} />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h5 className="font-heading font-bold text-xs text-slate-900 truncate">
                          {item.name}
                        </h5>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {item.form || "Pack"}
                        </p>
                        <div className="flex items-baseline gap-1.5 mt-0.5">
                          <span className="text-xs font-black text-flora-800">
                            ₹{item.price * item.quantity}
                          </span>
                          {item.mrp > item.price && (
                            <span className="text-[10px] text-slate-400 line-through">
                              ₹{item.mrp * item.quantity}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden shrink-0">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-bold text-xs text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-red-500 p-1 rounded-lg transition shrink-0"
                        title="Remove Item"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* 100% Genuine Tag inside Cart */}
                <div className="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center gap-2 text-[11px] text-emerald-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    100% genuine medicines sourced directly from licensed pharma distributors.
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer & Bill Breakdown */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-white space-y-3.5 shadow-lg pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
              
              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Item Total (MRP)</span>
                  <span className="font-semibold text-slate-800">₹{cartMrpTotal}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span className="flex items-center gap-1">
                      <Percent className="w-3 h-3" />
                      <span>Pharmacy Discount</span>
                    </span>
                    <span>- ₹{cartDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span>Delivery Charges (Borivali East)</span>
                  <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    FREE (₹0)
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex justify-between text-sm sm:text-base font-black text-slate-900">
                  <span>Total Payable</span>
                  <span className="text-flora-800">₹{cartGrandTotal}</span>
                </div>
              </div>

              {/* Primary Quick Pay / Checkout Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleProceedToCheckout}
                  className="shimmer-button w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 via-flora-700 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-heading font-black text-sm flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition active:scale-95 cursor-pointer"
                >
                  <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[10px] font-black text-slate-900 shadow">
                    G
                  </span>
                  <span>Pay ₹{cartGrandTotal} via Google Pay / UPI</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
                >
                  <span>Cash on Delivery / Other Options</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
