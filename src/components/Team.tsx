import { useState } from "react";
import { Linkedin, Mail, Facebook, Twitter, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import An from "../assets/An.jpg";
import Na from "../assets/Na.jpg";
import Ch from "../assets/Ch.jpg";
import Ca from "../assets/Ca.jpg";

const Team = () => {
  const [selectedMember, setSelectedMember] = useState<number>(0);

  const members = [
    {
      name: "Sanat Bhat",
      role: "Founder & Partner",
      bio: "Gold medalist CA, CFA, FRM. Expert in M&A, Investment Banking, Transaction Advisory, Corporate Structuring, Fundraising & Debt Syndication.",
      details: [
        "M&A and Investment Banking",
        "Transaction Advisory",
        "Corporate Structuring",
        "Fundraising & Debt Syndication",
        "Financial Due Diligence",
        "Legal & Operational Due Diligence"
      ],
      image: An,
      linkedin: "https://linkedin.com/in/sanat-bhat",
      email: "sanat@deeptrust.one",
      facebook: "https://facebook.com/sanat-bhat",
      twitter: "https://twitter.com/sanat-bhat"
    },
    {
      name: "Rajesh Kumar",
      role: "Senior Partner",
      bio: "20+ years in corporate finance & strategic advisory. Expert in cross-border transactions and international tax structuring.",
      details: [
        "Corporate Finance",
        "Strategic Planning",
        "Cross-border Transactions",
        "International Tax Structuring",
        "Business Transformation",
        "Financial Restructuring"
      ],
      image: Na,
      linkedin: "https://linkedin.com/in/rajesh-kumar",
      email: "rajesh@deeptrust.one",
      facebook: "https://facebook.com/rajesh-kumar",
      twitter: "https://twitter.com/rajesh-kumar"
    },
    {
      name: "Priya Sharma",
      role: "Partner - Technology & Innovation",
      bio: "Former CTO. Expert in AI, fintech, digital transformation, regulatory technology & compliance automation.",
      details: [
        "AI & Machine Learning",
        "Fintech Solutions",
        "Digital Transformation",
        "Regulatory Technology",
        "Compliance Automation",
        "Technology Strategy"
      ],
      image: Ch,
      linkedin: "https://linkedin.com/in/priya-sharma",
      email: "priya@deeptrust.one",
      facebook: "https://facebook.com/priya-sharma",
      twitter: "https://twitter.com/priya-sharma"
    },
    {
      name: "Amit Patel",
      role: "Partner - Risk & Compliance",
      bio: "18+ years in financial services. Specialist in GRC frameworks, regulatory reporting & enterprise risk management.",
      details: [
        "GRC Frameworks",
        "Regulatory Reporting",
        "Enterprise Risk Management",
        "Compliance Programs",
        "Risk Assessment",
        "Regulatory Advisory"
      ],
      image: Ca,
      linkedin: "https://linkedin.com/in/amit-patel",
      email: "amit@deeptrust.one",
      facebook: "https://facebook.com/amit-patel",
      twitter: "https://twitter.com/amit-patel"
    },
    {
      name: "Neha Gupta",
      role: "Partner - Strategy & Operations",
      bio: "Expert in operational excellence, process optimization & organizational transformation. Led initiatives for global enterprises.",
      details: [
        "Operational Excellence",
        "Process Optimization",
        "Organizational Transformation",
        "Change Management",
        "Strategic Planning",
        "Performance Improvement"
      ],
      image: An,
      linkedin: "https://linkedin.com/in/neha-gupta",
      email: "neha@deeptrust.one",
      facebook: "https://facebook.com/neha-gupta",
      twitter: "https://twitter.com/neha-gupta"
    },
    {
      name: "Vikram Singh",
      role: "Partner - Business Development",
      bio: "15+ years in strategic partnerships & growth. Expert in market expansion & client relationship management.",
      details: [
        "Strategic Partnerships",
        "Business Growth",
        "Market Expansion",
        "Client Relationship Management",
        "Sales Strategy",
        "Revenue Optimization"
      ],
      image: Na,
      linkedin: "https://linkedin.com/in/vikram-singh",
      email: "vikram@deeptrust.one",
      facebook: "https://facebook.com/vikram-singh",
      twitter: "https://twitter.com/vikram-singh"
    },
  ];

  return (
    <section id="team" className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
          <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-widest text-primary mb-2">Company Team</div>
          <h2 className="text-4xl md:text-5xl font-bold">Our Amazing Team</h2>
          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
              Meet the talented individuals driving innovation and excellence at DeepTrust. 
              Our team combines deep domain expertise with cutting-edge technology to deliver exceptional value.
          </p>
        </div>

          {/* Main Display Area - Card on Left, Image and Photos on Right */}
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-start">
              {/* Left Card with Details - Golden Brown */}
              <Card className="bg-gradient-to-br from-amber-700/95 to-amber-800/95 border-amber-600/50 shadow-2xl rounded-2xl overflow-hidden">
                <CardContent className="p-8 text-white relative min-h-[400px] flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-4xl font-bold mb-2">{members[selectedMember].name}</h3>
                    <p className="text-xl md:text-2xl text-amber-100 mb-6">{members[selectedMember].role}</p>
                    <p className="text-base md:text-lg text-white leading-relaxed mb-6">
                      {members[selectedMember].bio}
                    </p>
                    
                    {/* Details Section */}
                    <div className="mt-6 pt-6 border-t border-white/20">
                      <h4 className="text-lg font-semibold mb-4 text-amber-100">Key Expertise</h4>
                      <ul className="space-y-2 text-sm text-white/90">
                        {members[selectedMember].details?.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-amber-200 mt-1">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Bottom Section with Social Icons and Navigation */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/20">
                    {/* Social Media Icons - Bottom Left */}
                    <div className="flex items-center gap-3">
                      <a 
                        href={members[selectedMember].facebook} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border-2 border-white/30 hover:border-white/50 flex items-center justify-center transition-colors bg-transparent"
                      >
                        <Facebook className="w-5 h-5 text-white" />
                      </a>
                      <a 
                        href={members[selectedMember].twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border-2 border-white/30 hover:border-white/50 flex items-center justify-center transition-colors bg-transparent"
                      >
                        <Twitter className="w-5 h-5 text-white" />
                      </a>
                      <a 
                        href={members[selectedMember].linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border-2 border-white/30 hover:border-white/50 flex items-center justify-center transition-colors bg-transparent"
                      >
                        <Linkedin className="w-5 h-5 text-white" />
                      </a>
                    </div>

                    {/* Navigation Button - Bottom Right */}
                    <Button
                      onClick={() => setSelectedMember((selectedMember + 1) % members.length)}
                      className="w-12 h-12 rounded-full bg-black text-white hover:bg-black/80 flex items-center justify-center transition-all duration-300 hover:scale-110 p-0"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Right Side - Main Image and Horizontal Scrollable Photos */}
              <div className="flex flex-col gap-4">
                {/* Main Selected Member Image */}
                <div className="relative rounded-xl overflow-hidden shadow-lg w-48 h-64 md:w-56 md:h-72">
                  <img 
                    src={members[selectedMember].image} 
                    alt={members[selectedMember].name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Horizontal Scrollable Photos */}
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                  {members.map((m, index) => (
                    <div
                      key={m.name}
                      onClick={() => setSelectedMember(index)}
                      className={`flex-shrink-0 cursor-pointer transition-all duration-300 ${
                        selectedMember === index 
                          ? 'scale-105 opacity-100' 
                          : 'hover:scale-105 opacity-60 hover:opacity-80'
                      }`}
                    >
                      <div className="relative rounded-xl overflow-hidden shadow-lg w-32 h-40 md:w-36 md:h-48">
                        <img 
                          src={m.image} 
                          alt={m.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
};

export default Team;


