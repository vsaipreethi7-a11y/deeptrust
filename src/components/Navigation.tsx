
import * as React from "react";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const platformsData = [
  { title: "DeepTrust GT API Platform", description: "8,000+ global due diligence APIs" },
  { title: "Global Contracts LLM", description: "Legal AI for 92+ countries" },
  { title: "AI-Driven GRC Suite", description: "Governance, Risk & Compliance automation" },
  { title: "Cross-Border Escrow Services", description: "Secure transaction holding" },
  { title: "Payment Infrastructure", description: "Cross-border payment switch" },
  { title: "Blockchain Data Rooms", description: "Immutable, secure document repositories" },
  { title: "Data & Integration Platform", description: "300+ pre-built connectors" },
  { title: "DeepAgents", description: "Autonomous AI agents" },
];

const verticalsData = [
  { title: "Banking & Financial Services", description: "Counterparty risk, trade finance, and payments" },
  { title: "SEZ & Free Trade Zones", description: "Supply chain provenance and regulatory compliance" },
  { title: "Large Corporates", description: "Treasury optimization and global contracts" },
  { title: "Advisory Services", description: "Deal rooms and compliance reporting" },
  { title: "B2B Marketplaces", description: "Supplier verification and escrow" },
  { title: "Logistics", description: "Smart bills of lading and sanctions screening" },
  { title: "Cross-Border Business", description: "Currency routing and regulatory hubs" },
  { title: "Pharmaceuticals", description: "Clinical trial analysis and IP security" },
  { title: "Manufacturing", description: "Supplier risk and smart procurement" },
  { title: "GCC & Sovereign Wealth", description: "Investment monitoring and national supply chains" },
];

const offeringsData = [
  { title: "For Global Enterprises", description: "Personalized advisory and agentic workflows" },
  { title: "For MNC Banks", description: "Global regulatory advisory and fraud analytics" },
  { title: "For SEZ/Free Trade Zones", description: "Compliance navigator and customs automation" },
];

const solutionsData = [
  { title: "DeepTrust GT API Platform", description: "Robust verification and compliance" },
  { title: "Global Contracts LLM", description: "Advanced legal AI analysis" },
  { title: "AI-Driven GRC Suite", description: "Automated compliance automation" },
  { title: "Cross-Border Escrow", description: "Secure transaction holding" },
  { title: "Payment Infrastructure", description: "Real-time routing and settlement" },
  { title: "Data & Integration", description: "Seamless data orchestration" },
  { title: "Blockchain Data Rooms", description: "Secure document repositories" },
  { title: "DeepAgents", description: "Autonomous financial operations" },
];

const outcomesData = [
  { title: "Cost Savings", description: "Automate manual tasks and reduce expenses" },
  { title: "Time Saving", description: "Accelerate review cycles from days to minutes" },
  { title: "Reduction of Errors", description: "Eliminate oversight and ensure accuracy" },
  { title: "Revenue Acceleration", description: "Quicker revenue realization from faster deals" },
  { title: "Risk Reduction", description: "Proactive identification of liabilities" },
  { title: "Customer Loyalty", description: "Faster results build trust and relationships" },
];

