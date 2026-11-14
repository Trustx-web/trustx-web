import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Building2 } from 'lucide-react';
import operationsPhoto from '../assets/images/trustx_merchant_operations_1794652467014.jpg';
import { CASE_STUDIES } from '../data/mockData';

interface CaseStudiesSectionProps {
  onRequestDemo: () => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onRequestDemo }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [imgError, setImgError] = useState(false);

  const categories = ['All', 'COD & Logistics', 'Payments', 'Returns'];

  const filteredStudies =
    selectedCategory === 'All'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((cs) => cs.category === selectedCategory);

  return (
    <section id="case-studies" className="py-16 md:py-22 border-t border-slate-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Heading + Interactive Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 mb-2">
              03. Case Studies
            </div>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Proven Loss Prevention Across Global Commerce Leaders
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              See how merchants deploy Trust-X intelligence to protect margins without adding friction to trusted buyers.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter case studies by domain"
            className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg self-start md:self-auto"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-white text-blue-700 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Case Study Cards */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredStudies.map((study) => (
            <article
              key={study.id}
              className="surface-card rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="text-xs text-slate-500">
                  {study.category} · {study.timeframe}
                </div>
                <h3 className="mt-2 text-lg font-bold text-slate-900">{study.merchant}</h3>
                <div className="text-xs text-slate-500">{study.region}</div>

                <div className="mt-4 py-3 border-y border-slate-200/80">
                  <div className="text-lg font-extrabold text-emerald-700 font-mono tabular-nums">
                    {study.headlineMetric}
                  </div>
                </div>

                <div className="mt-4 space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <p>
                    <strong className="text-slate-900">Challenge:</strong> {study.challenge}
                  </p>
                  <p>
                    <strong className="text-slate-900">Trust-X Solution:</strong> {study.solution}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200/80 space-y-2">
                {study.results.map((res) => (
                  <div key={res} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{res}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Visual Editorial Proof Banner */}
        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50/70 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-5 relative min-h-[240px] bg-gradient-to-br from-blue-50 to-emerald-50">
            {!imgError ? (
              <img
                src={operationsPhoto}
                alt="Commerce risk operations specialists monitoring real-time network intelligence graphs"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                <Building2 className="w-12 h-12 text-blue-700 mb-3" />
                <p className="text-sm font-semibold text-slate-900">Merchant Risk Operations</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              Built for Risk & Operations Teams
            </div>
            <h3 className="mt-2 text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Turn Reactive Fraud Firefighting Into Proactive Intelligence
            </h3>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Connect Shopify Plus, WooCommerce, Stripe, Adyen, or custom commerce APIs in under an hour. Review calibrated reason codes, configure merchant-specific policy actions, and protect revenue before losses occur.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={onRequestDemo}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>Request Custom ROI Assessment</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
