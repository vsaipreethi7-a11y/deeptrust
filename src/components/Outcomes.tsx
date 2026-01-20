import { DollarSign, Clock, CheckCircle, TrendingUp, Shield, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Outcomes = () => {
  const outcomes = [
    {
      icon: DollarSign,
      title: "Cost Savings",
      description: "Automate manual tasks, reduce labor hours, and minimize expenses associated with traditional due diligence processes. Achieve significant operational efficiency.",
    },
    {
      icon: Clock,
      title: "Time Saving",
      description: "Accelerate review cycles from days to minutes. Quickly process large volumes of documents, enabling faster decision-making and deal closures.",
    },
    {
      icon: CheckCircle,
      title: "Reduction of Errors",
      description: "Eliminate human oversight and inconsistencies. Our AI accurately identifies critical data points, ensuring thoroughness and reducing costly mistakes.",
    },
    {
      icon: TrendingUp,
      title: "Revenue Acceleration",
      description: "Streamline deal progression and contract finalization. Faster due diligence means quicker revenue realization and improved business agility.",
    },
    {
      icon: Shield,
      title: "Risk Reduction",
      description: "Proactively identify hidden risks and non-compliance issues within contracts and documents. Mitigate potential liabilities before they escalate.",
    },
    {
      icon: Users,
      title: "Customer Loyalty",
      description: "Deliver faster, more accurate results to your clients or stakeholders, building trust and strengthening long-term relationships through reliable service.",
    },
  ];

  return (
    <section id="outcomes" className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Do You Care About <span className="text-primary">Outputs or Outcomes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience measurable impact across every dimension of your business
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outcomes.map((outcome, index) => (
            <Card
              key={index}
              className="group transition-all duration-500 hover:-translate-y-2 border-border/60 animate-fade-in-up overflow-hidden relative panel"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-8 relative z-10">
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <outcome.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                  {outcome.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {outcome.description}
                </p>
                <div className="mt-6 h-1 w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500 rounded-full" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Removed scrolling marquee of outcomes as requested */}
      </div>
    </section>
  );
};

export default Outcomes;