const technologyData = [
  { title: "AI & Machine Learning", description: "LLMs, Agentic AI, NLP" },
  { title: "Cloud Infrastructure", description: "Multi-cloud, Serverless, Kubernetes" },
  { title: "Data & Analytics", description: "Real-time pipelines, Knowledge Graphs" },
  { title: "Security & Compliance", description: "Zero-trust, End-to-end encryption" },
  { title: "Integration & APIs", description: "REST, GraphQL, GT Stack APIs" },
  { title: "Development Tools", description: "Modern stack, CI/CD, DevOps" },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const [brandWidth, setBrandWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  useLayoutEffect(() => {
    const measure = () => setBrandWidth(titleRef.current?.offsetWidth);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section.toLowerCase().replace(/\s+/g, "-")) || 
                    document.getElementById(section.toLowerCase()) ||
                    document.getElementById(section.replace(/\s+/g, "").toLowerCase());
    
    if (element) {
      // Offset for fixed header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsOpen(false);
    }
  };

  const handleLinkClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <nav
      className={cn(
        "sticky top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/95 border-b border-border supports-[backdrop-filter]:bg-background/60",
        isScrolled ? "backdrop-blur-md shadow-sm" : ""
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 select-none cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img
              src="/logo.png"
              alt="DEEPTRUST.ONE"
              className="h-10 md:h-12 w-auto"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                if (el.src.includes("/logo.png")) {
                  el.src = "/logo.jpg";
                }
              }}
            />
            <div className="leading-tight">
              <div ref={titleRef} className="text-lg md:text-xl font-extrabold tracking-tight bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent w-fit">
                DEEPTRUST.ONE
              </div>
              <div
                className="uppercase text-[10px] md:text-xs font-semibold text-foreground/85 whitespace-nowrap mt-0.5 tracking-wider"
                style={{ width: brandWidth }}
              >
                 <div className="flex items-center justify-between w-full">
                  <span>SPEED</span>
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  <span>SCALE</span>
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  <span>IMPACT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation - Mega Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavigationMenu className="relative z-50">
              <NavigationMenuList>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger onClick={(e) => handleLinkClick(e, "outcomes")}>Outcomes</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {outcomesData.map((item) => (
                        <ListItem key={item.title} title={item.title} onClick={(e) => handleLinkClick(e, "outcomes")}>
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger onClick={(e) => handleLinkClick(e, "verticals")}>Verticals</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {verticalsData.map((item) => (
                        <ListItem key={item.title} title={item.title} onClick={(e) => handleLinkClick(e, "verticals")}>
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger onClick={(e) => handleLinkClick(e, "offerings")}>Offerings</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                      {offeringsData.map((item) => (
                        <ListItem key={item.title} title={item.title} onClick={(e) => handleLinkClick(e, "offerings")}>
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger onClick={(e) => handleLinkClick(e, "platforms")}>Platforms</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {platformsData.map((item) => (
                        <ListItem key={item.title} title={item.title} onClick={(e) => handleLinkClick(e, "platforms")}>
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger onClick={(e) => handleLinkClick(e, "solutions")}>Solutions</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {solutionsData.map((item) => (
                        <ListItem key={item.title} title={item.title} onClick={(e) => handleLinkClick(e, "solutions")}>
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger onClick={(e) => handleLinkClick(e, "technology")}>Technology</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {technologyData.map((item) => (
                        <ListItem key={item.title} title={item.title} onClick={(e) => handleLinkClick(e, "technology")}>
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={navigationMenuTriggerStyle()} 
                    onClick={(e) => handleLinkClick(e, "about-us")}
                  >
                    About Us
                  </NavigationMenuLink>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-6 animate-fade-in border-t border-border/50 mt-2 bg-background/95 backdrop-blur-md">
            <div className="flex flex-col space-y-1 pt-4 px-2">
              <button onClick={(e) => handleLinkClick(e, "outcomes")} className="text-left py-3 px-4 hover:bg-accent rounded-md font-medium">Outcomes</button>
              <button onClick={(e) => handleLinkClick(e, "verticals")} className="text-left py-3 px-4 hover:bg-accent rounded-md font-medium">Verticals</button>
              <button onClick={(e) => handleLinkClick(e, "offerings")} className="text-left py-3 px-4 hover:bg-accent rounded-md font-medium">Offerings</button>
              <button onClick={(e) => handleLinkClick(e, "platforms")} className="text-left py-3 px-4 hover:bg-accent rounded-md font-medium">Platforms</button>
              <button onClick={(e) => handleLinkClick(e, "solutions")} className="text-left py-3 px-4 hover:bg-accent rounded-md font-medium">Solutions</button>
              <button onClick={(e) => handleLinkClick(e, "technology")} className="text-left py-3 px-4 hover:bg-accent rounded-md font-medium">Technology</button>
              <button onClick={(e) => handleLinkClick(e, "about-us")} className="text-left py-3 px-4 hover:bg-accent rounded-md font-medium">About Us</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
