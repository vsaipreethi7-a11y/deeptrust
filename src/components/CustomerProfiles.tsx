
import { Building2, Globe2, Landmark } from "lucide-react";
import { Button } from "./ui/button";

const CustomerProfiles = () => {
    const profiles = [
        {
            title: "Global Enterprises",
            icon: Globe2,
            description: "For large-scale organizations managing complex operations across multiple jurisdictions.",
            features: ["Multi-jurisdictional Compliance", "Enterprise Risk Management", "Automated Workflows"],
            color: "from-blue-500/20 to-cyan-500/20",
            iconColor: "text-blue-500"
        },
        {
            title: "MNC Banks",
            icon: Landmark,
            description: "For multinational banking institutions requiring strict regulatory adherence and fraud prevention.",
            features: ["Global Regulatory Advisory", "Cross-Border Transaction Monitoring", "Fraud Detection"],
            color: "from-purple-500/20 to-pink-500/20",
            iconColor: "text-purple-500"
        },
        {
            title: "SEZ & Free Trade Zones",
            icon: Building2,
            description: "For Special Economic Zones and Free Trade Zones optimizing trade and compliance.",
            features: ["Customs & Trade Compliance", "Zone-Specific Regulations", "Tenant Management"],
            color: "from-emerald-500/20 to-teal-500/20",
            iconColor: "text-emerald-500"
        }
    ];

    const scrollToOfferings = () => {
        const element = document.getElementById("offerings");
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section className="py-20 bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                        Who We Serve
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Tailored solutions for complex regulatory environments and global operations.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {profiles.map((profile, index) => (
                        <div
                            key={index}
                            className="group relative bg-card hover:bg-card/50 border border-border/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/20"
                        >
                            {/* Gradient Blob */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${profile.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl`} />

                            <div className="relative z-10">
                                <div className={`w-16 h-16 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                    <profile.icon className={`w-8 h-8 ${profile.iconColor}`} />
                                </div>

                                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                                    {profile.title}
                                </h3>

                                <p className="text-muted-foreground mb-8 leading-relaxed">
                                    {profile.description}
                                </p>

                                <ul className="space-y-3 mb-8">
                                    {profile.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-sm text-foreground/80">
                                            <div className={`w-1.5 h-1.5 rounded-full bg-current mr-3 ${profile.iconColor}`} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    onClick={scrollToOfferings}
                                    variant="outline"
                                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                                >
                                    Explore Solutions
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomerProfiles;
