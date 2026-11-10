import React, { useState } from 'react';
import { X, Check, Shield, ArrowRight, Sparkles } from 'lucide-react';

interface EnterprisePilotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnterprisePilotModal: React.FC<EnterprisePilotModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    storeUrl: '',
    platform: 'Shopify Plus',
    monthlyOrders: '50,000 - 200,000',
    primaryRisk: 'Cash on Delivery (COD) Refusal',
    cloudRegion: 'ap-south-1 (India / Mumbai)'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl liquid-glass-portal border border-white/90 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Top highlight line */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

        {/* Modal Header */}
        <div className="px-6 py-4.5 bg-white/70 backdrop-blur-xl border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg liquid-glass flex items-center justify-center shadow-2xs">
              <Shield className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                TrustX Merchant Pilot & Architecture Review
              </h3>
              <p className="text-[10px] font-mono text-slate-400">Isolated Sandbox Provisioning</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-7 h-7 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Pilot Application Received</h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you for applying to the TrustX merchant pilot. A partner engineering specialist will review your integration profile ({formData.company}) and dispatch your sandbox credentials within 24 hours.
              </p>
              <div className="pt-4 flex justify-center">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-500/25"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Join our selective cohort of merchants running deterministic risk decisioning with privacy-preserving network effects.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-mono text-slate-600 block mb-1">Work Email</label>
                  <input
                    required
                    type="email"
                    placeholder="alex@brand.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-slate-600 block mb-1">Merchant / Brand Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Acme Retail"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-mono text-slate-600 block mb-1">Commerce Platform</label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 shadow-xs font-mono"
                  >
                    <option value="Shopify Plus">Shopify Plus</option>
                    <option value="WooCommerce">WooCommerce</option>
                    <option value="Magento / Adobe">Magento / Adobe Commerce</option>
                    <option value="Custom REST Stack">Custom REST Stack</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-600 block mb-1">Monthly Order Volume</label>
                  <select
                    value={formData.monthlyOrders}
                    onChange={(e) => setFormData({ ...formData, monthlyOrders: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 shadow-xs font-mono"
                  >
                    <option value="10,000 - 50,000">10,000 - 50,000 orders</option>
                    <option value="50,000 - 200,000">50,000 - 200,000 orders</option>
                    <option value="200,000+">200,000+ orders / month</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-600 block mb-1">Primary Abuse Challenge</label>
                <select
                  value={formData.primaryRisk}
                  onChange={(e) => setFormData({ ...formData, primaryRisk: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 shadow-xs"
                >
                  <option value="Cash on Delivery (COD) Refusal">Cash on Delivery (COD) Refusal & RTO Freight Loss</option>
                  <option value="Return & Wardrobing Abuse">Return & Wardrobing Abuse (Serial Returners)</option>
                  <option value="Checkout Card Fraud">Checkout Card Fraud & 3DS Step-Up Optimization</option>
                  <option value="Shared-Device Farms">Shared-Device Farms & Promotional Abuse</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">
                  SLA: Sandbox credentials within 24h
                </span>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all flex items-center gap-2 shadow-md shadow-blue-500/25 active:scale-[0.98]"
                >
                  <span>Submit Pilot Request</span>
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
