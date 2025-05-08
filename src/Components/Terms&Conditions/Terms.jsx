import React from 'react';
import Footer from "../common/Footer/Footer.jsx";
import TopHeader from "../common/TopHeader/TopHeader.jsx";

const TermsAndConditions = () => {
    return (
        <>
            <TopHeader />
            <div className="bg-green-800">
                <div className="max-w-7xl mx-auto p-6 sm:p-10 justify-start text-start text-green-50">
                    <h1 className="text-3xl font-bold text-green-50 mb-2">Terms & Conditions</h1>
                    <p className="text-sm text-gray-200 mb-6"><strong>Last updated: April 14, 2025</strong></p>

                    <div className="space-y-10">
                        <section>
                            <h2 className="text-xl font-semibold text-green-300 mb-2">1. Agreement to Terms</h2>
                            <p className="text-gray-200">
                                By accessing or using Tidy Track CRM, you agree to be bound by these Terms and Conditions.
                                If you disagree with any part of the terms, you may not access the service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-green-300 mb-2">2. Subscription Terms</h2>
                            <p className="text-gray-200 mb-2">Your subscription to Tidy Track CRM is subject to the following terms:</p>
                            <ul className="list-disc pl-5 space-y-1 text-gray-200">
                                <li>Subscription fees are billed monthly or annually</li>
                                <li>Automatic renewal unless cancelled</li>
                                <li>Pro-rated refunds for annual plans</li>
                                <li>Price changes with 30 days notice</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-green-300 mb-2">3. Use of Service</h2>
                            <p className="text-gray-200 mb-2">You agree not to:</p>
                            <ul className="list-disc pl-5 space-y-1 text-gray-200">
                                <li>Use the service for illegal purposes</li>
                                <li>Violate any laws in your jurisdiction</li>
                                <li>Infringe on others' intellectual property</li>
                                <li>Transmit malicious code or content</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-green-300 mb-2">4. Intellectual Property</h2>
                            <p className="text-gray-200">
                                The service and its original content, features, and functionality are owned by Tidy Track CRM
                                and are protected by international copyright, trademark, patent, trade secret, and other
                                intellectual property laws.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-green-300 mb-2">5. Termination</h2>
                            <p className="text-gray-200">
                                We may terminate or suspend your account and access to the service immediately, without prior
                                notice or liability, under our sole discretion, for any reason whatsoever.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-green-300 mb-2">6. Limitation of Liability</h2>
                            <p className="text-gray-200">
                                In no event shall Tidy Track CRM be liable for any indirect, incidental, special,
                                consequential or punitive damages, including without limitation, loss of profits, data, use,
                                goodwill, or other intangible losses.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-green-300 mb-2">7. Contact Us</h2>
                            <p className="text-gray-200">
                                If you have any questions about these Terms, please contact us at{' '}
                                <a href="mailto:legal@tidytrack.io" className="text-green-200 hover:underline">
                                    tracktidy1@gmail.com
                                </a>
                            </p>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TermsAndConditions;
