import React, { useState } from 'react';
import { LayoutDashboard, Filter, ArrowUpRight, Check, AlertTriangle, Shield, Settings2, Users, Activity, Globe, Server } from 'lucide-react';

export const MerchantDashboardPreview: React.FC = () => {
  const [selectedTenant, setSelectedTenant] = useState<'aurastyle' | 'voltdirect'>('aurastyle');
  const [filterAction, setFilterAction] = useState<string>('all');

  const tenantData = {
    aurastyle: {
      name: 'AuraStyle Apparel',
      tenantId: 'ten_aurastyle_in_992',
      region: 'ap-south-1 (Mumbai)',
      activeUseCases: 'COD Delivery & Return Abuse',
      evaluatedToday: '14,892',
      preventedRtoLoss: '₹4,12,000',
      p99Latency: '24ms',
      clusterStatus: 'Healthy (100% SLA)',
      events: [
        { id: 'evt-901', time: '16:54:10', type: 'COD Dispatch', customer: 'tok_hmac_994b', amount: '₹3,499', score: 68, band: 'elevated', action: 'require_prepayment_cod', reasons: ['COD_REFUSAL_CLUSTER', 'DEVICE_MULTI_FAIL'] },
        { id: 'evt-902', time: '16:53:45', type: 'Return Request', customer: 'tok_hmac_41c9', amount: '₹1,850', score: 74, band: 'elevated', action: 'manual_review', reasons: ['RETURN_PATTERN_SIGNAL', 'WARDROBING_ANOMALY'] },
        { id: 'evt-903', time: '16:53:12', type: 'Checkout (UPI)', customer: 'tok_hmac_12a8', amount: '₹2,100', score: 12, band: 'low', action: 'approve', reasons: ['ESTABLISHED_REPUTATION'] },
        { id: 'evt-904', time: '16:52:50', type: 'COD Dispatch', customer: 'tok_hmac_77e0', amount: '₹890', score: 22, band: 'low', action: 'approve', reasons: ['POSITIVE_DELIVERY_AFFINITY'] },
        { id: 'evt-905', time: '16:51:30', type: 'COD Dispatch', customer: 'tok_hmac_33d1', amount: '₹4,200', score: 71, band: 'elevated', action: 'require_prepayment_cod', reasons: ['HIGH_RETURN_RATIO_GEO'] }
      ]
    },
    voltdirect: {
      name: 'VoltDirect Global',
      tenantId: 'ten_volt_us_4402',
      region: 'us-east-1 (N. Virginia)',
      activeUseCases: 'Payment Fraud & Shared Device',
      evaluatedToday: '38,204',
      preventedRtoLoss: '$38,400',
      p99Latency: '19ms',
      clusterStatus: 'Healthy (100% SLA)',
      events: [
        { id: 'evt-801', time: '16:54:02', type: 'Checkout 3DS', customer: 'tok_hmac_ff01', amount: '$2,490', score: 91, band: 'critical', action: 'request_verification', reasons: ['DEVICE_LINK_SIGNAL', 'VELOCITY_ANOMALY'] },
        { id: 'evt-802', time: '16:53:20', type: 'Account Create', customer: 'tok_hmac_bb92', amount: '$0', score: 84, band: 'critical', action: 'decline', reasons: ['MULTI_IDENTITY_COLLISION'] },
        { id: 'evt-803', time: '16:52:14', type: 'Checkout 3DS', customer: 'tok_hmac_3301', amount: '$145', score: 6, band: 'low', action: 'approve', reasons: ['ZERO_CHARGEBACK_HISTORY'] },
        { id: 'evt-804', time: '16:50:55', type: 'Checkout 3DS', customer: 'tok_hmac_8941', amount: '$850', score: 45, band: 'moderate', action: 'request_verification', reasons: ['GEO_BILLING_MISMATCH'] }
      ]
    }
  };

  const current = tenantData[selectedTenant];

  const filteredEvents = filterAction === 'all' 
    ? current.events 
    : current.events.filter(e => filterAction === 'flagged' ? e.band !== 'low' : e.band === 'low');

  return (
    <section className="py-12 md:py-18 relative bg-white overflow-hidden">
      {/* Ambient background bloom */}
      <div className="absolute top-1/3 left-10 w-96 h-96 azure-blob-2 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 azure-blob-1 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 font-mono mb-2">
              Isolated Merchant Workspace
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              One Shared Platform, Strict Server-Side Tenant Boundaries
            </h2>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              Every merchant logs into an isolated workspace with custom policy thresholds, role-based access control (RBAC), and zero risk of cross-tenant data leakage.
            </p>
          </div>

          {/* Tenant Switcher with Liquid Glass */}
          <div className="flex items-center gap-1.5 p-1.5 liquid-glass rounded-xl shrink-0 shadow-xs border border-white/90">
            <span className="text-xs text-slate-500 px-2 font-mono">Workspace:</span>
            <button
              onClick={() => setSelectedTenant('aurastyle')}
              className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                selectedTenant === 'aurastyle'
                  ? 'bg-white text-blue-700 border border-slate-200/80 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              AuraStyle (India COD)
            </button>
            <button
              onClick={() => setSelectedTenant('voltdirect')}
              className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                selectedTenant === 'voltdirect'
                  ? 'bg-white text-blue-700 border border-slate-200/80 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              VoltDirect (US Global)
            </button>
          </div>
        </div>

        {/* Mock Dashboard Window with Liquid Glass Portal */}
        <div className="mt-10 rounded-2xl liquid-glass-portal border border-white/90 shadow-2xl overflow-hidden relative">
          
          {/* Top highlight line */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

          {/* Dashboard Header Bar */}
          <div className="px-6 py-4 bg-white/70 backdrop-blur-xl border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl liquid-glass flex items-center justify-center border border-white/90 shadow-2xs">
                <LayoutDashboard className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <span>{current.name}</span>
                  <span className="text-slate-400 font-mono text-[10px]">({current.tenantId})</span>
                </div>
                <div className="text-[11px] text-slate-500 font-mono flex items-center gap-2 mt-0.5">
                  <span>Region: <strong className="text-slate-700 font-medium">{current.region}</strong></span>
                  <span className="text-slate-300">·</span>
                  <span className="text-blue-700 font-medium">Policy: Strict Gated</span>
                </div>
              </div>
            </div>

            {/* Quick KPI stats in header */}
            <div className="flex items-center gap-6 text-xs font-mono">
              <div className="px-3 py-1.5 rounded-lg liquid-glass border border-white/80 shadow-2xs">
                <span className="text-slate-400 block text-[10px]">Evaluated Today</span>
                <span className="text-slate-900 font-bold">{current.evaluatedToday}</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg liquid-glass border border-white/80 shadow-2xs">
                <span className="text-slate-400 block text-[10px]">Prevented Loss</span>
                <span className="text-blue-700 font-bold">{current.preventedRtoLoss}</span>
              </div>
              <div className="hidden sm:block px-3 py-1.5 rounded-lg liquid-glass border border-white/80 shadow-2xs">
                <span className="text-slate-400 block text-[10px]">p99 Latency</span>
                <span className="text-slate-900 font-bold">{current.p99Latency}</span>
              </div>
            </div>
          </div>

          {/* Events Stream Table */}
          <div className="p-6">
            
            {/* Filter toolbar */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-700 font-semibold">
                <Filter className="w-3.5 h-3.5 text-blue-600" />
                <span>Real-Time Ingest Stream</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setFilterAction('all')}
                  className={`px-3 py-1 text-xs rounded-lg transition-colors font-mono ${
                    filterAction === 'all' ? 'bg-slate-900 text-white font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All Events
                </button>
                <button
                  onClick={() => setFilterAction('flagged')}
                  className={`px-3 py-1 text-xs rounded-lg transition-colors font-mono ${
                    filterAction === 'flagged' ? 'bg-amber-50 text-amber-800 border border-amber-200 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Flagged
                </button>
                <button
                  onClick={() => setFilterAction('approved')}
                  className={`px-3 py-1 text-xs rounded-lg transition-colors font-mono ${
                    filterAction === 'approved' ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Frictionless Approved
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200/80 font-mono text-slate-500 text-[11px]">
                    <th className="py-3 px-3">Time</th>
                    <th className="py-3 px-3">Event Type</th>
                    <th className="py-3 px-3">Customer Token</th>
                    <th className="py-3 px-3">Amount</th>
                    <th className="py-3 px-3">Risk Score</th>
                    <th className="py-3 px-3">Reason Code</th>
                    <th className="py-3 px-3 text-right">Policy Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {filteredEvents.map((evt, idx) => {
                    const isHigh = evt.band === 'critical';
                    const isMed = evt.band === 'elevated';
                    return (
                      <tr key={idx} className="hover:bg-blue-50/20 transition-colors">
                        <td className="py-3 px-3 text-slate-500">{evt.time}</td>
                        <td className="py-3 px-3 text-slate-900 font-medium">{evt.type}</td>
                        <td className="py-3 px-3 text-blue-700 font-mono font-medium">{evt.customer}</td>
                        <td className="py-3 px-3 text-slate-700 font-medium">{evt.amount}</td>
                        <td className="py-3 px-3">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border shadow-2xs ${
                            isHigh ? 'text-rose-700 bg-rose-50/90 border-rose-200' :
                            isMed ? 'text-amber-800 bg-amber-50/90 border-amber-200' :
                            'text-blue-700 bg-blue-50/90 border-blue-200'
                          }`}>
                            {evt.score}/100
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-600">
                          <span className="truncate max-w-[180px] block">{evt.reasons[0]}</span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span className="text-[11px] uppercase font-bold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs">
                            {evt.action.replace(/_/g, ' ')}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
