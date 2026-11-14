import React, { useState, useEffect, useRef } from 'react';
import { Mail, ShieldCheck, ArrowRight, CheckCircle2, Globe, Loader2, AlertCircle } from 'lucide-react';

export const INQUIRY_TYPES = [
  'Request a Product Demo',
  'Merchant Partnership',
  'Investor Inquiry',
  'Technical Integration',
  'Security & Privacy',
  'General Inquiry',
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number];

interface ContactSectionProps {
  preselectedInquiryType?: InquiryType | '';
  focusTrigger?: number;
}

const CONTACT_EMAIL = 'krishnakamireddy@trustx.world';
const FORMSUBMIT_AJAX_URL = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SUCCESS_MESSAGE =
  'Thank you for contacting TrustX. Your inquiry has been submitted successfully.';
const ERROR_MESSAGE =
  "We couldn't submit your inquiry. Please try again or email krishnakamireddy@trustx.world.";

export const ContactSection: React.FC<ContactSectionProps> = ({
  preselectedInquiryType = '',
  focusTrigger = 0,
}) => {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [company, setCompany] = useState('');
  const [inquiryType, setInquiryType] = useState<InquiryType | ''>(preselectedInquiryType);
  const [monthlyOrderVolume, setMonthlyOrderVolume] = useState('');
  const [integrationStack, setIntegrationStack] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusType, setStatusType] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const formRef = useRef<HTMLFormElement | null>(null);
  const fullNameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (preselectedInquiryType) {
      setInquiryType(preselectedInquiryType);
    }
  }, [preselectedInquiryType]);

  useEffect(() => {
    if (focusTrigger > 0) {
      setStatusType('idle');
      setStatusMessage('');
      const timer = setTimeout(() => {
        fullNameInputRef.current?.focus({ preventScroll: true });
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [focusTrigger]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const form = formRef.current || event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const cleanName = fullName.trim();
    const cleanEmail = workEmail.trim();
    const cleanCompany = company.trim();
    const cleanMessage = message.trim();

    if (!cleanName || !EMAIL_REGEX.test(cleanEmail) || !cleanCompany || !inquiryType || !cleanMessage) {
      setStatusType('error');
      setStatusMessage('Please complete all required fields with a valid work email address.');
      return;
    }

    setIsSubmitting(true);
    setStatusType('idle');
    setStatusMessage('');

    try {
      const formData = new FormData(form);
      const response = await fetch(FORMSUBMIT_AJAX_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      const result = (await response.json()) as {
        success?: boolean | string;
        message?: string;
      };

      const isConfirmed =
        response.ok &&
        (result.success === true || String(result.success).toLowerCase() === 'true');

      if (isConfirmed) {
        setStatusType('success');
        setStatusMessage(SUCCESS_MESSAGE);
        form.reset();
        setFullName('');
        setWorkEmail('');
        setCompany('');
        setInquiryType('');
        setMonthlyOrderVolume('');
        setIntegrationStack('');
        setMessage('');
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('TrustX contact form error:', error);
      setStatusType('error');
      setStatusMessage(ERROR_MESSAGE);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-22 border-t border-slate-200/80 bg-slate-50/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left 5 Columns: Contact Information & Value */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">
                04. Contact &amp; Live Demo
              </div>
              <h2
                className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight"
                style={{ textWrap: 'balance' }}
              >
                See TrustX Running on Your Own Commerce Signals
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Schedule a personalized walkthrough with our risk engineering team, discuss a merchant partnership, or reach out regarding security and technical integration.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="surface-card rounded-xl p-4 flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Merchant Solutions &amp; Demos</div>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-xs text-blue-700 hover:underline font-mono break-all"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="surface-card rounded-xl p-4 flex items-start gap-3.5">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Security &amp; Privacy Office</div>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-xs text-emerald-700 hover:underline font-mono break-all"
                  >
                    {CONTACT_EMAIL}
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

          {/* Right 7 Columns: FormSubmit-Connected TrustX Contact Form */}
          <div className="lg:col-span-7 surface-glass rounded-2xl p-6 sm:p-8">
            <form
              id="trustx-contact-form"
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-900">Contact TrustX</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Fields marked with <span className="text-rose-600 font-semibold">*</span> are required. Inquiries route directly to{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-700 hover:underline font-mono">
                    {CONTACT_EMAIL}
                  </a>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-fullname" className="block text-xs font-medium text-slate-700 mb-1">
                    Full Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    ref={fullNameInputRef}
                    id="contact-fullname"
                    name="name"
                    type="text"
                    required
                    disabled={isSubmitting}
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 disabled:opacity-60"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-slate-700 mb-1">
                    Work Email <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    disabled={isSubmitting}
                    placeholder="Work Email"
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-company" className="block text-xs font-medium text-slate-700 mb-1">
                    Company / Storefront <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    required
                    disabled={isSubmitting}
                    placeholder="Company / Storefront"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 disabled:opacity-60"
                  />
                </div>
                <div>
                  <label htmlFor="contact-inquiry-type" className="block text-xs font-medium text-slate-700 mb-1">
                    Subject / Inquiry Type <span className="text-rose-600">*</span>
                  </label>
                  <select
                    id="contact-inquiry-type"
                    name="inquiry_type"
                    required
                    disabled={isSubmitting}
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value as InquiryType | '')}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-60"
                  >
                    <option value="">Select Inquiry Type</option>
                    {INQUIRY_TYPES.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-volume" className="block text-xs font-medium text-slate-700 mb-1">
                    Monthly Order Volume <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="contact-volume"
                    name="monthly_order_volume"
                    type="text"
                    disabled={isSubmitting}
                    placeholder="Monthly Order Volume"
                    value={monthlyOrderVolume}
                    onChange={(e) => setMonthlyOrderVolume(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 disabled:opacity-60"
                  />
                </div>
                <div>
                  <label htmlFor="contact-stack" className="block text-xs font-medium text-slate-700 mb-1">
                    Integration Stack <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="contact-stack"
                    name="integration_stack"
                    type="text"
                    disabled={isSubmitting}
                    placeholder="Integration Stack"
                    value={integrationStack}
                    onChange={(e) => setIntegrationStack(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium text-slate-700 mb-1">
                  Message <span className="text-rose-600">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  disabled={isSubmitting}
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-60"
                />
              </div>

              {/* FormSubmit configuration */}
              <input type="hidden" name="_subject" value="New TrustX Website Inquiry" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="true" />
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-slate-500">
                  Do not submit payment card numbers, CVVs, or passwords.
                </span>
                <button
                  type="submit"
                  id="submit-button"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-xl shadow-xs transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Inquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <p
                id="form-status"
                role="status"
                aria-live="polite"
                className={
                  statusType === 'success'
                    ? 'p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-800 font-medium flex items-start gap-2.5'
                    : statusType === 'error'
                    ? 'p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-800 font-medium flex items-start gap-2.5'
                    : 'sr-only'
                }
              >
                {statusType === 'success' && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                )}
                {statusType === 'error' && (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
                <span>{statusMessage}</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
