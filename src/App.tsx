import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SectionHeader } from './components/SectionHeader';
import { ProofMetrics } from './components/ProofMetrics';
import { UseCasesSection } from './components/UseCasesSection';
import { ArchitectureNetworkSection } from './components/ArchitectureNetworkSection';
import { DataGovernanceSection } from './components/DataGovernanceSection';
import { InteractiveApiConsole } from './components/InteractiveApiConsole';
import { MerchantDashboardPreview } from './components/MerchantDashboardPreview';
import { EnterprisePilotModal } from './components/EnterprisePilotModal';
import { Footer } from './components/Footer';

export default function App() {
  const [isPilotModalOpen, setIsPilotModalOpen] = useState(false);

  const handleScrollToSandbox = () => {
    const el = document.getElementById('api-contract');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-blue-500/10 selection:text-blue-700">
      {/* Top Bar Navigation (Strict 3-zone contract) */}
      <Header 
        onOpenSandbox={handleScrollToSandbox}
        onOpenPilotModal={() => setIsPilotModalOpen(true)}
      />

      {/* Main Content Sections with KubeArmor-style Technical Delineation Headers */}
      <main className="flex-1">
        
        {/* Hero Section with Live Risk Decision Engine Simulator */}
        <Hero 
          onOpenSandbox={handleScrollToSandbox}
          onOpenPilotModal={() => setIsPilotModalOpen(true)}
        />

        {/* Section 01: Operational Benchmarks & Native Storefront Compatibility */}
        <SectionHeader 
          number="01" 
          label="OPERATIONAL METRICS // BENCHMARKS & CONNECTORS" 
          tag="REAL-TIME SLOs" 
        />
        <ProofMetrics />

        {/* Section 02: Targeted E-Commerce Abuse Domains */}
        <SectionHeader 
          number="02" 
          label="TARGETED USE CASES // COMMERCE ABUSE VECTORS" 
          tag="WORKLOAD RISK PROFILES" 
        />
        <UseCasesSection />

        {/* Section 03: Target Architecture & Privacy-Preserving Network */}
        <SectionHeader 
          number="03" 
          label="NETWORK ARCHITECTURE // ZERO-TRUST IDENTITY VAULT" 
          tag="KEYED HMAC MATCHING" 
        />
        <ArchitectureNetworkSection />

        {/* Section 04: Data Governance & Regulatory Readiness */}
        <SectionHeader 
          number="04" 
          label="DATA GOVERNANCE // REGULATORY COMPLIANCE PILLARS" 
          tag="DPDP 2025 · GDPR ART 22" 
        />
        <DataGovernanceSection />

        {/* Section 05: Real-Time API Specification & Developer Studio */}
        <SectionHeader 
          number="05" 
          label="DEVELOPER STUDIO // REAL-TIME DECISION CONTRACT" 
          tag="OPENAPI 3.1 REST" 
        />
        <InteractiveApiConsole />

        {/* Section 06: Isolated Multi-Tenant Merchant Workspace Preview */}
        <SectionHeader 
          number="06" 
          label="TENANT CONTROL // ISOLATED WORKSPACE CONSOLE" 
          tag="SERVER-SIDE RBAC" 
        />
        <MerchantDashboardPreview />
        
      </main>

      {/* Quiet Technical Footer */}
      <Footer 
        onOpenSandbox={handleScrollToSandbox}
        onOpenPilotModal={() => setIsPilotModalOpen(true)}
      />

      {/* Merchant Pilot Onboarding Modal */}
      <EnterprisePilotModal 
        isOpen={isPilotModalOpen}
        onClose={() => setIsPilotModalOpen(false)}
      />
    </div>
  );
}
