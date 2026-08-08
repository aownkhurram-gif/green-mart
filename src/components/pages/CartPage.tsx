import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  CheckCircle2,
  X,
  Truck,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    shippingFee,
    appliedCoupon,
    couponDiscountAmount,
    applyCoupon,
    removeCoupon,
    cartTotal,
    setCurrentView,
    openProductDetail,
    showToast,
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const freeShippingLimit = 50;
  const freeShippingNeeded = Math.max(0, freeShippingLimit - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingLimit) * 100);

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    setCouponError('');
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-gray-900">Your Shopping Cart is Empty</h2>
        <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
          Looks like you haven't added anything to your cart yet. Explore our fresh groceries, wireless audio gadgets, sneakers, and home decor!
        </p>
        <button
          onClick={() => setCurrentView('shop')}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-md transition-all"
        >
          Start Shopping Now
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Page Title */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Shopping Cart</h1>
          <p className="text-xs text-gray-500 mt-1">
            You have <strong className="text-gray-900">{cart.length}</strong> unique item(s) in your cart
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 hover:underline"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear Cart
        </button>
      </div>

      {/* Free Shipping Progress Indicator Bar */}
      <div className="bg-emerald-50 border border-emerald-200/80 p-4 rounded-2xl space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-emerald-600" />
            {freeShippingNeeded === 0 ? (
              <span>🎉 You unlocked FREE Express Shipping!</span>
            ) : (
              <span>
                Add <strong className="text-emerald-700">${freeShippingNeeded.toFixed(2)}</strong> more to qualify for <strong>FREE Shipping</strong>!
              </span>
            )}
          </div>
          <span>{freeShippingProgress.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-emerald-200/60 rounded-full h-2 overflow-hidden">
          <div
            className="bg-emerald-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart Items Table Left */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden divide-y divide-gray-100">
            {cart.map((item) => {
              const lineTotal = item.product.price * item.quantity;
              return (
                <div
                  key={item.product.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  {/* Product Info */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      onClick={() => openProductDetail(item.product.id)}
                      className="w-20 h-20 object-cover rounded-xl bg-gray-50 border border-gray-100 cursor-pointer shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md uppercase">
                        {item.product.category}
                      </span>
                      <h3
                        onClick={() => openProductDetail(item.product.id)}
                        className="text-sm font-bold text-gray-900 hover:text-emerald-600 transition-colors line-clamp-1 cursor-pointer mt-1"
                      >
                        {item.product.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        ${item.product.price.toFixed(2)} / unit
                      </p>
                    </div>
                  </div>

                  {/* Controls & Line Price */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-gray-100">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 text-gray-600 hover:text-emerald-600 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 text-gray-600 hover:text-emerald-600 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Total Price & Delete */}
                    <div className="text-right">
                      <span className="text-sm font-extrabold text-gray-900 block">
                        ${lineTotal.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentView('shop')}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              ← Continue Shopping
            </button>
          </div>
        </div>

        {/* Order Summary Right */}
        <div className="space-y-6">
          {/* Coupon Code Section */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-emerald-600" />
              Apply Discount Coupon
            </h4>

            {appliedCoupon ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="font-extrabold text-emerald-800">{appliedCoupon.code}</span>
                  <span className="text-gray-600 block text-[11px]">{appliedCoupon.description}</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-gray-400 hover:text-red-500 p-1"
                  title="Remove coupon"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleCouponSubmit} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter code (e.g. GREEN20)..."
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs uppercase text-gray-900 focus:outline-none focus:border-emerald-600"
                  />
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </div>

                {couponError && <p className="text-[11px] text-red-500">{couponError}</p>}

                {/* Quick Coupon Suggestions */}
                <div className="pt-1">
                  <span className="text-[10px] text-gray-400 block mb-1">Available Demo Coupons:</span>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => applyCoupon('GREEN20')}
                      className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-md"
                    >
                      GREEN20 (20% OFF)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyCoupon('WELCOME10')}
                      className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-md"
                    >
                      WELCOME10 ($10 OFF)
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Order Summary Box */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">
              Order Summary
            </h3>

            <div className="space-y-2.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-gray-900">${cartSubtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-bold text-gray-900">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-600">FREE</span>
                  ) : (
                    `$${shippingFee.toFixed(2)}`
                  )}
                </span>
              </div>

              {couponDiscountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Coupon Discount</span>
                  <span>-${couponDiscountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="border-t border-gray-100 pt-3 flex justify-between text-sm text-gray-900 font-extrabold">
                <span>Total Amount</span>
                <span className="text-lg text-emerald-700">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('checkout')}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Security badges */}
            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Guaranteed Safe & Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
