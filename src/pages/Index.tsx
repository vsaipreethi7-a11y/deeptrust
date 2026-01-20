import { useEffect, lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import BackgroundFX from "@/components/BackgroundFX";
import HeroSlider from "@/components/HeroSlider";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";

// Lazy load heavy sections
const Outcomes = lazy(() => import("@/components/Outcomes"));
const IndustryDomains = lazy(() => import("@/components/IndustryDomains"));
const Offerings = lazy(() => import("@/components/Offerings"));
const Platforms = lazy(() => import("@/components/Platforms"));
const Solutions = lazy(() => import("@/components/Solutions"));
const StatsCounter = lazy(() => import("@/components/StatsCounter"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Contact = lazy(() => import("@/components/Contact"));
const Technology = lazy(() => import("@/components/Technology"));
const AboutUs = lazy(() => import("@/components/AboutUs"));
const WhatWeDo = lazy(() => import("@/components/WhatWeDo"));

const SectionLoader = () => (
  <div className="flex items-center justify-center p-20">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const Index = () => {
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    handleHashScroll();
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <BackgroundFX />
      <Navigation />

      <main>
        <HeroSlider />
        <Suspense fallback={<SectionLoader />}>
          <Outcomes />

          <IndustryDomains />
          <WhatWeDo />
          <Offerings />
          <Platforms />
          <Technology />

          <Solutions />
          <AboutUs />
          <Testimonials />
          <Contact />
          <StatsCounter />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
