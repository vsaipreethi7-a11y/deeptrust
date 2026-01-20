import { useEffect, useRef, useState } from "react";

const StatsCounter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: 12653898, suffix: "+", label: "Active Users", prefix: "" },
    { value: 99.9, suffix: "%", label: "Uptime Guarantee", prefix: "" },
    { value: 150, suffix: "+", label: "Countries Served", prefix: "" },
    { value: 5, suffix: "B+", label: "Documents Processed", prefix: "" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const AnimatedCounter = ({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      const duration = 2000;
      const steps = 60;
      const increment = end / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, [isVisible, end]);

    const formatNumber = (num: number) => {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M";
      }
      if (num >= 1000) {
        return (num / 1000).toFixed(0) + "K";
      }
      return num.toFixed(end < 100 ? 1 : 0);
    };

    return (
      <span>
        {prefix}
        {formatNumber(count)}
        {suffix}
      </span>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-primary via-accent to-primary relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in-up">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-white/80 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Join thousands of organizations transforming their contract management
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {isVisible ? (
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                ) : (
                  "0"
                )}
              </div>
              <div className="text-white/80 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
