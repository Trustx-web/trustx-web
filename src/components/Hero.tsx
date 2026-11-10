import React, { useState } from 'react';
import { Shield, Play, Terminal, Check, Copy, ArrowRight, Lock, Eye, AlertCircle, RefreshCw } from 'lucide-react';
import { COMMERCE_SIMULATION_EVENTS } from '../data/mockData';
import { CommerceSimulationEvent } from '../types';

interface HeroProps {
  onOpenSandbox: () => void;
  onOpenPilotModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenSandbox, onOpenPilotModal }) => {
  const [selectedEvent, setSelectedEvent] = useState<CommerceSimulationEvent>(COMMERCE_SIMULATION_EVENTS[0]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [copiedContract, setCopiedContract] = useState(false);
  const [activeTab, setActiveTab] = useState<'decision' | 'eventFacts' | 'privacy'>('decision');

  const handleSelectEvent = (event: CommerceSimulationEvent) => {
    setSelectedEvent(event);
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
    }, 350);
  };

  const handleCopyContract = () => {
    navigator.clipboard.writeText(JSON.stringify(selectedEvent.baselineDecision, null, 2));
    setCopiedContract(true);
    setTimeout(() => setCopiedContract(false), 2000);
  };

  const getRiskBandBadge = (band: string) => {
    switch (band) {
      case 'critical':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      case 'elevated':
        return 'text-amber-800 bg-amber-50 border-amber-200';
      case 'moderate':
        return 'text-blue-800 bg-blue-50 border-blue-200';
      default:
        return 'text-blue-700 bg-blue-50/80 border-blue-200';
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 bg-white">
      {/* Background glow and subtle mesh texture */}
      <div className="absolute inset-0 tech-radial-glow pointer-events-none" />
      <div className="absolute inset-0 tech-grid-pattern opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Kicker - Zero-Pill Typography */}
        <div className="flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wide text-blue-600 mb-4">
          <span className="uppercase font-mono text-[11px] tracking-wider text-blue-600">Deterministic Commerce Risk Intelligence</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="text-slate-500 font-normal">Privacy-Preserving Cross-Merchant Network</span>
        </div>

        {/* Main Title & Subtitle */}
        <div className="max-w-4xl">
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]"
            style={{ textWrap: 'balance' }}
          >
            Zero-Trust Risk Intelligence for Modern Commerce Workloads
          </h1>
          <p className="mt-5 text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl">
            TrustX delivers real-time risk decisioning for checkout fraud, cash-on-delivery (COD) refusal, return abuse, and shared-device syndicates. Power your storefront with privacy-gated network intelligence—backed by <span className="text-blue-600 font-semibold font-mono">keyed HMAC tokenization</span> and explainable reason codes.
          </p>
        </div>

        {/* Action Row & Command Preview */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button
            onClick={onOpenSandbox}
            className="flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all active:scale-[0.98] whitespace-nowrap"
          >
            <Play className="w-4 h-4 text-white fill-white" />
            <span>Launch Merchant Sandbox</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>

          <button
            onClick={onOpenPilotModal}
            className="flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors whitespace-nowrap shadow-xs"
          >
            <span>Request Architecture Review</span>
          </button>

          {/* Quick API Snippet */}
          <div className="hidden lg:flex items-center gap-2 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs text-slate-600 max-w-md shadow-xs">
            <span className="text-blue-600 font-semibold select-none">POST</span>
            <span className="truncate text-slate-800">/v1/decisions/evaluate</span>
            <span className="text-blue-600 font-semibold ml-2">200 OK</span>
          </div>
        </div>

        {/* Unboxed Metadata Proof Strip (No pills) */}
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-500">
          <span className="flex items-center gap-1.5 text-slate-700">
            <Check className="w-3.5 h-3.5 text-blue-600" />
            <span>Relationship-Gated Network</span>
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>Zero Plaintext PII in Network Pool</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>Sub-35ms p99 Evaluation</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>India DPDP 2025 & EU AI Act Aligned</span>
        </div>

        {/* Focal Carrier: Interactive Commerce Risk Decision Simulator */}
        <div id="risk-engine" className="mt-12 rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden">
          
          {/* Visualizer Header Bar */}
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-sm shadow-blue-500/50" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-800 font-mono">
                Real-Time Risk Decision Console
              </span>
              <span className="text-xs text-slate-500 hidden sm:inline">
                Live Sub-35ms Event Evaluation & Explainable Reason Codes
              </span>
            </div>

            {/* Scenario Switcher Tabs */}
            <div className="flex items-center gap-1 p-1 bg-white rounded-lg border border-slate-200 shadow-xs overflow-x-auto max-w-full">
              {COMMERCE_SIMULATION_EVENTS.map((evt) => {
                const isActive = selectedEvent.id === evt.id;
                return (
                  <button
                    key={evt.id}
                    onClick={() => handleSelectEvent(evt)}
                    className={`px-3 py-1.5 text-xs font-medium rounded transition-all whitespace-nowrap ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold shadow-xs' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {evt.eventType === 'cod_confirmation' ? 'COD Risk' : 
                     evt.eventType === 'return_request' ? 'Return Abuse' :
                     evt.eventType === 'checkout' && evt.id.includes('syndicate') ? 'Device Farm' : 'VIP Checkout'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Simulation Console */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
            
            {/* Left 7 Columns: Scenario Details, Visual Flow, & Reason Codes */}
            <div className="lg:col-span-7 p-6 space-y-6">
              
              {/* Event Context Header */}
              <div className="bg-slate-50/70 border border-slate-200 rounded-lg p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-blue-600">
                      <span>Event: {selectedEvent.eventType}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-600">{selectedEvent.merchantVertical}</span>
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 mt-1">
                      {selectedEvent.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleSelectEvent(selectedEvent)}
                    disabled={isEvaluating}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 active:bg-slate-200 rounded-md border border-slate-200 transition-colors shrink-0 shadow-xs"
                  >
                    <RefreshCw className={`w-3 h-3 text-blue-600 ${isEvaluating ? 'animate-spin' : ''}`} />
                    <span>{isEvaluating ? 'Evaluating...' : 'Re-Evaluate'}</span>
                  </button>
                </div>

                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {selectedEvent.simulatedScenario}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500 gap-2">
                  <span>Merchant: <strong className="text-slate-800 font-medium">{selectedEvent.merchantName}</strong></span>
                  <span>Basket: <strong className="text-slate-800 font-medium">{selectedEvent.orderFacts.currency} {selectedEvent.orderFacts.amount.toLocaleString()}</strong> ({selectedEvent.orderFacts.itemCount} items)</span>
                  <span>Payment: <strong className="text-blue-700 font-medium">{selectedEvent.orderFacts.paymentMethod}</strong></span>
                </div>
              </div>

              {/* 3-Step Risk Decision Flow */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Stage 1: Ingestion & Gating */}
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-mono text-slate-500 uppercase">01. Identity Gating</div>
                    <div className="text-xs font-semibold text-slate-800 mt-1 truncate">
                      {selectedEvent.orderFacts.customerToken}
                    </div>
                    <div className="mt-2 text-[11px] font-mono text-slate-500">
                      device: <span className="text-slate-800">{selectedEvent.orderFacts.deviceHash}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-200 text-[11px] font-mono text-blue-700 flex items-center gap-1">
                    <Check className="w-3 h-3 text-blue-600" />
                    <span>Purpose verified</span>
                  </div>
                </div>

                {/* Stage 2: Scoped Network Signal */}
                <div className="p-3.5 rounded-lg bg-blue-50/70 border border-blue-200 flex flex-col justify-between relative overflow-hidden">
                  <div>
                    <div className="text-[11px] font-mono text-blue-700 uppercase">02. Network Signal</div>
                    <div className="text-xs font-semibold text-slate-900 mt-1 truncate">
                      {selectedEvent.baselineDecision.reason_codes[0]}
                    </div>
                    <div className="mt-2 text-[11px] font-mono text-blue-800">
                      Freshness: {selectedEvent.baselineDecision.signal_freshness}
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-blue-200 text-[11px] font-mono text-blue-700 flex items-center justify-between">
                    <span>Latency</span>
                    <span className="font-bold">28ms</span>
                  </div>
                </div>

                {/* Stage 3: Calibrated Action */}
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-mono text-slate-500 uppercase">03. Policy Output</div>
                    <div className="text-xs font-bold text-slate-900 mt-1 uppercase tracking-wider">
                      {selectedEvent.baselineDecision.recommended_action.replace(/_/g, ' ')}
                    </div>
                    <div className="mt-2 text-[11px] font-mono text-slate-600">
                      Band: <span className="font-semibold text-blue-700">{selectedEvent.baselineDecision.risk_band}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-200 text-[11px] font-mono text-slate-500 truncate">
                    Confidence: {selectedEvent.baselineDecision.confidence}
                  </div>
                </div>
              </div>

              {/* Explainable Reason Codes Box */}
              <div className="bg-slate-50/60 rounded-lg p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 font-mono flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-blue-600" />
                    <span>Explainable Reason Codes (No Dossier Leakage)</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Model: {selectedEvent.baselineDecision.model_version}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedEvent.baselineDecision.reason_codes.map((rc, idx) => (
                    <div key={idx} className="px-2.5 py-1 bg-white border border-blue-200 rounded font-mono text-xs text-blue-700 flex items-center gap-1.5 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <span>{rc}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Network Signal Context:</strong> {selectedEvent.networkSignalContribution}
                </div>
              </div>

            </div>

            {/* Right 5 Columns: Decision Response Contract (Appendix B) */}
            <div className="lg:col-span-5 bg-slate-50/40 p-6 flex flex-col justify-between">
              <div>
                
                {/* Risk Score Dial & Contract Tabs */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-mono font-extrabold text-xl text-white shadow-sm">
                      {selectedEvent.baselineDecision.risk_score}
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-slate-500 uppercase">Risk Score (0–100)</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getRiskBandBadge(selectedEvent.baselineDecision.risk_band)}`}>
                          {selectedEvent.baselineDecision.risk_band}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">
                          ({selectedEvent.baselineDecision.confidence} conf)
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyContract}
                    className="p-2 text-slate-500 hover:text-blue-600 bg-white border border-slate-200 rounded-lg transition-colors shadow-xs"
                    title="Copy JSON Response"
                  >
                    {copiedContract ? <Check className="w-4 h-4 text-blue-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Sub-view navigation tabs */}
                <div className="mt-4 flex items-center gap-1 border-b border-slate-200 pb-2">
                  <button
                    onClick={() => setActiveTab('decision')}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                      activeTab === 'decision' ? 'text-blue-700 bg-white shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Decision Contract JSON
                  </button>
                  <button
                    onClick={() => setActiveTab('privacy')}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                      activeTab === 'privacy' ? 'text-blue-700 bg-white shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Privacy Boundary
                  </button>
                  <button
                    onClick={() => setActiveTab('eventFacts')}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                      activeTab === 'eventFacts' ? 'text-blue-700 bg-white shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Order Facts
                  </button>
                </div>

                {/* Tab content 1: Decision Contract JSON */}
                {activeTab === 'decision' && (
                  <div className="mt-3 relative rounded-lg bg-[#0F172A] border border-slate-800 p-3.5 font-mono text-[11px] text-slate-200 overflow-x-auto max-h-[310px] leading-relaxed shadow-sm">
                    <pre className="text-slate-200">
{`{
  "decision_id": "${selectedEvent.baselineDecision.decision_id}",
  "event_id": "${selectedEvent.baselineDecision.event_id}",
  "risk_score": ${selectedEvent.baselineDecision.risk_score},
  "risk_band": "${selectedEvent.baselineDecision.risk_band}",
  "confidence": "${selectedEvent.baselineDecision.confidence}",
  "reason_codes": [
    ${selectedEvent.baselineDecision.reason_codes.map(r => `"${r}"`).join(',\n    ')}
  ],
  "recommended_action": "${selectedEvent.baselineDecision.recommended_action}",
  "signal_freshness": "${selectedEvent.baselineDecision.signal_freshness}",
  "policy_version": "${selectedEvent.baselineDecision.policy_version}",
  "model_version": "${selectedEvent.baselineDecision.model_version}",
  "evaluated_at": "${selectedEvent.baselineDecision.evaluated_at}"
}`}
                    </pre>
                  </div>
                )}

                {/* Tab content 2: Privacy Guarantee Breakdown */}
                {activeTab === 'privacy' && (
                  <div className="mt-3 rounded-lg bg-white border border-slate-200 p-4 space-y-3 text-xs shadow-xs">
                    <div className="flex items-center gap-2 text-blue-700 font-semibold font-mono text-[11px]">
                      <Lock className="w-3.5 h-3.5 text-blue-600" />
                      <span>Zero-Knowledge / Purpose Gating Principle</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      {selectedEvent.privacyGuarantee}
                    </p>
                    <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 space-y-1">
                      <div className="flex justify-between">
                        <span>Identity Token:</span>
                        <span className="font-mono text-slate-800">Keyed HMAC (SHA-256)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cross-Merchant Visibility:</span>
                        <span className="font-mono text-blue-700">Strictly Isolated</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Consumer Appeal Route:</span>
                        <span className="font-mono text-blue-600">{selectedEvent.baselineDecision.appeal_metadata?.dispute_contact || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab content 3: Order Facts */}
                {activeTab === 'eventFacts' && (
                  <div className="mt-3 rounded-lg bg-white border border-slate-200 p-4 text-xs font-mono space-y-2 text-slate-700 shadow-xs">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">declared_use_case</span>
                      <span className="text-slate-800 text-right truncate max-w-[200px]">{selectedEvent.declaredUseCase}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">delivery_region</span>
                      <span className="text-slate-800">{selectedEvent.orderFacts.deliveryRegion}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">device_hash</span>
                      <span className="text-blue-600">{selectedEvent.orderFacts.deviceHash}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">customer_token</span>
                      <span className="text-slate-800">{selectedEvent.orderFacts.customerToken}</span>
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom footer link */}
              <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-500">Want to test with your own payload?</span>
                <button
                  onClick={onOpenSandbox}
                  className="font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
                >
                  <span>Open Developer Sandbox</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
