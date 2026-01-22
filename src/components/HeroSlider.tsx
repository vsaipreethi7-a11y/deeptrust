import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg1 from "@/assets/hero-bg-1.jpg";
import heroBg2 from "@/assets/hero-bg-2.jpg";
import heroBg3 from "@/assets/hero-bg-3.jpg";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "AI Driven Governance Risk and Compliance Platform for Global Enterprises",
      subtitle: "Transform Your Contract Management",
      description: "Leverage advanced AI and LLMs for intelligent data extraction, risk analysis, and automated contract lifecycle management. Reduce processing time by 90%.",
      image: heroBg1,
    },
    {
      title: "Intelligent Risk Detection",
      subtitle: "Proactive Compliance & Security",
      description: "Deep learning algorithms identify hidden risks, non-compliance issues, and anomalies before they become problems. Protect your business with real-time monitoring.",
      image: heroBg2,
    },
    {
      title: "Enterprise-Scale Automation",
      subtitle: "Scale Your Operations Effortlessly",
      description: "From due diligence to dispute resolution, automate every stage of the contract lifecycle. Join 12M+ customers experiencing unprecedented efficiency.",
      image: heroBg3,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Connect Us (top-right) */}
      <div className="absolute top-6 xl:top-8 right-6 xl:right-8 z-40">
        <button
          onClick={() => scrollToSection("contact")}
          aria-label="Connect with us"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 xl:px-5 py-2 xl:py-2.5 rounded-full shadow-lg transition-colors duration-200 text-sm md:text-base xl:text-lg"
        >
          <MessageCircle className="w-5 h-5 xl:w-6 xl:h-6" />
          <span className="hidden sm:inline">Connect Us</span>
        </button>
      </div>
      {/* Slide Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
        >
          {/* Softer overlay so text and image are both visible */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/50 z-10" />
          <div className="absolute inset-0 bg-black/20 z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Content */}
      <div className="container mx-auto px-4 2xl:px-6 pt-20 relative z-30 max-w-[1400px]">
        <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto text-center">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${index === currentSlide
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10 absolute"
                }`}
            >
              <div className="mb-4 xl:mb-6 inline-block px-5 xl:px-6 py-2.5 xl:py-3 bg-black/60 text-white backdrop-blur-md rounded-full border border-white/40 text-sm xl:text-base font-semibold animate-fade-in shadow-lg">
                Next Generation Contract Management
              </div>

              <h2 className="text-lg md:text-xl xl:text-2xl text-primary mb-4 xl:mb-6 font-semibold animate-fade-in-up drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                {slide.subtitle}
              </h2>
              <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold mb-6 xl:mb-8 leading-tight text-white animate-fade-in-up drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]" style={{ animationDelay: "0.2s" }}>
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl xl:text-2xl text-white mb-10 xl:mb-12 max-w-3xl xl:max-w-4xl mx-auto animate-fade-in-up drop-shadow-[0_3px_6px_rgba(0,0,0,0.6)] font-medium" style={{ animationDelay: "0.4s" }}>
                {slide.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 xl:gap-6 justify-center animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 xl:px-10 py-6 xl:py-7 text-lg xl:text-xl rounded-full shadow-elegant hover:shadow-xl transition-all duration-300 hover:scale-105"
                  onClick={() => scrollToSection("contact")}
                >
                  Request Demo
                  <ArrowRight className="ml-2 h-5 w-5 xl:h-6 xl:w-6" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary/10 backdrop-blur-sm px-8 xl:px-10 py-6 xl:py-7 text-lg xl:text-xl rounded-full transition-all duration-300 hover:scale-105 bg-white/80"
                  onClick={() => scrollToSection("solutions")}
                >
                  Explore Features
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 md:z-30 p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 md:z-30 p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${index === currentSlide
              ? "w-12 h-3 bg-primary"
              : "w-3 h-3 bg-white/40 hover:bg-white/60"
              }`}
          />
        ))}
      </div>

      {/* Scroll Indicator removed */}
    </section>
  );
};

export default HeroSlider;
