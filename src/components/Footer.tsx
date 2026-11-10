import React from 'react';
import { Shield, Github, Twitter, Linkedin } from 'lucide-react';

interface FooterProps {
  onOpenSandbox: () => void;
  onOpenPilotModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenSandbox, 
  onOpenPilotModal 
}) => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-12 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info (Col span 2 on md) */}
          <div className="col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2.5 text-slate-900 font-bold text-lg">
              <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
                <Shield className="w-4 h-4 text-blue-600" />
              </div>
              <span className="tracking-tight">
                Trust<span className="text-blue-600">X</span>
              </span>
            </a>
            
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              TrustX delivers real-time, privacy-preserving risk intelligence for e-commerce checkouts, cash-on-delivery (COD) verification, return abuse, and shared-device syndicates without consumer dossier pooling.
            </p>

            <div className="flex items-center gap-4 text-slate-500 pt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Technology */}
          <div className="space-y-3">
            <div className="font-semibold text-slate-900 uppercase font-mono tracking-wider text-[11px]">
              Technology
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#risk-engine" className="hover:text-blue-600 transition-colors">
                  Risk Decision Engine
                </a>
              </li>
              <li>
                <a href="#network-architecture" className="hover:text-blue-600 transition-colors">
                  Keyed HMAC Identity Vault
                </a>
              </li>
              <li>
                <a href="#use-cases" className="hover:text-blue-600 transition-colors">
                  COD Refusal Prevention
                </a>
              </li>
              <li>
                <a href="#api-contract" className="hover:text-blue-600 transition-colors">
                  Real-Time Decision Contract
                </a>
              </li>
            </ul>
          </div>

          {/* Governance */}
          <div className="space-y-3">
            <div className="font-semibold text-slate-900 uppercase font-mono tracking-wider text-[11px]">
              Data Governance
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#governance" className="hover:text-blue-600 transition-colors">
                  India DPDP Rules 2025
                </a>
              </li>
              <li>
                <a href="#governance" className="hover:text-blue-600 transition-colors">
                  EU GDPR Article 22
                </a>
              </li>
              <li>
                <a href="#governance" className="hover:text-blue-600 transition-colors">
                  NIST AI RMF Baseline
                </a>
              </li>
              <li>
                <a href="mailto:privacy@trustx.dev" className="hover:text-blue-600 transition-colors">
                  Consumer Dispute Redressal
                </a>
              </li>
            </ul>
          </div>

          {/* Merchant Operations */}
          <div className="space-y-3">
            <div className="font-semibold text-slate-900 uppercase font-mono tracking-wider text-[11px]">
              Merchants
            </div>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenSandbox} className="hover:text-blue-600 transition-colors text-left">
                  Interactive API Sandbox
                </button>
              </li>
              <li>
                <button onClick={onOpenPilotModal} className="hover:text-blue-600 transition-colors text-left text-blue-600 font-medium">
                  Request Merchant Pilot
                </button>
              </li>
              <li>
                <a href="#network-architecture" className="hover:text-blue-600 transition-colors">
                  Shopify & WooCommerce Connectors
                </a>
              </li>
              <li>
                <a href="mailto:merchants@trustx.dev" className="hover:text-blue-600 transition-colors">
                  Dedicated Integration SLA
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Quiet Bottom Legal Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} TrustX Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-800 transition-colors">Purpose Registry</a>
            <span className="text-slate-300">·</span>
            <a href="#" className="hover:text-slate-800 transition-colors">Merchant Privacy Standard</a>
            <span className="text-slate-300">·</span>
            <a href="mailto:security@trustx.dev" className="hover:text-slate-800 transition-colors">Security Disclosures</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
