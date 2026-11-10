import React, { useState } from 'react';
import { Truck, RefreshCw, ShieldAlert, Smartphone, ArrowRight, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
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
    <section id="use-cases" className="py-12 md:py-18 relative bg-white overflow-hidden">
      {/* Ambient background bloom for liquid glass refraction */}
      <div className="absolute top-1/3 left-10 w-96 h-96 azure-blob-3 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 azure-blob-1 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
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

        {/* 4 Category Selector Bar with Liquid Glass */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RISK_DOMAIN_USE_CASES.map((uc) => {
            const isSelected = uc.id === activeUseCase;
            return (
              <button
                key={uc.id}
                onClick={() => setActiveUseCase(uc.id)}
                className={`text-left p-5 rounded-2xl border transition-all relative ${
                  isSelected
                    ? 'liquid-glass-accent border-blue-400/90 shadow-md ring-1 ring-blue-500/20'
                    : 'liquid-glass-card border-white/90 hover:border-blue-200'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                    isSelected ? 'liquid-glass border-blue-300 shadow-xs scale-105' : 'liquid-glass border-white/90 shadow-2xs'
                  }`}>
                    {getIcon(uc.iconName)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 leading-snug">
                      {uc.title}
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {uc.subtitle}
                </div>
                {isSelected && (
                  <div className="absolute bottom-2.5 right-3 text-blue-600 font-mono text-[10px] flex items-center gap-0.5">
                    <span>ACTIVE</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Domain Deep-Dive Container with Liquid Glass Portal */}
        <div className="mt-6 rounded-2xl liquid-glass-portal border border-white/90 p-6 sm:p-8 shadow-xl relative overflow-hidden">
          
          {/* Subtle top edge liquid refraction highlight */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 6 Columns: Problem & Solution Architecture */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-mono text-blue-600 uppercase tracking-wider font-semibold">
                  Operational Challenge & Impact
                </span>
                <p className="mt-1.5 text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                  {current.problem}
                </p>
              </div>

              <div className="p-5 rounded-xl liquid-glass border border-white/90 shadow-xs space-y-2">
                <span className="text-xs font-mono text-slate-700 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>The TrustX Architecture</span>
                </span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {current.solution}
                </p>
              </div>

              {/* Measured Impact Badge */}
              <div className="flex items-center gap-3 p-4 rounded-xl liquid-glass-accent border border-blue-200/80 shadow-xs">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0 shadow-sm shadow-blue-500/50" />
                <span className="text-xs sm:text-sm font-semibold text-blue-900">
                  {current.measuredOutcome}
                </span>
              </div>
            </div>

            {/* Right 6 Columns: Key Signals & Merchant Policy Actions */}
            <div className="lg:col-span-6 space-y-5">
              
              {/* Key Signals evaluated */}
              <div className="p-5 rounded-xl liquid-glass border border-white/90 shadow-xs">
                <div className="text-xs font-mono text-blue-600 uppercase tracking-wider mb-3 font-semibold flex items-center justify-between">
                  <span>Underlying Scoped Signals</span>
                  <span className="text-[10px] font-mono text-slate-400">Zero Raw PII</span>
                </div>
                <div className="space-y-2">
                  {current.keySignals.map((sig, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <span className="text-blue-600 font-mono mt-0.5 font-bold">›</span>
                      <span>{sig}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Automated Merchant Controls */}
              <div className="p-5 rounded-xl liquid-glass border border-white/90 shadow-xs">
                <div className="text-xs font-mono text-slate-700 uppercase tracking-wider mb-3 font-semibold flex items-center justify-between">
                  <span>Configurable Policy Actions</span>
                  <span className="text-[10px] font-mono text-blue-700 font-medium">Sub-35ms</span>
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
