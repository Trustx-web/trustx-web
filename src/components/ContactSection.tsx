import React, { useState } from 'react';
import { Mail, ShieldCheck, ArrowRight, CheckCircle2, Globe } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [focus, setFocus] = useState('Cash on Delivery (COD) Refusal');
  const [volume, setVolume] = useState('50,000 - 200,000 orders/mo');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      setError('Please enter a valid work email address.');
      return;
    }
    if (!company.trim()) {
      setError('Please enter your company or merchant name.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 md:py-22 border-t border-slate-200/80 bg-slate-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left 5 Columns: Contact Information & Value */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">
                04. Contact & Live Demo
              </div>
              <h2
                className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight"
                style={{ textWrap: 'balance' }}
              >
                See Trust-X Running on Your Own Commerce Signals
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Schedule a personalized walkthrough with our risk engineering team or request sandbox credentials to test real-time evaluation against your checkout and logistics flows.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="surface-card rounded-xl p-4 flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Merchant Solutions</div>
                  <a
                    href="mailto:merchants@trust-x.dev"
                    className="text-xs text-blue-700 hover:underline font-mono"
                  >
                    merchants@trust-x.dev
                  </a>
                </div>
              </div>

              <div className="surface-card rounded-xl p-4 flex items-start gap-3.5">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Security & Privacy Office</div>
                  <a
                    href="mailto:privacy@trust-x.dev"
                    className="text-xs text-emerald-700 hover:underline font-mono"
                  >
                    privacy@trust-x.dev
                  </a>
                </div>
              </div>

              <div className="surface-card rounded-xl p-4 flex items-start gap-3.5">
                <Globe className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Global Cloud Regions</div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    ap-south-1 (India) · us-east-1 (US) · eu-central-1 (EU)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right 7 Columns: Validated Demo Signup Form */}
          <div className="lg:col-span-7 surface-glass rounded-2xl p-6 sm:p-8">
            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6 text-emerald-700" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Demo Request Confirmed</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-900">{company}</strong>. Our engineering team has received your inquiry for <strong className="text-slate-900">{focus}</strong> and will reach out to <span className="font-mono text-blue-700">{email}</span> within one business day.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setEmail('');
                      setCompany('');
                      setMessage('');
                    }}
                    className="px-4 py-2 text-xs font-semibold text-blue-700 hover:text-blue-800 border border-blue-200 rounded-lg cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Sign Up for a Demo</h3>
                <p className="text-xs text-slate-500">
                  Sandbox API keys and integration walkthrough dispatched within 24 hours.
                </p>

                {error && (
                  <div
                    role="alert"
                    className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium"
                  >
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-slate-700 mb-1">
                      Work Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-company" className="block text-xs font-medium text-slate-700 mb-1">
                      Company / Storefront
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      required
                      placeholder="Acme Commerce"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-focus" className="block text-xs font-medium text-slate-700 mb-1">
                      Primary Risk Focus
                    </label>
                    <select
                      id="contact-focus"
                      value={focus}
                      onChange={(e) => setFocus(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="Cash on Delivery (COD) Refusal">Cash on Delivery (COD) Refusal</option>
                      <option value="Checkout & Payment Fraud">Checkout & Payment Fraud</option>
                      <option value="Serial Return & Wardrobing Abuse">Serial Return & Wardrobing Abuse</option>
                      <option value="Shared-Device Syndicate Protection">Shared-Device Syndicate Protection</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-volume" className="block text-xs font-medium text-slate-700 mb-1">
                      Monthly Order Volume
                    </label>
                    <select
                      id="contact-volume"
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="10,000 - 50,000 orders/mo">10,000 - 50,000 orders/mo</option>
                      <option value="50,000 - 200,000 orders/mo">50,000 - 200,000 orders/mo</option>
                      <option value="200,000+ orders/mo">200,000+ orders/mo</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-notes" className="block text-xs font-medium text-slate-700 mb-1">
                    Integration Notes (Optional)
                  </label>
                  <textarea
                    id="contact-notes"
                    rows={3}
                    placeholder="Share your storefront stack (Shopify Plus, WooCommerce, custom API) or current challenges..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-slate-500">
                    Purpose-limited inquiry · Zero third-party sharing
                  </span>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-xs transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <span>Request Live Demo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
