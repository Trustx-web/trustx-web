import { 
  CommerceSimulationEvent, 
  RiskDomainUseCase, 
  GovernanceControl, 
  BenchmarkStat 
} from '../types';

export const COMMERCE_SIMULATION_EVENTS: CommerceSimulationEvent[] = [
  {
    id: 'sim-cod-refusal',
    title: 'Cash on Delivery (COD) Delivery Refusal Risk',
    eventType: 'cod_confirmation',
    merchantVertical: 'Fast Fashion & Apparel',
    merchantName: 'AuraStyle India',
    declaredUseCase: 'COD order dispatch validation & RTO prevention',
    orderFacts: {
      amount: 3499,
      currency: 'INR',
      itemCount: 4,
      paymentMethod: 'COD',
      deliveryRegion: 'Tier-2 Metro Zone (Pincode: 201301)',
      deviceHash: 'dev_8f29c1e09a',
      customerToken: 'tok_hmac_994b2a8f'
    },
    simulatedScenario: 'Customer placed high-value COD order for 4 garments. Device token correlates with 3 uncollected/refused delivery attempts across authorized network participants over the past 45 days.',
    baselineDecision: {
      decision_id: 'dec_cod_88921a',
      event_id: 'evt_cod_391081',
      risk_score: 68,
      risk_band: 'elevated',
      confidence: 'high',
      reason_codes: ['COD_REFUSAL_CLUSTER_SIGNAL', 'DEVICE_MULTI_FAIL_DELIVERY', 'HIGH_RETURN_RATIO_GEO'],
      recommended_action: 'require_prepayment_cod',
      signal_freshness: 'current',
      policy_version: 'merchant_aurastyle_v2.4',
      model_version: 'cod_dispatch_calibrated_v1.2',
      evaluated_at: '2026-11-10T16:54:12Z',
      appeal_metadata: {
        eligible_for_correction: true,
        dispute_contact: 'trust@trust-x.dev/dispute',
        correlation_id: 'corr_aurastyle_cod_992'
      }
    },
    networkSignalContribution: 'Aggregated frequency score of uncollected COD deliveries via relationship-gated token hash without revealing prior merchant names or basket details.',
    privacyGuarantee: 'Zero consumer address or phone storage in network pool; evaluation executes against ephemeral keyed HMAC token with automatic 30-day signal expiry.'
  },
  {
    id: 'sim-return-wardrobing',
    title: 'Serial Return Abuse & Wardrobing Pattern',
    eventType: 'return_request',
    merchantVertical: 'High-End Luxury Goods',
    merchantName: 'Maison Élite NYC',
    declaredUseCase: 'Return policy abuse & condition fraud mitigation',
    orderFacts: {
      amount: 1850,
      currency: 'USD',
      itemCount: 2,
      paymentMethod: 'CREDIT_CARD',
      deliveryRegion: 'New York, US',
      deviceHash: 'dev_41c9a877e1',
      customerToken: 'tok_hmac_17d49e62'
    },
    simulatedScenario: 'Customer requests full cash refund for 2 designer evening gowns 28 days post-delivery. Customer profile exhibits 91% return velocity with previous complaints of wardrobing (returned after single event use).',
    baselineDecision: {
      decision_id: 'dec_ret_77192b',
      event_id: 'evt_ret_440192',
      risk_score: 74,
      risk_band: 'elevated',
      confidence: 'high',
      reason_codes: ['RETURN_PATTERN_SIGNAL', 'WARDROBING_SEASONAL_ANOMALY', 'HIGH_VALUE_BASKET_OUTLIER'],
      recommended_action: 'manual_review',
      signal_freshness: 'current',
      policy_version: 'maison_elite_return_v1.8',
      model_version: 'rules_supervised_ret_v1.0',
      evaluated_at: '2026-11-10T16:54:08Z',
      appeal_metadata: {
        eligible_for_correction: true,
        dispute_contact: 'trust@trust-x.dev/dispute',
        correlation_id: 'corr_maison_ret_182'
      }
    },
    networkSignalContribution: 'Return frequency score calibrated across cross-merchant categories without sharing item names, brand labels, or merchant transaction histories.',
    privacyGuarantee: 'Data minimization: raw receipt and card data discarded; only mathematically calibrated return disposition score retained under purpose-bound license.'
  },
  {
    id: 'sim-checkout-syndicate',
    title: 'High-Velocity Card Fraud & Shared-Device Syndicate',
    eventType: 'checkout',
    merchantVertical: 'Consumer Electronics & Gadgets',
    merchantName: 'VoltDirect Global',
    declaredUseCase: 'Real-time payment fraud prevention & 3DS step-up gating',
    orderFacts: {
      amount: 2490,
      currency: 'USD',
      itemCount: 3,
      paymentMethod: 'CREDIT_CARD',
      deliveryRegion: 'California, US',
      deviceHash: 'dev_e91024cc55',
      customerToken: 'tok_hmac_ff01823d'
    },
    simulatedScenario: 'Checkout request for 3 flagship smartphones. The device fingerprint is linked to 9 distinct customer identity tokens and 6 disparate billing addresses within the past 120 minutes.',
    baselineDecision: {
      decision_id: 'dec_chk_10948c',
      event_id: 'evt_chk_882019',
      risk_score: 91,
      risk_band: 'critical',
      confidence: 'high',
      reason_codes: ['DEVICE_LINK_SIGNAL', 'VELOCITY_ANOMALY', 'MULTI_IDENTITY_COLLISION'],
      recommended_action: 'request_verification',
      signal_freshness: 'current',
      policy_version: 'voltdirect_payment_v3.1',
      model_version: 'rules_v1_deterministic',
      evaluated_at: '2026-11-10T16:54:01Z',
      appeal_metadata: {
        eligible_for_correction: true,
        dispute_contact: 'trust@trust-x.dev/dispute',
        correlation_id: 'corr_volt_chk_004'
      }
    },
    networkSignalContribution: 'Velocity cluster count of device hash appearances across authorized merchants without revealing which other merchants were queried.',
    privacyGuarantee: 'Device fingerprint is one-way salted with merchant tenant salt and rotated monthly; no persistent hardware serial numbers or location tracking.'
  },
  {
    id: 'sim-legit-vip',
    title: 'Frictionless VIP Customer Approval',
    eventType: 'checkout',
    merchantVertical: 'Specialty Coffee & Subscription',
    merchantName: 'ArtisanRoast Direct',
    declaredUseCase: 'Low-friction one-click checkout authorization',
    orderFacts: {
      amount: 145,
      currency: 'USD',
      itemCount: 2,
      paymentMethod: 'BUY_NOW_PAY_LATER',
      deliveryRegion: 'Washington, US',
      deviceHash: 'dev_338901bca2',
      customerToken: 'tok_hmac_559102cd'
    },
    simulatedScenario: 'Long-standing verified customer purchasing recurring subscription. Zero dispute history, consistent device and IP ASN subnet, high positive fulfillment reputation.',
    baselineDecision: {
      decision_id: 'dec_vip_33019d',
      event_id: 'evt_vip_910293',
      risk_score: 6,
      risk_band: 'low',
      confidence: 'high',
      reason_codes: ['ESTABLISHED_REPUTATION', 'CONSISTENT_DEVICE_AFFINITY', 'ZERO_CHARGEBACK_HISTORY'],
      recommended_action: 'approve',
      signal_freshness: 'current',
      policy_version: 'artisan_frictionless_v1.0',
      model_version: 'rules_v1_deterministic',
      evaluated_at: '2026-11-10T16:53:50Z'
    },
    networkSignalContribution: 'High-confidence fulfillment and positive delivery score without merchant revealing private basket contents.',
    privacyGuarantee: 'Evaluation completed with zero step-up friction; event logged with minimized fields for billing reconciliation.'
  }
];

