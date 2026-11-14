import React, { useState } from 'react';
import { Lock, ShieldCheck, Check, KeyRound, Scale } from 'lucide-react';
import commerceSecurityVisual from '../assets/images/trustx_commerce_security_1794652466479.jpg';
import { FOUNDER_PRINCIPLES, GOVERNANCE_CONTROLS } from '../data/mockData';

export const AboutSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [activeGovernanceId, setActiveGovernanceId] = useState(GOVERNANCE_CONTROLS[0].id);
  const [imgError, setImgError] = useState(false);

  const stages = [
    {
      step: '01',
      title: 'Purpose & Relationship Gating',
      summary:
        'Every evaluation validates an active customer-merchant relationship and explicit permitted purpose before signals are queried.',
      control: 'Eliminates open-ended surveillance or unauthorized lookup of consumer records.',
    },
    {
      step: '02',
      title: 'Keyed HMAC Identity Tokenization',
      summary:
        'Customer identifiers and device markers are converted into cryptographic keyed HMAC tokens using cloud HSM-managed keys.',
      control: 'Plaintext PII never enters the cross-merchant intelligence layer.',
    },
    {
      step: '03',
      title: 'Cross-Merchant Signal Correlation',
      summary:
        'Calibrated behavioral, device, and delivery velocity patterns are computed across participating merchants without sharing basket contents.',
      control: 'Competing merchants never see peer brand names, pricing, or order histories.',
    },
    {
      step: '04',
      title: 'Explainable Decision & Oversight',
      summary:
        'Returns bounded 0–100 risk scores, confidence levels, and human-readable reason codes while keeping merchants in control.',
      control: 'Advisory scoring supports consumer dispute rights and human policy review.',
    },
  ];

  const activeControl =
    GOVERNANCE_CONTROLS.find((item) => item.id === activeGovernanceId) || GOVERNANCE_CONTROLS[0];

  return (
    <section id="about" className="py-16 md:py-22 border-t border-slate-200/80 bg-white/75">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Intro Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 mb-2">
              01. About TrustX
            </div>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Enhancing Merchant Security Without Compromising Customer Trust
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              Modern commerce faces subtle, fast-moving threats that isolated payment checks miss—from
              coordinated Cash-on-Delivery refusals and serial return abuse to automated device farms.
            </p>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              TrustX bridges that intelligence gap responsibly. Instead of pooling raw consumer dossiers,
              we transform transactional, behavioural, device, and cross-merchant signals into
              minimum-necessary risk intelligence backed by strict tenant isolation and explainable outputs.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="surface-card rounded-xl p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <KeyRound className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Tenant-Scoped Isolation</span>
                </div>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  Merchant rules, API keys, and event partitions stay strictly segregated at database and gateway boundaries.
                </p>
              </div>
              <div className="surface-card rounded-xl p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Scale className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Fair & Contestable</span>
                </div>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                  Ephemeral scoring with clear reason codes and a 48-hour consumer dispute redressal workflow.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col">
            <div className="flex-1 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm flex flex-col">
              <div className="relative flex-1 min-h-[280px] bg-gradient-to-br from-slate-100 via-blue-50/40 to-emerald-50/40">
                {!imgError ? (
                  <img
                    src={commerceSecurityVisual}
                    alt="Layered translucent glass mesh illustrating TrustX cryptographic signal isolation"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                    <Lock className="w-12 h-12 text-blue-700 mb-3" />
                    <p className="text-sm font-semibold text-slate-900">
                      Cryptographic Identity Tokenization
                    </p>
                  </div>
                )}
              </div>
              <div className="px-5 py-3.5 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <span>Cloud HSM Keyed Tokenization</span>
                <span className="font-semibold text-emerald-700">Zero Cross-Merchant Leakage</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Stage Intelligence Architecture */}
        <div className="mt-16">
          <div className="max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              How Signals Become Real-Time Intelligence
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Select a stage below to inspect the privacy and security guardrails enforced on every evaluation.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stages.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <button
                  key={stage.step}
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  className={`text-left p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    isActive
                      ? 'bg-blue-50/60 border-blue-400 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="text-xs font-mono font-bold text-blue-700">
                      Step {stage.step}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mt-1.5">{stage.title}</h4>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">{stage.summary}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/80 text-xs text-emerald-800 font-medium">
                    {stage.control}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 6 Core Trust Principles & Governance */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-5">
              Six Founding Privacy & Risk Principles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FOUNDER_PRINCIPLES.map((principle) => (
                <div key={principle.number} className="surface-card rounded-xl p-4">
                  <div className="text-xs font-mono font-bold text-emerald-700">
                    {principle.number}. {principle.title}
                  </div>
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 surface-glass rounded-2xl p-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Regulatory Alignment</span>
            </div>
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-lg mb-5">
              {GOVERNANCE_CONTROLS.map((ctrl) => (
                <button
                  key={ctrl.id}
                  type="button"
                  onClick={() => setActiveGovernanceId(ctrl.id)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    activeGovernanceId === ctrl.id
                      ? 'bg-white text-blue-700 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {ctrl.framework}
                </button>
              ))}
            </div>

            <h4 className="text-base font-bold text-slate-900">{activeControl.category}</h4>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              {activeControl.requirement}
            </p>
            <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-2 text-xs">
              <div className="flex items-start gap-2 text-slate-700">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{activeControl.trustXImplementation}</span>
              </div>
              <div className="text-slate-500 pt-1">
                <strong className="text-slate-800">Evidence:</strong> {activeControl.verificationEvidence}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
