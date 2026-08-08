import React from 'react';
import { ShieldCheck, Lock, FileText } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-black text-gray-900">Privacy Policy & Terms</h1>
        <p className="text-xs text-gray-500">How GreenMart protects your personal data and security.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xs space-y-6 text-xs text-gray-700 leading-relaxed">
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-gray-900">1. Data Privacy Commitment</h3>
          <p>
            GreenMart respects your privacy. We collect minimal customer information (such as name, phone number, shipping address, and email) solely for processing orders, managing customer accounts, and delivering parcels.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-bold text-gray-900">2. Payment Security</h3>
          <p>
            All electronic transactions (JazzCash, Easypaisa, and Credit Cards) are encrypted using 256-bit SSL protocol. We never store complete credit card or PIN numbers on our servers.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-bold text-gray-900">3. 7-Day Return & Replacement Policy</h3>
          <p>
            If you receive an item that is damaged, defective, or incorrect, you may request a free replacement or 100% refund within 7 days of delivery.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-sm font-bold text-gray-900">4. Third-Party Sharing</h3>
          <p>
            We do not sell or lease customer contact details to third-party advertisers. Information is shared strictly with delivery courier partners for order fulfilment.
          </p>
        </section>
      </div>
    </div>
  );
};