export const RISK_DOMAIN_USE_CASES: RiskDomainUseCase[] = [
  {
    id: 'use-case-cod',
    title: 'Cash-on-Delivery (COD) Refusal Prevention',
    subtitle: 'Eliminate preventable Return-To-Origin (RTO) freight loss',
    iconName: 'Truck',
    problem: 'Merchants in high-growth commerce regions (India, Southeast Asia, LATAM) lose 20-35% of revenue on COD deliveries rejected at doorstep due to frivolous orders or malicious bots.',
    solution: 'Trust-X scores COD refusal probability before dispatch by correlating relationship-gated delivery outcomes, phone confirmation status, and address quality.',
    keySignals: [
      'Historical uncollected delivery frequency',
      'Address deliverability & pincode risk tier',
      'Device association with cancelled COD attempts',
      'Cart value deviation from customer baseline'
    ],
    merchantActions: [
      'Prompt WhatsApp OTP order verification',
      'Require nominal 10% advance prepayment',
      'Prioritize dispatch for high-confidence orders'
    ],
    measuredOutcome: 'Reduces RTO freight loss by 64% while maintaining 94% customer conversion.'
  },
  {
    id: 'use-case-returns',
    title: 'Serial Return & Wardrobing Abuse',
    subtitle: 'Protect margins from policy exploitation without alienating VIPs',
    iconName: 'RefreshCw',
    problem: 'E-commerce fashion and electronics retailers absorb billions in return logistics and unsellable inventory from serial returners and event wardrobers.',
    solution: 'Calibrated return propensity scoring that distinguishes honest sizing returns from deliberate policy gaming, backed by explainable reason codes.',
    keySignals: [
      'Cross-merchant category return velocity',
      'Temporal pattern (returns timed around holidays)',
      'Ratio of total purchased items to returned volume',
      'Condition dispute history and tag removal flags'
    ],
    merchantActions: [
      'Disable automated instant refund for high-risk returns',
      'Route returns to physical warehouse manual inspection',
      'Offer store credit incentive over cash refund'
    ],
    measuredOutcome: 'Saves 18-24% in reverse logistics costs while shielding good customers from friction.'
  },
  {
    id: 'use-case-payment',
    title: 'Transaction & Card Fraud Shield',
    subtitle: 'Sub-35ms deterministic scoring before 3D Secure / settlement',
    iconName: 'ShieldAlert',
    problem: 'Payment chargebacks, stolen card testing, and account takeover bot attacks drive merchant fines and processing fees.',
    solution: 'Sub-35ms risk scoring returning actionable reason codes, confidence bands, and automated policy recommendations before payment gateway capture.',
    keySignals: [
      'Card-to-device velocity anomalies',
      'Cross-merchant credential stuffing bursts',
      'Proxy/VPN high-risk egress detection',
      'Billing vs shipping geo-discrepancy clusters'
    ],
    merchantActions: [
      'Trigger frictionless 3DS biometric authentication',
      'Request multi-factor identity verification',
      'Outright decline known stolen card networks'
    ],
    measuredOutcome: 'Maintains 99.2% good-customer approval with <0.08% chargeback loss rate.'
  },
  {
    id: 'use-case-device',
    title: 'Shared-Device & Syndicate Detection',
    subtitle: 'Privacy-preserving device graph with no hardware fingerprint leaks',
    iconName: 'Smartphone',
    problem: 'Fraud rings operate device farms using automated browser emulators to exploit promotion codes, referral bonuses, and gift card fraud.',
    solution: 'Rotating keyed HMAC tokens and privacy-preserving identity matching track device syndicates across merchants without collecting persistent device IDs.',
    keySignals: [
      'Device-to-account multiplicity factor',
      'Emulator and automation environment markers',
      'Subnet rotation during single session',
      'Voucher redemption velocity per device cluster'
    ],
    merchantActions: [
      'Cap promotional voucher application to 1 per device',
      'Enforce device re-enrollment with biometric verification',
      'Quarantine suspect syndicates in merchant review queue'
    ],
    measuredOutcome: 'Blocks 89% of referral fraud rings within the first 3 minutes of campaign launch.'
  }
];

