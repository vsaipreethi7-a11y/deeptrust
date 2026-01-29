import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white selection:bg-brand-primary/30">
            <Navigation />

            <main className="container mx-auto px-4 pt-32 pb-20 max-w-4xl">
                <div className="animate-fade-in">
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </button>

                    <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Privacy Policy
                    </h1>

                    <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-8">
                        <p className="lead text-xl text-gray-400">
                            At DEEPTRUST.ONE, we are committed to protecting your privacy and ensuring the responsible handling of your personal and business information. This Privacy Policy explains what information we collect, how we use it, with whom we share it, and the rights you have in relation to your data.
                        </p>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">1. Information We Collect</h2>
                            <p>We collect information necessary to deliver, improve, secure, and personalize our Services.</p>

                            <h3 className="text-xl font-medium text-white mt-6 mb-3">1.1 Personal Information</h3>
                            <p>We collect personal information you voluntarily provide when interacting with us, including but not limited to:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>Full name</li>
                                <li>Email address</li>
                                <li>Phone number</li>
                                <li>Company or organization name</li>
                                <li>Job title or role</li>
                                <li>Login credentials (e.g., username, password – securely hashed)</li>
                                <li>Information submitted via contact forms, demo requests, support tickets, newsletter sign-ups, or subscription processes</li>
                            </ul>

                            <h3 className="text-xl font-medium text-white mt-6 mb-3">1.2 Business & Enterprise Data</h3>
                            <p>For enterprise customers and platform users, we may process:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>Business contact details (e.g., billing/admin contacts)</li>
                                <li>System configuration settings</li>
                                <li>Usage metadata (e.g., feature usage frequency, API calls)</li>
                                <li>Platform interaction logs (e.g., timestamps, user actions)</li>
                            </ul>
                            <div className="bg-white/5 border-l-4 border-brand-primary p-4 my-4">
                                <p className="text-sm">
                                    <strong>Note:</strong> DEEPTRUST.ONE acts as a Data Processor for enterprise customer data and processes such data solely in accordance with our Data Processing Agreement (DPA) and your instructions.
                                </p>
                            </div>

                            <h3 className="text-xl font-medium text-white mt-6 mb-3">1.3 Non-Personal & Technical Information</h3>
                            <p>We automatically collect technical data through your use of our Services, including:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>IP address</li>
                                <li>Browser type, version, and language</li>
                                <li>Device type, model, and operating system</li>
                                <li>Pages visited, clickstream data, session duration, and referral URLs</li>
                                <li>Cookies, pixels, beacons, and similar tracking technologies</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">2. How We Use Your Information</h2>

                            <h3 className="text-xl font-medium text-white mt-6 mb-3">2.1 Use of Personal Information</h3>
                            <p>We use personal information to:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>Deliver, operate, maintain, and improve our Services</li>
                                <li>Respond to inquiries, provide customer support, and manage accounts</li>
                                <li>Personalize your experience and recommend relevant features</li>
                                <li>Send service-related communications (e.g., security alerts, updates, policy changes)</li>
                                <li>Share marketing content (e.g., newsletters, product announcements)—you may opt out at any time</li>
                                <li>Fulfill contractual obligations (e.g., invoicing, onboarding)</li>
                                <li>Detect, prevent, and investigate fraud, security incidents, or misuse</li>
                            </ul>

                            <h3 className="text-xl font-medium text-white mt-6 mb-3">2.2 Use of Non-Personal & Aggregated Data</h3>
                            <p>We use anonymized or aggregated data to:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>Analyze trends, user behavior, and platform performance</li>
                                <li>Optimize website navigation and user interface</li>
                                <li>Monitor system reliability, uptime, and threat patterns</li>
                                <li>Generate internal reports and business insights</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">3. Legal Basis for Processing (Where Applicable)</h2>
                            <p>Our processing of personal data is based on one or more of the following lawful grounds:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>Consent (e.g., for marketing communications)</li>
                                <li>Contractual necessity (to provide requested Services)</li>
                                <li>Legal compliance (e.g., tax, audit, or regulatory reporting)</li>
                                <li>Legitimate interests (e.g., platform security, service improvement), balanced against your rights</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">4. Cookies & Tracking Technologies</h2>
                            <p>We use cookies and similar technologies to:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>Enable essential website functions (e.g., login sessions)</li>
                                <li>Remember preferences and settings</li>
                                <li>Analyze traffic and measure campaign effectiveness</li>
                                <li>Enhance site performance and user experience</li>
                            </ul>
                            <p className="mt-4">
                                You may manage or disable non-essential cookies via your browser settings or our Cookie Preference Center (if available). Disabling cookies may limit certain functionalities.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">5. Data Protection & Security</h2>
                            <p>We implement industry-standard safeguards to protect your data, including:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>Encryption of data in transit (TLS 1.2+) and at rest (AES-256)</li>
                                <li>Role-based access controls and multi-factor authentication (MFA)</li>
                                <li>Secure cloud infrastructure hosted with reputable providers (e.g., AWS, Azure)</li>
                                <li>Regular security assessments, vulnerability scans, and penetration testing</li>
                                <li>Employee confidentiality agreements and data handling training</li>
                            </ul>
                            <p className="mt-4">
                                While we strive to protect your information, no digital transmission or storage system is 100% secure. We cannot guarantee absolute security.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">6. Sharing of Information</h2>
                            <p>We do not sell, rent, or trade your personal information. We may disclose it only under the following circumstances:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>To trusted third-party service providers (e.g., hosting, email, analytics) bound by strict confidentiality and data processing agreements</li>
                                <li>To comply with legal obligations, court orders, subpoenas, or government requests</li>
                                <li>To protect the rights, property, safety, or operations of DEEPTRUST.ONE, our users, or the public</li>
                                <li>In aggregated or anonymized form that cannot identify individuals</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">7. Third-Party Links & Services</h2>
                            <p>
                                Our website or platform may include links to third-party websites, plugins, or services (e.g., social media, payment gateways).
                                We are not responsible for their privacy practices or content. We encourage you to review their respective privacy policies before sharing any information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">8. Data Retention</h2>
                            <p>We retain personal information only as long as necessary to:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>Fulfill the purposes outlined in this policy</li>
                                <li>Comply with legal, tax, accounting, or regulatory requirements</li>
                                <li>Resolve disputes, enforce agreements, or address security issues</li>
                            </ul>
                            <p className="mt-4">
                                Retention periods vary by data type and purpose. Upon request (where applicable), we will delete or anonymize your data unless retention is legally required.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">9. Your Rights & Choices</h2>
                            <p>Depending on your jurisdiction, you may have the right to:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>Access, correct, or update your personal data</li>
                                <li>Request deletion or restriction of processing</li>
                                <li>Withdraw consent (without affecting prior processing)</li>
                                <li>Object to processing based on legitimate interests</li>
                                <li>Receive your data in a portable format (data portability)</li>
                                <li>Lodge a complaint with a supervisory authority</li>
                            </ul>
                            <p className="mt-4">
                                To exercise these rights, please contact us using the details below. We respond to verified requests within 30 days.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">10. International Data Transfers</h2>
                            <p>
                                Your information may be transferred to, processed in, or stored in countries outside your country of residence—including jurisdictions with different data protection laws.
                                When transferring data internationally, we ensure appropriate safeguards are in place, such as:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>Standard Contractual Clauses (SCCs)</li>
                                <li>Binding Corporate Rules (where applicable)</li>
                                <li>Compliance with adequacy decisions (e.g., EU-US Data Privacy Framework)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">11. Changes to This Privacy Policy</h2>
                            <p>
                                We may update this Privacy Policy periodically to reflect changes in our practices, legal obligations, or Services.
                                The “Last Updated” date at the top will be revised accordingly.
                                Continued use of our Services after changes constitutes your acceptance of the updated policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">12. Your Acceptance</h2>
                            <p>
                                By accessing or using DEEPTRUST.ONE, you acknowledge that you have read, understood, and agreed to this Privacy Policy.
                                If you do not agree, please discontinue use of our Services immediately.
                            </p>
                        </section>

                        <section className="bg-white/5 p-8 rounded-lg mt-12">
                            <h2 className="text-2xl font-semibold text-white mb-6">13. Contact Us</h2>
                            <p className="mb-6">
                                For questions, concerns, or to submit a data subject request, please contact our Data Protection Team:
                            </p>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-white">Email Us</h3>
                                    <a href="mailto:advisor@trustone.consulting" className="text-brand-primary hover:underline">advisor@trustone.consulting</a>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-white">Call Us</h3>
                                    <a href="tel:+919004090839" className="text-gray-300 hover:text-white transition-colors">+91 9004090839</a>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-white">WhatsApp</h3>
                                    <a href="https://wa.me/919004090839" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">+91 9004090839</a>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-white">Visit Us</h3>
                                    <p className="text-gray-300">
                                        Parinee Crescenzo,<br />
                                        G Block BKC, Bandra East,<br />
                                        Mumbai, Maharashtra 400051
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
