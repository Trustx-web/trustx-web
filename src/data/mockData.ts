import {
  CommerceSimulationEvent,
  ServiceOffering,
  CaseStudy,
  GovernanceControl,
  BenchmarkStat,
} from '../types';

export const BENCHMARK_STATS: BenchmarkStat[] = [
  {
    metric: 'p99 Decision Latency',
    value: '< 35ms',
    unit: 'ms',
    context: 'End-to-end scoring with tokenization and network lookup',
  },
  {
    metric: 'Good-Buyer Approval',
    value: '99.2%',
    unit: 'rate',
    context: 'Frictionless checkout preserved without false declines',
  },
  {
    metric: 'COD Refusal Reduction',
    value: '-64%',
    unit: 'loss cut',
    context: 'Lower Return-to-Origin shipping and restocking waste',
  },
  {
    metric: 'Raw PII Stored in Pool',
    value: '0',
    unit: 'records',
    context: 'Zero plaintext card numbers, CVVs, or consumer dossiers',
  },
];

export const SERVICE_OFFERINGS: ServiceOffering[] = [
  {
    id: 'svc-checkout',
    index: '01',
    title: 'Real-Time Transaction & Payment Risk Scoring',
    category: 'Checkout Intelligence',
    summary:
      'Evaluate card, UPI, and BNPL checkouts before payment capture. Deterministic rules paired with calibrated scoring isolate stolen card testing and velocity bursts while keeping trusted buyers frictionless.',
    capabilities: [
      'Sub-35ms pre-authorization scoring via REST API',
      'Adaptive 3D Secure step-up triggers for borderline baskets',
      'Transparent reason codes and confidence bands on every event',
    ],
    outcomeMetric: '99.2% genuine buyer approval with <0.08% chargebacks',
    featured: true,
  },
  {
    id: 'svc-cod',
    index: '02',
    title: 'Cash-on-Delivery (COD) Refusal Prevention',
    category: 'Logistics & Fulfillment',
    summary:
      'Predict doorstep delivery refusal and frivolous COD orders prior to warehouse dispatch using relationship-gated delivery outcomes and behavioral velocity signals.',
    capabilities: [
      'Pre-dispatch COD refusal probability scoring',
      'Automated partial prepayment or OTP confirmation routing',
      'Pincode and courier delivery affinity calibration',
    ],
    outcomeMetric: 'Cuts Return-to-Origin freight loss by 64%',
  },
  {
    id: 'svc-returns',
    index: '03',
    title: 'Return & Refund Policy Abuse Mitigation',
    category: 'Post-Purchase Protection',
    summary:
      'Separate honest sizing exchanges from serial returners, seasonal wardrobers, and empty-box refund syndicates without penalizing loyal VIP shoppers.',
    capabilities: [
      'Cross-merchant return velocity signals without raw basket exposure',
      'Dynamic instant-refund gating for high-risk claims',
      'Warehouse manual inspection routing for high-value items',
    ],
    outcomeMetric: 'Reduces reverse logistics waste by 18% to 24%',
  },
  {
    id: 'svc-device',
    index: '04',
    title: 'Device & Cross-Merchant Signal Graph',
    category: 'Network Intelligence',
    summary:
      'Uncover coordinated emulator farms, promo abuse rings, and multi-accounting syndicates across authorized commerce participants using rotating keyed HMAC tokens.',
    capabilities: [
      'Privacy-preserving device-to-identity multiplicity detection',
      'One-way salted device hashes with automated 30-day rotation',
      'Zero raw order history or competing merchant visibility',
    ],
    outcomeMetric: 'Blocks 89% of promo-abuse rings within 3 minutes',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-aurastyle',
    category: 'COD & Logistics',
    merchant: 'AuraStyle Apparel',
    region: 'India · Direct-to-Consumer Fashion',
    headlineMetric: '-64% RTO Freight Loss in 90 Days',
    timeframe: 'Q1–Q2 Deployment · 180,000+ monthly orders',
    challenge:
      'High-value COD orders in Tier-2 metro zones were suffering a 28% doorstep refusal rate, eroding unit margins through two-way courier costs and damaged inventory.',
    solution:
      'Deployed Trust-X pre-dispatch COD scoring at order confirmation, routing elevated-risk baskets to nominal 10% UPI advance deposit while fast-tracking verified repeat buyers.',
    results: [
      '64% reduction in uncollected Return-to-Origin shipments',
      '94% checkout conversion retained across high-intent COD shoppers',
      'Zero manual review backlog added to warehouse operations',
    ],
  },
  {
    id: 'cs-voltdirect',
    category: 'Payments',
    merchant: 'VoltDirect Global',
    region: 'North America · Consumer Electronics',
    headlineMetric: '99.2% Approval Rate & <0.08% Chargebacks',
    timeframe: '6-Month Rollout · High-ticket electronics',
    challenge:
      'Automated card-testing bursts and shared-device syndicates targeted flagship smartphone launches, forcing legacy rules to block legitimate first-time buyers.',
    solution:
      'Integrated Trust-X sub-35ms checkout scoring with cross-merchant device velocity signals to trigger 3DS verification selectively on multi-identity device clusters.',
    results: [
      '89% of coordinated multi-account bots stopped during flash drops',
      '$38,400+ in weekly chargeback exposure prevented',
      '19ms median decision latency at peak launch concurrency',
    ],
  },
  {
    id: 'cs-maison',
    category: 'Returns',
    merchant: 'Maison Élite',
    region: 'Europe & US · Luxury Retail',
    headlineMetric: '22% Reverse Logistics Savings in 6 Months',
    timeframe: 'Post-Purchase Portal Integration',
    challenge:
      'Serial event wardrobing on designer garments caused high write-offs and abused instant-refund policies without clear visibility across retail channels.',
    solution:
      'Connected Trust-X return evaluation to RMA intake, replacing blanket friction with targeted warehouse inspection and store-credit options on repeat abuse signals.',
    results: [
      '22% drop in unsellable returned inventory write-offs',
      'Instant refunds preserved for 96% of trusted shoppers',
      'Full GDPR Article 22 explainability and 48h consumer dispute SLA',
    ],
  },
];

