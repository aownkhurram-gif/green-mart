import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'shipping' | 'payments' | 'orders' | 'returns';
}

const FAQ_DATA: FAQItem[] = [
  {
    category: 'shipping',
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 2 to 3 business days across major cities. Express 24-hour delivery is also available for urgent orders.',
  },
  {
    category: 'shipping',
    question: 'Is shipping free?',
    answer: 'Yes! All orders over $50 qualify for 100% FREE express shipping automatically.',
  },
  {
    category: 'payments',
    question: 'What payment methods do you accept?',
    answer: 'We accept Cash on Delivery (COD), JazzCash, Easypaisa mobile wallets, and major Credit/Debit cards (Visa, MasterCard, UnionPay).',
  },
  {
    category: 'payments',
    question: 'How do discount coupons work?',
    answer: 'Simply enter active coupon codes like GREEN20 or WELCOME10 in your shopping cart summary before proceeding to checkout.',
  },
  {
    category: 'returns',
    question: 'What is your return & refund policy?',
    answer: 'We offer a 7-day hassle-free return guarantee for damaged, defective, or incorrect items. Return shipping is completely free.',
  },
  {
    category: 'orders',
    question: 'How can I track my order status?',
    answer: 'Log into your GreenMart account and navigate to "My Orders" to view real-time status updates from Processing to Shipped & Delivered.',
  },
];

export const FAQPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [search, setSearch] = useState('');

  const filteredFaqs = FAQ_DATA.filter((item) => {
    if (activeCategory !== 'all' && item.category !== activeCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-black text-gray-900">Frequently Asked Questions</h1>
        <p className="text-xs text-gray-500">Find answers to common questions about shipping, payments, and returns.</p>
      </div>

      {/* Search & Category Filter */}
      <div className="space-y-4">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions (e.g., shipping, returns, JazzCash)..."
            className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-9 pr-4 text-xs text-gray-900 focus:outline-none focus:border-emerald-600 shadow-xs"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
        </div>

        <div className="flex justify-center gap-2 overflow-x-auto pb-1 text-xs">
          {['all', 'shipping', 'payments', 'orders', 'returns'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`capitalize px-4 py-1.5 rounded-xl font-bold transition-colors ${
                activeCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-gray-900 hover:text-emerald-600 transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    isOpen ? 'rotate-180 text-emerald-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-0 text-xs text-gray-600 leading-relaxed border-t border-gray-50 mt-1">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
