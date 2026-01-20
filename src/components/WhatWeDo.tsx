import { Card, CardContent } from "@/components/ui/card";

const WhatWeDo = () => {
  return (
    <section id="what-we-do" className="py-24 bg-gradient-to-b from-muted/10 to-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-primary">Why DeepTrust?</h2>
        </div>

        <div className="bg-card/50 border border-border rounded-2xl p-8 md:p-10 lg:p-12 shadow-lg">
          <div className="space-y-6 text-justify">
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              DeepTrust delivers a full-spectrum financial technology platform that transforms how businesses manage international finance. Through cutting-edge AI, blockchain innovation, and our vast integration network of 300+ connectors, we streamline complex financial operations while ensuring maximum security and compliance.
            </p>
            
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              Our platform eliminates the friction of cross-border transactions, reduces compliance overhead by up to 70%, and provides unprecedented visibility into global financial operations. Whether you're processing multi-million dollar M&A transactions or managing complex supply chain payments, DeepTrust provides the secure foundation for global growth.
            </p>
            
            <p className="text-base md:text-lg text-foreground leading-relaxed pt-4">
              Experience the Future of Global Finance - Contact us to schedule a platform demonstration and see how our integrated solutions can transform your international financial operations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;


