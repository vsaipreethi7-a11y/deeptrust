import { Zap, Shield, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import analyticsImg from "@/assets/analytics-feature.jpg";
import securityImg from "@/assets/security-feature.jpg";
import automationImg from "@/assets/automation-feature.jpg";

const FeaturesShowcase = () => {
  const features = [
    {
      icon: Zap,
      title: "Advanced Analytics Engine",
      description: "Real-time contract analytics powered by state-of-the-art machine learning models. Gain instant insights into contract performance, risks, and opportunities.",
      image: analyticsImg,
      stats: ["99.8% Accuracy", "10x Faster", "AI-Powered"],
    },
    {
      icon: Shield,
      title: "Enterprise Security & Compliance",
      description: "Bank-grade encryption and comprehensive compliance monitoring. Automatically detect policy violations and ensure regulatory adherence across all contracts.",
      image: securityImg,
      stats: ["SOC 2 Certified", "GDPR Compliant", "256-bit Encryption"],
    },
    {
      icon: TrendingUp,
      title: "Intelligent Automation",
      description: "End-to-end workflow automation from contract creation to renewal. Reduce manual effort by 90% and eliminate human errors with our AI-driven platform.",
      image: automationImg,
      stats: ["90% Time Saved", "Zero Errors", "Smart Workflows"],
    },
  ];

  return (
    <section id="offerings" className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful <span className="text-primary">Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cutting-edge AI technology designed to transform your contract management workflow
          </p>
        </div>

        <div className="space-y-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-stretch ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div
                className={`animate-fade-in-up ${index % 2 === 1 ? "lg:order-2" : ""} panel`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="inline-flex items-center gap-3 mb-6 p-3 rounded-2xl bg-primary/10">
                  <feature.icon className="w-8 h-8 text-primary" />
                  <span className="text-sm font-medium text-primary">Feature Highlight</span>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{feature.title}</h3>
                
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {feature.description}
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  {feature.stats.map((stat, statIndex) => (
                    <div
                      key={statIndex}
                      className="pill pill-strong"
                    >
                      <span className="font-semibold">{stat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`animate-scale-in ${index % 2 === 1 ? "lg:order-1" : ""} panel-tight overflow-hidden`}
                style={{ animationDelay: `${index * 0.2 + 0.2}s` }}
              >
                <Card className="overflow-hidden border-border/50 shadow-elegant hover:shadow-2xl transition-all duration-500 group bg-transparent">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-auto transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
