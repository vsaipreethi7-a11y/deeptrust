import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle, User, Briefcase, Building, Globe, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sendToAirtable } from "@/lib/airtable";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    designation: "",
    contactNumber: "",
    location: "",
    serviceInterest: "",
    referralSource: "",
    message: "",
    agreed: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreed) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the Privacy Policy and Terms & Conditions.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
      const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
      const AIRTABLE_TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME || "Inquires";

      if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
        console.warn("Airtable credentials missing.");
        toast({
          title: "Configuration Missing",
          description: "Ideally this would save to Airtable, but credentials are not set in .env",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      // Map form values to human-readable labels for Airtable Single Select fields
      const serviceMap: Record<string, string> = {
        "due_diligence": "Automated Due Diligence",
        "contract_review": "Contract Review",
        "compliance": "Compliance Automation",
        "other": "Other"
      };

      const sourceMap: Record<string, string> = {
        "linkedin": "LinkedIn",
        "google": "Google Search",
        "referral": "Client Referral",
        "social_media": "Social Media",
        "other": "Other"
      };

      const submissionData = {
        "Name": formData.fullName,
        "Email": formData.email,
        "Company": formData.companyName,
        "Designation": formData.designation,
        "Phone": formData.contactNumber,
        "Location": formData.location,
        "Service Interest": serviceMap[formData.serviceInterest] || formData.serviceInterest,
        "Source": sourceMap[formData.referralSource] || formData.referralSource,
        "Message": formData.message,
        "Status": "New"
      };

      const { success, error } = await sendToAirtable(AIRTABLE_TABLE_NAME, submissionData);

      if (success) {
        toast({
          title: "Inquiry Sent Successfully!",
          description: "Thank you for reaching out. We will get back to you shortly.",
        });

        // Reset form
        setFormData({
          fullName: "",
          email: "",
          companyName: "",
          designation: "",
          contactNumber: "",
          location: "",
          serviceInterest: "",
          referralSource: "",
          message: "",
          agreed: false,
        });
      } else {
        throw new Error(error);
      }
    } catch (error: any) {
      console.error("Submission error details:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "Something went wrong. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({ ...formData, agreed: checked });
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Connect <span className="text-primary">With Us</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your contract management? Let's discuss requirements
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-fade-in-up">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-card transition-all duration-300">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="p-3 rounded-xl bg-primary/10 text-primary mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Email Us</h3>
              <p className="text-muted-foreground text-sm">advisor@trustone.consulting</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-card transition-all duration-300 cursor-pointer" onClick={() => window.location.href = "tel:+919004090839"}>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="p-3 rounded-xl bg-primary/10 text-primary mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Call Us</h3>
              <p className="text-muted-foreground text-sm hover:text-primary transition-colors">+91 9004090839</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-card transition-all duration-300 cursor-pointer" onClick={() => window.open("https://wa.me/919004090839", "_blank")}>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="p-3 rounded-xl bg-green-500/10 text-green-500 mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">WhatsApp</h3>
              <p className="text-green-500 text-sm font-medium">+91 9004090839</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-card transition-all duration-300">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="p-3 rounded-xl bg-primary/10 text-primary mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Visit Us</h3>
              <p className="text-muted-foreground text-sm">Parinee Crescenzo,<br />G Block BKC, Bandra East,<br />Mumbai, Maharashtra 400051</p>
            </CardContent>
          </Card>
        </div>

        {/* Extended Contact Form */}
        <div className="max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-elegant">
            <CardContent className="p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Row 1 */}
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="flex items-center text-sm font-medium text-foreground gap-2">
                      <User className="w-4 h-4 text-primary" /> Full Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="bg-background/50 h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="flex items-center text-sm font-medium text-foreground gap-2">
                      <Mail className="w-4 h-4 text-primary" /> Corporate Email <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@company.com"
                      className="bg-background/50 h-12"
                    />
                  </div>

                  {/* Row 2 */}
                  <div className="space-y-2">
                    <label htmlFor="companyName" className="flex items-center text-sm font-medium text-foreground gap-2">
                      <Building className="w-4 h-4 text-primary" /> Company Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      placeholder="Your Company"
                      className="bg-background/50 h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="designation" className="flex items-center text-sm font-medium text-foreground gap-2">
                      <Briefcase className="w-4 h-4 text-primary" /> Designation <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="designation"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      required
                      placeholder="Your Role"
                      className="bg-background/50 h-12"
                    />
                  </div>

                  {/* Row 3 */}
                  <div className="space-y-2">
                    <label htmlFor="contactNumber" className="flex items-center text-sm font-medium text-foreground gap-2">
                      <Phone className="w-4 h-4 text-primary" /> Contact Number <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="contactNumber"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="bg-background/50 h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="location" className="flex items-center text-sm font-medium text-foreground gap-2">
                      <MapPin className="w-4 h-4 text-primary" /> Location <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      placeholder="City, State"
                      className="bg-background/50 h-12"
                    />
                  </div>

                  {/* Row 4 */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-foreground gap-2">
                      <MessageSquare className="w-4 h-4 text-primary" /> Service Interest <span className="text-destructive">*</span>
                    </label>
                    <Select onValueChange={(value) => handleSelectChange("serviceInterest", value)}>
                      <SelectTrigger className="bg-background/50 h-12">
                        <SelectValue placeholder="Select Service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="due_diligence">Automated Due Diligence</SelectItem>
                        <SelectItem value="contract_review">Contract Review</SelectItem>
                        <SelectItem value="compliance">Compliance Automation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-foreground gap-2">
                      <Globe className="w-4 h-4 text-primary" /> How did you find us?
                    </label>
                    <Select onValueChange={(value) => handleSelectChange("referralSource", value)}>
                      <SelectTrigger className="bg-background/50 h-12">
                        <SelectValue placeholder="Select Source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="google">Google Search</SelectItem>
                        <SelectItem value="referral">Client Referral</SelectItem>
                        <SelectItem value="social_media">Social Media</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="flex items-center text-sm font-medium text-foreground gap-2">
                    <MessageCircle className="w-4 h-4 text-primary" /> Your Message <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about your security requirements..."
                    rows={6}
                    className="bg-background/50 resize-none"
                  />
                </div>

                {/* Terms */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreed}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground"
                  >
                    I agree to the <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a> and <a href="/terms-conditions" className="text-primary hover:underline">Terms & Conditions</a>
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg rounded-xl shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-[1.01]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Inquiry
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
