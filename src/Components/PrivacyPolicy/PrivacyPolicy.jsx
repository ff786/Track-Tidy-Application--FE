import React from 'react';
import Footer from "../common/Footer/Footer.jsx";
import TopHeader from "../common/TopHeader/TopHeader.jsx";

const PrivacyPolicy = () => {
    return (
        <>
            <TopHeader/>
            <div className="bg-green-800">
                <div className="max-w-7xl mx-auto p-6 sm:p-10 justify-start text-start text-green-50">
                    <h1 className="text-3xl font-bold text-green-50 mb-2">Privacy Policy</h1>
                    <p className="text-sm text-gray-200 mb-6"><strong>Last updated: April 14, 2025</strong></p>

                    <div className="space-y-10">
                        <section>
                            <h2 className="text-xl font-semibold text-green-300 mb-2">1. Information We Collect</h2>
                            <p className="mb-2">We collect information that you provide directly to us, including:</p>
                            <ul className="list-disc pl-5 space-y-1 text-gray-200">
                                <li>Name and contact information</li>
                                <li>Business information</li>
                                <li>Payment information</li>
                                <li>Communications with us</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-green-300 mb-2">2. How We Use Your
                                Information</h2>
                            <p className="mb-2">We use the information we collect to:</p>
                            <ul className="list-disc pl-5 space-y-1 text-gray-200">
                                <li>Provide and maintain our services</li>
                                <li>Process your payments</li>
                                <li>Send you important updates</li>
                                <li>Improve our services</li>
                                <li>Respond to your requests</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-green-300 mb-2">3. Information Sharing</h2>
                            <p className="mb-2">We do not sell your personal information. We may share your information
                                with:</p>
                            <ul className="list-disc pl-5 space-y-1 text-gray-200">
                                <li>Service providers</li>
                                <li>Business partners</li>
                                <li>Legal authorities when required</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-green-300 mb-2">4. Data Security</h2>
                            <p className="text-gray-200">
                                We implement appropriate security measures to protect your personal information.
                                However, no
                                method of
                                transmission over the Internet is 100% secure.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-green-300 mb-2">5. Your Rights</h2>
                            <p className="mb-2">You have the right to:</p>
                            <ul className="list-disc pl-5 space-y-1 text-gray-200">
                                <li>Access your personal information</li>
                                <li>Correct inaccurate information</li>
                                <li>Request deletion of your information</li>
                                <li>Opt-out of marketing communications</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-green-300 mb-2">6. Contact Us</h2>
                            <p className="text-gray-200">
                                If you have any questions about this Privacy Policy, please contact us at{' '}
                                <a href="mailto:privacy@tidytrack.io" className="text-green-200 hover:underline">
                                    tracktidy1@gmail.com
                                </a>
                            </p>
                        </section>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default PrivacyPolicy;
