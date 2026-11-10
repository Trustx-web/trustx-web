import React from 'react';
import { Zap, ShieldCheck, TrendingDown, Lock, ShoppingBag } from 'lucide-react';
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
    <section className="border-y border-slate-200 bg-slate-50/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Quantitative Rigor Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {BENCHMARK_STATS.map((m, idx) => {
            return (
              <div key={idx} className="relative group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                    {idx === 0 && <Zap className="w-5 h-5 text-blue-600" />}
                    {idx === 1 && <ShieldCheck className="w-5 h-5 text-blue-600" />}
                    {idx === 2 && <TrendingDown className="w-5 h-5 text-blue-600" />}
                    {idx === 3 && <Lock className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono tabular-nums">
                      {m.value}
                    </div>
                    <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider mt-0.5">
                      {m.metric}
                    </div>
                  </div>
                </div>
                <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                  {m.context}
                </p>
                <div className="mt-1.5 text-[11px] text-slate-400 font-mono">
                  {m.methodology}
                </div>
              </div>
            );
          })}
        </div>

        {/* E-Commerce Integration Ecosystem */}
        <div className="mt-10 pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="text-xs font-mono text-slate-600 uppercase tracking-wider shrink-0 flex items-center gap-2">
              <ShoppingBag className="w-3.5 h-3.5 text-blue-600" />
              <span>Turnkey Merchant Connectors & Webhook Integrations</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {platforms.map((p, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-700 font-medium text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span className="text-slate-900">{p.name}</span>
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
