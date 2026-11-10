import React, { useState } from 'react';
import { Terminal, Play, Copy, Check, Code2, RefreshCw, Lock, Zap } from 'lucide-react';

export const InteractiveApiConsole: React.FC = () => {
  const [activeLang, setActiveLang] = useState<'curl' | 'node' | 'python' | 'go'>('curl');
  const [selectedEventType, setSelectedEventType] = useState<'cod_confirmation' | 'checkout' | 'return_request'>('cod_confirmation');
  const [orderAmount, setOrderAmount] = useState<number>(3499);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'CREDIT_CARD' | 'UPI'>('COD');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(29);

  // Compute live simulated output
  const computeDecision = () => {
    let score = 25;
    let band: 'low' | 'moderate' | 'elevated' | 'critical' = 'low';
    let action = 'approve';
    let reasonCodes = ['ESTABLISHED_REPUTATION'];

    if (selectedEventType === 'cod_confirmation') {
      if (orderAmount > 2500) {
        score = 68;
        band = 'elevated';
        action = 'require_prepayment_cod';
        reasonCodes = ['COD_REFUSAL_CLUSTER_SIGNAL', 'DEVICE_MULTI_FAIL_DELIVERY', 'HIGH_RETURN_RATIO_GEO'];
      } else {
        score = 32;
        band = 'moderate';
        action = 'request_verification';
        reasonCodes = ['FIRST_TIME_COD_GEO_MODERATE'];
      }
    } else if (selectedEventType === 'checkout') {
      if (orderAmount > 2000) {
        score = 88;
        band = 'critical';
        action = 'request_verification';
        reasonCodes = ['DEVICE_LINK_SIGNAL', 'VELOCITY_ANOMALY', 'MULTI_IDENTITY_COLLISION'];
      } else {
        score = 14;
        band = 'low';
        action = 'approve';
        reasonCodes = ['POSITIVE_SETTLEMENT_HISTORY'];
      }
    } else if (selectedEventType === 'return_request') {
      score = 74;
      band = 'elevated';
      action = 'manual_review';
      reasonCodes = ['RETURN_PATTERN_SIGNAL', 'WARDROBING_SEASONAL_ANOMALY'];
    }

    return {
      decision_id: `dec_${Math.random().toString(36).substring(2, 9)}`,
      event_id: `evt_${Math.random().toString(36).substring(2, 9)}`,
      risk_score: score,
      risk_band: band,
      confidence: 'high',
      reason_codes: reasonCodes,
      recommended_action: action,
      signal_freshness: 'current',
      policy_version: 'merchant_live_v2.4',
      model_version: 'rules_calibrated_v1.2',
      evaluated_at: new Date().toISOString()
    };
  };

  const [currentResult, setCurrentResult] = useState(computeDecision());

  const handleExecute = () => {
    setIsLoading(true);
    const start = performance.now();
    setTimeout(() => {
      setCurrentResult(computeDecision());
      setExecutionTime(Math.round(performance.now() - start + 24));
      setIsLoading(false);
    }, 280);
  };

  const curlSnippet = `curl -X POST https://api.trustx.dev/v1/decisions/evaluate \\
  -H "Authorization: Bearer sec_live_merchant_88921" \\
  -H "X-TrustX-Purpose: ${selectedEventType === 'cod_confirmation' ? 'cod_validation' : 'transaction_risk'}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "event_type": "${selectedEventType}",
    "declared_use_case": "commerce_risk_assessment",
    "customer_token": "tok_hmac_994b2a8f",
    "order_facts": {
      "amount": ${orderAmount},
      "currency": "INR",
      "payment_method": "${paymentMethod}",
      "delivery_pincode": "201301"
    }
  }'`;

  const nodeSnippet = `import { TrustXClient } from '@trustx/sdk';

const trustx = new TrustXClient({
  apiKey: process.env.TRUSTX_API_KEY,
  merchantId: 'mer_aurastyle'
});

const decision = await trustx.decisions.evaluate({
  eventType: '${selectedEventType}',
  declaredUseCase: 'commerce_risk_assessment',
  customerToken: 'tok_hmac_994b2a8f',
  orderFacts: {
    amount: ${orderAmount},
    currency: 'INR',
    paymentMethod: '${paymentMethod}'
  }
});

console.log(decision.risk_score, decision.recommended_action);`;

  const pythonSnippet = `import trustx

client = trustx.Client(api_key="sec_live_...")

decision = client.decisions.evaluate(
    event_type="${selectedEventType}",
    declared_use_case="commerce_risk_assessment",
    customer_token="tok_hmac_994b2a8f",
    order_facts={
        "amount": ${orderAmount},
        "currency": "INR",
        "payment_method": "${paymentMethod}"
    }
)

if decision.recommended_action == "require_prepayment_cod":
    prompt_advance_deposit()`;

  const goSnippet = `package main

import (
    "context"
    "fmt"
    "github.com/trustx-security/trustx-go"
)

func main() {
    client := trustx.NewClient("sec_live_...")
    decision, err := client.Decisions.Evaluate(context.Background(), &trustx.EvaluateParams{
        EventType: "${selectedEventType}",
        Amount:    ${orderAmount},
        Payment:   "${paymentMethod}",
    })
    fmt.Printf("Decision: %s (Score: %d)\\n", decision.RecommendedAction, decision.RiskScore)
}`;

  const getCodeSnippet = () => {
    switch (activeLang) {
      case 'curl': return curlSnippet;
      case 'node': return nodeSnippet;
      case 'python': return pythonSnippet;
      case 'go': return goSnippet;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="api-contract" className="py-12 md:py-18 bg-slate-50/70 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 font-mono mb-2">
            Developer-First Integration & Contract
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Clean OpenAPI Specification & Compact Decision Contract
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Integrate in minutes with your checkout flow, COD dispatch queue, or returns portal. No heavy client SDKs required—just a lightweight REST request returning an explainable JSON decision.
          </p>
        </div>

        {/* Interactive Playground Grid */}
        <div className="mt-10 rounded-xl border border-slate-200 bg-white overflow-hidden shadow-lg">
          
          {/* Top Bar with Language Tabs & Execution Trigger */}
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {(['curl', 'node', 'python', 'go'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-3 py-1 text-xs font-mono font-medium rounded transition-colors uppercase ${
                    activeLang === lang
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {executionTime && (
                <span className="text-[11px] font-mono text-blue-700 flex items-center gap-1 font-medium">
                  <Zap className="w-3 h-3 text-blue-600" />
                  <span>{executionTime}ms latency</span>
                </span>
              )}

              <button
                onClick={handleExecute}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-all active:scale-[0.98] shadow-xs"
              >
                <Play className="w-3 h-3 text-white fill-white" />
                <span>{isLoading ? 'Sending...' : 'Test Request'}</span>
              </button>
            </div>
          </div>

          {/* Interactive Request & Response Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
            
            {/* Left 6 Columns: Request Parameters & Code */}
            <div className="lg:col-span-6 p-6 space-y-4">
              
              {/* Parameter Controls */}
              <div className="bg-slate-50/70 border border-slate-200 rounded-lg p-4 space-y-3">
                <div className="text-xs font-mono text-blue-600 uppercase tracking-wider font-semibold">
                  Test Request Parameters
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">Event Type</label>
                    <select
                      value={selectedEventType}
                      onChange={(e) => setSelectedEventType(e.target.value as any)}
                      className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-mono shadow-xs"
                    >
                      <option value="cod_confirmation">COD Confirm</option>
                      <option value="checkout">Checkout</option>
                      <option value="return_request">Return Request</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">Payment Method</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-mono shadow-xs"
                    >
                      <option value="COD">COD</option>
                      <option value="CREDIT_CARD">Credit Card</option>
                      <option value="UPI">UPI</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-500 block mb-1">Amount ({orderAmount})</label>
                    <input
                      type="range"
                      min="500"
                      max="8000"
                      step="500"
                      value={orderAmount}
                      onChange={(e) => setOrderAmount(Number(e.target.value))}
                      className="w-full accent-blue-600 mt-2"
                    />
                  </div>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="relative rounded-lg bg-[#0F172A] border border-slate-800 p-4 font-mono text-xs text-slate-200 overflow-x-auto shadow-sm">
                <button
                  onClick={handleCopy}
                  className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-white bg-slate-800 border border-slate-700 rounded transition-colors"
                  title="Copy Code"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-blue-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <pre className="pr-8">{getCodeSnippet()}</pre>
              </div>

            </div>

            {/* Right 6 Columns: JSON Response */}
            <div className="lg:col-span-6 p-6 bg-slate-50/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-blue-600 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                    <Code2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Real-Time Decision Response Contract</span>
                  </span>
                  <span className="text-xs font-mono text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-medium">
                    HTTP 200 OK
                  </span>
                </div>

                <div className="rounded-lg bg-[#0F172A] border border-slate-800 p-4 font-mono text-xs text-slate-200 overflow-x-auto max-h-[360px] shadow-sm">
                  <pre>{JSON.stringify(currentResult, null, 2)}</pre>
                </div>
              </div>

              {/* Outcome summary bar */}
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-600">
                  Recommended Action: <strong className="text-blue-700 font-bold uppercase">{currentResult.recommended_action}</strong>
                </span>
                <span className="text-slate-600">
                  Risk Score: <strong className="text-slate-900 font-bold">{currentResult.risk_score}</strong>/100
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
