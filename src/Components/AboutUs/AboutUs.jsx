import {useState, useEffect} from 'react';
import TopHeader from "../common/TopHeader/TopHeader.jsx";
import Footer from "../common/Footer/Footer.jsx";
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {

    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/dashboard#');
    };

    useEffect(() => {
        const fadeElements = document.querySelectorAll('.fade-element');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-active');
                }
            });
        }, {threshold: 0.1});

        fadeElements.forEach(element => {
            observer.observe(element);
        });

        return () => {
            fadeElements.forEach(element => {
                observer.unobserve(element);
            });
        };
    }, []);

    return (
        <>
            <TopHeader/>
            <div className="bg-green-50 text-gray-800">
                {/* Hero Section */}
                <section
                    className="relative overflow-hidden bg-gradient-to-r from-green-800 to-green-700 text-white py-16">
                    <div className="absolute inset-0 opacity-10">
                        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="w-full h-full">
                            <circle cx="100" cy="100" r="80" fill="white"/>
                            <circle cx="900" cy="300" r="120" fill="white"/>
                            <circle cx="300" cy="800" r="100" fill="white"/>
                            <circle cx="700" cy="700" r="70" fill="white"/>
                            <circle cx="500" cy="200" r="90" fill="white"/>
                            <circle cx="200" cy="500" r="60" fill="white"/>
                        </svg>
                    </div>
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-3xl mx-auto text-center fade-element">
                            <h1 className="text-4xl font-bold mb-4 leading-tight">Welcome to TrackTidy – Your Smart Home
                                Budgeting Companion</h1>
                            <p className="text-xl opacity-90">At TrackTidy, we believe that managing your household
                                shouldn't be stressful or time-consuming. That's why we created an intelligent platform
                                that simplifies home inventory management, budgeting, and service tracking — all in one
                                place.</p>
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        <div className="max-w-3xl mx-auto text-center fade-element">
                            <h2 className="text-3xl font-bold mb-6 text-green-800">Our Mission</h2>
                            <p className="text-lg mb-6">
                                Our mission is to help individuals and families <span
                                className="font-bold text-green-800">stay organized, save smarter, and spend wisely</span> by
                                providing personalized package suggestions based on real-time income and spending
                                behaviors.
                            </p>
                        </div>
                    </div>
                </section>

                {/* What We Do Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12 fade-element">
                            <h2 className="text-3xl font-bold mb-4 text-green-800">What We Do</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                TrackTidy is designed to streamline your household budgeting through:
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div
                                className="bg-white p-8 rounded-lg shadow-lg transition-transform duration-300 hover:transform hover:-translate-y-2 fade-element">
                                <div
                                    className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-800 mb-6 mx-auto">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                                        <path fillRule="evenodd"
                                              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-center text-green-800">Smart Inventory
                                    Tracking</h3>
                                <p className="text-gray-600 text-center">
                                    Keep tabs on your household items and receive timely reminders before things run
                                    out.
                                </p>
                            </div>

                            <div
                                className="bg-white p-8 rounded-lg shadow-lg transition-transform duration-300 hover:transform hover:-translate-y-2 fade-element">
                                <div
                                    className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-800 mb-6 mx-auto">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-center text-green-800">AI-Powered Package
                                    Selection</h3>
                                <p className="text-gray-600 text-center">
                                    Let our AI assistant recommend budget-friendly packages based on your monthly
                                    income, priorities, and preferences.
                                </p>
                            </div>

                            <div
                                className="bg-white p-8 rounded-lg shadow-lg transition-transform duration-300 hover:transform hover:-translate-y-2 fade-element">
                                <div
                                    className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-800 mb-6 mx-auto">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-center text-green-800">Customized
                                    Spending Insights</h3>
                                <p className="text-gray-600 text-center">
                                    Understand where your money goes with detailed breakdowns in categories like <span
                                    className="font-semibold text-green-800">Grocery Shopping, Maintenance & Services, and Home Appliances.</span>
                                </p>
                            </div>
                        </div>
                        <div className="text-center mt-12 fade-element">
                            <p className="text-lg max-w-3xl mx-auto">
                                Whether you're looking for a pre-defined package or a personalized budget plan,
                                TrackTidy guides you every step of the way — from logging your expenses to getting the
                                most value for your money.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Vision Section */}
                <section className="py-16 bg-green-800 text-white">
                    <div className="container mx-auto px-6">
                        <div className="max-w-3xl mx-auto text-center fade-element">
                            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                            <p className="text-xl mb-6">
                                To empower every home with smart tools that promote <span className="font-bold">financial awareness</span>, <span
                                className="font-bold">organized living</span>, and <span className="font-bold">sustainable spending habits</span>.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-16 bg-green-100">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12 fade-element">
                            <h2 className="text-3xl font-bold mb-4 text-green-800">Our Values</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div
                                className="bg-white p-8 rounded-lg shadow-lg text-center transition-transform duration-300 hover:transform hover:-translate-y-2 fade-element">
                                <div className="text-4xl text-green-700 mb-4">💡</div>
                                <h3 className="text-xl font-semibold mb-4 text-green-800">Simplicity</h3>
                                <p className="text-gray-600">
                                    We build with the user in mind: clean, intuitive, and efficient.
                                </p>
                            </div>

                            <div
                                className="bg-white p-8 rounded-lg shadow-lg text-center transition-transform duration-300 hover:transform hover:-translate-y-2 fade-element">
                                <div className="text-4xl text-green-700 mb-4">🤝</div>
                                <h3 className="text-xl font-semibold mb-4 text-green-800">Trust</h3>
                                <p className="text-gray-600">
                                    Your data and preferences are always respected and securely handled.
                                </p>
                            </div>

                            <div
                                className="bg-white p-8 rounded-lg shadow-lg text-center transition-transform duration-300 hover:transform hover:-translate-y-2 fade-element">
                                <div className="text-4xl text-green-700 mb-4">🚀</div>
                                <h3 className="text-xl font-semibold mb-4 text-green-800">Innovation</h3>
                                <p className="text-gray-600">
                                    We continuously improve through AI and technology to serve you better.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Thank You Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="max-w-3xl mx-auto text-center fade-element">
                            <h2 className="text-3xl font-bold mb-6 text-green-800">Thank You for Choosing TrackTidy</h2>
                            <p className="text-xl mb-8">Where smart living begins.</p>
                            <button onClick={handleGetStarted}
                                className="px-8 py-3 bg-green-800 hover:bg-green-900 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                                Get Started Today
                            </button>
                        </div>
                    </div>
                </section>

                <style jsx>{`
                    .fade-element {
                        opacity: 0;
                        transform: translateY(20px);
                        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
                    }

                    .fade-active {
                        opacity: 1;
                        transform: translateY(0);
                    }
                `}</style>
            </div>
            <Footer />
        </>
    );
}

export default AboutUs;