export const COMMERCE_SIMULATION_EVENTS: CommerceSimulationEvent[] = [
  {
    id: 'sim-cod-refusal',
    title: 'Cash-on-Delivery Refusal Prevention',
    eventType: 'cod_confirmation',
    merchantVertical: 'Fast Fashion & Apparel',
    merchantName: 'AuraStyle Apparel',
    declaredUseCase: 'COD dispatch validation & RTO mitigation',
    orderFacts: {
      amount: 3499,
      currency: 'INR',
      itemCount: 4,
      paymentMethod: 'COD',
      deliveryRegion: 'Tier-2 Metro Zone (201301)',
      deviceHash: 'dev_8f29c1e09a',
      customerToken: 'tok_hmac_994b2a8f',
    },
    simulatedScenario:
      'Customer placed a high-value COD order for 4 garments. The rotating device token correlates with 3 uncollected delivery attempts across authorized network participants over the past 45 days.',
    baselineDecision: {
      decision_id: 'dec_cod_88921a',
      event_id: 'evt_cod_391081',
      risk_score: 68,
      risk_band: 'elevated',
      confidence: 'high',
      reason_codes: [
        'COD_REFUSAL_CLUSTER_SIGNAL',
        'DEVICE_MULTI_FAIL_DELIVERY',
        'HIGH_RETURN_RATIO_GEO',
      ],
      recommended_action: 'require_prepayment_cod',
      signal_freshness: 'current',
      policy_version: 'merchant_aurastyle_v2.4',
      model_version: 'cod_dispatch_calibrated_v1.2',
      evaluated_at: '2026-11-14T10:15:12Z',
      appeal_metadata: {
        eligible_for_correction: true,
        dispute_contact: 'privacy@trust-x.dev',
        correlation_id: 'corr_aurastyle_cod_992',
      },
    },
    networkSignalContribution:
      'Aggregated frequency score of uncollected COD deliveries via relationship-gated token hash without revealing merchant names or basket details.',
    privacyGuarantee:
      'Zero plaintext addresses or phone numbers stored in network pool; evaluated against ephemeral keyed HMAC tokens with 30-day signal expiry.',
  },
  {
    id: 'sim-return-wardrobing',
    title: 'Serial Return & Wardrobing Detection',
    eventType: 'return_request',
    merchantVertical: 'Luxury Apparel',
    merchantName: 'Maison Élite',
    declaredUseCase: 'Return policy abuse mitigation',
    orderFacts: {
      amount: 1850,
      currency: 'USD',
      itemCount: 2,
      paymentMethod: 'CREDIT_CARD',
      deliveryRegion: 'New York, US',
      deviceHash: 'dev_41c9a877e1',
      customerToken: 'tok_hmac_17d49e62',
    },
    simulatedScenario:
      'Customer requests an instant cash refund for 2 evening gowns 28 days post-delivery. Behavioral and network history reflects a 91% seasonal return velocity.',
    baselineDecision: {
      decision_id: 'dec_ret_77192b',
      event_id: 'evt_ret_440192',
      risk_score: 74,
      risk_band: 'elevated',
      confidence: 'high',
      reason_codes: [
        'RETURN_PATTERN_SIGNAL',
        'WARDROBING_SEASONAL_ANOMALY',
        'HIGH_VALUE_BASKET_OUTLIER',
      ],
      recommended_action: 'manual_review',
      signal_freshness: 'current',
      policy_version: 'maison_elite_return_v1.8',
      model_version: 'rules_supervised_ret_v1.0',
      evaluated_at: '2026-11-14T10:14:08Z',
      appeal_metadata: {
        eligible_for_correction: true,
        dispute_contact: 'privacy@trust-x.dev',
        correlation_id: 'corr_maison_ret_182',
      },
    },
    networkSignalContribution:
      'Calibrated return propensity score across merchant categories without exposing item SKUs, brand labels, or order invoices.',
    privacyGuarantee:
      'Raw receipt and payment card details discarded at edge; only calibrated disposition signals retained under purpose-bound isolation.',
  },
  {
    id: 'sim-checkout-syndicate',
    title: 'Shared-Device & Card Syndicate Shield',
    eventType: 'checkout',
    merchantVertical: 'Consumer Electronics',
    merchantName: 'VoltDirect Global',
    declaredUseCase: 'Real-time payment fraud & 3DS step-up gating',
    orderFacts: {
      amount: 2490,
      currency: 'USD',
      itemCount: 3,
      paymentMethod: 'CREDIT_CARD',
      deliveryRegion: 'California, US',
      deviceHash: 'dev_e91024cc55',
      customerToken: 'tok_hmac_ff01823d',
    },
    simulatedScenario:
      'Checkout for 3 flagship devices. Device hash links to 9 distinct customer identity tokens and 6 mismatched billing geographies within 120 minutes.',
    baselineDecision: {
      decision_id: 'dec_chk_10948c',
      event_id: 'evt_chk_882019',
      risk_score: 91,
      risk_band: 'critical',
      confidence: 'high',
      reason_codes: [
        'DEVICE_LINK_SIGNAL',
        'VELOCITY_ANOMALY',
        'MULTI_IDENTITY_COLLISION',
      ],
      recommended_action: 'request_verification',
      signal_freshness: 'current',
      policy_version: 'voltdirect_payment_v3.1',
      model_version: 'rules_v1_deterministic',
      evaluated_at: '2026-11-14T10:12:41Z',
      appeal_metadata: {
        eligible_for_correction: true,
        dispute_contact: 'privacy@trust-x.dev',
        correlation_id: 'corr_volt_chk_004',
      },
    },
    networkSignalContribution:
      'Velocity cluster count of device appearances across authorized storefronts without disclosing peer merchant identities.',
    privacyGuarantee:
      'One-way tenant-salted device hash rotated monthly with zero persistent hardware fingerprinting.',
  },
  {
    id: 'sim-legit-vip',
    title: 'Trusted Repeat Customer Fast-Track',
    eventType: 'checkout',
    merchantVertical: 'Specialty Subscriptions',
    merchantName: 'ArtisanRoast Direct',
    declaredUseCase: 'Frictionless one-click checkout authorization',
    orderFacts: {
      amount: 145,
      currency: 'USD',
      itemCount: 2,
      paymentMethod: 'BUY_NOW_PAY_LATER',
      deliveryRegion: 'Washington, US',
      deviceHash: 'dev_338901bca2',
      customerToken: 'tok_hmac_559102cd',
    },
    simulatedScenario:
      'Verified returning buyer completing a recurring subscription order. Consistent device signature, zero dispute history, positive fulfillment affinity.',
    baselineDecision: {
      decision_id: 'dec_vip_33019d',
      event_id: 'evt_vip_910293',
      risk_score: 6,
      risk_band: 'low',
      confidence: 'high',
      reason_codes: [
        'ESTABLISHED_REPUTATION',
        'CONSISTENT_DEVICE_AFFINITY',
        'ZERO_CHARGEBACK_HISTORY',
      ],
      recommended_action: 'approve',
      signal_freshness: 'current',
      policy_version: 'artisan_frictionless_v1.0',
      model_version: 'rules_v1_deterministic',
      evaluated_at: '2026-11-14T10:10:05Z',
    },
    networkSignalContribution:
      'Positive fulfillment and settlement reliability score without revealing prior purchase details.',
    privacyGuarantee:
      'Frictionless approval with minimal billing reconciliation metadata only.',
  },
];

