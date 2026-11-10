import React, { useState } from 'react';
import { Shield, FileCheck, Scale, Lock, CheckCircle, ExternalLink, AlertTriangle, ShieldCheck } from 'lucide-react';
import { GOVERNANCE_CONTROLS } from '../data/mockData';

export const DataGovernanceSection: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState(GOVERNANCE_CONTROLS[0].id);

  const dataTiers = [
    {
      tier: 'Tier 1: Restricted Vault',
      examples: 'Keyed HMAC seeds, salt registries, root HSM keys',
      storage: 'Hardware Security Module (HSM) / FIPS 140-3',
      retention: 'Strict ephemeral rotation / Zero export'
    },
    {
      tier: 'Tier 2: Confidential Risk Events',
      examples: 'Customer order tokens, device hashes, reason codes',
      storage: 'Encrypted PostgreSQL (AES-256) with tenant-scoped RLS',
      retention: '30-day raw purge; aggregated score derivation only'
    },
    {
      tier: 'Tier 3: Internal Merchant Policy',
      examples: 'Custom threshold rules, review routing, team RBAC',
      storage: 'Tenant-isolated multi-tenant schema with audit log',
      retention: 'Retained until merchant tenant offboarding'
    },
    {
      tier: 'Tier 4: Public & Documentation',
      examples: 'API schema, reason code directory, dispute procedures',
      storage: 'Public documentation endpoints & transparency reports',
      retention: 'Permanent / Versioned'
    }
  ];

  return (
    <section id="governance" className="py-12 md:py-18 relative bg-white overflow-hidden">
      {/* Ambient background bloom */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 azure-blob-3 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 azure-blob-4 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 font-mono mb-2">
            Regulatory Compliance & Consumer Trust
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Built From First Principles for Global Privacy & AI Regulations
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            TrustX is engineered to comply with modern privacy frameworks from day one. We treat legal review, purpose limitation, consumer dispute rights, and tenant security as core product features, not post-launch paperwork.
          </p>
        </div>

        {/* Framework Alignment Grid with Liquid Glass */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {GOVERNANCE_CONTROLS.map((ctrl) => {
            const isSelected = ctrl.id === selectedPillar;
            return (
              <div
                key={ctrl.id}
                onClick={() => setSelectedPillar(ctrl.id)}
                className={`cursor-pointer p-5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                  isSelected
                    ? 'liquid-glass-accent border-blue-400/90 shadow-md ring-1 ring-blue-500/20'
                    : 'liquid-glass-card border-white/90 hover:border-blue-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 font-mono">
                      {ctrl.framework}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-2 leading-snug">
                    {ctrl.category}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {ctrl.requirement}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/70 text-[11px] font-mono text-blue-700 flex items-center gap-1.5 font-semibold">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Enforced by design</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Dive on Selected Regulatory Pillar */}
        {(() => {
          const activeCtrl = GOVERNANCE_CONTROLS.find(c => c.id === selectedPillar) || GOVERNANCE_CONTROLS[0];
          return (
            <div className="mt-6 rounded-2xl liquid-glass-portal border border-white/90 p-6 sm:p-8 shadow-xl relative overflow-hidden">
              {/* Subtle top edge liquid refraction highlight */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-blue-600 uppercase tracking-wider font-semibold">
                      {activeCtrl.framework} Implementation
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">
                    {activeCtrl.category} & Architecture Guardrails
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {activeCtrl.trustXImplementation}
                  </p>

                  <div className="p-4 rounded-xl liquid-glass border border-white/90 text-xs font-mono text-slate-700 shadow-2xs">
                    <strong className="text-blue-600">Audit & Evidence:</strong> {activeCtrl.verificationEvidence}
                  </div>
                </div>

                {/* Consumer Grievance & Dispute Workflow Box */}
                <div className="lg:col-span-6 p-6 rounded-xl liquid-glass border border-white/90 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-700 uppercase tracking-wider font-semibold flex items-center gap-2">
                      <Scale className="w-4 h-4 text-blue-600" />
                      <span>Consumer Fairness & Dispute Workflow</span>
                    </span>
                    <span className="text-[11px] font-mono text-blue-600 font-semibold px-2 py-0.5 rounded-full liquid-glass border border-blue-200">EU AI Act / DPDP</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Unlike opaque credit bureaus, TrustX provides transparent reason codes and an automated dispute API. If an identity token collision occurs (e.g. shared family phone or recycled SIM), consumers can dispute through merchant support.
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-200/80 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-slate-100 font-mono text-[11px]">
                      <span className="text-slate-500">Score Reversibility</span>
                      <span className="text-blue-700 font-semibold">Non-permanent / Ephemeral</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100 font-mono text-[11px]">
                      <span className="text-slate-500">Dispute SLA Target</span>
                      <span className="text-slate-800 font-medium">&lt; 48 hours for review</span>
                    </div>
                    <div className="flex justify-between py-1 font-mono text-[11px]">
                      <span className="text-slate-500">Identity-Link Suppression</span>
                      <span className="text-blue-600 font-semibold">Immediate token decoupling</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })()}

        {/* Data Classification Matrix */}
        <div className="mt-12">
          <div className="text-xs font-mono text-blue-600 uppercase tracking-wider mb-2 font-semibold">
            Data Governance & Minimization Schedule
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-5">
            Strict Data Classification & Retention Boundaries
          </h3>

          <div className="overflow-x-auto rounded-2xl liquid-glass-portal border border-white/90 shadow-md">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/70 font-mono text-slate-700">
                  <th className="py-3.5 px-5 font-semibold">Data Category</th>
                  <th className="py-3.5 px-5 font-semibold">Scope & Examples</th>
                  <th className="py-3.5 px-5 font-semibold">Storage & Key Model</th>
                  <th className="py-3.5 px-5 font-semibold">Retention & Disposal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {dataTiers.map((dt, i) => (
                  <tr key={i} className="hover:bg-blue-50/20 transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-slate-900 whitespace-nowrap">
                      {dt.tier}
                    </td>
                    <td className="py-3.5 px-5 text-slate-600">
                      {dt.examples}
                    </td>
                    <td className="py-3.5 px-5 font-mono text-blue-700 font-medium">
                      {dt.storage}
                    </td>
                    <td className="py-3.5 px-5 text-slate-500">
                      {dt.retention}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
