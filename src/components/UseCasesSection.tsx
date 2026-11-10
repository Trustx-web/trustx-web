import React, { useState } from 'react';
import { Truck, RefreshCw, ShieldAlert, Smartphone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { RISK_DOMAIN_USE_CASES } from '../data/mockData';

export const UseCasesSection: React.FC = () => {
  const [activeUseCase, setActiveUseCase] = useState(RISK_DOMAIN_USE_CASES[0].id);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Truck': return <Truck className="w-5 h-5 text-blue-600" />;
      case 'RefreshCw': return <RefreshCw className="w-5 h-5 text-blue-600" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-blue-600" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-blue-600" />;
      default: return <ShieldAlert className="w-5 h-5 text-blue-600" />;
    }
  };

  const current = RISK_DOMAIN_USE_CASES.find(u => u.id === activeUseCase) || RISK_DOMAIN_USE_CASES[0];

  return (
    <section id="use-cases" className="py-12 md:py-18 relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 font-mono mb-2">
            Targeted Commerce Risk Domains
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Tailored Signals for the Most Costly E-Commerce Abuse Vectors
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Generic fraud tools only check credit card CVVs. TrustX addresses the actual operational leaks draining merchant margins: uncollected COD dispatches, wardrobed returns, and multi-accounting device farms.
          </p>
        </div>

        {/* 4 Category Selector Bar */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {RISK_DOMAIN_USE_CASES.map((uc) => {
            const isSelected = uc.id === activeUseCase;
            return (
              <button
                key={uc.id}
                onClick={() => setActiveUseCase(uc.id)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-blue-50/70 border-blue-400 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${
                    isSelected ? 'bg-white border-blue-300 shadow-xs' : 'bg-slate-50 border-slate-200'
                  }`}>
                    {getIcon(uc.iconName)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 leading-snug">
                      {uc.title}
                    </div>
                  </div>
                </div>
                <div className="mt-2.5 text-[11px] text-slate-500 line-clamp-2">
                  {uc.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Domain Deep-Dive Container */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 6 Columns: Problem & Solution Architecture */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-mono text-blue-600 uppercase tracking-wider">
                  Operational Challenge & Impact
                </span>
                <p className="mt-1.5 text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                  {current.problem}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs space-y-2">
                <span className="text-xs font-mono text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>The TrustX Architecture</span>
                </span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {current.solution}
                </p>
              </div>

              {/* Measured Impact Badge */}
              <div className="flex items-center gap-3 p-3.5 rounded-lg bg-blue-50 border border-blue-200">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-blue-800">
                  {current.measuredOutcome}
                </span>
              </div>
            </div>

            {/* Right 6 Columns: Key Signals & Merchant Policy Actions */}
            <div className="lg:col-span-6 space-y-5">
              
              {/* Key Signals evaluated */}
              <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs">
                <div className="text-xs font-mono text-blue-600 uppercase tracking-wider mb-3 font-semibold">
                  Underlying Scoped Signals
                </div>
                <div className="space-y-2">
                  {current.keySignals.map((sig, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <span className="text-blue-600 font-mono mt-0.5">›</span>
                      <span>{sig}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Automated Merchant Controls */}
              <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-xs">
                <div className="text-xs font-mono text-slate-700 uppercase tracking-wider mb-3 font-semibold">
                  Configurable Policy Actions
                </div>
                <div className="space-y-2">
                  {current.merchantActions.map((act, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <span className="text-blue-600 font-mono mt-0.5 font-bold">✓</span>
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
