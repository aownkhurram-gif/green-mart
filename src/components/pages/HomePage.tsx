import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../common/ProductCard';
import {
  ArrowRight,
  Sparkles,
  Zap,
  ShoppingBag,
  Clock,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  Tag,
  CheckCircle2,
  Gift,
} from 'lucide-react';
import { motion } from 'motion/react';

export const HomePage: React.FC = () => {
  const {
    products,
    categories,
    setCurrentView,
    setSelectedCategory,
    openProductDetail,
  } = useShop();

  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('all');

  // Flash Sale Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 35, seconds: 42 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filtered featured products tab
  const featuredProducts = products.filter((p) => {
    if (activeCategoryTab === 'all') return true;
    return p.category === activeCategoryTab;
  });

  const flashSaleProducts = products.filter((p) => p.isFlashSale || p.discount).slice(0, 4);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Hero Section with Artistic Flair Typography */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Expressive Artistic Headlines */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block px-4 py-1.5 bg-[#16A34A] text-white text-[10px] uppercase font-black tracking-widest rounded-full shadow-xs">
              Sustainable Living & Tech
            </span>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-black leading-[0.95] tracking-tight text-[#111827]">
              Fresh <br />
              <span className="text-[#16A34A] italic font-normal">Essentials</span> <br />
              For You.
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-md font-sans leading-relaxed">
              Curated collections of premium eco-friendly goods, noise-canceling audio, organic harvests, and modern living accessories.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setCurrentView('shop');
                }}
                className="bg-[#111827] text-white px-8 py-4 rounded-full text-sm font-bold hover:bg-[#16A34A] transition-colors shadow-lg shadow-gray-900/10 flex items-center gap-2 group"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md border border-green-200/80 px-5 py-3 rounded-full text-xs font-bold text-green-900 shadow-xs">
                <Tag className="w-4 h-4 text-[#16A34A]" />
                <span>Use Coupon: <strong className="text-black font-black">GREEN20</strong> for 20% OFF</span>
              </div>
            </div>
          </div>

          {/* Right Column: Artistic Cards & Promos */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="bg-white rounded-[40px] p-7 sm:p-8 shadow-xl shadow-green-900/5 border border-green-100 flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#16A34A] block mb-2">
                  Featured Product
                </span>
                <h3 className="text-2xl font-serif font-bold text-gray-900">
                  Sony WH-1000XM5 Headphones
                </h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  Industry-leading noise canceling with dual processors and 8 microphones.
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-2xl font-black text-gray-900">$399.99</span>
                <button
                  onClick={() => openProductDetail('p1')}
                  className="bg-[#16A34A] hover:bg-green-700 text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-xs"
                >
                  View Product
                </button>
              </div>
            </div>

            <div className="bg-[#22C55E] rounded-[40px] p-7 sm:p-8 text-white relative overflow-hidden flex flex-col justify-between min-h-[180px]">
              <div className="relative z-10">
                <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-3">
                  Special Organic Offer
                </span>
                <h3 className="text-2xl font-serif font-bold leading-tight">
                  100% Organic Avocados & Fresh Produce
                </h3>
              </div>
              <div className="relative z-10 pt-4 flex items-center justify-between">
                <span className="text-xs font-bold text-green-100">Same-day local delivery</span>
                <button
                  onClick={() => {
                    setSelectedCategory('groceries');
                    setCurrentView('shop');
                  }}
                  className="bg-white text-green-900 font-extrabold text-xs px-4 py-2 rounded-full hover:bg-green-50 transition-colors shadow-xs"
                >
                  Order Fresh →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Value Propositions Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-[32px] border border-green-100 p-6 shadow-xl shadow-green-900/5 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-50 text-[#16A34A] rounded-2xl shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Free Shipping</h4>
              <p className="text-[11px] text-gray-500">For orders over $50</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-50 text-[#16A34A] rounded-2xl shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Easy 7-Day Return</h4>
              <p className="text-[11px] text-gray-500">100% money back guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-50 text-[#16A34A] rounded-2xl shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Secure Payments</h4>
              <p className="text-[11px] text-gray-500">COD, JazzCash & Cards</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-50 text-[#16A34A] rounded-2xl shrink-0">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Daily Flash Deals</h4>
              <p className="text-[11px] text-gray-500">Fresh discounts everyday</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Shop By Category Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-xs font-extrabold text-[#16A34A] uppercase tracking-widest block mb-1">
              Explore Collections
            </span>
            <h2 className="text-3xl font-serif font-bold text-gray-900">Shop by Category</h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setCurrentView('shop');
            }}
            className="text-xs font-bold text-[#16A34A] hover:text-green-700 flex items-center gap-1"
          >
            All Categories →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -4 }}
              onClick={() => {
                setSelectedCategory(cat.slug);
                setCurrentView('shop');
              }}
              className="bg-white rounded-[32px] border border-green-100 overflow-hidden shadow-xl shadow-green-900/5 hover:border-green-300 hover:shadow-2xl transition-all p-5 cursor-pointer text-center group flex flex-col items-center justify-between"
            >
              <div className="w-20 h-20 rounded-full bg-green-50 p-1 mb-3 overflow-hidden group-hover:scale-105 transition-transform border border-green-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[10px] text-gray-400 block mt-0.5">
                  {cat.itemCount} Items
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Flash Sale Section with Countdown Timer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-100/60 rounded-[36px] p-6 sm:p-10 border border-green-200/80 shadow-xl shadow-green-900/5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#16A34A] text-white rounded-2xl shadow-md">
                <Zap className="w-6 h-6 fill-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-serif font-bold text-gray-900">Flash Deals</h2>
                  <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                    LIMITED TIME
                  </span>
                </div>
                <p className="text-xs text-gray-600">Hurry! Limited stock available at flash discounts.</p>
              </div>
            </div>

            {/* Countdown Box */}
            <div className="flex items-center gap-2 text-xs font-bold">
              <Clock className="w-4 h-4 text-[#16A34A] shrink-0" />
              <span className="text-gray-700">Ends in:</span>
              <div className="flex items-center gap-1.5 font-mono">
                <span className="bg-gray-900 text-white px-3 py-1.5 rounded-full text-xs font-bold">
                  {String(timeLeft.hours).padStart(2, '0')}h
                </span>
                <span className="text-gray-800 font-bold">:</span>
                <span className="bg-gray-900 text-white px-3 py-1.5 rounded-full text-xs font-bold">
                  {String(timeLeft.minutes).padStart(2, '0')}m
                </span>
                <span className="text-gray-800 font-bold">:</span>
                <span className="bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold">
                  {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>
          </div>

          {/* Flash Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashSaleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Featured Products Tabs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-extrabold text-[#16A34A] uppercase tracking-widest block mb-1">
              Handpicked Essentials
            </span>
            <h2 className="text-3xl font-serif font-bold text-gray-900">Featured Products</h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {[
              { slug: 'all', label: 'All Items' },
              { slug: 'electronics', label: 'Electronics' },
              { slug: 'fashion', label: 'Fashion' },
              { slug: 'home', label: 'Home' },
              { slug: 'groceries', label: 'Groceries' },
              { slug: 'beauty', label: 'Beauty' },
            ].map((tab) => (
              <button
                key={tab.slug}
                onClick={() => setActiveCategoryTab(tab.slug)}
                className={`text-xs font-bold px-5 py-2.5 rounded-full transition-all shrink-0 ${
                  activeCategoryTab === tab.slug
                    ? 'bg-[#16A34A] text-white shadow-md shadow-green-600/20'
                    : 'bg-white text-gray-600 border border-green-100 hover:bg-green-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Promotional Banner Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Banner 1 */}
          <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-r from-green-900 via-green-800 to-emerald-950 text-white p-8 sm:p-10 flex flex-col justify-between h-72 shadow-xl shadow-green-900/10 border border-green-800/50">
            <div className="relative z-10 max-w-sm space-y-3">
              <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block">
                Fresh & Organic
              </span>
              <h3 className="text-3xl font-serif font-bold leading-tight">Farm Fresh Groceries Delivered to Doorstep</h3>
              <p className="text-xs text-green-200">Certified organic fruits, vegetables, honey, and fresh harvests.</p>
            </div>
            <div className="relative z-10 pt-4">
              <button
                onClick={() => {
                  setSelectedCategory('groceries');
                  setCurrentView('shop');
                }}
                className="bg-white text-green-950 hover:bg-green-50 text-xs font-black px-6 py-3 rounded-full shadow-md transition-all"
              >
                Explore Groceries →
              </button>
            </div>
          </div>

          {/* Banner 2 */}
          <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-r from-gray-950 via-gray-900 to-green-950 text-white p-8 sm:p-10 flex flex-col justify-between h-72 shadow-xl shadow-gray-950/10 border border-gray-800">
            <div className="relative z-10 max-w-sm space-y-3">
              <span className="bg-[#16A34A] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block">
                New Tech Releases
              </span>
              <h3 className="text-3xl font-serif font-bold leading-tight">Upgrade Your Wireless Audio Experience</h3>
              <p className="text-xs text-gray-300">Industry-leading noise canceling headphones & smart wearables.</p>
            </div>
            <div className="relative z-10 pt-4">
              <button
                onClick={() => {
                  setSelectedCategory('electronics');
                  setCurrentView('shop');
                }}
                className="bg-[#16A34A] hover:bg-green-600 text-white text-xs font-black px-6 py-3 rounded-full shadow-md transition-all"
              >
                Shop Electronics →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-extrabold text-[#16A34A] uppercase tracking-widest block mb-1">
              Most Loved
            </span>
            <h2 className="text-3xl font-serif font-bold text-gray-900">Top Selling Items</h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setCurrentView('shop');
            }}
            className="text-xs font-bold text-[#16A34A] hover:text-green-700 flex items-center gap-1"
          >
            Explore All →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 8. Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-[40px] border border-green-100 p-8 sm:p-12 shadow-xl shadow-green-900/5">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-extrabold text-[#16A34A] uppercase tracking-widest block mb-2">
              Trusted by 50,000+ Happy Shoppers
            </span>
            <h2 className="text-3xl font-serif font-bold text-gray-900">What Our Buyers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F0FDF4] p-6 sm:p-8 rounded-[32px] border border-green-100/80 space-y-4">
              <div className="flex items-center text-amber-400 gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-gray-700 leading-relaxed font-sans italic">
                "GreenMart delivered my Sony headphones in under 24 hours in Lahore! Packaging was perfect and original warranty card included. Best e-commerce site!"
              </p>
              <div className="pt-3 border-t border-green-200/60 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Ahmad Raza</h4>
                  <span className="text-[10px] text-green-700 font-semibold">Verified Buyer</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
              </div>
            </div>

            <div className="bg-[#F0FDF4] p-6 sm:p-8 rounded-[32px] border border-green-100/80 space-y-4">
              <div className="flex items-center text-amber-400 gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-gray-700 leading-relaxed font-sans italic">
                "The JazzCash payment was seamless and my organic avocados arrived super fresh. I love the clean design and transparent price discounts."
              </p>
              <div className="pt-3 border-t border-green-200/60 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Fatima Malik</h4>
                  <span className="text-[10px] text-green-700 font-semibold">Verified Buyer</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
              </div>
            </div>

            <div className="bg-[#F0FDF4] p-6 sm:p-8 rounded-[32px] border border-green-100/80 space-y-4">
              <div className="flex items-center text-amber-400 gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-gray-700 leading-relaxed font-sans italic">
                "High quality leather sneakers and super smooth checkout experience. Customer support responded to my query within 5 minutes."
              </p>
              <div className="pt-3 border-t border-green-200/60 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Usman Ali</h4>
                  <span className="text-[10px] text-green-700 font-semibold">Verified Buyer</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
