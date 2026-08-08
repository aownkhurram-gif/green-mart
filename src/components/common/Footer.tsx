import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Mail,
  Send,
  Phone,
  MapPin,
  CheckCircle2,
  Heart,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategory, showToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      showToast('Subscribed!', 'Coupon GREEN20 has been sent to your email.');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-white text-gray-700 pt-16 pb-8 border-t border-green-100 shadow-xs">
      {/* 1. Value Proposition Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 border-b border-green-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-5 rounded-[28px] bg-[#F0FDF4] border border-green-100/80">
            <div className="p-3 bg-[#16A34A] text-white rounded-2xl shrink-0 shadow-xs">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Free Express Shipping</h4>
              <p className="text-xs text-gray-500 mt-0.5">On all orders over $50</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-[28px] bg-[#F0FDF4] border border-green-100/80">
            <div className="p-3 bg-[#16A34A] text-white rounded-2xl shrink-0 shadow-xs">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">7 Days Easy Return</h4>
              <p className="text-xs text-gray-500 mt-0.5">Hassle-free 100% money back</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-[28px] bg-[#F0FDF4] border border-green-100/80">
            <div className="p-3 bg-[#16A34A] text-white rounded-2xl shrink-0 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">100% Secure Checkout</h4>
              <p className="text-xs text-gray-500 mt-0.5">COD, JazzCash & Cards</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-[28px] bg-[#F0FDF4] border border-green-100/80">
            <div className="p-3 bg-[#16A34A] text-white rounded-2xl shrink-0 shadow-xs">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">24/7 Dedicated Support</h4>
              <p className="text-xs text-gray-500 mt-0.5">Friendly customer service</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Footer Main Links Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand & Newsletter Column */}
        <div className="lg:col-span-2 space-y-4">
          <div
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#16A34A] flex items-center justify-center text-white font-bold shadow-md shadow-green-600/20">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-serif font-black text-gray-900">GreenMart</span>
              <span className="text-2xl font-serif font-black text-[#16A34A]">.</span>
            </div>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed max-w-sm font-sans">
            GreenMart is your premier online destination for sustainable living, high-quality noise-canceling electronics, organic groceries, and home essentials.
          </p>

          {/* Newsletter Box */}
          <div className="pt-2">
            <h5 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">
              Subscribe for $10 Discount Coupon
            </h5>
            {subscribed ? (
              <div className="p-3.5 bg-green-50 border border-green-200 rounded-full text-green-900 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>Subscribed! Use code <strong className="text-green-900">GREEN20</strong> for 20% OFF.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center max-w-sm">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="bg-[#F0FDF4] border border-green-200/80 rounded-l-full px-4 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#16A34A] flex-1"
                />
                <button
                  type="submit"
                  className="bg-[#16A34A] hover:bg-green-700 text-white font-bold text-xs px-5 py-2.5 rounded-r-full transition-colors flex items-center gap-1 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Quick Categories */}
        <div>
          <h4 className="text-xs font-black text-[#16A34A] uppercase tracking-widest mb-4">
            Shop Categories
          </h4>
          <ul className="space-y-2.5 text-xs font-medium text-gray-600">
            {[
              { name: 'Electronics & Tech', slug: 'electronics' },
              { name: 'Fashion & Sneakers', slug: 'fashion' },
              { name: 'Home & Kitchen', slug: 'home' },
              { name: 'Fresh Groceries', slug: 'groceries' },
              { name: 'Beauty & Skincare', slug: 'beauty' },
              { name: 'Sports & Fitness', slug: 'sports' },
            ].map((cat) => (
              <li key={cat.slug}>
                <button
                  onClick={() => {
                    setSelectedCategory(cat.slug);
                    setCurrentView('shop');
                  }}
                  className="hover:text-[#16A34A] transition-colors"
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Help */}
        <div>
          <h4 className="text-xs font-black text-[#16A34A] uppercase tracking-widest mb-4">
            Customer Care
          </h4>
          <ul className="space-y-2.5 text-xs font-medium text-gray-600">
            <li>
              <button
                onClick={() => setCurrentView('account')}
                className="hover:text-[#16A34A] transition-colors"
              >
                Track Order Status
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView('faq')}
                className="hover:text-[#16A34A] transition-colors"
              >
                FAQ & Shipping Info
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView('contact')}
                className="hover:text-[#16A34A] transition-colors"
              >
                Contact Customer Support
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView('about')}
                className="hover:text-[#16A34A] transition-colors"
              >
                About GreenMart
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView('privacy')}
                className="hover:text-[#16A34A] transition-colors"
              >
                Returns & Refund Policy
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info & Payment Options */}
        <div className="space-y-4">
          <h4 className="text-xs font-black text-[#16A34A] uppercase tracking-widest mb-4">
            Contact & Payments
          </h4>

          <div className="space-y-2.5 text-xs text-gray-600 font-medium">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
              <span>782 Green Avenue, Tech District, City Center</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#16A34A] shrink-0" />
              <span>+1 (800) 555-0199</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#16A34A] shrink-0" />
              <span>support@greenmart.com</span>
            </div>
          </div>

          {/* Payment Method Badges */}
          <div className="pt-2">
            <span className="text-[11px] font-bold text-gray-500 block mb-2">
              Accepted Payment Methods:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <span className="bg-green-100/80 border border-green-200 text-green-900 text-[10px] font-bold px-2.5 py-1 rounded-full">
                💵 Cash on Delivery
              </span>
              <span className="bg-red-50 border border-red-200 text-red-800 text-[10px] font-bold px-2.5 py-1 rounded-full">
                📲 JazzCash
              </span>
              <span className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full">
                📱 Easypaisa
              </span>
              <span className="bg-blue-50 border border-blue-200 text-blue-800 text-[10px] font-bold px-2.5 py-1 rounded-full">
                💳 Visa / MasterCard
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 border-t border-green-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <p>© 2026 GreenMart Store. All Rights Reserved.</p>
        <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-gray-400">
          <span>Artistic & Trustworthy Shopping Experience</span>
        </div>
      </div>
    </footer>
  );
};