export const GOVERNANCE_CONTROLS: GovernanceControl[] = [
  {
    id: 'gov-dpdp',
    framework: 'India DPDP Rules 2025',
    category: 'Data Fiduciary & Privacy',
    requirement: 'Mandatory purpose specification, clear consumer consent/notice, data minimization, and demonstrable erasure on purpose fulfillment.',
    trustXImplementation: 'Purpose Registry enforces that every API call declares a permitted commerce risk purpose. Ephemeral storage cleanses event payloads after 30-day decisioning.',
    verificationEvidence: 'Automated purpose validation middleware; tenant-scoped deletion and audit logs.'
  },
  {
    id: 'gov-gdpr-ai',
    framework: 'EU GDPR & EU AI Act',
    category: 'Profiling & Automated Decisions',
    requirement: 'Protection against solely automated profiling with significant effects (Article 22); right to explanation and human oversight.',
    trustXImplementation: 'Trust-X operates in advisory mode: returns explainable reason codes, risk bands, and confidence scores. Merchant policy retains final execution decision.',
    verificationEvidence: 'Standardized reason code taxonomy; consumer grievance and dispute endpoint.'
  },
  {
    id: 'gov-nist',
    framework: 'NIST CSF 2.0 & AI RMF',
    category: 'Risk Management & Fairness',
    requirement: 'Governed machine learning lifecycle, drift monitoring, bias evaluation, and continuous threat mitigation.',
    trustXImplementation: 'Deterministic rules and calibrated scoring first; supervised ML deployed only with pre-registered baseline and drift detection.',
    verificationEvidence: 'Brier score calibration curves, monthly drift audits, and absence of sensitive demographic attributes.'
  },
  {
    id: 'gov-asvs',
    framework: 'OWASP ASVS 5.0 & API Top 10',
    category: 'Application & API Security',
    requirement: 'Strict tenant isolation, prevention of Broken Object-Level Authorization (BOLA/IDOR), and cryptographic key lifecycle management.',
    trustXImplementation: 'Multi-tenant database with server-side tenant isolation enforced at row and query boundary. Keyed HMAC token references rotated via cloud HSM.',
    verificationEvidence: 'Automated BOLA test harness in CI/CD pipeline; zero cross-tenant leakage test suite.'
  }
];

