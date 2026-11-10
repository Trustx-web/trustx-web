import React, { useState } from 'react';
import { LayoutDashboard, Filter, ArrowUpRight, Check, AlertTriangle, Shield, Settings2, Users } from 'lucide-react';

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
    <section className="py-12 md:py-18 relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
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

          {/* Tenant Switcher */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-50 border border-slate-200 rounded-lg shrink-0 shadow-xs">
            <span className="text-xs text-slate-500 px-2 font-mono">Workspace:</span>
            <button
              onClick={() => setSelectedTenant('aurastyle')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                selectedTenant === 'aurastyle'
                  ? 'bg-white text-blue-700 border border-slate-200 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              AuraStyle (India COD)
            </button>
            <button
              onClick={() => setSelectedTenant('voltdirect')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                selectedTenant === 'voltdirect'
                  ? 'bg-white text-blue-700 border border-slate-200 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              VoltDirect (US Global)
            </button>
          </div>
        </div>

        {/* Mock Dashboard Window */}
        <div className="mt-10 rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden">
          
          {/* Dashboard Header Bar */}
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
                <LayoutDashboard className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <span>{current.name}</span>
                  <span className="text-slate-400 font-mono text-[10px]">({current.tenantId})</span>
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  Region: {current.region} · Policy: Strict Gated
                </div>
              </div>
            </div>

            {/* Quick KPI stats in header */}
            <div className="flex items-center gap-6 text-xs font-mono">
              <div>
                <span className="text-slate-400 block">Evaluated Today</span>
                <span className="text-slate-900 font-bold">{current.evaluatedToday}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Prevented Loss</span>
                <span className="text-blue-700 font-bold">{current.preventedRtoLoss}</span>
              </div>
            </div>
          </div>

          {/* Events Stream Table */}
          <div className="p-6">
            
            {/* Filter toolbar */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
                <Filter className="w-3.5 h-3.5 text-blue-600" />
                <span>Real-Time Ingest Stream</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setFilterAction('all')}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    filterAction === 'all' ? 'bg-slate-900 text-white font-medium' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All Events
                </button>
                <button
                  onClick={() => setFilterAction('flagged')}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    filterAction === 'flagged' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Flagged (Elevated/Critical)
                </button>
                <button
                  onClick={() => setFilterAction('approved')}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    filterAction === 'approved' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:text-slate-900'
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
                  <tr className="border-b border-slate-200 font-mono text-slate-500 text-[11px]">
                    <th className="py-2.5 px-3">Time</th>
                    <th className="py-2.5 px-3">Event Type</th>
                    <th className="py-2.5 px-3">Customer Token</th>
                    <th className="py-2.5 px-3">Amount</th>
                    <th className="py-2.5 px-3">Risk Score</th>
                    <th className="py-2.5 px-3">Reason Code</th>
                    <th className="py-2.5 px-3 text-right">Policy Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {filteredEvents.map((evt, idx) => {
                    const isHigh = evt.band === 'critical';
                    const isMed = evt.band === 'elevated';
                    return (
                      <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-3 text-slate-500">{evt.time}</td>
                        <td className="py-3 px-3 text-slate-900 font-medium">{evt.type}</td>
                        <td className="py-3 px-3 text-blue-700 font-mono">{evt.customer}</td>
                        <td className="py-3 px-3 text-slate-700">{evt.amount}</td>
                        <td className="py-3 px-3">
                          <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold border ${
                            isHigh ? 'text-rose-700 bg-rose-50 border-rose-200' :
                            isMed ? 'text-amber-800 bg-amber-50 border-amber-200' :
                            'text-blue-700 bg-blue-50 border-blue-200'
                          }`}>
                            {evt.score}/100
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-600">
                          <span className="truncate max-w-[180px] block">{evt.reasons[0]}</span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span className="text-[11px] uppercase font-semibold text-slate-700 bg-slate-50 px-2 py-1 rounded border border-slate-200">
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
