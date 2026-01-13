import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import BackgroundFX from "@/components/BackgroundFX";
import HeroSlider from "@/components/HeroSlider";
import Outcomes from "@/components/Outcomes";
import IndustryDomains from "@/components/IndustryDomains";
import Offerings from "@/components/Offerings";
import Platforms from "@/components/Platforms";
import Solutions from "@/components/Solutions";
import StatsCounter from "@/components/StatsCounter";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Technology from "@/components/Technology";
import WhatWeDo from "@/components/WhatWeDo";
import AboutUs from "@/components/AboutUs";

const Index = () => {
  // Ensure page starts at the top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    // Also clear any hash from URL
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  return (
    <div className="min-h-screen relative">
      <BackgroundFX />
      <Navigation />
      <HeroSlider />
      <Outcomes />
      <IndustryDomains />
      <Offerings />
      <Platforms />
      <Solutions />
      <Technology />
      <WhatWeDo />
      <StatsCounter />
      <Testimonials />
      <AboutUs />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
