import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Julia Keys",
      role: "M&A Director",
      rating: 5,
      text: "Game-changer for M&A: fast, accurate, confident deals. The AI-powered analytics have transformed how we conduct due diligence.",
    },
    {
      name: "Francis Fadel",
      role: "Legal Operations Manager",
      rating: 5,
      text: "Unlocks hidden insights, optimizes contracts, proactive management. We've reduced contract review time by 80%.",
    },
    {
      name: "Lawrence Mills",
      role: "CFO",
      rating: 5,
      text: "Saves time, reduces errors, pays for itself. The ROI was evident within the first quarter of implementation.",
    },
    {
      name: "Sophia Hegmann",
      role: "Procurement Director",
      rating: 5,
      text: "Streamlines vendor onboarding, improves risk posture. Our compliance team loves the automated risk detection.",
    },
    {
      name: "Tommie Lakin",
      role: "General Counsel",
      rating: 5,
      text: "Beyond speed: intelligent assistant, learns, identifies nuances. It's like having a senior lawyer reviewing every contract.",
    },
    {
      name: "Jeanette Koss",
      role: "Contract Manager",
      rating: 5,
      text: "Beyond speed: intelligent assistant, learns, identifies nuances. The clause comparison feature is phenomenal.",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="case-studies" className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-4">
            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            <span className="text-2xl font-bold">4.9/5</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our <span className="text-primary">Customers Say</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Based on 5,000+ real users reviews
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-elegant">
            <CardContent className="p-12">
              <div className="flex flex-col items-center text-center">
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                
                <blockquote className="text-2xl md:text-3xl font-medium mb-8 leading-relaxed">
                  "{testimonials[currentIndex].text}"
                </blockquote>

                <div>
                  <div className="font-bold text-lg mb-1">{testimonials[currentIndex].name}</div>
                  <div className="text-muted-foreground">{testimonials[currentIndex].role}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-8 bg-primary" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in-up">
          <h3 className="text-3xl font-bold mb-4">
            Experience the Power of Compounding with Automation
          </h3>
          <p className="text-xl text-muted-foreground mb-8">
            Join over 12,653,898 customers that are already building amazing workflows
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
