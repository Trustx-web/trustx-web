import React from 'react';
import { Zap, ShieldCheck, TrendingDown, Lock, ShoppingBag, Activity } from 'lucide-react';
import { BENCHMARK_STATS } from '../data/mockData';

export const ProofMetrics: React.FC = () => {
  const platforms = [
    { name: 'Shopify Plus', type: 'Native App' },
    { name: 'WooCommerce', type: 'Plugin' },
    { name: 'Magento / Adobe', type: 'Enterprise Connector' },
    { name: 'Stripe & Adyen', type: 'Pre-Auth Webhook' },
    { name: 'Custom Commerce Stack', type: 'OpenAPI REST' },
  ];

  return (
    <section className="relative py-12 bg-slate-50/50 border-y border-slate-200/80 overflow-hidden">
      {/* Ambient background bloom */}
      <div className="absolute -top-24 right-1/4 w-80 h-80 azure-blob-2 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-24 left-1/4 w-80 h-80 azure-blob-1 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Quantitative Rigor Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BENCHMARK_STATS.map((m, idx) => {
            return (
              <div 
                key={idx} 
                className="liquid-glass-card rounded-2xl p-6 relative group border border-white/90 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl liquid-glass flex items-center justify-center shrink-0 border border-white/80 group-hover:scale-105 transition-transform shadow-2xs">
                    {idx === 0 && <Zap className="w-5 h-5 text-blue-600" />}
                    {idx === 1 && <ShieldCheck className="w-5 h-5 text-blue-600" />}
                    {idx === 2 && <TrendingDown className="w-5 h-5 text-blue-600" />}
                    {idx === 3 && <Lock className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full liquid-glass text-[10px] font-mono text-blue-700 font-semibold border border-blue-200/60 shadow-2xs">
                    <Activity className="w-2.5 h-2.5 text-blue-600" />
                    <span>Live Metric</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono tabular-nums">
                    {m.value}
                  </div>
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-1">
                    {m.metric}
                  </div>
                </div>

                <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                  {m.context}
                </p>
                <div className="mt-3 pt-2.5 border-t border-slate-200/60 text-[11px] text-slate-400 font-mono">
                  {m.methodology}
                </div>
              </div>
            );
          })}
        </div>

        {/* E-Commerce Integration Ecosystem */}
        <div className="mt-8 pt-6 border-t border-slate-200/80">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="text-xs font-mono text-slate-700 uppercase tracking-wider shrink-0 flex items-center gap-2">
              <ShoppingBag className="w-3.5 h-3.5 text-blue-600" />
              <span>Turnkey Merchant Connectors & Webhook Integrations</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {platforms.map((p, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg liquid-glass text-xs border border-white/80 shadow-2xs"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span className="text-slate-900 font-semibold">{p.name}</span>
                  <span className="text-slate-400 font-mono text-[10px]">({p.type})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
