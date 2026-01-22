import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const TermsConditions = () => {
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
                        Terms and Conditions
                    </h1>

                    <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-8">
                        <p className="lead text-xl text-gray-400">
                            Welcome to DEEPTRUST.ONE. These Terms and Conditions ("Terms") govern your access to and use of the DEEPTRUST.ONE platform, website, and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
                        </p>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">1. Acceptance of Terms</h2>
                            <p>
                                By registering for, accessing, or using our Services, you agree to these Terms and our Privacy Policy. If you are entering into these Terms on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to these Terms. If you do not agree to these Terms, you must not access or use usage of our Services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">2. Description of Services</h2>
                            <p>
                                DEEPTRUST.ONE provides an AI-powered platform for deep trust analytics and related services. We reserve the right to modify, suspend, or discontinue any part of the Services at any time, with or without notice. We will not be liable to you or any third party for any modification, suspension, or discontinuance of the Services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">3. User Accounts</h2>
                            <p>
                                To access certain features of the Services, you may be required to register for an account. You agree to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>Provide accurate, current, and complete information during the registration process.</li>
                                <li>Maintain and promptly update your account information.</li>
                                <li>Maintain the security of your password and accept all risks of unauthorized access to your account.</li>
                                <li>Notify us immediately if you discover or suspect any security breaches related to the Services.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">4. Intellectual Property Rights</h2>
                            <p>
                                The Services and their entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by DEEPTRUST.ONE, its licensors, or other providers of such material and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                            </p>
                            <p className="mt-4">
                                You are granted a limited, non-exclusive, non-transferable, revocable license to access and use the Services for your internal business purposes, subject to these Terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">5. User Conduct and Prohibited Activities</h2>
                            <p>You agree not to engage in any of the following prohibited activities:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>Using the Services for any illegal purpose or in violation of any local, state, national, or international law.</li>
                                <li>reverse engineering, decompiling, disassembling, or otherwise attempting to discover the source code of the Services.</li>
                                <li>Interfering with or disrupting the security, integrity, or performance of the Services.</li>
                                <li>Attempting to gain unauthorized access to the Services or related systems or networks.</li>
                                <li>Harassing, threatening, or defaming any person or entity.</li>
                                <li>Uploading or transmitting viruses or other malicious code.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">6. Data Privacy and Security</h2>
                            <p>
                                Our collection and use of personal data are governed by our Privacy Policy. By using the Services, you consent to the collection and use of your data as outlined therein. We implement industry-standard security measures to protect your data, but we cannot guarantee absolute security.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">7. Confidentiality</h2>
                            <p>
                                "Confidential Information" means all information disclosed by a party ("Disclosing Party") to the other party ("Receiving Party"), whether orally or in writing, that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information and the circumstances of disclosure. The Receiving Party agrees to protect the confidentiality of the Disclosing Party's Confidential Information with the same degree of care that it uses to protect its own confidential information of like kind (but in no event less than reasonable care).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">8. Disclaimer of Warranties</h2>
                            <p className="uppercase text-sm tracking-wide text-gray-400 mb-2">Please read this section carefully.</p>
                            <p>
                                THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. DEEPTRUST.ONE DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">9. Limitation of Liability</h2>
                            <p>
                                TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT WILL DEEPTRUST.ONE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOST PROFITS, DATA LOSS, OR BUSINESS INTERRUPTION, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICES, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">10. Indemnification</h2>
                            <p>
                                You agree to defend, indemnify, and hold harmless DEEPTRUST.ONE and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable legal fees, arising out of or in any way connected with your access to or use of the Services or your violation of these Terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">11. Governing Law and Dispute Resolution</h2>
                            <p>
                                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. Any dispute arising out of or relating to these Terms or the Services shall be subject to the exclusive jurisdiction of the courts located in Bengaluru, India.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mt-12 mb-4">12. Changes to Terms</h2>
                            <p>
                                We may revise these Terms from time to time. The most current version will always be posted on our website. By continuing to access or use the Services after revisions become effective, you agree to be bound by the revised Terms.
                            </p>
                        </section>

                        <section className="bg-white/5 p-8 rounded-lg mt-12">
                            <h2 className="text-2xl font-semibold text-white mb-6">13. Contact Information</h2>
                            <p className="mb-6">
                                If you have any questions about these Terms, please contact us at:
                            </p>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-white">Email Us</h3>
                                    <a href="mailto:Sanat@deeptrust.in" className="text-brand-primary hover:underline">Sanat@deeptrust.in</a>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-white">Call Us</h3>
                                    <a href="tel:+919004090839" className="text-gray-300 hover:text-white transition-colors">+91 90040 90839</a>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-white">WhatsApp</h3>
                                    <a href="https://wa.me/919004090839" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">+91 90040 90839</a>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-white">Visit Us</h3>
                                    <p className="text-gray-300">
                                        123 AI Technology Drive<br />
                                        San Francisco, CA 94105
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

export default TermsConditions;
