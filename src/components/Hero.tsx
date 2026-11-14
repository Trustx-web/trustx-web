import React, { useState } from 'react';
import { ArrowRight, ShieldAlert, ShieldCheck, Activity, Network } from 'lucide-react';
import meshHeroVisual from '../assets/images/trustx_mesh_intelligence_1794652465045.jpg';
import { BENCHMARK_STATS } from '../data/mockData';

interface HeroProps {
  onRequestDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRequestDemo }) => {
  const [imgError, setImgError] = useState(false);

  const keyFeatures = [
    {
      icon: Activity,
      title: 'Real-time risk identification',
      description: 'Detect checkout, COD, and identity anomalies across live storefronts in under 35ms.',
      accent: 'text-blue-700 bg-blue-50 border-blue-200',
    },
    {
      icon: ShieldAlert,
      title: 'Abuse prevention',
      description: 'Stop return wardrobing, delivery refusals, and multi-account syndicates before dispatch.',
      accent: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      icon: ShieldCheck,
      title: 'Smarter decision-making',
      description: 'Explainable reason codes and confidence bands protect genuine buyer conversion.',
      accent: 'text-blue-700 bg-blue-50 border-blue-200',
    },
  ];

  return (
    <section className="relative pt-12 pb-16 md:pt-18 md:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Split Grid: Balanced 2-Column with items-stretch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Opening Line, Core Message, Key Features, and CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="text-xs font-semibold tracking-wide text-emerald-700 mb-4 flex items-center gap-2">
              <Network className="w-4 h-4 text-blue-700 shrink-0" />
              <span>Commerce Risk Intelligence Network</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-600 font-normal">Privacy-Gated Decisioning</span>
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-[3.25rem] font-extrabold text-slate-900 tracking-tight leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              The transaction is only the beginning.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600">
                The intelligence is everything.
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              TrustX transforms transactional, behavioural, device, and cross-merchant signals into
              real-time commerce risk intelligence enabling merchants to identify hidden risks,
              prevent abuse, and make smarter decisions before losses occur.
            </p>

            {/* Key Feature Highlights */}
            <div className="mt-8 space-y-4">
              {keyFeatures.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div key={feat.title} className="flex items-start gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${feat.accent}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">{feat.title}</h2>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-0.5">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Calls to Action: One Primary CTA + One Clear Secondary Link */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onRequestDemo}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                <span>Request a Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#services"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-700 hover:text-emerald-700 bg-white border border-slate-200 hover:border-emerald-300 rounded-xl transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              >
                <span>Explore TrustX Services</span>
              </a>
            </div>
          </div>

          {/* Right Column: Dominant 16:9 / Stretched Visual Focal Anchor */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex-1 rounded-2xl surface-glass overflow-hidden flex flex-col justify-between">
              <div className="relative flex-1 min-h-[280px] bg-gradient-to-br from-blue-50 via-white to-emerald-50">
                {!imgError ? (
                  <img
                    src={meshHeroVisual}
                    alt="TrustX interconnected commerce risk intelligence mesh linking transactional, behavioral, and device signals"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                    <ShieldCheck className="w-14 h-14 text-blue-700 mb-3" />
                    <p className="text-sm font-semibold text-slate-900">
                      TrustX Signal Connectivity Mesh
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      Real-time evaluation across checkout, COD, and return workflows
                    </p>
                  </div>
                )}
              </div>

              <div className="px-5 py-4 bg-white/95 border-t border-slate-200/80 flex items-center justify-between gap-4 text-xs">
                <div>
                  <div className="font-semibold text-slate-900">
                    Privacy-Gated Signal Mesh
                  </div>
                  <div className="text-slate-500 mt-0.5">
                    Transactional · Behavioural · Device · Cross-Merchant
                  </div>
                </div>
                <span className="font-mono font-semibold text-emerald-700 tabular-nums shrink-0">
                  &lt; 35ms SLO
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Proof Strip Directly Below Hero Split */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENCHMARK_STATS.map((stat) => (
            <div key={stat.metric} className="surface-card rounded-xl p-5">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums tracking-tight">
                <span
                  className={
                    stat.value.startsWith('-') || stat.value.includes('99')
                      ? 'text-emerald-700'
                      : 'text-blue-700'
                  }
                >
                  {stat.value}
                </span>
              </div>
              <div className="mt-1.5 text-xs font-bold uppercase tracking-wider text-slate-800">
                {stat.metric}
              </div>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{stat.context}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
