import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ShoppingBag, ShieldCheck, Truck, Users, Heart, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentView } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-900 to-green-950 text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-4 shadow-xl">
        <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Our Green Story
        </span>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
          Redefining Online Shopping with Quality, Freshness & Trust
        </h1>
        <p className="text-xs sm:text-sm text-gray-200 leading-relaxed max-w-2xl mx-auto">
          GreenMart was founded with a single mission: to empower consumers with seamless, authentic, and fast e-commerce shopping for electronics, organic groceries, fashion, and home essentials.
        </p>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-3">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-gray-900">100% Authentic Products</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Every item in our store comes directly from certified manufacturers and official distributors with full warranty support.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-3">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-gray-900">Lightning-Fast Express Delivery</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Our optimized logistics fleet ensures that your groceries and gadgets arrive fresh and undamaged in under 24 to 48 hours.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-3">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-gray-900">Dedicated Customer Care</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Our friendly customer support team is available 24/7 to assist you with order inquiries, replacements, and payment questions.
          </p>
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          onClick={() => setCurrentView('shop')}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-md transition-all"
        >
          Browse Our Products
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
