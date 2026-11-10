import React, { useState } from 'react';
import { Shield, Github, Menu, X, Code, Search, ChevronDown, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenSandbox: () => void;
  onOpenPilotModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSandbox, onOpenPilotModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/75 backdrop-blur-2xl border-b border-white/80 shadow-[0_4px_25px_rgba(37,99,235,0.04)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        
        {/* Zone 1: Brand Wordmark with Liquid Glass Emblem */}
        <div className="flex items-center gap-6">
          <a 
            href="#" 
            className="flex items-center gap-2.5 text-slate-900 font-bold text-xl tracking-tight hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 group"
          >
            <div className="w-9 h-9 rounded-xl liquid-glass flex items-center justify-center group-hover:scale-105 group-hover:border-blue-300 transition-all shadow-xs">
              <Shield className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-lg tracking-tight font-extrabold text-slate-900">
              Trust<span className="text-blue-600">X</span>
            </span>
          </a>

          {/* Azure Portal-Inspired Search Box */}
          <div 
            onClick={onOpenSandbox}
            className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg liquid-glass text-xs text-slate-400 hover:text-slate-600 hover:border-blue-200 cursor-pointer transition-all w-64 shadow-xs"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">Search policies, tokens, events</span>
            <kbd className="ml-auto font-mono text-[10px] bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-slate-500">⌘K</kbd>
          </div>
        </div>

        {/* Zone 2: 4-5 Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a 
            href="#risk-engine" 
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Risk Engine
          </a>
          <a 
            href="#network-architecture" 
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Network Architecture
          </a>
          <a 
            href="#use-cases" 
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Use Cases
          </a>
          <a 
            href="#governance" 
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Data Governance
          </a>
          <a 
            href="#api-contract" 
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Developer API
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 liquid-glass rounded-lg transition-colors whitespace-nowrap shadow-xs"
          >
            <Github className="w-3.5 h-3.5 text-slate-600" />
            <span>GitHub</span>
            <span className="text-slate-500 font-mono text-[11px]">★ 4.9k</span>
          </a>

          <button
            onClick={onOpenSandbox}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-500/25 hover:shadow-blue-500/40 transition-all whitespace-nowrap active:scale-[0.98]"
          >
            <Code className="w-3.5 h-3.5 text-white" />
            <span>Launch Sandbox</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 border-b border-white/80 bg-white/95 backdrop-blur-2xl">
          <div className="flex flex-col gap-3 text-sm">
            <a 
              href="#risk-engine" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-slate-700 hover:text-blue-600 font-medium"
            >
              Risk Engine
            </a>
            <a 
              href="#network-architecture" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-slate-700 hover:text-blue-600 font-medium"
            >
              Network Architecture
            </a>
            <a 
              href="#use-cases" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-slate-700 hover:text-blue-600 font-medium"
            >
              Use Cases
            </a>
            <a 
              href="#governance" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-slate-700 hover:text-blue-600 font-medium"
            >
              Data Governance
            </a>
            <a 
              href="#api-contract" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 text-slate-700 hover:text-blue-600 font-medium"
            >
              Developer API
            </a>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSandbox();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg shadow-sm"
              >
                <Code className="w-4 h-4" />
                <span>Launch Merchant Sandbox</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPilotModal();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 liquid-glass rounded-lg"
              >
                <span>Request Architecture Review</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
