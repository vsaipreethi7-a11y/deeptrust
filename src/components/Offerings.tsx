import React, { useState, useEffect } from "react";

interface OfferingProps {
  title: string;
  challenge: string;
  offering: string;
  outcomes: string;
  customerProfile: string;
}

const enterprisesData: OfferingProps[] = [
  {
    title: "AI-Driven Personalized Advisory",
    challenge: "Tailoring personalized financial/business plans across complex, multi-jurisdictional regulations",
    offering: "AI LLMs with GT Stack APIs for global finance, compliance, and GRC; agentic workflows with knowledge graphs",
    outcomes: "Globally compliant, up-to-date advice; increased operational agility; enhanced trust and client retention",
    customerProfile: "Large & Medium Enterprises, VCs, Advisory Firms, Multinationals with multi-country operations",
  },
  {
    title: "Automated Data Analysis & Reporting",
    challenge: "High complexity and risk in manual compliance reporting and cross-domain audits",
    offering: "Automated AI analytics integrated with GT Stack finance, compliance, and GRC APIs; workflows automate validation and reporting",
    outcomes: "Faster, accurate, audit-ready reports; streamlined compliance; reduced manual effort",
    customerProfile: "SEZs, Export Houses, Large Enterprises requiring multi-regulatory reporting",
  },
  {
    title: "Agentic AI Workflow Automation",
    challenge: "Complex onboarding, due diligence, and compliance workflows across domains and jurisdictions",
    offering: "Agentic AI workflows integrated with GT Stack global GRC APIs to automate onboarding, KYC, approvals, risk assessments",
    outcomes: "Efficient operations; lower compliance risk; improved audit readiness and transparency",
    customerProfile: "Advisory Services, Multinational Enterprises, Export Houses",
  },
  {
    title: "Predictive Analytics & Market Insights",
    challenge: "Fragmentation of market and compliance data hinders timely and accurate forecasting",
    offering: "LLMs combined with GT Stack APIs and knowledge graphs for integrated market, risk, and regulatory forecasts",
    outcomes: "Proactive risk management; better decision accuracy; enhanced portfolio resilience",
    customerProfile: "VCs, Large Enterprises with global market exposure",
  },
  {
    title: "Enhanced Risk Management & Fraud Detection",
    challenge: "Managing multi-domain, multi-jurisdictional risk and fraud remains challenging",
    offering: "Continuous AI-powered monitoring via GT Stack GRC APIs and agentic workflows, with visualization from knowledge graphs",
    outcomes: "Real-time anomaly detection; improved mitigation; tighter regulatory compliance",
    customerProfile: "Multinationals, Large Enterprises, Export Houses managing multi-risk environments",
  },
  {
    title: "Virtual Financial Assistants",
    challenge: "Limited 24/7 multilingual, multi-jurisdictional client support",
    offering: "LLM-powered chatbots leveraging GT Stack APIs for compliant, contextual responses; agentic workflows manage escalations",
    outcomes: "Enhanced client engagement; reduced operational cost; improved service consistency",
    customerProfile: "Advisory Firms, SEZs, Export Houses requiring global client support",
  },
  {
    title: "Custom AI Models for Domain-Specific Advisory",
    challenge: "Constantly evolving, complex sector-specific regulations",
    offering: "Fine-tuned AI models integrated with GT Stack domain-specific regulatory and GRC APIs; lifecycle management with agentic workflows",
    outcomes: "Highly accurate, compliant advice tailored by sector; adaptable to regulation changes",
    customerProfile: "VCs, Sector-focused Advisory Services, Large Enterprises requiring niche regulatory compliance",
  },
  {
    title: "Hybrid Human-AI Collaboration Platforms",
    challenge: "Ensuring compliance while combining AI efficiency with human expertise",
    offering: "AI-human collaborative platforms using GT Stack compliance APIs; agentic workflows facilitate seamless interaction and validation",
    outcomes: "Improved advisory quality; enhanced compliance confidence; better productivity",
    customerProfile: "Large & Medium Enterprises, Advisory Firms, Multinationals balancing automation and expert oversight",
  },
  {
    title: "Continuous Learning & Adaptation",
    challenge: "Fast-moving regulatory landscapes challenge static AI advisory models",
    offering: "Self-adaptive AI agents ingesting GT Stack API updates and DataOps pipelines; workflows integrate feedback loops",
    outcomes: "Consistently current, compliant AI advice; reduced manual update burden",
    customerProfile: "All enterprise clients in regulated industries requiring ongoing compliance agility",
  },
  {
    title: "Comprehensive Client 360 View",
    challenge: "Disparate data sources hamper full client risk and compliance visibility",
    offering: "Integrated client profiles via GT Stack APIs; agentic workflows update and alert on compliance and risk events; knowledge graph insights",
    outcomes: "Unified, actionable client intelligence; enhanced risk management and compliance oversight",
    customerProfile: "VCs, Advisory Firms, Large Enterprises, Multinationals managing complex cross-border client portfolios",
  },
];

