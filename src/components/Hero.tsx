import React, { useState } from 'react';
import { Shield, Play, Terminal, Check, Copy, ArrowRight, Lock, Eye, AlertCircle, RefreshCw, Layout, Layers, Radio, Sparkles } from 'lucide-react';
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
    }, 320);
  };

  const handleCopyContract = () => {
    navigator.clipboard.writeText(JSON.stringify(selectedEvent.baselineDecision, null, 2));
    setCopiedContract(true);
    setTimeout(() => setCopiedContract(false), 2000);
  };

  const getRiskBandBadge = (band: string) => {
    switch (band) {
      case 'critical':
        return 'text-rose-700 bg-rose-50/90 border-rose-200/80';
      case 'elevated':
        return 'text-amber-800 bg-amber-50/90 border-amber-200/80';
      case 'moderate':
        return 'text-blue-800 bg-blue-50/90 border-blue-200/80';
      default:
        return 'text-blue-700 bg-blue-50/90 border-blue-200/80';
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-white via-slate-50/60 to-white">
      {/* Liquid Glass Ambient Mesh Blobs (Soft Azure / Indigo Blooms) */}
      <div className="absolute top-10 left-1/4 w-96 h-96 azure-blob-1 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-96 h-96 azure-blob-2 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[300px] azure-blob-3 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 tech-grid-pattern opacity-40 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Kicker - Azure Portal-Style Breadcrumb Pill */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full liquid-glass shadow-xs mb-6 text-xs text-slate-600">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span className="font-semibold text-blue-700 font-mono text-[11px] tracking-wider uppercase">TrustX Enterprise Engine</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-600 hidden sm:inline">Zero-Trust Commerce Workloads</span>
          <span className="text-slate-300 hidden sm:inline">/</span>
          <span className="text-blue-600 font-medium hidden sm:inline">Real-Time Evaluation</span>
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
            TrustX delivers deterministic, real-time risk decisioning for checkout fraud, cash-on-delivery (COD) refusal, return abuse, and shared-device syndicates. Power your storefront with privacy-gated network intelligence—backed by <span className="text-blue-600 font-semibold font-mono">keyed HMAC tokenization</span> and explainable reason codes.
          </p>
        </div>

        {/* Action Row & Azure Command Line Preview */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button
            onClick={onOpenSandbox}
            className="flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all active:scale-[0.98] whitespace-nowrap"
          >
            <Play className="w-4 h-4 text-white fill-white" />
            <span>Launch Merchant Sandbox</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>

          <button
            onClick={onOpenPilotModal}
            className="flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-700 hover:text-slate-900 liquid-glass-card rounded-xl transition-all whitespace-nowrap"
          >
            <span>Request Architecture Review</span>
          </button>

          {/* Quick API Snippet in Liquid Glass */}
          <div className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-xl liquid-glass font-mono text-xs text-slate-600 max-w-md shadow-xs">
            <span className="text-blue-600 font-semibold select-none">POST</span>
            <span className="truncate text-slate-800">/v1/decisions/evaluate</span>
            <span className="text-blue-600 font-semibold ml-2">200 OK</span>
          </div>
        </div>

        {/* Unboxed Proof Indicators with Liquid Glass Badges */}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md liquid-glass text-slate-700 shadow-2xs">
            <Check className="w-3.5 h-3.5 text-blue-600" />
            <span>Relationship-Gated Network</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md liquid-glass text-slate-700 shadow-2xs">
            <Check className="w-3.5 h-3.5 text-blue-600" />
            <span>Zero Plaintext PII</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md liquid-glass text-slate-700 shadow-2xs">
            <Check className="w-3.5 h-3.5 text-blue-600" />
            <span>Sub-35ms p99 Latency</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md liquid-glass text-slate-700 shadow-2xs">
            <Check className="w-3.5 h-3.5 text-blue-600" />
            <span>DPDP 2025 & EU AI Act Aligned</span>
          </div>
        </div>

        {/* Azure Portal-Inspired Interactive Management Console with Liquid Glass */}
        <div id="risk-engine" className="mt-12 rounded-2xl liquid-glass-card overflow-hidden shadow-2xl relative">
          
          {/* Subtle top edge liquid reflection sheen */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

          {/* Portal Top Bar */}
          <div className="px-6 py-4 bg-white/70 backdrop-blur-xl border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-600 shadow-sm shadow-blue-500/50" />
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                  TrustX Risk Operations Portal
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full liquid-glass text-blue-700 font-semibold border border-blue-200">
                  Cluster: production-ap-south
                </span>
              </div>
            </div>

            {/* Scenario Switcher Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-100/80 backdrop-blur-md rounded-xl border border-slate-200/80 shadow-2xs overflow-x-auto max-w-full">
              {COMMERCE_SIMULATION_EVENTS.map((evt) => {
                const isActive = selectedEvent.id === evt.id;
                return (
                  <button
                    key={evt.id}
                    onClick={() => handleSelectEvent(evt)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                      isActive 
                        ? 'bg-white text-blue-700 border border-slate-200/80 font-semibold shadow-xs' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                    }`}
                  >
                    {evt.eventType === 'cod_confirmation' ? 'COD Delivery' : 
                     evt.eventType === 'return_request' ? 'Return Wardrobing' :
                     evt.eventType === 'checkout' && evt.id.includes('syndicate') ? 'Shared Device Farm' : 'VIP Checkout'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Simulation Console Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/80">
            
            {/* Left 7 Columns: Scenario Details, Visual Flow, & Reason Codes */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              
              {/* Event Context Card */}
              <div className="liquid-glass rounded-xl p-5 border border-white/90 shadow-xs">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-blue-600 font-semibold">
                      <span>Event: {selectedEvent.eventType}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-600 font-normal">{selectedEvent.merchantVertical}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                      {selectedEvent.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleSelectEvent(selectedEvent)}
                    disabled={isEvaluating}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 active:bg-slate-100 rounded-lg border border-slate-200 transition-all shrink-0 shadow-xs"
                  >
                    <RefreshCw className={`w-3 h-3 text-blue-600 ${isEvaluating ? 'animate-spin' : ''}`} />
                    <span>{isEvaluating ? 'Evaluating...' : 'Re-Evaluate'}</span>
                  </button>
                </div>

                <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                  {selectedEvent.simulatedScenario}
                </p>

                <div className="mt-3.5 pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500 gap-2">
                  <span>Merchant: <strong className="text-slate-800 font-medium">{selectedEvent.merchantName}</strong></span>
                  <span>Basket: <strong className="text-slate-800 font-medium">{selectedEvent.orderFacts.currency} {selectedEvent.orderFacts.amount.toLocaleString()}</strong> ({selectedEvent.orderFacts.itemCount} items)</span>
                  <span>Payment: <strong className="text-blue-700 font-medium">{selectedEvent.orderFacts.paymentMethod}</strong></span>
                </div>
              </div>

              {/* 3-Step Decision Flow Cards in Liquid Glass */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Stage 1: Ingestion & Gating */}
                <div className="p-4 rounded-xl liquid-glass border border-white/90 flex flex-col justify-between shadow-2xs">
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase">01. Identity Gating</div>
                    <div className="text-xs font-semibold text-slate-800 mt-1 truncate">
                      {selectedEvent.orderFacts.customerToken}
                    </div>
                    <div className="mt-2 text-[11px] font-mono text-slate-500">
                      device: <span className="text-slate-800">{selectedEvent.orderFacts.deviceHash}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-200/80 text-[11px] font-mono text-blue-700 flex items-center gap-1 font-medium">
                    <Check className="w-3 h-3 text-blue-600" />
                    <span>Purpose verified</span>
                  </div>
                </div>

                {/* Stage 2: Scoped Network Signal */}
                <div className="p-4 rounded-xl liquid-glass-accent border border-blue-200/80 flex flex-col justify-between relative overflow-hidden shadow-xs">
                  <div>
                    <div className="text-[11px] font-mono text-blue-700 uppercase font-semibold">02. Network Signal</div>
                    <div className="text-xs font-semibold text-slate-900 mt-1 truncate">
                      {selectedEvent.baselineDecision.reason_codes[0]}
                    </div>
                    <div className="mt-2 text-[11px] font-mono text-blue-800">
                      Freshness: {selectedEvent.baselineDecision.signal_freshness}
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-blue-200/80 text-[11px] font-mono text-blue-700 flex items-center justify-between font-medium">
                    <span>Latency</span>
                    <span className="font-bold">28ms</span>
                  </div>
                </div>

                {/* Stage 3: Calibrated Action */}
                <div className="p-4 rounded-xl liquid-glass border border-white/90 flex flex-col justify-between shadow-2xs">
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase">03. Policy Output</div>
                    <div className="text-xs font-bold text-slate-900 mt-1 uppercase tracking-wider">
                      {selectedEvent.baselineDecision.recommended_action.replace(/_/g, ' ')}
                    </div>
                    <div className="mt-2 text-[11px] font-mono text-slate-600">
                      Band: <span className="font-semibold text-blue-700">{selectedEvent.baselineDecision.risk_band}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-200/80 text-[11px] font-mono text-slate-500 truncate">
                    Confidence: {selectedEvent.baselineDecision.confidence}
                  </div>
                </div>
              </div>

              {/* Explainable Reason Codes Box */}
              <div className="liquid-glass rounded-xl p-5 border border-white/90 shadow-2xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 font-mono flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-blue-600" />
                    <span>Explainable Reason Codes (No Dossier Leakage)</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Model: {selectedEvent.baselineDecision.model_version}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedEvent.baselineDecision.reason_codes.map((rc, idx) => (
                    <div key={idx} className="px-3 py-1 bg-blue-50/90 border border-blue-200/90 rounded-lg font-mono text-xs text-blue-700 flex items-center gap-1.5 shadow-2xs font-medium">
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
            <div className="lg:col-span-5 bg-white/40 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                
                {/* Risk Score Dial & Contract Tabs */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-200/80">
                  <div className="flex items-center gap-3.5">
                    <div className="w-13 h-13 rounded-2xl bg-[#0F172A] border border-slate-800 flex items-center justify-center font-mono font-extrabold text-2xl text-white shadow-md">
                      {selectedEvent.baselineDecision.risk_score}
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Risk Score (0–100)</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getRiskBandBadge(selectedEvent.baselineDecision.risk_band)} shadow-2xs`}>
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
                    className="p-2.5 text-slate-600 hover:text-blue-600 liquid-glass rounded-xl transition-all shadow-xs"
                    title="Copy JSON Response"
                  >
                    {copiedContract ? <Check className="w-4 h-4 text-blue-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Sub-view navigation tabs */}
                <div className="mt-4 flex items-center gap-1 border-b border-slate-200/80 pb-2.5">
                  <button
                    onClick={() => setActiveTab('decision')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      activeTab === 'decision' ? 'text-blue-700 bg-white shadow-xs border border-slate-200/80 font-semibold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Decision Contract JSON
                  </button>
                  <button
                    onClick={() => setActiveTab('privacy')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      activeTab === 'privacy' ? 'text-blue-700 bg-white shadow-xs border border-slate-200/80 font-semibold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Privacy Boundary
                  </button>
                  <button
                    onClick={() => setActiveTab('eventFacts')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      activeTab === 'eventFacts' ? 'text-blue-700 bg-white shadow-xs border border-slate-200/80 font-semibold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Order Facts
                  </button>
                </div>

                {/* Tab content 1: Decision Contract JSON */}
                {activeTab === 'decision' && (
                  <div className="mt-3.5 relative rounded-xl bg-[#0F172A] border border-slate-800 p-4 font-mono text-[11px] text-slate-200 overflow-x-auto max-h-[310px] leading-relaxed shadow-lg">
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
                  <div className="mt-3.5 rounded-xl liquid-glass border border-white/90 p-4 space-y-3 text-xs shadow-xs">
                    <div className="flex items-center gap-2 text-blue-700 font-semibold font-mono text-[11px]">
                      <Lock className="w-3.5 h-3.5 text-blue-600" />
                      <span>Zero-Knowledge / Purpose Gating Principle</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      {selectedEvent.privacyGuarantee}
                    </p>
                    <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-500 space-y-1">
                      <div className="flex justify-between">
                        <span>Identity Token:</span>
                        <span className="font-mono text-slate-800">Keyed HMAC (SHA-256)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cross-Merchant Visibility:</span>
                        <span className="font-mono text-blue-700 font-semibold">Strictly Isolated</span>
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
                  <div className="mt-3.5 rounded-xl liquid-glass border border-white/90 p-4 text-xs font-mono space-y-2 text-slate-700 shadow-xs">
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-400">declared_use_case</span>
                      <span className="text-slate-800 text-right truncate max-w-[200px] font-medium">{selectedEvent.declaredUseCase}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-400">delivery_region</span>
                      <span className="text-slate-800 font-medium">{selectedEvent.orderFacts.deliveryRegion}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-400">device_hash</span>
                      <span className="text-blue-600 font-semibold">{selectedEvent.orderFacts.deviceHash}</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-400">customer_token</span>
                      <span className="text-slate-800 font-medium">{selectedEvent.orderFacts.customerToken}</span>
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom footer link */}
              <div className="mt-5 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs">
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
