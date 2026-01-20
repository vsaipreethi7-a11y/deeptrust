import { useState, useRef, useEffect } from "react";
import {
  Building2,
  Stethoscope,
  Scale,
  Landmark,
  Factory,
  Plane,
  Globe2,
  Briefcase,
  ShoppingCart,
  Crown,
  Container,
  FlaskConical,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const IndustryDomains = () => {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const industries = [
    {
      icon: Landmark,
      title: "Banking & Financial Services",
      subtitle: "Risk & Trade Finance",
      description: "Revolutionize counterparty risk assessment, automate trade finance documentation, and ensure real-time regulatory compliance across global jurisdictions.",
      features: ["Automated KYC/AML", "Trade Finance Processing", "Credit Risk Modeling"],
      stat: "40%",
      statLabel: "Reduction in Risk"
    },
    {
      icon: Container,
      title: "SEZ & Free Trade Zones",
      subtitle: "Zone Administration",
      description: "Digitize regulatory reporting and customs clearance. Ensure end-to-end supply chain provenance to maximize duty benefits and compliance.",
      features: ["Customs Automation", "Origin Certification", "Regulatory Reporting"],
      stat: "60%",
      statLabel: "Faster Clearance"
    },
    {
      icon: Building2,
      title: "Large Corporates",
      subtitle: "Treasury & Legal Operations",
      description: "Centralize global contract management and optimize treasury operations. Gain complete visibility into obligations, liabilities, and liquidity positions.",
      features: ["Global Contract Repository", "Liquidity Management", "Inter-company Agreements"],
      stat: "30%",
      statLabel: "Cost Savings"
    },
    {
      icon: Briefcase,
      title: "Advisory Services",
      subtitle: "M&A & Deal Advisory",
      description: "Accelerate deal velocity with AI-powered virtual data rooms and automated due diligence, closing deals faster with higher accuracy.",
      features: ["AI Data Rooms", "Automated Due Diligence", "Deal Flow Management"],
      stat: "2x",
      statLabel: "Deal Velocity"
    },
    {
      icon: ShoppingCart,
      title: "B2B Marketplaces",
      subtitle: "Trust & Transaction",
      description: "Build a foundation of trust with automated supplier verification, secure escrow services, and smart contract-based transaction settlement.",
      features: ["Merchant Verification", "Escrow Services", "Dispute Resolution"],
      stat: "99%",
      statLabel: "Trust Score"
    },
    {
      icon: Plane,
      title: "Logistics",
      subtitle: "Global Movement",
      description: "Streamline shipping documentation with smart bills of lading. Implement real-time sanctions screening for all goods and parties involved.",
      features: ["Smart Bills of Lading", "Sanctions Screening", "Cargo Tracking"],
      stat: "50%",
      statLabel: "Paperwork Reduced"
    },
    {
      icon: Globe2,
      title: "Cross-Border Business",
      subtitle: "International Expansion",
      description: "Navigate complex international regulations effortlessly. Manage multi-currency transactions, entity governance, and local compliance requirements.",
      features: ["Entity Management", "Currency Routing", "Local Compliance"],
      stat: "24/7",
      statLabel: "Compliance Monitoring"
    },
    {
      icon: FlaskConical,
      title: "Pharmaceuticals",
      subtitle: "Life Sciences",
      description: "Accelerate clinical trials with secure data sharing and ensure rigorous intellectual property protection across collaborative research networks.",
      features: ["Clinical Data Security", "IP Protection", "Regulatory Submissions"],
      stat: "100%",
      statLabel: "Data Integrity"
    },
    {
      icon: Factory,
      title: "Manufacturing",
      subtitle: "Supply Chain Assurance",
      description: "Mitigate supply chain disruptions with deep-tier supplier risk monitoring and automated procurement compliance checks.",
      features: ["Supplier Risk Mgmt", "Procurement Compliance", "Quality Certification"],
      stat: "35%",
      statLabel: "Supply Efficiency"
    },
    {
      icon: Crown,
      title: "GCC & Sovereign Wealth",
      subtitle: "National Scale Investment",
      description: "Secure and monitor massive-scale investments and national infrastructure projects with military-grade data security and immutable audit trails.",
      features: ["Investment Monitoring", "Sovereign Data Security", "Project Governance"],
      stat: "Zero",
      statLabel: "Data Breaches"
    },
  ];

  const handleIndustryClick = (index: number) => {
    setActiveIndustry(index);
    setAutoRotate(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoRotate) {
      interval = setInterval(() => {
        setActiveIndustry((prev) => (prev + 1) % industries.length);
      }, 5000); // Rotate every 5 seconds
    }
    return () => clearInterval(interval);
  }, [autoRotate, industries.length]);

  return (
    <section id="verticals" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Industries We <span className="text-primary">Transform</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            DeepTrust delivers specialized, high-impact solutions tailored to the unique regulatory and operational challenges of critical global sectors.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Left Side: Headings List */}
          <div className="lg:w-1/3 space-y-2">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-2 overflow-hidden shadow-lg h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {industries.map((industry, index) => (
                <button
                  key={index}
                  onClick={() => handleIndustryClick(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center gap-4 group ${activeIndustry === index
                      ? "bg-primary text-primary-foreground shadow-md scale-[1.02]"
                      : "hover:bg-accent hover:text-accent-foreground text-muted-foreground"
                    }`}
                >
                  <industry.icon className={`w-5 h-5 flex-shrink-0 ${activeIndustry === index ? "text-primary-foreground" : "text-primary"}`} />
                  <span className={`font-semibold text-sm md:text-base ${activeIndustry === index ? "translate-x-1" : "group-hover:translate-x-1"} transition-transform duration-300`}>
                    {industry.title}
                  </span>
                  {activeIndustry === index && (
                    <ArrowRight className="w-4 h-4 ml-auto animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Content Display */}
          <div className="lg:w-2/3">
            <div className="relative h-full min-h-[500px]">
              {industries.map((industry, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${activeIndustry === index
                      ? "opacity-100 translate-x-0 z-10"
                      : "opacity-0 translate-x-8 z-0 pointer-events-none"
                    }`}
                >
                  <Card className="h-full border-border/50 bg-card/80 backdrop-blur-md shadow-2xl overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                      <industry.icon className="w-64 h-64 text-primary rotate-12" />
                    </div>

                    <CardContent className="p-8 md:p-12 relative z-10 flex flex-col h-full justify-center">
                      <div className="mb-6 inline-flex p-4 rounded-2xl bg-primary/10 text-primary w-fit">
                        <industry.icon className="w-10 h-10" />
                      </div>

                      <h3 className="text-3xl md:text-4xl font-bold mb-2">{industry.title}</h3>
                      <p className="text-xl text-primary font-medium mb-6">{industry.subtitle}</p>

                      <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                        {industry.description}
                      </p>

                      <div className="grid sm:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-foreground/80 uppercase tracking-wider text-sm">Key Capabilities</h4>
                          <ul className="space-y-3">
                            {industry.features.map((feature, i) => (
                              <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-primary/5 rounded-2xl p-6 flex flex-col justify-center items-center text-center border border-primary/10">
                          <span className="text-4xl font-extrabold text-primary mb-1">{industry.stat}</span>
                          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{industry.statLabel}</span>
                        </div>
                      </div>

                      <Button className="w-fit group-hover:translate-x-2 transition-transform duration-300">
                        Explore {industry.title} Solutions <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryDomains;
