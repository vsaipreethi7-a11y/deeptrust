import React from "react";
import { 
  CheckCircle2, 
  Cpu, 
  ShieldCheck, 
  Globe 
} from "lucide-react";

const solutionsData = [
  { 
    title: "DeepTrust GT API Platform", 
    description: "Robust verification and compliance APIs integrating seamlessly with your existing stack.", 
    category: "Platform" 
  },
  { 
    title: "Global Contracts LLM", 
    description: "Advanced legal AI analysis for reviewing and drafting contracts across jurisdictions.", 
    category: "AI Service" 
  },
  { 
    title: "AI-Driven GRC Suite", 
    description: "Automated governance, risk, and compliance automation for modern enterprises.", 
    category: "Enterprise" 
  },
  { 
    title: "Cross-Border Escrow", 
    description: "Secure transaction holding services ensuring safety in international trade.", 
    category: "Financial" 
  },
  { 
    title: "Payment Infrastructure", 
    description: "Real-time routing and settlement systems covering 150+ currencies.", 
    category: "Infrastructure" 
  },
  { 
    title: "Data & Integration", 
    description: "Seamless data orchestration connecting disparate financial and trade systems.", 
    category: "Integration" 
  },
  { 
    title: "Blockchain Data Rooms", 
    description: "Secure, immutable document repositories for sensitive deal information.", 
    category: "Security" 
  },
  { 
    title: "DeepAgents", 
    description: "Autonomous financial operations agents that work 24/7 to optimize workflows.", 
    category: "AI Workforce" 
  },
];

const Solutions: React.FC = () => {
  return (
    <section id="solutions" className="py-24 bg-muted/30 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Comprehensive <span className="text-primary">Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Solving the most critical challenges in global trade and finance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutionsData.map((solution, index) => (
            <div
              key={index}
              className="bg-background rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary/10 text-secondary-foreground">
                  {solution.category}
                </span>
                <CheckCircle2 size={18} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{solution.title}</h3>
              <p className="text-sm text-muted-foreground">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
