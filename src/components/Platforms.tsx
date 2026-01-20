import React from "react";
import {
  FileText,
  Scan,
  Bot,
  ShieldCheck,
  Globe,
  Network,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Zap,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface PlatformFeature {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  useCases: string[];
  benefits: string[];
  icon: React.ElementType;
}

const platformsData: PlatformFeature[] = [
  {
    title: "DeepFlow™",
    subtitle: "AI-Powered Contract Intelligence LLM",
    description:
      "Specialized LLM for legal drafting, risk analysis, and compliance-aware contract management.",
    features: [
      "Multilingual 240B/480B parameter models",
      "Retrieval-Augmented Generation (RAG)",
      "Clause-level redlining & risk scoring",
      "Audit-ready explainability",
    ],
    useCases: [
      "Automated review of NDAs, MSAs, SOWs",
      "Real-time deviation detection",
      "Post-signature obligation tracking",
    ],
    benefits: [
      "70% faster contract turnaround",
      "90% reduction in manual legal review",
      "Lower exposure to non-compliant terms",
    ],
    icon: FileText,
  },
  {
    title: "Pixel-to-Profit™",
    subtitle: "TerraScale Document Intelligence Platform",
    description:
      "Vision-language AI that converts scanned documents into structured, actionable data.",
    features: [
      "32B-parameter multimodal OCR",
      "Handwritten & mixed script support",
      "Auto-classification & entity extraction",
      "Global e-invoicing integration",
    ],
    useCases: [
      "Zero-touch invoice processing",
      "KYC document ingestion",
      "Digitization of legacy archives",
    ],
    benefits: [
      "95%+ field-level extraction accuracy",
      "Eliminates manual data entry errors",
      "Accelerates onboarding & billing",
    ],
    icon: Scan,
  },
  {
    title: "AgenticAI™",
    subtitle: "Autonomous Multi-Agent Workflow Platform",
    description:
      "Self-coordinating AI agents that execute complex, end-to-end business processes.",
    features: [
      "Specialized agents (Analyst, Auditor)",
      "Natural language task delegation",
      "Human-in-the-loop escalation",
      "Reinforcement learning",
    ],
    useCases: [
      "End-to-end procurement cycle",
      "Regulatory change impact assessment",
      "Cross-functional incident response",
    ],
    benefits: [
      "24/7 operational continuity",
      "60% reduction in process cycle time",
      "Consistent, policy-aligned decisions",
    ],
    icon: Bot,
  },
  {
    title: "GRC Sentinel™",
    subtitle: "AI-Driven Governance, Risk & Compliance LLM",
    description:
      "Domain-specialized LLM trained on global regulations, policies, and control frameworks.",
    features: [
      "Fine-tuned on 500+ regulatory regimes",
      "Real-time policy-to-control gap analysis",
      "Automated evidence collection",
      "Dynamic risk heatmaps",
    ],
    useCases: [
      "Continuous monitoring of policy adherence",
      "Automated DSAR fulfillment",
      "Regulatory change alerts",
    ],
    benefits: [
      "Proactive compliance",
      "80% faster audit preparation",
      "Unified view of risk",
    ],
    icon: ShieldCheck,
  },
  {
    title: "BorderFlow™",
    subtitle: "AI-Driven Cross-Border Transaction LLM",
    description:
      "Specialized LLM for international trade, FX, sanctions screening, and multi-jurisdictional compliance.",
    features: [
      "Trained on global trade laws & sanctions",
      "Real-time entity screening (200+ lists)",
      "Smart payment routing",
      "Invoice & shipping doc validation",
    ],
    useCases: [
      "Automated counterparty screening",
      "Intelligent payment initiation",
      "Trade finance document verification",
    ],
    benefits: [
      "Eliminate transaction delays",
      "Reduce false positives by 75%",
      "Optimize FX costs",
    ],
    icon: Globe,
  },
  {
    title: "InsightForge™",
    subtitle: "AI-Driven Data Ingestion & Integration",
    description:
      "Unified engine for ingesting, enriching, and contextualizing enterprise data from any source.",
    features: [
      "Connects to 300+ enterprise platforms",
      "AI-powered schema mapping",
      "Real-time sync with CLM, ERP, CRM",
      "Data lineage tracking",
    ],
    useCases: [
      "Auto-ingest contract metadata",
      "Pull regulatory filings",
      "Enrich customer profiles",
    ],
    benefits: [
      "Break down data silos",
      "Single source of truth",
      "Accelerate integrations",
    ],
    icon: Network,
  },
];

const Platforms: React.FC = () => {
  return (
    <section
      id="platforms"
      className="py-32 bg-background relative overflow-hidden"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-xl shadow-[0_0_15px_rgba(var(--primary),0.2)]">
            <Sparkles size={14} className="text-primary mr-2" />
            <span className="text-sm font-bold text-primary uppercase tracking-widest">
              The AI Engine
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-br from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent mb-8 tracking-tight">
            Our Technology <span className="text-primary">Platforms</span>
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-light">
            Purpose-built, domain-specialized AI systems engineered to solve
            high-stakes enterprise challenges.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-6">
            {platformsData.map((platform, index) => (
              <AccordionItem 
                key={index} 
                value={platform.title}
                className="group border border-white/10 bg-card/10 backdrop-blur-xl rounded-3xl overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 px-1"
              >
                <AccordionTrigger className="px-6 py-6 hover:no-underline [&[data-state=open]]:bg-white/5">
                  <div className="flex items-center text-left gap-6 w-full pr-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                      <platform.icon
                        size={28}
                        className="text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {platform.title}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground font-medium line-clamp-1">
                        {platform.subtitle}
                      </p>
                    </div>
                    {/* Explicit Arrow replacement if needed, but AccordionTrigger usually has one. 
                        We can keep default or customize. Keeping default for now but styling it would be nice. 
                        Most ShadCN implementations might put the arrow at the end. */}
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="px-6 pb-8 pt-2">
                   <div className="pl-[80px] pr-4">
                      <p className="text-lg text-foreground/90 leading-relaxed mb-8 border-l-2 border-primary/30 pl-4">
                        {platform.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
                        {/* Features */}
                        <div>
                          <h4 className="flex items-center gap-2 text-xs font-bold text-foreground/70 mb-5 uppercase tracking-widest">
                            <Zap size={14} className="text-yellow-500" />
                            Capabilities
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {platform.features.map((feature, i) => (
                              <span key={i} className="px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/10 text-xs font-medium text-foreground/80">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>

                         {/* Use Cases */}
                        <div>
                          <h4 className="flex items-center gap-2 text-xs font-bold text-foreground/70 mb-5 uppercase tracking-widest">
                            <ArrowRight size={14} className="text-blue-500" />
                            Applications
                          </h4>
                          <ul className="space-y-3">
                            {platform.useCases.map((useCase, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground/90">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0 shadow-[0_0_5px_hsl(var(--primary))]" />
                                <span>{useCase}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Benefits Footer */}
                      <div className="bg-gradient-to-r from-primary/10 to-transparent rounded-xl p-6 border border-primary/10">
                        <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-4">Impact</span>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {platform.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                              <span className="text-sm font-semibold text-foreground/90 leading-tight">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                   </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Platforms;
