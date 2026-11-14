import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface EnterprisePilotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnterprisePilotModal: React.FC<EnterprisePilotModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    company: '',
    platform: 'Shopify Plus',
    monthlyOrders: '50,000 - 200,000',
    primaryRisk: 'Cash on Delivery (COD) Refusal',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email.trim())) {
      setError('Please enter a valid work email address.');
      return;
    }
    if (!formData.company.trim()) {
      setError('Please enter your merchant or brand name.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/45 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
    >
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-700 to-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </span>
            <div>
              <h3 id="demo-modal-title" className="text-sm font-bold text-slate-900">
                Sign Up for a Trust-X Demo
              </h3>
              <p className="text-xs text-slate-500">Live walkthrough & isolated sandbox access</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6 text-emerald-700" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Demo Request Received</h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you for contacting Trust-X. A risk solutions specialist will prepare a tailored walkthrough for{' '}
                <strong className="text-slate-900">{formData.company}</strong> and contact{' '}
                <span className="font-mono text-blue-700">{formData.email}</span> within 24 hours.
              </p>
              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl transition-colors cursor-pointer"
                >
                  Return to Trust-X
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                See how Trust-X transforms transactional, behavioural, device, and cross-merchant signals into real-time decisions.
              </p>

              {error && (
                <div
                  role="alert"
                  className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium"
                >
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="modal-email" className="text-xs font-medium text-slate-700 block mb-1">
                    Work Email
                  </label>
                  <input
                    id="modal-email"
                    required
                    type="email"
                    placeholder="name@brand.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label htmlFor="modal-company" className="text-xs font-medium text-slate-700 block mb-1">
                    Merchant / Brand Name
                  </label>
                  <input
                    id="modal-company"
                    required
                    type="text"
                    placeholder="Acme Retail"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="modal-platform" className="text-xs font-medium text-slate-700 block mb-1">
                    Commerce Platform
                  </label>
                  <select
                    id="modal-platform"
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Shopify Plus">Shopify Plus</option>
                    <option value="WooCommerce">WooCommerce</option>
                    <option value="Magento / Adobe">Magento / Adobe Commerce</option>
                    <option value="Custom REST Stack">Custom REST Stack</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="modal-volume" className="text-xs font-medium text-slate-700 block mb-1">
                    Monthly Orders
                  </label>
                  <select
                    id="modal-volume"
                    value={formData.monthlyOrders}
                    onChange={(e) => setFormData({ ...formData, monthlyOrders: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="10,000 - 50,000">10,000 - 50,000</option>
                    <option value="50,000 - 200,000">50,000 - 200,000</option>
                    <option value="200,000+">200,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="modal-risk" className="text-xs font-medium text-slate-700 block mb-1">
                  Primary Focus
                </label>
                <select
                  id="modal-risk"
                  value={formData.primaryRisk}
                  onChange={(e) => setFormData({ ...formData, primaryRisk: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Cash on Delivery (COD) Refusal">Cash on Delivery (COD) Refusal & RTO Loss</option>
                  <option value="Return & Wardrobing Abuse">Return & Wardrobing Abuse</option>
                  <option value="Checkout Card Fraud">Checkout Fraud & 3DS Optimization</option>
                  <option value="Shared-Device Farms">Shared-Device Farms & Promo Abuse</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-4">
                <span className="text-xs text-slate-500">Response within 24 hours</span>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl transition-colors cursor-pointer"
                >
                  <span>Request Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
