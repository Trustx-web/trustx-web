export type CommerceEventType =
  | 'checkout'
  | 'cod_confirmation'
  | 'return_request'
  | 'refund_request'
  | 'account_creation';

export type RiskBand = 'low' | 'moderate' | 'elevated' | 'critical';

export type RecommendedAction =
  | 'approve'
  | 'request_verification'
  | 'require_prepayment_cod'
  | 'manual_review'
  | 'decline';

export interface RiskDecisionContract {
  decision_id: string;
  event_id: string;
  risk_score: number;
  risk_band: RiskBand;
  confidence: 'low' | 'medium' | 'high';
  reason_codes: string[];
  recommended_action: RecommendedAction;
  signal_freshness: 'current' | 'stale' | 'interpolated';
  policy_version: string;
  model_version: string;
  evaluated_at: string;
  appeal_metadata?: {
    eligible_for_correction: boolean;
    dispute_contact: string;
    correlation_id: string;
  };
}

export interface CommerceSimulationEvent {
  id: string;
  title: string;
  eventType: CommerceEventType;
  merchantVertical: string;
  merchantName: string;
  declaredUseCase: string;
  orderFacts: {
    amount: number;
    currency: string;
    itemCount: number;
    paymentMethod: 'COD' | 'CREDIT_CARD' | 'UPI' | 'BUY_NOW_PAY_LATER';
    deliveryRegion: string;
    deviceHash: string;
    customerToken: string;
  };
  simulatedScenario: string;
  baselineDecision: RiskDecisionContract;
  networkSignalContribution: string;
  privacyGuarantee: string;
}

export interface ServiceOffering {
  id: string;
  index: string;
  title: string;
  category: string;
  summary: string;
  capabilities: string[];
  outcomeMetric: string;
  featured?: boolean;
}

export interface CaseStudy {
  id: string;
  category: 'COD & Logistics' | 'Payments' | 'Returns';
  merchant: string;
  region: string;
  headlineMetric: string;
  timeframe: string;
  challenge: string;
  solution: string;
  results: string[];
}

export interface GovernanceControl {
  id: string;
  framework: string;
  category: string;
  requirement: string;
  trustXImplementation: string;
  verificationEvidence: string;
}

export interface BenchmarkStat {
  metric: string;
  value: string;
  unit: string;
  context: string;
}
