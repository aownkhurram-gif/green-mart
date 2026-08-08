import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useShop();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      setSubmitted(true);
      showToast('Message Sent!', 'Thank you! Our support team will get back to you shortly.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
          24/7 Assistance
        </span>
        <h1 className="text-3xl font-black text-gray-900">Get in Touch with GreenMart</h1>
        <p className="text-xs text-gray-500">
          Have a question about an order, payment method, or return policy? We are here to help!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Contact Cards Left */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Phone Support</h4>
              <p className="text-xs text-gray-500 mt-0.5">+1 (800) 555-0199</p>
              <p className="text-[10px] text-gray-400">Mon - Sat: 9:00 AM - 9:00 PM</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Email Address</h4>
              <p className="text-xs text-gray-500 mt-0.5">support@greenmart.com</p>
              <p className="text-[10px] text-gray-400">Response within 2 hours</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Headquarters</h4>
              <p className="text-xs text-gray-500 mt-0.5">782 Green Avenue, Tech District</p>
              <p className="text-[10px] text-gray-400">City Center, Store #102</p>
            </div>
          </div>
        </div>

        {/* Contact Form Right */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-100">
            Send Us a Direct Message
          </h3>

          {submitted ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3 text-emerald-800">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-lg font-bold">Message Submitted Successfully!</h4>
              <p className="text-xs text-emerald-700">
                Thank you for reaching out to GreenMart. Our representative will contact you via email at <strong>{email}</strong> soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Khurram Shehzad"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. khurram@example.com"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Inquiry regarding order or delivery..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you today?..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3.5 px-8 rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
