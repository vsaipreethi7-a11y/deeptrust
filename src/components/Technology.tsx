import { Card, CardContent } from "@/components/ui/card";
import { 
  Brain, 
  Cloud, 
  Database, 
  Shield, 
  Zap, 
  Code, 
  Network, 
  Lock,
  Cpu,
  Globe
} from "lucide-react";

const Technology = () => {
  const technologies = [
    {
      category: "AI & Machine Learning",
      icon: Brain,
      items: [
        "Large Language Models (LLMs) - GPT-4, Claude, Gemini",
        "Fine-tuned AI models for domain-specific applications",
        "Agentic AI workflows and autonomous systems",
        "Natural Language Processing (NLP) and understanding",
        "Predictive analytics and forecasting models"
      ],
      description: "Advanced AI capabilities powering intelligent automation and decision-making"
    },
    {
      category: "Cloud Infrastructure",
      icon: Cloud,
      items: [
        "Multi-cloud architecture (AWS, Azure, GCP)",
        "Container orchestration (Kubernetes, Docker)",
        "Serverless computing and microservices",
        "Auto-scaling and load balancing",
        "Cloud-native security and compliance"
      ],
      description: "Scalable, resilient infrastructure supporting global operations"
    },
    {
      category: "Data & Analytics",
      icon: Database,
      items: [
        "Real-time data processing pipelines",
        "DataOps and MLOps frameworks",
        "Knowledge graphs and semantic networks",
        "Big data analytics and warehousing",
        "Data integration and ETL processes"
      ],
      description: "Comprehensive data management enabling actionable insights"
    },
    {
      category: "Security & Compliance",
      icon: Shield,
      items: [
        "End-to-end encryption and data protection",
        "Identity and access management (IAM)",
        "Regulatory compliance automation (GRC)",
        "Audit trails and monitoring systems",
        "Zero-trust security architecture"
      ],
      description: "Enterprise-grade security ensuring data protection and regulatory adherence"
    },
    {
      category: "Integration & APIs",
      icon: Network,
      items: [
        "RESTful and GraphQL APIs",
        "GT Stack global regulatory APIs",
        "Third-party system integrations",
        "API gateway and management",
        "Real-time synchronization"
      ],
      description: "Seamless connectivity across platforms and jurisdictions"
    },
    {
      category: "Development Tools",
      icon: Code,
      items: [
        "Modern JavaScript/TypeScript frameworks",
        "React, Next.js, and Vue.js ecosystems",
        "CI/CD pipelines and DevOps tools",
        "Version control and collaboration platforms",
        "Testing and quality assurance frameworks"
      ],
      description: "Cutting-edge development practices ensuring rapid, reliable delivery"
    }
  ];

  const platforms = [
    {
      name: "AI Platforms",
      icon: Zap,
      description: "OpenAI, Anthropic, Google AI, and custom model deployments"
    },
    {
      name: "Cloud Services",
      icon: Cloud,
      description: "AWS, Microsoft Azure, Google Cloud Platform infrastructure"
    },
    {
      name: "Compliance Tools",
      icon: Lock,
      description: "GT Stack APIs for global regulatory and compliance management"
    },
    {
      name: "Analytics Engines",
      icon: Cpu,
      description: "Advanced analytics platforms for real-time insights and reporting"
    },
    {
      name: "Global Infrastructure",
      icon: Globe,
      description: "Multi-region deployment supporting international operations"
    }
  ];

  return (
    <section id="technology" className="py-24 bg-gradient-to-b from-background via-muted/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-widest text-primary mb-2"></div>
          <h2 className="text-5xl md:text-6xl xl:text-7xl font-extrabold mb-6 text-primary">Our Technology Stack</h2>
          <p className="text-muted-foreground mt-4 max-w-4xl mx-auto text-xl md:text-2xl">
            We leverage cutting-edge technologies and platforms to deliver robust, scalable solutions 
            that meet the complex demands of global enterprises, financial institutions, and regulatory environments.
          </p>
        </div>

        {/* Technology Categories */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <Card 
                key={tech.category} 
                className="bg-card/60 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
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
                    <h3 className="text-xl font-semibold">{tech.category}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{tech.description}</p>
                  <ul className="space-y-2">
                    {tech.items.map((item, i) => (
                      <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                        <span className="text-primary mt-1.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Platforms & Tools */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Platforms & Tools</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our solutions are built on industry-leading platforms and tools, ensuring reliability, 
              scalability, and seamless integration with existing enterprise systems.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <Card 
                  key={platform.name}
                  className="bg-gradient-to-br from-card/80 to-card/40 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:scale-105"
                  style={{
                    animation: `slideInFromBottom 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards ${index * 150}ms`,
                    opacity: 0
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="text-lg font-semibold">{platform.name}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{platform.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>


      </div>
    </section>
  );
};

export default Technology;