export const BENCHMARK_STATS: BenchmarkStat[] = [
  {
    metric: 'p99 API Latency',
    value: '< 35',
    unit: 'ms',
    context: 'End-to-end evaluation including tokenization and network lookup',
    methodology: 'Benchmarked on multi-region AWS/GCP endpoints under 15,000 req/sec'
  },
  {
    metric: 'Good-Customer Approval',
    value: '99.2%',
    unit: 'approval rate',
    context: 'Frictionless checkout experience without false-positive disruption',
    methodology: 'Calibrated across 2.4M transactions in fashion and electronics cohorts'
  },
  {
    metric: 'COD Refusal Loss Cut',
    value: '-64%',
    unit: 'RTO freight loss',
    context: 'Direct reduction in Return-To-Origin shipping and restocking charges',
    methodology: 'Measured in high-volume Indian e-commerce merchant pilot cohort'
  },
  {
    metric: 'Raw PII Stored',
    value: '0',
    unit: 'records',
    context: 'Zero plaintext credit cards, CVVs, or government IDs stored in network',
    methodology: 'Strict HSM-backed HMAC tokenization with automatic short-lived expiry'
  }
];

export const FOUNDER_PRINCIPLES = [
  {
    number: '01',
    title: 'Purpose Limitation',
    description: 'Data is processed strictly for documented, contractual commerce risk assessment. Zero monetization of consumer behavior or ad tracking.'
  },
  {
    number: '02',
    title: 'Data Minimization',
    description: 'Collect only the minimal fields required for scoring. Full card numbers, CVVs, passwords, and sensitive identifiers are strictly barred.'
  },
  {
    number: '03',
    title: 'Relationship Gating',
    description: 'Merchants may query network signals only when an active, lawful transaction relationship exists with the customer. No universal data pooling.'
  },
  {
    number: '04',
    title: 'Merchant Isolation',
    description: 'Tenant separation enforced at database and API gateway boundaries. Merchant A will never see Merchant B’s name, basket, or pricing.'
  },
  {
    number: '05',
    title: 'Explainability & Fairness',
    description: 'Every decision provides human-readable reason codes, signal freshness, and confidence bands. Scores are non-permanent and contestable.'
  },
  {
    number: '06',
    title: 'Human Accountability',
    description: 'Trust-X delivers calibrated advisory intelligence. The merchant’s own policy determines final action, maintaining full human oversight.'
  }
];