const banksDataArr: OfferingProps[] = [
  {
    title: "AI-Driven Global Regulatory Advisory",
    challenge: "Navigating diverse and evolving banking regulations across multiple jurisdictions",
    offering: "AI LLMs integrated with GT Stack global regulatory and GRC compliance APIs offering real-time, jurisdiction-specific advisory support",
    outcomes: "Accurate, continuously updated compliance advice reducing regulatory penalties; enhanced global risk management",
    customerProfile: "Multinational banks operating across multiple regulatory regimes",
  },
  {
    title: "Automated Regulatory Reporting & Audit",
    challenge: "Complex reporting requirements with high risk of error and audit failure",
    offering: "End-to-end automated regulatory reporting powered by AI and GT Stack APIs consolidating cross-border data with audit trails",
    outcomes: "Reduced manual effort; improved accuracy and timeliness of regulatory reports; smoother audit processes",
    customerProfile: "Large international banks and financial institutions",
  },
  {
    title: "Agentic Workflow Automation for Banking",
    challenge: "Complex client onboarding, KYC/AML compliance, and cross-border transaction monitoring",
    offering: "Agentic AI workflows integrated with GT Stack APIs automating onboarding, KYC, AML screenings, and sanction checks",
    outcomes: "Faster onboarding; enhanced compliance; reduced operational risk",
    customerProfile: "Multinational banks, especially with global retail and corporate client bases",
  },
  {
    title: "Predictive Risk & Fraud Analytics",
    challenge: "Increasing sophistication of fraud and risk in global banking operations",
    offering: "AI-powered predictive analytics combined with GT Stack risk/GRC APIs and global knowledge graphs for real-time fraud/risk detection",
    outcomes: "Proactive fraud prevention; reduced losses; improved risk mitigation and operational resilience",
    customerProfile: "Banks with multinational transaction flows and high-value portfolios",
  },
  {
    title: "Cross-Border Due Diligence & Compliance",
    challenge: "Managing due diligence over multi-jurisdictional clients, partners, and vendors",
    offering: "Multi-domain due diligence APIs from GT Stack with AI agentic workflows for continuous compliance and risk scoring",
    outcomes: "Comprehensive risk oversight for global banking relationships; enhanced compliance efficiency",
    customerProfile: "Banks dealing with cross-border trade finance, syndications, and correspondent banking",
  },
  {
    title: "Virtual Banking Compliance Assistants",
    challenge: "Handling multilingual, multi-jurisdictional client inquiries and compliance guidance",
    offering: "LLM-driven virtual assistants integrated with global GT Stack compliance APIs supporting complex query resolution and escalation",
    outcomes: "24/7 compliant client support; reduced operational workload; higher client satisfaction",
    customerProfile: "Banks offering global digital banking services",
  },
  {
    title: "Customized AI Models for Banking Verticals",
    challenge: "Complex banking verticals like investment banking, wealth management, and treasury",
    offering: "Fine-tuned AI advisory models leveraging GT Stack financial and regulatory APIs specialized for banking verticals",
    outcomes: "Domain-specific compliance and advisory accuracy; adaptable to evolving regulations",
    customerProfile: "Global banks with diverse banking service verticals",
  },
  {
    title: "Hybrid Human-AI Collaboration Platform",
    challenge: "Balancing expert human judgment and AI efficiency while navigating global compliance",
    offering: "Collaboration framework using GT Stack data and compliance APIs; agentic workflows for structured handoff and validation",
    outcomes: "Enhanced decision-making; faster responses; improved compliance assurance",
    customerProfile: "Decision-makers and compliance teams in large multinational banks",
  },
  {
    title: "Continuous Learning for Dynamic Banking",
    challenge: "Keeping pace with rapid regulatory, market, and geopolitical changes impacting banking",
    offering: "Self-learning AI agents integrated with real-time GT Stack API data feeds and DataOps for dynamic AI model updates",
    outcomes: "Up-to-date, compliant advisory; reduced lag in regulatory response; improved adaptive risk management",
    customerProfile: "Banks requiring agile responses to global financial and regulatory changes",
  },
  {
    title: "Comprehensive Client Risk & Compliance View",
    challenge: "Fragmented, disparate client and transaction data across geographies",
    offering: "Unified client 360° profiling with GT Stack APIs and agentic workflows; knowledge graphs reveal interconnected risks and compliance",
    outcomes: "Consolidated risk view; improved cross-border compliance tracking; enhanced client insights",
    customerProfile: "Relationship managers, risk and compliance officers in multinational banking groups",
  },
];

