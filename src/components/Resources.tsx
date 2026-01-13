import { Card, CardContent } from "@/components/ui/card";

const Resources = () => {
  const columns = [
    {
      title: "Company",
      items: ["About", "Services", "AWS Cost Alerts", "Integrations", "Technology"],
    },
    {
      title: "Products",
      items: ["Automated Chatbot", "Data Security", "Virtual Reality", "Communication"],
    },
    {
      title: "Solution",
      items: ["Video & Podcasts", "Webinars", "Case Studies", "Web Analysis", "Web Development"],
    },
    {
      title: "Resources",
      items: ["All Resources", "Blog", "Documents", "Learning Center", "Support", "API"],
    },
  ];

  return (
    <section id="resources" className="py-24 bg-gradient-to-b from-background via-muted/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-widest text-primary mb-2">Resources</div>
          <h2 className="text-4xl md:text-5xl font-bold">Everything you need</h2>
          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
            Explore docs, solutions and materials to build faster and smarter.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {columns.map((col) => (
            <Card key={col.title} className="bg-card/60 border-border/50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">{col.title}</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {col.items.map((item) => (
                    <li key={item} className="hover:text-primary transition-colors cursor-default">{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;


