import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const footerLinks = {
    Company: [
      { label: "About Us", href: "/#about-us" },
      { label: "Team", href: "/#team" },
    ],
    Offerings: [
      { label: "For Global Enterprises", href: "/#offerings" },
      { label: "For MNC Banks", href: "/#offerings" },
      { label: "For SEZ/FTZ", href: "/#offerings" },
      { label: "DeepTrust GT API", href: "/#solutions" },
    ],
    "Tech Platforms": [
      { label: "DeepFlow™", href: "/#platforms" },
      { label: "Pixel-to-Profit™", href: "/#platforms" },
      { label: "AgenticAI™", href: "/#platforms" },
      { label: "GRC Sentinel™", href: "/#platforms" },
      { label: "BorderFlow™", href: "/#platforms" },
      { label: "InsightForge™", href: "/#platforms" },
    ],
    Resources: [
      { label: "Technology Stack", href: "/#technology" },
      { label: "Outcomes", href: "/#outcomes" },
      { label: "Industry Verticals", href: "/#verticals" },
      { label: "Support", href: "/#contact" },
    ],
  } as const;

  const navigate = useNavigate();
  const location = useLocation();

  const scrollToContact = () => {
    // If not on homepage, navigate to home with hash
    if (location.pathname !== "/") {
      navigate("/#contact");
      return;
    }

    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="footer-gradient border-t border-border/50 text-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <img
                src="/logo.png"
                alt="DEEPTRUST.ONE"
                className="h-20 md:h-24 lg:h-28 w-auto"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  if (el.src.includes("/logo.png")) {
                    el.src = "/logo.jpg"; // fallback to JPG if PNG missing
                  }
                }}
              />
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Revolutionizing contract management with AI-powered analytics and lifecycle management solutions.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 grid place-items-center rounded-lg bg-muted/40 hover:bg-primary hover:text-primary-foreground transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 grid place-items-center rounded-lg bg-muted/40 hover:bg-primary hover:text-primary-foreground transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 grid place-items-center rounded-lg bg-muted/40 hover:bg-primary hover:text-primary-foreground transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 grid place-items-center rounded-lg bg-muted/40 hover:bg-primary hover:text-primary-foreground transition-colors"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Four link columns on one row: Company, Products, Solution, Resources */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-bold text-lg mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>


        {/* Contact CTA Panel */}
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-3xl p-6 md:p-8 mb-10 shadow-[0_10px_30px_-12px_rgba(29,78,216,0.3)]">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-1">
              <h4 className="text-xl font-semibold mb-2">Get In Touch</h4>
              <p className="text-muted-foreground">Have questions or want to learn more? Contact us today.</p>
            </div>
            <div className="md:col-span-2 flex flex-col sm:flex-row gap-3">
              <Button
                onClick={scrollToContact}
                className="flex-1 h-14 px-8 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-95 transition-all duration-300 shadow-[0_10px_24px_-12px_rgba(29,78,216,0.5)] hover:shadow-[0_15px_30px_-12px_rgba(29,78,216,0.6)] hover:scale-105"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Us
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-14 px-8 rounded-full border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                onClick={() => window.location.href = "tel:+919004090839"}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Us
              </Button>
            </div>
          </div>
        </div>

        {/* Subscribe panel */}
        <div className="bg-muted/25 border border-border/60 rounded-3xl p-6 md:p-8 mb-10 shadow-[0_10px_30px_-12px_rgba(10,10,20,0.5)]">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-1">
              <h4 className="text-xl font-semibold">Stay Updated</h4>
              <p className="text-muted-foreground mt-2">Get the latest updates on our innovations and job opportunities.</p>
            </div>
            <div className="md:col-span-2">
              <form className="flex gap-3">
                <input type="email" placeholder="Enter your email" className="flex-1 h-14 px-5 rounded-full bg-background border border-border/60 text-foreground placeholder:text-muted-foreground/60" />
                <button type="button" className="h-14 px-8 rounded-full bg-emerald-600 text-white font-medium hover:opacity-95 transition-colors shadow-[0_10px_24px_-12px_rgba(16,185,129,0.7)]">Subscribe</button>
              </form>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border/50 text-center text-foreground/80">
          <p>© {new Date().getFullYear()} DEEPTRUST.ONE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