const sezDataArr: OfferingProps[] = [
  {
    title: "AI-Powered Regulatory Compliance Navigator",
    challenge: "Navigating overlapping local and international regulatory frameworks impacting SEZ operations",
    offering: "AI LLM integrated with GT Stack global and local regulatory APIs offering dynamic, jurisdiction-specific compliance guidance",
    outcomes: "Real-time, accurate compliance advice reducing penalties and operational risks; effortless regulatory adherence",
    customerProfile: "SEZ Authorities, Free Trade Zone Operators, Businesses operating across multiple regulatory regimes",
  },
  {
    title: "Automated Cross-Border Compliance Reporting",
    challenge: "Complex multi-nation reporting obligations and audit requirements",
    offering: "End-to-end automated data capture and reporting powered by AI and GT Stack APIs for generating multi-jurisdictional regulatory reports",
    outcomes: "Reduced manual effort; increased report accuracy; timely audit-ready documentation",
    customerProfile: "Export Houses, Manufacturers, Service Providers in SEZs managing cross-border trade",
  },
  {
    title: "Agentic Workflow Automation for SEZ Operations",
    challenge: "Inefficient and non-compliant workflows for customs, licensing, and approvals",
    offering: "AI-driven agentic workflows automating customs clearances, licensing, KYC, and multi-agency approvals using GT Stack compliance APIs",
    outcomes: "Streamlined operations; reduced delays; enhanced audit trails and regulatory adherence",
    customerProfile: "SEZ Operators, Enterprise Tenants, Regulatory Authorities",
  },
  {
    title: "Predictive Analytics for Customs & Trade Risks",
    challenge: "Forecasting risks related to customs delays, tariffs, and sanctions in multiple jurisdictions",
    offering: "LLMs combined with GT Stack trade, customs, and risk APIs providing predictive insights and scenario planning",
    outcomes: "Proactive risk mitigation; optimized inventory and supply chain decisions; reduced financial exposures",
    customerProfile: "Large Export Houses, Multinational Manufacturers, Logistics & Trade Services in SEZs",
  },
  {
    title: "Enhanced Fraud & Risk Monitoring",
    challenge: "Sophisticated fraud, compliance breaches across diverse regulatory domains",
    offering: "Continuous AI monitoring leveraging GT Stack GRC APIs and agentic workflows for cross-domain, real-time fraud detection",
    outcomes: "Improved fraud detection sensitivity; faster incident response; minimized operational disruptions",
    customerProfile: "Enterprises and Authorities within SEZs with high transaction volumes",
  },
  {
    title: "Virtual Compliance Assistants",
    challenge: "Handling multilingual, region-specific regulatory inquiries and guidance",
    offering: "LLM-powered virtual assistants integrated with GT Stack SEZ regulatory data APIs, handling escalations with agentic workflow support",
    outcomes: "24/7 intelligent support; increased regulatory adherence; lower operational costs",
    customerProfile: "SEZ Tenants, Regulatory Advisors, Export Houses",
  },
  {
    title: "Custom AI Models for Sector-Specific Regulations",
    challenge: "Adapting to highly specific SEZ regulations by industry sector",
    offering: "Fine-tuned AI models connected to GT Stack multi-domain regulatory APIs specific to sectors like manufacturing, logistics, IT",
    outcomes: "Accurate, compliant advisory tailored by sector and zone; faster regulatory updates",
    customerProfile: "Sector-diverse enterprises in SEZs and Free Trade Zones",
  },
  {
    title: "Hybrid Human-AI Compliance Collaboration",
    challenge: "Combining human expertise and AI recommendations for complex SEZ compliance scenarios",
    offering: "AI-human collaboration platforms leveraging GT Stack compliance data and agentic workflows for decision validation",
    outcomes: "Balanced, risk-aware compliance decisions; enhanced operational efficiency",
    customerProfile: "SEZ Management, Compliance Teams, Advisory Services",
  },
  {
    title: "Continuous Regulatory Learning & Adaptation",
    challenge: "Keeping pace with rapidly changing local and international SEZ regulations",
    offering: "Self-learning AI agents updating through GT Stack API regulatory feeds and DataOps; workflows for continuous compliance updates",
    outcomes: "Adaptive, current advisory outputs; reduced regulatory risk",
    customerProfile: "SEZ Operators and enterprises facing frequent regulatory changes",
  },
  {
    title: "Comprehensive SEZ Tenant & Transaction View",
    challenge: "Fragmented data on tenants' regulatory and trade activities across jurisdictions",
    offering: "Unified tenant and transaction profiles via GT Stack APIs; agentic workflows update compliance status with knowledge graph insights",
    outcomes: "Holistic risk and compliance views; proactive issue resolution; enhanced SEZ governance",
    customerProfile: "SEZ Authorities, Export Houses, Multinational Tenants managing complex compliance environments",
  },
];

