import React, { useState, useRef } from "react";
import {
  Building2,
  Globe2,
  Landmark,
  Briefcase,
  ShoppingCart,
  Truck,
  ArrowLeftRight,
  Stethoscope,
  Factory,
  Crown,
  CheckCircle2,
  ArrowRight,
  LayoutGrid,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UseCase {
  title: string;
  platform: string;
  description: string;
  benefit: string;
}

interface SubVertical {
  title: string;
  description: string;
  useCases: UseCase[];
}

interface Vertical {
  id: string;
  icon: React.ElementType;
  title: string;
  theme: string;
  challenge: string;
  useCases: UseCase[];
  subVerticals?: SubVertical[];
}

const verticalsData: Vertical[] = [
  {
    id: "banking",
    icon: Landmark,
    title: "Banking & Financial Services",
    theme: "Intelligent, compliant, and hyper-efficient financial operations",
    challenge: "Banks, NBFCs, and fintechs must balance speed, security, and regulatory rigor in an era of digital finance and global capital flows.",
    useCases: [
      {
        title: "AI-Powered Loan & Facility Agreement Review",
        platform: "DeepFlow™",
        description: "Instantly analyze credit agreements, security documents, and covenants",
        benefit: "Reduce legal review from 5 days to 2 hours",
      },
      {
        title: "Real-Time Cross-Border Payment Compliance",
        platform: "BorderFlow™",
        description: "Validate transactions against FEMA (India), OFAC, EU sanctions, and repatriation rules",
        benefit: "Eliminate payment delays and compliance breaches",
      },
      {
        title: "Automated Regulatory Change Monitoring",
        platform: "GRC Sentinel™",
        description: "Track updates from RBI, Basel III, FATF, and SEBI; auto-assess impact",
        benefit: "Avoid ₹100Cr+ fines through proactive adaptation",
      },
      {
        title: "Secure Data Exchange with Regulators",
        platform: "InsightForge™",
        description: "Push/pull KYC, transaction logs, and audit reports via encrypted APIs",
        benefit: "Seamless regulatory reporting with full auditability",
      },
    ],
    subVerticals: [
      {
        title: "EPC Contractors & Financial Ops",
        description: "Managing billion-dollar infrastructure projects with multi-currency flows.",
        useCases: [
          {
            title: "Subcontractor Risk Intelligence",
            platform: "DeepFlow™",
            description: "Scans 10,000+ subcontracts for liability caps and penalties",
            benefit: "Prevent cost overruns & standardize terms",
          },
          {
            title: "Cross-Border Contractor Payouts",
            platform: "BorderFlow™",
            description: "Ensures disbursements comply with FEMA and tax treaties",
            benefit: "Zero compliance penalties & fast settlements",
          },
          {
            title: "Invoice & Milestone Validation",
            platform: "Pixel-to-Profit™",
            description: "Digitizes scanned completion certificates for ERP reconciliation",
            benefit: "Accelerate payment cycles & reduce fraud",
          },
        ],
      },
      {
        title: "Mergers & Acquisitions (M&A)",
        description: "Accelerate due diligence while uncovering hidden liabilities.",
        useCases: [
          {
            title: "VDR Contract Triage",
            platform: "DeepFlow™",
            description: "Analyzes 10,000+ agreements for change-of-control and risks",
            benefit: "Cut deal timeline by 40%",
          },
          {
            title: "Regulatory Risk Mapping",
            platform: "GRC Sentinel™",
            description: "Identifies non-compliance in data privacy and permits",
            benefit: "Avoid acquiring hidden compliance liabilities",
          },
          {
            title: "Post-Merger Playbook Harmonization",
            platform: "AgenticAI™",
            description: "Automates novation workflows and clause standardization",
            benefit: "Day-1 readiness & standardized ops",
          },
        ],
      },
      {
        title: "Corporate Restructuring",
        description: "Navigate complex reorganizations under IBC or Chapter 11.",
        useCases: [
          {
            title: "Creditor Agreement Classification",
            platform: "DeepFlow™",
            description: "Categorizes debt instruments by seniority and triggers",
            benefit: "Accelerate consensus building",
          },
          {
            title: "Asset Transfer Validation",
            platform: "BorderFlow™",
            description: "Verifies cross-border asset sales under local regulations",
            benefit: "Legally compliant asset liquidation",
          },
          {
            title: "Stakeholder Communication",
            platform: "AgenticAI™",
            description: "Drafts NCLT filings, creditor notices, and plans",
            benefit: "Reduce procedural delays & litigation risk",
          },
        ],
      },
    ],
  },
  {
    id: "sez",
    icon: Globe2,
    title: "SEZ & Free Trade Zones",
    theme: "Frictionless trade, investment, and compliance",
    challenge: "SEZ authorities and units need seamless cross-border movement of goods, capital, and contracts—without regulatory friction.",
    useCases: [
      {
        title: "Automated SEZ Unit Agreement Management",
        platform: "DeepFlow™",
        description: "Review lease deeds, MOUs, and performance bank guarantees for DTA/SEZ compliance",
        benefit: "Ensure 100% adherence to SEZ Act",
      },
      {
        title: "Cross-Border Escrow for Export Proceeds",
        platform: "BorderFlow™",
        description: "Automate escrow release upon verified shipping document upload via blockchain triggers",
        benefit: "Faster fund repatriation",
      },
      {
        title: "Unit Compliance Monitoring",
        platform: "GRC Sentinel™",
        description: "Track DTA sales limits, export obligations, and labor norms in real time",
        benefit: "Avoid de-notification of SEZ units",
      },
      {
        title: "Immutable Trade Documentation",
        platform: "InsightForge™",
        description: "Store shipping, customs, and tax docs in tamper-proof repositories linked to GSTN",
        benefit: "Instant audit readiness",
      },
    ],
  },
  {
    id: "corporates",
    icon: Building2,
    title: "Large Corporates",
    theme: "Enterprise-wide governance and intelligent contract operations",
    challenge: "Multinational groups face fragmented systems, regulatory complexity, and supplier risk across dozens of subsidiaries.",
    useCases: [
      {
        title: "Group-Wide GRC Command Center",
        platform: "GRC Sentinel™",
        description: "Unified dashboard for policy adherence, whistleblower alerts, and ESG disclosures",
        benefit: "Single pane of glass for risk oversight",
      },
      {
        title: "Vendor Contract Portfolio Mgmt",
        platform: "DeepFlow™ + AgenticAI™",
        description: "Auto-review 50,000+ vendor agreements; agents track renewal dates and SLAs",
        benefit: "Reduce tail spend leakage by 15–25%",
      },
      {
        title: "Secure Inter-Entity Data Exchange",
        platform: "InsightForge™",
        description: "Sync master data, invoices, and compliance certs between group companies",
        benefit: "Eliminate reconciliation errors",
      },
      {
        title: "Blockchain-Audited Treasury Ops",
        platform: "Blockchain Data Rooms",
        description: "Immutable record of intercompany loans, FX hedges, and dividend approvals",
        benefit: "Streamline statutory audits",
      },
    ],
  },
  {
    id: "advisory",
    icon: Briefcase,
    title: "Advisory Services",
    theme: "From advisory to embedded intelligence",
    challenge: "Law firms, Big 4, and management consultants are transforming into tech-enabled strategic partners.",
    useCases: [
      {
        title: "High-Velocity Client Contract Review",
        platform: "DeepFlow™",
        description: "Deliver same-day analysis of client NDAs, JVs, and licensing deals",
        benefit: "Increase billable throughput by 3x",
      },
      {
        title: "Regulatory Readiness Assessments",
        platform: "GRC Sentinel™",
        description: "Offer clients automated gap analysis against GDPR, DPDP Act",
        benefit: "New compliance-as-a-service revenue",
      },
      {
        title: "Secure Client Data Collaboration",
        platform: "Blockchain Data Rooms",
        description: "Share sensitive findings with clients via permissioned repositories",
        benefit: "Reduce data breach liability",
      },
    ],
  },
  {
    id: "marketplaces",
    icon: ShoppingCart,
    title: "B2B Marketplaces",
    theme: "Trust, automation, and global scale",
    challenge: "Platforms connecting buyers and sellers across borders need embedded compliance, payments, and contract intelligence.",
    useCases: [
      {
        title: "Auto-Generated Marketplace Terms",
        platform: "DeepFlow™",
        description: "Dynamically create jurisdiction-aware T&Cs and seller agreements",
        benefit: "Reduce legal overhead for scaling",
      },
      {
        title: "Cross-Border Escrow with Smart Triggers",
        platform: "BorderFlow™",
        description: "Release funds only when shipping docs are validated by OCR",
        benefit: "Build trust without manual intervention",
      },
      {
        title: "Seller KYC & Onboarding at Scale",
        platform: "Pixel-to-Profit™",
        description: "Digitize GSTIN, PAN, bank proofs; validate against AML lists",
        benefit: "Onboard 10,000 sellers in days",
      },
    ],
  },
  {
    id: "logistics",
    icon: Truck,
    title: "Logistics & Shipping",
    theme: "Visibility, compliance, and automation",
    challenge: "Freight forwarders, shipping lines, and 3PLs manage complex documentation, customs, and payment flows.",
    useCases: [
      {
        title: "AI-Powered Bill of Lading Processing",
        platform: "Pixel-to-Profit™",
        description: "Extract consignee, vessel, HS code from scanned docs—even handwritten",
        benefit: "Cut customs clearance time by 70%",
      },
      {
        title: "Smart Contract Freight Agreements",
        platform: "DeepFlow™",
        description: "Auto-execute demurrage penalties or rebate clauses based on IoT/port data",
        benefit: "Reduce disputes and manual invoicing",
      },
      {
        title: "Payment Switch with Compliance",
        platform: "BorderFlow™",
        description: "Route carrier payments via compliant corridors with real-time screening",
        benefit: "Ensure on-time payouts",
      },
    ],
  },
  {
    id: "cross-border",
    icon: ArrowLeftRight,
    title: "Cross-Border Business",
    theme: "Seamless global commerce with built-in compliance",
    challenge: "SMEs and exporters expanding internationally face documentation, payment, and legal complexity.",
    useCases: [
      {
        title: "Multilingual Int'l Sales Contracts",
        platform: "DeepFlow™",
        description: "Generate INCOTERMS-aware agreements in English, Spanish, Arabic, etc.",
        benefit: "Close deals faster without local counsel",
      },
      {
        title: "FX-Optimized Payments",
        platform: "BorderFlow™",
        description: "Recommend lowest-cost, compliant payment rails based on corridor rules",
        benefit: "Save 2–5% on transaction costs",
      },
      {
        title: "Automated Export Documentation",
        platform: "Pixel-to-Profit™",
        description: "Turn commercial invoices into GST e-invoices, Peppol XML, or Fatoora files",
        benefit: "100% e-invoicing compliance",
      },
    ],
  },
  {
    id: "pharma",
    icon: Stethoscope,
    title: "Pharmaceuticals",
    theme: "Securing innovation, compliance, and patient trust",
    challenge: "Pharma companies operate under intense scrutiny—from clinical trials to cold-chain logistics.",
    useCases: [
      {
        title: "Clinical Trial Agreement Analysis",
        platform: "DeepFlow™",
        description: "Extract indemnity, IP ownership, and insurance clauses",
        benefit: "Accelerate trial startup by 50%",
      },
      {
        title: "Regulatory Submission Management",
        platform: "InsightForge™",
        description: "Submit immutable, timestamped dossiers to FDA, EMA with full audit trail",
        benefit: "Faster drug approvals",
      },
      {
        title: "Supply Chain Integrity Tracking",
        platform: "Blockchain Data Rooms",
        description: "Verify temperature logs and authenticity for vaccines/biologics",
        benefit: "Prevent counterfeit infiltration",
      },
      {
        title: "Research Partner Due Diligence",
        platform: "GRC Sentinel™",
        description: "Screen CROs and labs against global sanctions and ethics records",
        benefit: "Protect brand reputation",
      },
      {
        title: "Intellectual Property Security",
        platform: "Blockchain Data Rooms",
        description: "Register patents and formulas on tamper-proof ledgers",
        benefit: "Enforceable IP rights",
      },
    ],
  },
  {
    id: "manufacturing",
    icon: Factory,
    title: "Manufacturing",
    theme: "Intelligent supply chains and capital efficiency",
    challenge: "From automotive to electronics, manufacturers need resilient, compliant, and agile operations.",
    useCases: [
      {
        title: "Supplier Risk Intelligence",
        platform: "DeepFlow™ + GRC Sentinel™",
        description: "Monitor 10,000+ supplier contracts for force majeure and ESG clauses",
        benefit: "Avoid production halts",
      },
      {
        title: "Import/Export Doc Automation",
        platform: "Pixel-to-Profit™",
        description: "Process BoL, CoO, and invoices; auto-validate against customs rules",
        benefit: "Clear shipments in hours",
      },
      {
        title: "ESG & BRSR Reporting",
        platform: "GRC Sentinel™",
        description: "Aggregate emissions, waste, and labor data; auto-generate reports",
        benefit: "Meet investor mandates effortlessly",
      },
      {
        title: "Secure Global Vendor Payments",
        platform: "BorderFlow™",
        description: "Automate compliant cross-border payments to component suppliers",
        benefit: "Optimize working capital and FX costs",
      },
    ],
  },
  {
    id: "gcc",
    icon: Crown,
    title: "GCC & Sovereign Wealth",
    theme: "Strategic investments with zero-risk tolerance",
    challenge: "Government-related entities and SWFs manage high-value assets across jurisdictions with zero tolerance for risk.",
    useCases: [
      {
        title: "Portfolio Company GRC Oversight",
        platform: "GRC Sentinel™",
        description: "Monitor investee companies for anti-bribery, sanctions, and ESG compliance",
        benefit: "Protect national reputation",
      },
      {
        title: "Cross-Border Investment Docs",
        platform: "DeepFlow™",
        description: "Securely store SPAs and shareholder agreements with immutable version control",
        benefit: "Streamline audits",
      },
      {
        title: "Trusted Regulatory Data Exchange",
        platform: "InsightForge™",
        description: "Share anonymized portfolio data with IMF or central banks via secure APIs",
        benefit: "Demonstrate transparency securely",
      },
      {
        title: "AI-Driven Due Diligence",
        platform: "AgenticAI™",
        description: "Autonomous agents scan news and filings on acquisition targets",
        benefit: "Uncover reputational risks pre-investment",
      },
    ],
  },
];

const UseCaseCard = ({ useCase }: { useCase: UseCase }) => (
  <div className="bg-card/40 backdrop-blur-sm rounded-xl p-5 border border-white/5 hover:border-primary/40 hover:bg-card/60 transition-all duration-300 group h-full flex flex-col justify-between">
    <div>
      <div className="flex items-start justify-between gap-4 mb-3">
        <h4 className="font-bold text-foreground text-sm md:text-base leading-tight group-hover:text-primary transition-colors">
          {useCase.title}
        </h4>
      </div>
      
      <div className="mb-4">
         <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-1 rounded-sm border border-primary/20">
          {useCase.platform}
        </span>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {useCase.description}
      </p>
    </div>
    
    <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-emerald-500 pt-4 border-t border-white/5">
      <CheckCircle2 size={16} className="shrink-0" />
      <span>{useCase.benefit}</span>
    </div>
  </div>
);

const IndustryDomains: React.FC = () => {
  const [activeTab, setActiveTab] = useState(verticalsData[0].id);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeVertical = verticalsData.find(v => v.id === activeTab) || verticalsData[0];

  const handleVerticalChange = (id: string, index: number) => {
    setActiveTab(id);
    
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const buttons = container.querySelectorAll('button');
      if (buttons[index]) {
        const button = buttons[index] as HTMLElement;
        button.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  };

  return (
    <section id="verticals" className="py-24 bg-gradient-to-b from-background via-background/95 to-primary/5 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
              DeepTrust Verticals
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent mb-6">
            Industries We Serve
          </h2>
        </div>

        {/* Tabs Layout */}
        <div className="flex flex-col gap-10">
          
          {/* Top Navigation - Horizontal Scroll */}
          <div className="sticky top-20 z-30 bg-background/80 backdrop-blur-xl py-4 border-b border-white/10 -mx-4 px-4 md:mx-0 md:px-0 md:border-none md:bg-transparent">
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto pb-2 gap-3 no-scrollbar scroll-smooth px-1"
            >
              {verticalsData.map((vertical, index) => (
                <button
                  key={vertical.id}
                  onClick={() => handleVerticalChange(vertical.id, index)}
                  className={cn(
                    "flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300 whitespace-nowrap shrink-0 font-medium text-sm",
                    activeTab === vertical.id 
                      ? "bg-primary text-primary-foreground border-primary shadow-[0_0_20px_rgba(var(--primary),0.3)] scale-105" 
                      : "bg-card border-border hover:border-primary/50 hover:bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  <vertical.icon size={16} />
                  <span>{vertical.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Panel */}
          <div className="min-h-[500px]">
            <div 
              key={activeVertical.id}
              className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-12 shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-500"
            >
              {/* Vertical Header */}
              <div className="max-w-4xl mx-auto mb-12 text-center border-b border-white/10 pb-8">
                <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
                  {activeVertical.title}
                </h3>
                <p className="text-xl md:text-2xl text-primary/90 font-medium italic">
                  "{activeVertical.theme}"
                </p>
              </div>

              {/* Core Use Cases Grid */}
              <div className="max-w-7xl mx-auto space-y-16">
                {/* Main Vertical Use Cases */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
                  {activeVertical.useCases.map((useCase, idx) => (
                    <UseCaseCard key={idx} useCase={useCase} />
                  ))}
                </div>

                {/* Sub-Verticals Sections */}
                {activeVertical.subVerticals?.map((sub, sIdx) => (
                  <div key={sIdx} className="pt-8 border-t border-white/10">
                     <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
                        <div className="h-8 w-1.5 rounded-full bg-primary" />
                        <h4 className="text-2xl md:text-3xl font-bold text-foreground">
                          {sub.title}
                        </h4>
                     </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {sub.useCases.map((useCase, uIdx) => (
                        <UseCaseCard key={uIdx} useCase={useCase} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryDomains;
