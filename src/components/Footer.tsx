import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  onRequestDemo: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onRequestDemo }) => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-14 pb-10 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Brand Summary */}
          <div className="col-span-2 space-y-3">
            <a href="#" className="inline-flex items-center gap-2.5 text-slate-900 font-bold text-lg">
              <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-700 to-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-white" />
              </span>
              <span className="font-extrabold tracking-tight">
                Trust<span className="text-blue-700">X</span>
              </span>
            </a>

            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              The transaction is only the beginning. The intelligence is everything. Real-time commerce risk intelligence built for merchant protection and consumer privacy.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-2.5">
            <div className="font-semibold text-slate-900">Navigation</div>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-blue-700 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-700 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#case-studies" className="hover:text-blue-700 transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-700 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Governance */}
          <div className="space-y-2.5">
            <div className="font-semibold text-slate-900">Governance</div>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-blue-700 transition-colors">
                  India DPDP Alignment
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-700 transition-colors">
                  EU GDPR & AI Act
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-700 transition-colors">
                  NIST AI RMF Baseline
                </a>
              </li>
              <li>
                <a href="mailto:krishnakamireddy@trustx.world" className="hover:text-blue-700 transition-colors">
                  Consumer Dispute Office
                </a>
              </li>
            </ul>
          </div>

          {/* Get Started */}
          <div className="space-y-2.5">
            <div className="font-semibold text-slate-900">Get Started</div>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={onRequestDemo}
                  className="text-blue-700 font-semibold hover:text-blue-800 transition-colors text-left cursor-pointer"
                >
                  Request a Demo
                </button>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-700 transition-colors">
                  Interactive Decision Explorer
                </a>
              </li>
              <li>
                <a href="mailto:krishnakamireddy@trustx.world" className="hover:text-blue-700 transition-colors">
                  krishnakamireddy@trustx.world
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <div>© {new Date().getFullYear()} TrustX Technologies. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#about" className="hover:text-slate-800 transition-colors">
              Purpose Limitation Standard
            </a>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <a href="mailto:krishnakamireddy@trustx.world" className="hover:text-slate-800 transition-colors">
              Security &amp; Privacy Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