const Offerings: React.FC = () => {
  const [segment, setSegment] = useState<"enterprises" | "banks" | "sez">("enterprises");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const getCurrentData = () => {
    switch (segment) {
      case "banks":
        return banksDataArr;
      case "sez":
        return sezDataArr;
      default:
        return enterprisesData;
    }
  };

  const data = getCurrentData();
  const selected = data[selectedIndex] || data[0];

  useEffect(() => {
    setSelectedIndex(0);
  }, [segment]);

  return (
    <section id="offerings" className="py-24 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 2xl:px-6 max-w-[1400px]">
        
        {/* Segment Tabs */}
        <div className="flex justify-center gap-3 xl:gap-4 mb-12 flex-wrap">
          {[
            { key: "enterprises", label: "Global Enterprises", fullLabel: "For Global Enterprises", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
            { key: "banks", label: "MNC Banks", fullLabel: "For MNC Banks", icon: "M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" },
            { key: "sez", label: "SEZ/FTZ", fullLabel: "For SEZ/Free Trade Zone", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setSegment(key as any)}
              className={`px-8 xl:px-10 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 text-base xl:text-lg ${
                segment === key
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-card/50 text-muted-foreground hover:bg-card border border-border/50 hover:border-primary/50"
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
              </svg>
              {label}
            </button>
          ))}
        </div>

        {/* Segment Title */}
        <div className="text-center mb-10">
          <h3 className="text-3xl md:text-4xl xl:text-5xl font-bold text-primary mb-2">
            {segment === "enterprises" && "For Global Enterprises"}
            {segment === "banks" && "For MNC Banks"}
            {segment === "sez" && "For SEZ/Free Trade Zone"}
          </h3>
        </div>

        {/* Selected Title Display */}
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-semibold">
            {selected.title}
          </h3>
        </div>

        {/* Content Display */}
        <div className="rounded-2xl p-8 xl:p-10 mb-8">
          <div className="grid md:grid-cols-2 gap-5 xl:gap-6">
            {[
              { label: "Challenge", value: selected.challenge, icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" },
              { label: "Offering", value: selected.offering, icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
              { label: "Outcomes", value: selected.outcomes, icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
              { label: "Customer Profile", value: selected.customerProfile, icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
            ].map(({ label, value, icon }) => (
              <div 
                key={label} 
                className="bg-card/50 backdrop-blur-sm rounded-xl p-6 xl:p-8 border-2 border-primary/30 hover:border-primary hover:shadow-xl hover:shadow-primary/10 transition-all duration-200 ring-1 ring-primary/10 hover:ring-2 hover:ring-primary/20"
              >
                <div className="flex items-center gap-3 xl:gap-4 mb-4">
                  <div className="p-2.5 xl:p-3 rounded-lg bg-primary/10 text-primary border border-primary/30">
                    <svg className="w-6 h-6 xl:w-7 xl:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                    </svg>
                  </div>
                  <h4 className="text-xl xl:text-2xl font-bold text-primary">
                    {label}
                  </h4>
                </div>
                <p className="text-muted-foreground text-base xl:text-lg leading-relaxed">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 10 Offering Pills - 2 Rows of 5 */}
        <div className="grid grid-cols-5 gap-3 xl:gap-4 max-w-6xl xl:max-w-7xl mx-auto">
          {data.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`h-14 xl:h-16 px-3 xl:px-4 rounded-full text-sm xl:text-base font-semibold transition-all duration-200 text-center flex items-center justify-center border-2 ${
                selectedIndex === index
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105 border-primary ring-2 ring-primary/20"
                  : "bg-card/50 hover:bg-card border-border hover:border-primary/70 hover:ring-2 hover:ring-primary/10 text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="line-clamp-2">{item.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offerings;
