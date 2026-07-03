export interface PerformanceBadge {
  id: string;
  label: string;
  metric: string;
  description: string;
}

export interface CoreEcosystem {
  id: string;
  number: string;
  title: string;
  description: string;
  features: string[];
  techStack: string[];
}

export interface StructuralPillar {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: "Shield" | "ArrowRightLeft" | "Activity";
  points: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  location: string;
  category: string;
  description: string;
  impactMetrics: { label: string; value: string }[];
  keyFeatures: string[];
  interfaceMockup: {
    screenTitle: string;
    stats: { label: string; value: string; trend?: string }[];
    recentActivity: string[];
  };
}

export const PERFORMANCE_BADGES: PerformanceBadge[] = [
  {
    id: "accuracy",
    label: "Digital Accuracy",
    metric: "100%",
    description: "Eliminating human entry leaks & paperwork errors completely."
  },
  {
    id: "analytics",
    label: "Page Analytics",
    metric: "Real-Time",
    description: "Continuous operational awareness through live feedback metrics."
  },
  {
    id: "security",
    label: "Enterprise Security",
    metric: "Military-Grade",
    description: "Sovereign metadata isolation to defend critical system data."
  }
];

export const CORE_ECOSYSTEMS: CoreEcosystem[] = [
  {
    id: "business-platforms",
    number: "01",
    title: "Custom Business Management Platforms",
    description: "Scalable cloud infrastructure built to streamline complex multi-tiered corporate processes, resource allocation, inventory monitoring, dynamic ledger tracking, and real-time business intelligence solutions.",
    features: [
      "Dynamic Multi-tier Ledger Engines",
      "Automated Resource & Inventory Allocators",
      "Real-Time Business Intelligence & KPIs",
      "Custom Cross-Department Workflows"
    ],
    techStack: ["React 19", "Node.js", "Relational Ledger", "Fast API Gateway"]
  },
  {
    id: "school-systems",
    number: "02",
    title: "Institutional & School Systems",
    description: "Unified enterprise engines managing administrative logistics, rigorous identity databases, continuous academic tracking, financial ledger tools, and end-to-end automated stakeholder interfaces.",
    features: [
      "Rigorous Secure Identity Databases",
      "Continuous Academic Progress Tracking",
      "Automated Student/Staff Ledger Billing",
      "Secure Parent & Teacher Communication Portals"
    ],
    techStack: ["Enterprise Cloud Core", "IndexedDB Sync", "Automated Billing API"]
  },
  {
    id: "social-infrastructure",
    number: "03",
    title: "Social Infrastructure & Monitoring",
    description: "Advanced digital footprint protection, multi-channel Facebook Page architectural tracking, audience trend matrix mapping, live moderation automations, and sentiment control suites.",
    features: [
      "Multi-Channel Page Architecture Tracking",
      "Live Context-Aware Moderation Automation",
      "Audience Trend & Sentiment Matrix Mapping",
      "Social Footprint Threat Response Systems"
    ],
    techStack: ["Natural Language Processing", "Metadata Tracker", "Webhooks Suite"]
  },
  {
    id: "digital-migration",
    number: "04",
    title: "Analog-to-Digital Migration",
    description: "Proprietary structural pipelines specializing in converting traditional, vulnerable paperwork archives into secure, relational indexed cloud database assets with zero latency loss.",
    features: [
      "Paper-to-Cloud Zero-Loss Pipeline",
      "Smart Optical Indexing & Search Engines",
      "Historical Audit Logs & Integrity Seals",
      "Highly Scalable Cloud Datastore Transition"
    ],
    techStack: ["Durable Server Migration", "Structure Engine", "Encrypted Relational DB"]
  }
];

