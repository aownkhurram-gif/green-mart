import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { PaymentMethod, ShippingAddress, Order } from '../../types';
import {
  ShieldCheck,
  CheckCircle2,
  Truck,
  CreditCard,
  Smartphone,
  Banknote,
  Lock,
  Package,
  Printer,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    shippingFee,
    couponDiscountAmount,
    appliedCoupon,
    cartTotal,
    placeOrder,
    currentUser,
    setCurrentView,
  } = useShop();

  // Form State
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: currentUser?.address?.fullName || currentUser?.name || '',
    phone: currentUser?.address?.phone || '+92 300 1234567',
    email: currentUser?.address?.email || currentUser?.email || '',
    address: currentUser?.address?.address || 'House #12, St 4, Main Boulevard',
    city: currentUser?.address?.city || 'Lahore',
    postalCode: currentUser?.address?.postalCode || '54000',
    notes: 'Please call before delivery',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [mobileAccount, setMobileAccount] = useState('03001234567');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('123');

  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.address || !formData.city) {
      alert('Please fill in all required shipping address fields.');
      return;
    }

    const order = placeOrder(
      formData,
      paymentMethod,
      paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa'
        ? { accountNumber: mobileAccount }
        : paymentMethod === 'card'
        ? { cardNumberMasked: '•••• •••• •••• ' + cardNumber.slice(-4) }
        : undefined
    );

    setPlacedOrder(order);
  };

  if (placedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Order Placed Successfully
            </span>
            <h2 className="text-3xl font-black text-gray-900 mt-2">Thank You for Your Order!</h2>
            <p className="text-xs text-gray-500 mt-1">
              Order ID: <strong className="text-emerald-700 font-extrabold">{placedOrder.id}</strong>
            </p>
          </div>

          {/* Receipt Breakdown */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200/80 text-left space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200 text-xs font-semibold text-gray-700">
              <span>Items Purchased ({placedOrder.items.length})</span>
              <span>Total: ${placedOrder.totalAmount.toFixed(2)}</span>
            </div>

            <div className="divide-y divide-gray-100 max-h-48 overflow-y-auto">
              {placedOrder.items.map((item) => (
                <div key={item.product.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-10 h-10 object-cover rounded-lg bg-white"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 line-clamp-1">{item.product.title}</h4>
                      <span className="text-gray-500">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-bold text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-gray-200 grid grid-cols-2 gap-4 text-xs text-gray-600">
              <div>
                <span className="font-bold text-gray-900 block">Delivery Address:</span>
                <p>{placedOrder.shippingAddress.fullName}</p>
                <p>{placedOrder.shippingAddress.address}, {placedOrder.shippingAddress.city}</p>
                <p>Phone: {placedOrder.shippingAddress.phone}</p>
              </div>

              <div>
                <span className="font-bold text-gray-900 block">Payment Method:</span>
                <p className="capitalize font-semibold text-emerald-700">
                  {placedOrder.paymentMethod === 'cod'
                    ? '💵 Cash on Delivery'
                    : placedOrder.paymentMethod === 'jazzcash'
                    ? '📲 JazzCash'
                    : placedOrder.paymentMethod === 'easypaisa'
                    ? '📱 Easypaisa'
                    : '💳 Credit / Debit Card'}
                </p>
                <p className="text-[11px] text-gray-400">Est. Delivery: {placedOrder.estimatedDelivery}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs px-5 py-3 rounded-xl transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print Receipt
            </button>

            <button
              onClick={() => setCurrentView('account')}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all"
            >
              <Package className="w-4 h-4" />
              View My Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Secure Checkout</h1>
        <p className="text-xs text-gray-500 mt-1">Complete your order details below</p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Shipping Form & Payment Left */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Customer & Shipping Info */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-gray-100">
              <Truck className="w-4 h-4 text-emerald-600" />
              1. Customer Shipping Address
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Khurram Shehzad"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Phone Number *</label>
                <input
                  type="text"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g. +92 300 1234567"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-semibold text-gray-700 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. khurram@example.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-semibold text-gray-700 block mb-1">Street Address *</label>
                <input
                  type="text"
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="House #, Street name, Area/Sector..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">City *</label>
                <input
                  type="text"
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="e.g. Lahore, Karachi, Islamabad..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="e.g. 54000"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-semibold text-gray-700 block mb-1">Delivery Notes (Optional)</label>
                <textarea
                  rows={2}
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Special instructions for delivery rider..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* 2. Payment Method Selector */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-gray-100">
              <Lock className="w-4 h-4 text-emerald-600" />
              2. Select Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* COD */}
              <label
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                  paymentMethod === 'cod'
                    ? 'border-emerald-600 bg-emerald-50/50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Banknote className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900">Cash on Delivery (COD)</h4>
                  <p className="text-[11px] text-gray-500">Pay cash upon parcel delivery</p>
                </div>
              </label>

              {/* JazzCash */}
              <label
                onClick={() => setPaymentMethod('jazzcash')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                  paymentMethod === 'jazzcash'
                    ? 'border-emerald-600 bg-emerald-50/50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Smartphone className="w-6 h-6 text-red-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900">JazzCash Mobile Wallet</h4>
                  <p className="text-[11px] text-gray-500">Pay via JazzCash Mobile Account</p>
                </div>
              </label>

              {/* Easypaisa */}
              <label
                onClick={() => setPaymentMethod('easypaisa')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                  paymentMethod === 'easypaisa'
                    ? 'border-emerald-600 bg-emerald-50/50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Smartphone className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900">Easypaisa Wallet</h4>
                  <p className="text-[11px] text-gray-500">Pay via Easypaisa Mobile Account</p>
                </div>
              </label>

              {/* Card */}
              <label
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                  paymentMethod === 'card'
                    ? 'border-emerald-600 bg-emerald-50/50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <CreditCard className="w-6 h-6 text-blue-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900">Credit / Debit Card</h4>
                  <p className="text-[11px] text-gray-500">Visa, MasterCard, UnionPay</p>
                </div>
              </label>
            </div>

            {/* Sub-inputs for chosen method */}
            {(paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') && (
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2 text-xs">
                <label className="font-bold text-gray-800 block">
                  Enter {paymentMethod === 'jazzcash' ? 'JazzCash' : 'Easypaisa'} Mobile Number:
                </label>
                <input
                  type="text"
                  required
                  value={mobileAccount}
                  onChange={(e) => setMobileAccount(e.target.value)}
                  placeholder="e.g. 0300 1234567"
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                />
                <p className="text-[11px] text-gray-500">
                  A payment prompt will be sent to your mobile wallet app upon placing order.
                </p>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Card Number</label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 4242 4242 4242"
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Expiry Date</label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">CVC Code</label>
                    <input
                      type="text"
                      required
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="123"
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: Order Summary & Place Order */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">
            Order Items ({cart.length})
          </h3>

          <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.product.id} className="py-2.5 flex items-center gap-3 text-xs">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-12 h-12 object-cover rounded-lg bg-gray-50 border border-gray-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 truncate">{item.product.title}</h4>
                  <span className="text-gray-500">
                    {item.quantity}x @ ${item.product.price.toFixed(2)}
                  </span>
                </div>
                <span className="font-bold text-gray-900 shrink-0">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-3 space-y-2 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-gray-900">${cartSubtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="font-bold text-gray-900">
                {shippingFee === 0 ? <span className="text-emerald-600">FREE</span> : `$${shippingFee.toFixed(2)}`}
              </span>
            </div>

            {couponDiscountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Coupon Discount ({appliedCoupon?.code})</span>
                <span>-${couponDiscountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="border-t border-gray-100 pt-3 flex justify-between text-sm text-gray-900 font-extrabold">
              <span>Grand Total</span>
              <span className="text-xl text-emerald-700">${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Confirm & Place Order
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-gray-400 text-center leading-tight">
            By placing your order, you agree to GreenMart's Terms of Service & Privacy Policy.
          </p>
        </div>
      </form>
    </div>
  );
};
