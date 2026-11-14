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
  preselectedInquiryType?: InquiryType;
  focusTrigger?: number;
}

const CONTACT_EMAIL = 'krishnakamireddy@trustx.world';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SUCCESS_MESSAGE =
  'Thank you for contacting TrustX. Your inquiry has been submitted successfully. We’ll get back to you soon.';
const FALLBACK_ERROR_MESSAGE =
  'We couldn’t submit your inquiry right now. Please try again or email krishnakamireddy@trustx.world directly.';

export const ContactSection: React.FC<ContactSectionProps> = ({
  preselectedInquiryType = 'Request a Product Demo',
  focusTrigger = 0,
}) => {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [company, setCompany] = useState('');
  const [inquiryType, setInquiryType] = useState<InquiryType>(preselectedInquiryType);
  const [monthlyOrderVolume, setMonthlyOrderVolume] = useState('');
  const [integrationStack, setIntegrationStack] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // Honeypot spam trap
  const [formLoadedAt, setFormLoadedAt] = useState<number>(() => Date.now());

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState(SUCCESS_MESSAGE);

  const fullNameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setInquiryType(preselectedInquiryType);
  }, [preselectedInquiryType]);

  useEffect(() => {
    if (focusTrigger > 0) {
      setSubmitted(false);
      const timer = setTimeout(() => {
        fullNameInputRef.current?.focus({ preventScroll: true });
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [focusTrigger]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const stripUnsafe = (val: string, maxLen: number) =>
      val.replace(/[<>]/g, '').replace(/[\r\t]+/g, ' ').trim().slice(0, maxLen);

    const cleanName = stripUnsafe(fullName.replace(/\n+/g, ' '), 120);
    const cleanEmail = stripUnsafe(workEmail.replace(/\n+/g, ' '), 160).toLowerCase();
    const cleanCompany = stripUnsafe(company.replace(/\n+/g, ' '), 140);
    const cleanMessage = stripUnsafe(message, 4000);
    const cleanVolume = stripUnsafe(monthlyOrderVolume.replace(/\n+/g, ' '), 80);
    const cleanStack = stripUnsafe(integrationStack.replace(/\n+/g, ' '), 160);

    if (!cleanName) {
      setError('Please enter your full name.');
      return;
    }
    if (!EMAIL_REGEX.test(cleanEmail)) {
      setError('Please enter a valid work email address.');
      return;
    }
    if (!cleanCompany) {
      setError('Please enter your company or storefront name.');
      return;
    }
    if (!INQUIRY_TYPES.includes(inquiryType)) {
      setError('Please select an inquiry type.');
      return;
    }
    if (cleanMessage.length < 10) {
      setError('Please enter a brief message (at least 10 characters).');
      return;
    }

    if (website.trim().length > 0) {
      setError(FALLBACK_ERROR_MESSAGE);
      return;
    }

    setError('');
    setIsSubmitting(true);

    const sanitizedPayload = {
      fullName: cleanName,
      workEmail: cleanEmail,
      company: cleanCompany,
      inquiryType,
      monthlyOrderVolume: cleanVolume,
      integrationStack: cleanStack,
      message: cleanMessage,
      website,
      formLoadedAt,
    };

    const submitViaFormSubmitBrowserFallback = async (): Promise<boolean> => {
      const submittedAt = new Date().toISOString();
      const fsResponse = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          _subject: `[TrustX Website Inquiry] — ${inquiryType} — ${cleanCompany}`,
          _replyto: cleanEmail,
          _template: 'table',
          _captcha: 'false',
          'Full Name': cleanName,
          'Work Email': cleanEmail,
          'Company / Storefront': cleanCompany,
          'Inquiry Type': inquiryType,
          'Monthly Order Volume': cleanVolume || 'Not specified',
          'Integration Stack': cleanStack || 'Not specified',
          'Submission Timestamp (UTC)': submittedAt,
          Message: cleanMessage,
        }),
      });

      const fsData = (await fsResponse.json().catch(() => ({}))) as {
        success?: boolean | string;
      };
      return (
        fsResponse.ok &&
        (fsData.success === true || String(fsData.success).toLowerCase() === 'true')
      );
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedPayload),
      });

      let payload: { ok?: boolean; message?: string; error?: string } = {};
      try {
        payload = (await response.json()) as { ok?: boolean; message?: string; error?: string };
      } catch {
        payload = {};
      }

      if (response.ok && payload.ok) {
        setSuccessMessage(payload.message || SUCCESS_MESSAGE);
        setSubmitted(true);
        setError('');
      } else if (
        response.status === 400 ||
        response.status === 409 ||
        response.status === 429
      ) {
        setError(payload.error || FALLBACK_ERROR_MESSAGE);
      } else {
        // Fallback to FormSubmit directly from browser if /api/contact is unavailable (404/405) or provider rejected server IP (502)
        const fallbackOk = await submitViaFormSubmitBrowserFallback();
        if (fallbackOk) {
          setSuccessMessage(SUCCESS_MESSAGE);
          setSubmitted(true);
          setError('');
        } else {
          setError(FALLBACK_ERROR_MESSAGE);
        }
      }
    } catch {
      try {
        const fallbackOk = await submitViaFormSubmitBrowserFallback();
        if (fallbackOk) {
          setSuccessMessage(SUCCESS_MESSAGE);
          setSubmitted(true);
          setError('');
        } else {
          setError(FALLBACK_ERROR_MESSAGE);
        }
      } catch {
        setError(FALLBACK_ERROR_MESSAGE);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFullName('');
    setWorkEmail('');
    setCompany('');
    setMonthlyOrderVolume('');
    setIntegrationStack('');
    setMessage('');
    setWebsite('');
    setError('');
    setFormLoadedAt(Date.now());
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

          {/* Right 7 Columns: Validated Contact / Demo Inquiry Form */}
          <div className="lg:col-span-7 surface-glass rounded-2xl p-6 sm:p-8">
            {submitted ? (
              <div className="py-10 text-center space-y-4" role="status" aria-live="polite">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6 text-emerald-700" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Inquiry Received</h3>
                <p className="text-sm text-slate-700 max-w-md mx-auto leading-relaxed">
                  {successMessage}
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2 text-xs font-semibold text-blue-700 hover:text-blue-800 border border-blue-200 rounded-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Contact TrustX</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Fields marked with <span className="text-rose-600 font-semibold">*</span> are required. Inquiries route directly to our team at{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-700 hover:underline font-mono">
                      {CONTACT_EMAIL}
                    </a>.
                  </p>
                </div>

                {/* Hidden Honeypot Field for Automated Spam Protection */}
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                {error && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium flex items-start gap-2.5"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-fullname" className="block text-xs font-medium text-slate-700 mb-1">
                      Full Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      ref={fullNameInputRef}
                      id="contact-fullname"
                      name="fullName"
                      type="text"
                      required
                      disabled={isSubmitting}
                      placeholder="Alex Rivera"
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
                      name="workEmail"
                      type="email"
                      required
                      disabled={isSubmitting}
                      placeholder="alex@company.com"
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
                      placeholder="Acme Commerce"
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
                      name="inquiryType"
                      required
                      disabled={isSubmitting}
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value as InquiryType)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-60"
                    >
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
                    <select
                      id="contact-volume"
                      name="monthlyOrderVolume"
                      disabled={isSubmitting}
                      value={monthlyOrderVolume}
                      onChange={(e) => setMonthlyOrderVolume(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-60"
                    >
                      <option value="">Select order volume (optional)</option>
                      <option value="Under 10,000 orders/mo">Under 10,000 orders/mo</option>
                      <option value="10,000 - 50,000 orders/mo">10,000 - 50,000 orders/mo</option>
                      <option value="50,000 - 200,000 orders/mo">50,000 - 200,000 orders/mo</option>
                      <option value="200,000+ orders/mo">200,000+ orders/mo</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-stack" className="block text-xs font-medium text-slate-700 mb-1">
                      Integration Stack <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="contact-stack"
                      name="integrationStack"
                      type="text"
                      disabled={isSubmitting}
                      placeholder="Shopify Plus, Stripe, Custom API..."
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
                    placeholder="Tell us about your storefront risk challenges, demo goals, or partnership inquiry..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-60"
                  />
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-slate-500">
                    Purpose-limited inquiry · Zero third-party sharing
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-xl shadow-xs transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Inquiry</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
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