export const GOVERNANCE_CONTROLS: GovernanceControl[] = [
  {
    id: 'gov-dpdp',
    framework: 'India DPDP Rules 2025',
    category: 'Purpose Limitation & Erasure',
    requirement:
      'Mandatory purpose specification, clear notice, data minimization, and automatic erasure upon purpose completion.',
    trustXImplementation:
      'Every evaluation declares a permitted commerce risk purpose. Ephemeral event payloads purge automatically on a 30-day schedule.',
    verificationEvidence: 'Purpose validation middleware and tenant-scoped deletion logs.',
  },
  {
    id: 'gov-gdpr-ai',
    framework: 'EU GDPR & AI Act',
    category: 'Explainable Advisory Decisions',
    requirement:
      'Safeguards against opaque automated profiling (Article 22), right to explanation, and human merchant oversight.',
    trustXImplementation:
      'Trust-X returns calibrated risk scores and transparent reason codes in advisory mode; merchant policy retains final control.',
    verificationEvidence: 'Standardized reason code taxonomy and consumer dispute API.',
  },
  {
    id: 'gov-nist',
    framework: 'NIST AI RMF & CSF 2.0',
    category: 'Fairness & Calibration',
    requirement:
      'Governed scoring models, drift monitoring, and exclusion of sensitive demographic proxies.',
    trustXImplementation:
      'Deterministic rules and calibrated scoring deployed first, with continuous Brier calibration audits and zero demographic features.',
    verificationEvidence: 'Monthly calibration reports and drift telemetry.',
  },
  {
    id: 'gov-asvs',
    framework: 'OWASP ASVS 5.0',
    category: 'Tenant & Key Isolation',
    requirement:
      'Strict multi-tenant access boundaries, BOLA prevention, and managed cryptographic key lifecycles.',
    trustXImplementation:
      'Row-level tenant partitioning in database queries paired with cloud HSM-backed keyed HMAC identity tokenization.',
    verificationEvidence: 'Automated cross-tenant isolation test suite on every release.',
  },
];

export const FOUNDER_PRINCIPLES = [
  {
    number: '01',
    title: 'Purpose Limitation',
    description:
      'Signals are processed strictly for documented commerce risk assessment—never consumer ad tracking or behavioral resale.',
  },
  {
    number: '02',
    title: 'Data Minimization',
    description:
      'Only the minimum attributes needed for scoring are evaluated. Raw card numbers, CVVs, and passwords never enter the network.',
  },
  {
    number: '03',
    title: 'Relationship Gating',
    description:
      'Merchants query network risk signals only when a customer actively initiates a transaction on their storefront.',
  },
  {
    number: '04',
    title: 'Strict Tenant Isolation',
    description:
      'Storefront data, rules, and API keys are strictly partitioned per merchant so competing brands never see peer activity.',
  },
  {
    number: '05',
    title: 'Explainable & Contestable',
    description:
      'Every decision provides clear reason codes and confidence bands, with ephemeral non-permanent scoring and dispute routing.',
  },
  {
    number: '06',
    title: 'Human Oversight',
    description:
      'Trust-X delivers real-time advisory intelligence while leaving final approval, verification, or review decisions in merchant hands.',
  },
];
