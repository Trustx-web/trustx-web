import React, { useState } from 'react';
import { Shield, Key, EyeOff, Scale, Server, ArrowRight, Lock, Check } from 'lucide-react';
import { FOUNDER_PRINCIPLES } from '../data/mockData';

export const ArchitectureNetworkSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState(1);

  const stages = [
    {
      step: '01',
      title: 'Merchant Event Ingest & Purpose Declaration',
      summary: 'Merchant API gateway validates request idempotency, declared use case (e.g. COD validation, checkout 3DS), and consumer relationship token.',
      detail: 'Every evaluation requires an explicit contractual permitted purpose. Requests without an active customer relationship are dropped with HTTP 403.'
    },
    {
      step: '02',
      title: 'Keyed HMAC Tokenization & Identity Vault',
      summary: 'Raw identifiers (phone, email, device) are converted into keyed HMAC tokens using cloud HSM-managed keys with periodic key rotation.',
      detail: 'Plaintext PII is separated at the matching boundary. Identity mapping is isolated from transaction event payloads to eliminate dossier creation.'
    },
    {
      step: '03',
      title: 'Scoped Network Signal Aggregation',
      summary: 'The network computes mathematical frequency scores and velocity clusters across participating merchants without revealing merchant names or basket contents.',
      detail: 'Merchant A only sees a calibrated reason code and score. Raw historical transaction logs from Merchant B are mathematically unqueriable.'
    },
    {
      step: '04',
      title: 'Calibrated Decision Engine & Human Oversight',
      summary: 'Deterministic rules and calibrated scoring deliver bounded 0-100 scores, risk bands, confidence, and recommended operational controls.',
      detail: 'TrustX operates in an advisory role under EU AI Act and GDPR Article 22 guidelines: final merchant policies execute the desired transaction action.'
    }
  ];

  return (
    <section id="network-architecture" className="py-12 md:py-18 bg-slate-50/70 border-y border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 font-mono mb-2">
            Target Architecture & Cross-Merchant Network
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            How TrustX Powers Network Effects Without Compromising Privacy
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            The long-term defensive moat is not "collecting consumer dossiers into an insecure pool." It is delivering a high-utility risk signal with minimal necessary information, relationship gating, and enforceable tenant boundaries.
          </p>
        </div>

        {/* Technical Flow: 4 Interactive Pipeline Steps */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stages.map((st, i) => {
            const isCurrent = activeStage === i + 1;
            return (
              <div
                key={i}
                onClick={() => setActiveStage(i + 1)}
                className={`cursor-pointer p-5 rounded-xl border transition-all text-left flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-blue-50/60 border-blue-400 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-blue-600">
                      STAGE {st.step}
                    </span>
                    {isCurrent && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 mt-2 leading-snug">
                    {st.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {st.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-600 leading-normal">
                  <strong className="text-blue-600 font-mono">Control:</strong> {st.detail}
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Architecture Box: Architectural Graphic & Data Flow */}
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 lg:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Graphic Representation */}
            <div className="lg:col-span-6 relative rounded-lg overflow-hidden border border-slate-200 shadow-md group">
              <img
                src="/src/assets/images/architecture_kernel_ebpf_1794329726448.jpg"
                alt="TrustX Cryptographic Identity Vault & Network Matching Pipeline"
                className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-white/95">
                <span className="bg-black/80 backdrop-blur-md px-2.5 py-1 rounded border border-white/20 flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-blue-400" />
                  <span>Cloud HSM Key Vault: Active</span>
                </span>
                <span className="bg-blue-950/80 backdrop-blur-md text-blue-200 px-2.5 py-1 rounded border border-blue-400/40">
                  Zero Cross-Tenant Leakage
                </span>
              </div>
            </div>

            {/* Architecture Explanations */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <span className="text-xs font-mono text-blue-600 uppercase tracking-wider font-semibold">
                  The TrustX Matching Privacy Guarantee
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                  Private Signal Extraction vs. Dossier Aggregation
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Traditional fraud consortiums pool raw customer orders, creating massive regulatory liabilities under global privacy frameworks. TrustX replaces raw pooling with keyed HMAC identity tokenization and relationship gating.
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Tenant-Scoped Isolation:</strong> Database tables, cache partitions, and API keys are strictly partitioned per merchant. No accidental BOLA or IDOR leakage.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Relationship-Gated Queries:</strong> A merchant may only receive risk signals for customers who actively initiated a transaction on their storefront.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Contestable Decisions:</strong> Every evaluation includes correlation metadata and dispute routing to support consumer grievance and correction rights.
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* 6 Core Operating Principles */}
        <div className="mt-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 font-mono mb-2">
            Governance Constitution
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            6 Core Engineering & Privacy Principles
          </h3>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FOUNDER_PRINCIPLES.map((fp, i) => (
              <div key={i} className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs">
                <span className="font-mono text-xs text-blue-600 font-bold">{fp.number}.</span>
                <h4 className="text-sm font-semibold text-slate-900 mt-1">{fp.title}</h4>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{fp.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