export const STRUCTURAL_PILLARS: StructuralPillar[] = [
  {
    id: "security-frameworks",
    title: "Sovereign Security Frameworks",
    tagline: "Protecting Critical Metadata",
    description: "Comprehensive protection matrices integrated across all business, educational, and communication suites. We treat organizational data as a sovereign asset, safeguarding it from leakage and external vulnerabilities.",
    iconName: "Shield",
    points: [
      "Isolate multi-tiered administrative access controls",
      "Deploy robust data-at-rest encryption layers",
      "Ensure compliant secure cloud infrastructure boundaries"
    ]
  },
  {
    id: "modernization-pathways",
    title: "End-to-End Modernization Pathways",
    tagline: "Unstructured to Programmatic",
    description: "Axioscript takes manual, paperwork-reliant workflows and converts them into reliable, modern digital pipelines. Our migration process eliminates latency and guarantees long-term archival resilience.",
    iconName: "ArrowRightLeft",
    points: [
      "Transform filing cabinets into indexable relational databases",
      "Standardize ad-hoc processes into strict automated system pipelines",
      "Dramatically reduce operational bottlenecks by up to 85%"
    ]
  },
  {
    id: "continuous-monitoring",
    title: "Intelligent Continuous Monitoring",
    tagline: "Resilient Operations & Sentiment Control",
    description: "We deploy active, programmatic monitors that track internal business states and external public channels. Organizations gain immediate clarity with real-time insight dashboards and automatic alerts.",
    iconName: "Activity",
    points: [
      "Analyze external audience sentiment metrics and trend patterns",
      "Identify internal performance drops and critical pipeline blocks",
      "Receive automated emergency notifications and trigger auto-remediation"
    ]
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "kamala-clinic",
    title: "Clinical Management Software",
    client: "Kamala Homoeo Clinic",
    location: "Nityananda, Bajali",
    category: "Medical ERP",
    description: "Engineered a comprehensive patient registration and medical record interface designed to eliminate manual paper registers, speed up prescription retrieval, and manage clinic logistics securely.",
    impactMetrics: [
      { label: "Prescription Access Time", value: "< 2 Secs" },
      { label: "Paper Filing Reduction", value: "100%" },
      { label: "Daily Patient Throughput", value: "+45%" }
    ],
    keyFeatures: [
      "Unified Electronic Patient Directory",
      "Speed-optimized Homoeopathic Remedy Indexer",
      "Secure Digital Prescription Generator",
      "Archival Backup & Patient History Retrieve Engine"
    ],
    interfaceMockup: {
      screenTitle: "Kamala Clinic Clinical Portal v2.4",
      stats: [
        { label: "Active Registrations", value: "4,821 Patients", trend: "+12% this month" },
        { label: "Prescriptions Dispensed Today", value: "84 Recs" },
        { label: "DB Latency Sync", value: "12ms", trend: "Optimal" }
      ],
      recentActivity: [
        "Patient #4019 checked in (Dr. Retr. Complete)",
        "Database backup finalized (Cloud Vault Alpha)",
        "New Prescription printed for Patient #3920"
      ]
    }
  },
  {
    id: "jkc-billing",
    title: "Automated Billing Software",
    client: "JKC Pvt. Limited",
    location: "Guwahati, Assam",
    category: "Financial Engine",
    description: "Developed a robust, high-precision billing and invoice generation platform to streamline dynamic pricing models, automate multi-state taxation calculations, and generate immediate digital ledgers.",
    impactMetrics: [
      { label: "Billing Calculation Accuracy", value: "100%" },
      { label: "Invoice Despatch Delay", value: "0 Mins" },
      { label: "Accounting Sync Errors", value: "0.0%" }
    ],
    keyFeatures: [
      "Automated PDF Invoice Compilation",
      "Flexible Dynamic Pricing & Rebate Calculators",
      "Compliance-Ready Taxation Auto-Rules",
      "Instant Operational Ledger Exports"
    ],
    interfaceMockup: {
      screenTitle: "JKC Ledger & Invoice Core v3.1",
      stats: [
        { label: "Processed Capital Today", value: "₹4,85,200", trend: "Balanced" },
        { label: "Invoices Auto-Generated", value: "156 Docs" },
        { label: "Tax Filing Alignment", value: "Fully Compliant" }
      ],
      recentActivity: [
        "Invoice #JKC-2026-0842 dispatched to Client (Sync)",
        "Tax reconciliation protocol completed successfully",
        "Export format generated (XLSX / CSV relational)"
      ]
    }
  },
  {
    id: "sangya-academy",
    title: "Institutional Management Software",
    client: "Sangya-Kalaguru Academy",
    location: "Nityananda, Bajali",
    category: "Academic System",
    description: "Delivered a scalable school management solution to streamline academic administration, manage student/teacher records, handle institutional ledgers, and automate grade tracking.",
    impactMetrics: [
      { label: "Admin Overhead Saved", value: "28 Hrs/Wk" },
      { label: "Grade Computation Speed", value: "Instant" },
      { label: "Stakeholder Engagement", value: "98.4%" }
    ],
    keyFeatures: [
      "Academic Database with Identity Isolation",
      "Automated Fee Ledgering & Due Notification System",
      "Continuous Academic Grading Computation Engine",
      "Teacher Workload & Allocation Planner"
    ],
    interfaceMockup: {
      screenTitle: "Sangya-Kalaguru Unified Academic Hub",
      stats: [
        { label: "Enrolled Cohort", value: "1,240 Students", trend: "+8% Annual" },
        { label: "Pending Term Fees Handled", value: "94.2% Cleared" },
        { label: "Teacher Logs Verified", value: "32/32 Active" }
      ],
      recentActivity: [
        "Report Cards generated for Class X Term A",
        "Fee auto-reminders dispatched via Gateway Protocol",
        "Student record database audited for 2026 Term"
      ]
    }
  },
  {
    id: "bavanya-water",
    title: "Operational Data Handling & Analysis Software",
    client: "Bavanya Water Solution",
    location: "Guwahati, Assam",
    category: "Industrial IoT / Data",
    description: "Built high-capacity data entry, log tracking, and real-time operational analysis software to enhance resource allocation, logistical dispatch speed, and asset tracking metrics.",
    impactMetrics: [
      { label: "Resource Waste Reduced", value: "38%" },
      { label: "Log Retrieval Time", value: "0.2 Secs" },
      { label: "Operational Transparency", value: "99.8%" }
    ],
    keyFeatures: [
      "Log Entry Matrices with Zero Latency",
      "Asset Tracking & Maintenance Schedule Monitor",
      "Discrepancy Alarm & Anomaly Auto-Detect",
      "Industrial Analytics Trend Dashboards"
    ],
    interfaceMockup: {
      screenTitle: "Bavanya Asset and Resource Monitor v1.8",
      stats: [
        { label: "Daily Distribution Vol", value: "480K Litres", trend: "Optimal Rate" },
        { label: "Active Dispatch Vehicles", value: "18 Units" },
        { label: "System Operational Integrity", value: "99.98%" }
      ],
      recentActivity: [
        "System flow rate checked: 420 L/min (Balanced)",
        "Scheduled maintenance logged for Tank Cluster B",
        "Real-time operational metrics synced with Main HQ"
      ]
    }
  }
];

export const CONTACT_INFO = {
  address: "Pathsala, District: Bajali, Pin no: 781325, City: Pathsala, Assam, India",
  numbers: ["+91 9365017343", "+91 7099415658"],
  email: "axioscript@gmail.com",
  workingHours: "Monday - Saturday: 09:00 AM - 07:00 PM IST"
};
