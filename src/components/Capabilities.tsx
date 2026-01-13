import { Card, CardContent } from "@/components/ui/card";
import { 
  Target, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Globe2,
  Shield,
  Zap,
  BarChart3,
  Workflow,
  FileCheck
} from "lucide-react";

const Capabilities = () => {
  const services = [
    {
      title: "AI-Driven Advisory Services",
      icon: Target,
      description: "Personalized financial and business advisory powered by advanced AI, delivering compliant, up-to-date guidance across complex regulatory landscapes.",
      features: [
        "Multi-jurisdictional compliance advisory",
        "Real-time regulatory updates",
        "Personalized recommendations",
        "24/7 intelligent support"
      ]
    },
    {
      title: "Automated Compliance & Reporting",
      icon: FileCheck,
      description: "End-to-end automation of compliance reporting, audit preparation, and regulatory documentation with AI-powered validation and accuracy.",
      features: [
        "Automated report generation",
        "Cross-domain audit support",
        "Regulatory validation",
        "Audit-ready documentation"
      ]
    },
    {
      title: "Workflow Automation",
      icon: Workflow,
      description: "Agentic AI workflows that streamline complex business processes, from onboarding to risk assessment, reducing operational overhead.",
      features: [
        "KYC/AML automation",
        "Due diligence workflows",
        "Approval processes",
        "Risk assessment automation"
      ]
    },
    {
      title: "Predictive Analytics & Risk Management",
      icon: BarChart3,
      description: "Advanced analytics and forecasting capabilities that enable proactive risk management and data-driven strategic decision-making.",
      features: [
        "Market trend forecasting",
        "Risk prediction models",
        "Fraud detection systems",
        "Portfolio analytics"
      ]
    },
    {
      title: "Global Regulatory Intelligence",
      icon: Globe2,
      description: "Comprehensive regulatory monitoring and intelligence across multiple jurisdictions, ensuring continuous compliance and risk mitigation.",
      features: [
        "Multi-jurisdiction monitoring",
        "Regulatory change alerts",
        "Compliance scoring",
        "Cross-border insights"
      ]
    },
    {
      title: "Enterprise Integration & APIs",
      icon: Zap,
      description: "Seamless integration with existing enterprise systems through robust APIs, enabling unified operations and data consistency.",
      features: [
        "GT Stack API integration",
        "Third-party system connectivity",
        "Real-time data synchronization",
        "Custom integration solutions"
      ]
    }
  ];

  const strengths = [
    {
      area: "Domain Expertise",
      icon: Users,
      description: "Deep expertise in financial services, regulatory compliance, and global trade operations across multiple industries and jurisdictions."
    },
    {
      area: "Technology Innovation",
      icon: Zap,
      description: "Cutting-edge AI and automation technologies combined with proven enterprise-grade infrastructure and security practices."
    },
    {
      area: "Scalability & Performance",
      icon: TrendingUp,
      description: "Architected for scale, supporting operations from small businesses to large multinational enterprises with consistent performance."
    },
    {
      area: "Security & Compliance",
      icon: Shield,
      description: "Enterprise-grade security measures and comprehensive compliance frameworks ensuring data protection and regulatory adherence."
    }
  ];

  return (
    <section id="capabilities" className="py-24 bg-gradient-to-b from-background via-muted/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-widest text-primary mb-2">What We Do</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Capabilities</h2>
          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto text-lg">
            We deliver comprehensive solutions that combine AI innovation with deep domain expertise, 
            enabling organizations to navigate complex regulatory environments, automate operations, 
            and achieve sustainable growth.
          </p>
        </div>

        {/* Services */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Services We Provide</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive service portfolio addresses critical business needs across compliance, 
              operations, and strategic advisory.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={service.title}
                  className="bg-card/60 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:scale-105 group"
                  style={{
                    animation: `fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards ${index * 100}ms`,
                    opacity: 0
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">{service.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Strengths & Expertise */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Our Strengths & Domain Expertise</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We bring together deep industry knowledge, advanced technology, and proven methodologies 
              to deliver exceptional value to our clients.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {strengths.map((strength, index) => {
              const Icon = strength.icon;
              return (
                <Card 
                  key={strength.area}
                  className="bg-gradient-to-br from-card/80 to-card/40 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                  style={{
                    animation: `slideInFromBottom 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards ${index * 150}ms`,
                    opacity: 0
                  }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 rounded-full bg-primary/10">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold mb-3">{strength.area}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {strength.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* What We Can Do */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-primary/20">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">What We Can Do For Your Business</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">Reduce Compliance Risk:</strong>
                    <p className="text-sm text-muted-foreground">
                      Automated monitoring and reporting minimize regulatory violations and penalties
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">Increase Operational Efficiency:</strong>
                    <p className="text-sm text-muted-foreground">
                      Streamline workflows and reduce manual effort by up to 70%
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">Enhance Decision-Making:</strong>
                    <p className="text-sm text-muted-foreground">
                      Data-driven insights enable faster, more accurate strategic decisions
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">Scale Globally:</strong>
                    <p className="text-sm text-muted-foreground">
                      Support multi-jurisdictional operations with unified compliance and operations
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">Improve Client Experience:</strong>
                    <p className="text-sm text-muted-foreground">
                      24/7 intelligent support and faster response times enhance satisfaction
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <strong className="text-foreground">Future-Proof Operations:</strong>
                    <p className="text-sm text-muted-foreground">
                      Adaptive AI systems continuously learn and evolve with regulatory changes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;

