import React, { useState } from 'react';
import {
  Check,
  Copy,
  Play,
  ArrowRight,
  CreditCard,
  Truck,
  RefreshCw,
  Smartphone,
  ShieldCheck,
} from 'lucide-react';
import { SERVICE_OFFERINGS, COMMERCE_SIMULATION_EVENTS } from '../data/mockData';

interface ServicesSectionProps {
  onRequestDemo: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onRequestDemo }) => {
  const [selectedEventId, setSelectedEventId] = useState(COMMERCE_SIMULATION_EVENTS[0].id);
  const [activeLang, setActiveLang] = useState<'curl' | 'node' | 'python'>('curl');
  const [copiedCode, setCopiedCode] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [latencyMs, setLatencyMs] = useState(28);

  const selectedEvent =
    COMMERCE_SIMULATION_EVENTS.find((e) => e.id === selectedEventId) ||
    COMMERCE_SIMULATION_EVENTS[0];

  const getServiceIcon = (index: string) => {
    switch (index) {
      case '01':
        return CreditCard;
      case '02':
        return Truck;
      case '03':
        return RefreshCw;
      default:
        return Smartphone;
    }
  };

  const curlSnippet = `curl -X POST https://api.trustx.dev/v1/decisions/evaluate \\
  -H "Authorization: Bearer sec_live_merchant_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "event_type": "${selectedEvent.eventType}",
    "customer_token": "${selectedEvent.orderFacts.customerToken}",
    "order_facts": {
      "amount": ${selectedEvent.orderFacts.amount},
      "currency": "${selectedEvent.orderFacts.currency}",
      "payment_method": "${selectedEvent.orderFacts.paymentMethod}"
    }
  }'`;

  const nodeSnippet = `import { TrustXClient } from '@trustx/sdk';

const trustx = new TrustXClient({ apiKey: process.env.TRUSTX_API_KEY });

const decision = await trustx.decisions.evaluate({
  eventType: '${selectedEvent.eventType}',
  customerToken: '${selectedEvent.orderFacts.customerToken}',
  orderFacts: {
    amount: ${selectedEvent.orderFacts.amount},
    currency: '${selectedEvent.orderFacts.currency}',
    paymentMethod: '${selectedEvent.orderFacts.paymentMethod}'
  }
});`;

  const pythonSnippet = `import trustx

client = trustx.Client(api_key="sec_live_...")

decision = client.decisions.evaluate(
    event_type="${selectedEvent.eventType}",
    customer_token="${selectedEvent.orderFacts.customerToken}",
    order_facts={
        "amount": ${selectedEvent.orderFacts.amount},
        "currency": "${selectedEvent.orderFacts.currency}",
        "payment_method": "${selectedEvent.orderFacts.paymentMethod}",
    },
)`;

  const activeCode =
    activeLang === 'curl' ? curlSnippet : activeLang === 'node' ? nodeSnippet : pythonSnippet;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 1800);
  };

  const handleRunTest = () => {
    setIsTesting(true);
    setTimeout(() => {
      setLatencyMs(Math.floor(Math.random() * 11) + 21);
      setIsTesting(false);
    }, 200);
  };

  const getBandStyles = (band: string) => {
    switch (band) {
      case 'critical':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      case 'elevated':
        return 'text-amber-800 bg-amber-50 border-amber-200';
      default:
        return 'text-emerald-800 bg-emerald-50 border-emerald-200';
    }
  };

  return (
    <section id="services" className="py-16 md:py-22 border-t border-slate-200/80 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-none">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">
              02. Services & Capabilities
            </div>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight"
              style={{ textWrap: 'balance' }}
            >
              End-to-End Risk Intelligence Across the Commerce Lifecycle
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              From pre-authorization checkout scoring to COD dispatch verification and return-portal protection, TrustX equips merchant operations with unified, privacy-safe intelligence.
            </p>
          </div>

          <button
            type="button"
            onClick={onRequestDemo}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0 self-start md:self-auto cursor-pointer"
          >
            <span>Schedule Service Walkthrough</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Asymmetric Bento Grid of Services */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {SERVICE_OFFERINGS.map((service) => {
            const Icon = getServiceIcon(service.index);
            const spanClass = service.featured ? 'lg:col-span-7' : 'lg:col-span-5';
            const alternateSpan =
              service.index === '03'
                ? 'lg:col-span-5'
                : service.index === '04'
                ? 'lg:col-span-7'
                : spanClass;

            return (
              <div
                key={service.id}
                className={`${alternateSpan} surface-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-blue-700" />
                      </div>
                      <div className="text-xs text-slate-500 font-medium">
                        {service.index}. {service.category}
                      </div>
                    </div>
                  </div>

                  <h3 className="mt-4 text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">{service.summary}</p>

                  <ul className="mt-5 space-y-2">
                    {service.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold text-emerald-700">
                  <span>Measured Impact</span>
                  <span className="text-right font-mono">{service.outcomeMetric}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Decision Explorer */}
        <div className="mt-14 rounded-2xl surface-glass overflow-hidden">
          <div className="px-6 py-4 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Interactive Risk Decision Explorer
              </h3>
              <p className="text-xs text-slate-500">
                Inspect how TrustX transforms live commerce signals into explainable decisions
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
              {COMMERCE_SIMULATION_EVENTS.map((evt) => (
                <button
                  key={evt.id}
                  type="button"
                  onClick={() => setSelectedEventId(evt.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    selectedEventId === evt.id
                      ? 'bg-white text-blue-700 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {evt.title.split(' ')[0]} {evt.title.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
            {/* Left: Scenario & Request Snippet */}
            <div className="lg:col-span-6 p-6 space-y-5 bg-white/80">
              <div>
                <div className="text-xs text-slate-500">
                  {selectedEvent.merchantName} · {selectedEvent.merchantVertical}
                </div>
                <h4 className="text-base font-bold text-slate-900 mt-1">{selectedEvent.title}</h4>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedEvent.simulatedScenario}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                  {(['curl', 'node', 'python'] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setActiveLang(lang)}
                      className={`px-2.5 py-1 text-xs font-mono uppercase rounded transition-colors cursor-pointer ${
                        activeLang === lang
                          ? 'bg-white text-blue-700 font-semibold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleRunTest}
                  disabled={isTesting}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>{isTesting ? 'Evaluating...' : 'Evaluate Event'}</span>
                </button>
              </div>

              <div className="relative rounded-xl bg-slate-900 p-4 font-mono text-xs text-slate-100 overflow-x-auto">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-md transition-colors cursor-pointer"
                  aria-label="Copy API request snippet"
                >
                  {copiedCode ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <pre className="pr-8 leading-relaxed">{activeCode}</pre>
              </div>
            </div>

            {/* Right: Explainable Decision Contract Output */}
            <div className="lg:col-span-6 p-6 bg-white flex flex-col justify-between space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-white font-mono font-extrabold text-xl flex items-center justify-center tabular-nums">
                    {selectedEvent.baselineDecision.risk_score}
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Risk Score (0–100)</div>
                    <div className="mt-1 flex items-center gap-2 text-xs">
                      <span
                        className={`px-2 py-0.5 rounded font-semibold uppercase border ${getBandStyles(
                          selectedEvent.baselineDecision.risk_band
                        )}`}
                      >
                        {selectedEvent.baselineDecision.risk_band}
                      </span>
                      <span className="text-slate-500 font-mono">
                        {selectedEvent.baselineDecision.confidence} confidence · {latencyMs}ms
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-500">Recommended Action</div>
                  <div className="text-xs font-mono font-bold text-blue-700 uppercase mt-0.5">
                    {selectedEvent.baselineDecision.recommended_action.replace(/_/g, ' ')}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-slate-700 mb-2">
                  Explainable Reason Codes
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.baselineDecision.reason_codes.map((code) => (
                    <span
                      key={code}
                      className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-mono text-xs font-medium"
                    >
                      {code}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-600 pt-2">
                <div>
                  <strong className="text-slate-900">Network Signal Context:</strong>{' '}
                  {selectedEvent.networkSignalContribution}
                </div>
                <div className="flex items-start gap-2 text-emerald-800 bg-emerald-50/70 p-3 rounded-lg border border-emerald-200/70">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{selectedEvent.privacyGuarantee}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
