import React, {useState, useRef, useEffect} from "react";
import {Check, Home, ShoppingBag, Settings} from 'lucide-react';
import TopHeader from "../common/TopHeader/TopHeader.jsx";
import Footer from "../common/Footer/Footer.jsx";
import ChatBot from "react-chatbotify";
import TrackTidyChatbot from "../TrackTidyAI/TrackTidyAI.jsx";
import {App} from "antd";

const TrackPackages = () => {

    const [selectedPlan, setSelectedPlan] = useState(null);
    const [showChatbot, setShowChatbot] = useState(false);
    const modalRef = useRef(null);

    // Handle plan selection
    const selectPlan = (planName) => {
        setSelectedPlan(planName);
    };

    /*const handleSubscribe = async () => {

        try {
            const response = await fetch("http://localhost:8080/api/track-tidy/package/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
                },
                body: JSON.stringify({})
            });

            if (!response.ok) {
                throw new Error("Subscription failed");
            }
        } catch (error) {
            setErrors({ submit: error.message });
        }
    };*/

    const handleSubscribe = async () => {
        let packageData = {
            packageType: selectedPlan,
            groceryValue: 0,
            serviceValue: 0,
            inventoryValue: 0,
            packageValue: 0,
            subscribedDate: new Date().toISOString().split("T")[0], // yyyy-mm-dd
        };
        // Define values based on selected plan
        switch (selectedPlan) {
            case "Basic":
                packageData.groceryValue = 15000;
                packageData.serviceValue = 10000;
                packageData.inventoryValue = 5000;
                break;
            case "Ultra":
                packageData.groceryValue = 30000;
                packageData.serviceValue = 20000;
                packageData.inventoryValue = 20000;
                break;
            case "Premium":
                packageData.groceryValue = 50000;
                packageData.serviceValue = 35000;
                packageData.inventoryValue = 25000;
                break;
            default:
                return alert("Invalid package selected.");
        }
        packageData.packageValue =
            packageData.groceryValue +
            packageData.serviceValue +
            packageData.inventoryValue;
        // Build URL-encoded params
        const queryParams = new URLSearchParams(packageData).toString();
        try {
            const response = await fetch(
                `http://localhost:8080/api/track-tidy/package/create?${queryParams}`,
                {
                    method: "POST",
                }
            );
            if (!response.ok) throw new Error("Request failed");
            const result = await response.json();
            alert("Subscription successful!");
            console.log(result);
        } catch (error) {
            alert("Subscription failed");
            console.error(error);
        }
    };

    // Close modal when clicking outside
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setShowChatbot(false);
            }
        };

        const handleEscKey = (e) => {
            if (e.key === "Escape") {
                setShowChatbot(false);
            }
        };

        if (showChatbot) {
            document.addEventListener("mousedown", handleOutsideClick);
            document.addEventListener("keydown", handleEscKey);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscKey);
        };
    }, [showChatbot]);

    return (
        <>
            <TopHeader/>
            <div className="min-h-screen bg-gradient-to-b from-green-50 to-gray-100">
                {/* Header */}
                <header className="bg-green-800 text-white py-8 px-4 rounded-xl text-center">
                    <h1 className="text-3xl md:text-4xl font-bold">Track Tidy Services Packages</h1>
                    <p className="mt-2 text-green-100 max-w-2xl mx-auto">
                        Choose the perfect home maintenance package tailored to your household needs
                    </p>
                </header>

                {/* Main Content */}
                <main className="max-w-6xl mx-auto px-4 py-12">
                    {!selectedPlan ? (<>
                            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Select Your
                                Package</h2>

                            {/* Pricing Cards */}
                            <div className="flex flex-row md:flex-col justify-center gap-6 mt-8">
                                {/* Basic Plan */}
                                <div
                                    className="w-full md:w-80 bg-white rounded-xl overflow-hidden shadow-lg border border-green-100 transform transition-transform duration-300 hover:scale-105">
                                    <div className="bg-green-800 p-6 text-white">
                                        <h2 className="text-2xl font-bold">Basic</h2>
                                        <p className="text-3xl font-bold mt-2">LKR 30,000</p>
                                        <p className="text-sm opacity-80 mt-1">Monthly package</p>
                                    </div>

                                    <div className="p-6">
                                        <ul className="space-y-4">
                                            <li className="flex items-start">
                                                <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                                                    <ShoppingBag size={16} className="text-green-800"/>
                                                </div>
                                                <div>
                                                    <span className="font-medium">Grocery Shopping</span>
                                                    <p className="text-sm text-gray-600">Up to LKR 15,000 value</p>
                                                </div>
                                            </li>
                                            <li className="flex items-start">
                                                <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                                                    <Settings size={16} className="text-green-800"/>
                                                </div>
                                                <div>
                                                    <span className="font-medium">Maintenance & Service</span>
                                                    <p className="text-sm text-gray-600">Plumbing, electrical & more up
                                                        to LKR 10,000</p>
                                                </div>
                                            </li>
                                            <li className="flex items-start">
                                                <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                                                    <Home size={16} className="text-green-800"/>
                                                </div>
                                                <div>
                                                    <span className="font-medium">Home Inventory</span>
                                                    <p className="text-sm text-gray-600">Appliances up to LKR 5,000</p>
                                                </div>
                                            </li>
                                        </ul>

                                        <button
                                            onClick={() => selectPlan('Basic')}
                                            className="mt-6 w-full bg-green-800 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                                            Select Plan
                                        </button>
                                    </div>
                                </div>

                                {/* Ultra Plan - Highlighted */}
                                <div
                                    className="w-full md:w-80 bg-white rounded-xl overflow-hidden shadow-xl border-2 border-green-600 transform transition-transform duration-300 hover:scale-105 relative mt-8 md:mt-0 md:-translate-y-4">
                                    <div
                                        className="absolute top-0 right-0 bg-green-600 text-white px-4 py-1 rounded-bl-lg font-medium text-sm">
                                        MOST POPULAR
                                    </div>
                                    <div className="bg-gradient-to-r from-green-800 to-green-700 p-6 text-white">
                                        <h2 className="text-2xl font-bold flex items-center">
                                            Ultra <Check size={16} className="ml-2"/>
                                        </h2>
                                        <p className="text-3xl font-bold mt-2">LKR 70,000</p>
                                        <p className="text-sm opacity-80 mt-1">Monthly package</p>
                                    </div>

                                    <div className="p-6">
                                        <ul className="space-y-4">
                                            <li className="flex items-start">
                                                <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                                                    <ShoppingBag size={16} className="text-green-800"/>
                                                </div>
                                                <div>
                                                    <span className="font-medium">Grocery Shopping</span>
                                                    <p className="text-sm text-gray-600">Up to LKR 30,000 value</p>
                                                </div>
                                            </li>
                                            <li className="flex items-start">
                                                <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                                                    <Settings size={16} className="text-green-800"/>
                                                </div>
                                                <div>
                                                    <span className="font-medium">Maintenance & Service</span>
                                                    <p className="text-sm text-gray-600">Plumbing, electrical & more up
                                                        to LKR 20,000</p>
                                                </div>
                                            </li>
                                            <li className="flex items-start">
                                                <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                                                    <Home size={16} className="text-green-800"/>
                                                </div>
                                                <div>
                                                    <span className="font-medium">Home Inventory</span>
                                                    <p className="text-sm text-gray-600">Appliances up to LKR 20,000</p>
                                                </div>
                                            </li>
                                        </ul>

                                        <button
                                            onClick={() => selectPlan('Ultra')}
                                            className="mt-6 w-full bg-gradient-to-r from-green-800 to-green-700 text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity">
                                            Select Plan
                                        </button>
                                    </div>
                                </div>

                                {/* Premium Plan */}
                                <div
                                    className="w-full md:w-80 bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 transform transition-transform duration-300 hover:scale-105">
                                    <div className="bg-gray-900 p-6 text-white">
                                        <h2 className="text-2xl font-bold">Premium</h2>
                                        <p className="text-3xl font-bold mt-2">LKR 100,000</p>
                                        <p className="text-sm opacity-80 mt-1">Monthly package</p>
                                    </div>

                                    <div className="p-6">
                                        <ul className="space-y-4">
                                            <li className="flex items-start">
                                                <div className="bg-gray-200 p-1 rounded-full mr-3 mt-1">
                                                    <ShoppingBag size={16} className="text-gray-900"/>
                                                </div>
                                                <div>
                                                    <span className="font-medium">Grocery Shopping</span>
                                                    <p className="text-sm text-gray-600">Up to LKR 50,000 value</p>
                                                </div>
                                            </li>
                                            <li className="flex items-start">
                                                <div className="bg-gray-200 p-1 rounded-full mr-3 mt-1">
                                                    <Settings size={16} className="text-gray-900"/>
                                                </div>
                                                <div>
                                                    <span className="font-medium">Maintenance & Service</span>
                                                    <p className="text-sm text-gray-600">Plumbing, electrical & more up
                                                        to LKR 35,000</p>
                                                </div>
                                            </li>
                                            <li className="flex items-start">
                                                <div className="bg-gray-200 p-1 rounded-full mr-3 mt-1">
                                                    <Home size={16} className="text-gray-900"/>
                                                </div>
                                                <div>
                                                    <span className="font-medium">Home Inventory</span>
                                                    <p className="text-sm text-gray-600">Appliances up to LKR 25,000</p>
                                                </div>
                                            </li>
                                        </ul>

                                        <button
                                            onClick={() => selectPlan('Premium')}
                                            className="mt-6 w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                                            Select Plan
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="relative flex justify-center text-center mt-10">

                                {/* My Special Button */}
                                <button
                                    onClick={() => setShowChatbot(true)}
                                    className="
                                        bg-gradient-to-r from-green-700 to-green-500 text-white font-bold
                                        py-3 px-6 rounded-2xl shadow-lg
                                        hover:scale-105 transition-transform duration-300
                                        animate-custom-button
                                      "
                                >
                                    Customize Your Own Package with AI Assistant
                                </button>

                            </div>
                        </>) : (/* Confirmation page after selecting a package */
                        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-green-100">
                            <div className="text-center mb-6">
                                <div
                                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                    <Check size={32} className="text-green-800"/>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mt-4">Thank You!</h2>
                                <p className="text-gray-600 mt-2">You have successfully selected
                                    the {selectedPlan} package</p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6 mb-6">
                                <h3 className="font-semibold text-lg text-gray-900 mb-4">Package Details</h3>

                                {selectedPlan === 'Basic' && (<ul className="space-y-3">
                                        <li className="flex items-center text-gray-700">
                                            <Check size={16} className="text-green-600 mr-2"/>
                                            Grocery Shopping: LKR 15,000
                                        </li>
                                        <li className="flex items-center text-gray-700">
                                            <Check size={16} className="text-green-600 mr-2"/>
                                            Maintenance & Service: LKR 10,000
                                        </li>
                                        <li className="flex items-center text-gray-700">
                                            <Check size={16} className="text-green-600 mr-2"/>
                                            Home Inventory: LKR 5,000
                                        </li>
                                        <li className="flex items-center text-gray-700 font-medium pt-2">
                                            <Check size={16} className="text-green-600 mr-2"/>
                                            Total Monthly Value: LKR 30,000
                                        </li>
                                    </ul>)}

                                {selectedPlan === 'Ultra' && (<ul className="space-y-3">
                                        <li className="flex items-center text-gray-700">
                                            <Check size={16} className="text-green-600 mr-2"/>
                                            Grocery Shopping: LKR 30,000
                                        </li>
                                        <li className="flex items-center text-gray-700">
                                            <Check size={16} className="text-green-600 mr-2"/>
                                            Maintenance & Service: LKR 20,000
                                        </li>
                                        <li className="flex items-center text-gray-700">
                                            <Check size={16} className="text-green-600 mr-2"/>
                                            Home Inventory: LKR 20,000
                                        </li>
                                        <li className="flex items-center text-gray-700 font-medium pt-2">
                                            <Check size={16} className="text-green-600 mr-2"/>
                                            Total Monthly Value: LKR 70,000
                                        </li>
                                    </ul>)}

                                {selectedPlan === 'Premium' && (<ul className="space-y-3">
                                        <li className="flex items-center text-gray-700">
                                            <Check size={16} className="text-green-600 mr-2"/>
                                            Grocery Shopping: LKR 50,000
                                        </li>
                                        <li className="flex items-center text-gray-700">
                                            <Check size={16} className="text-green-600 mr-2"/>
                                            Maintenance & Service: LKR 35,000
                                        </li>
                                        <li className="flex items-center text-gray-700">
                                            <Check size={16} className="text-green-600 mr-2"/>
                                            Home Inventory: LKR 25,000
                                        </li>
                                        <li className="flex items-center text-gray-700 font-medium pt-2">
                                            <Check size={16} className="text-green-600 mr-2"/>
                                            Total Monthly Value: LKR 100,000
                                        </li>
                                    </ul>)}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => setSelectedPlan(null)}
                                    className="py-2 px-4 border border-green-800 text-green-800 rounded-lg hover:bg-green-50 transition-colors font-medium">
                                    Change Selection
                                </button>
                                <button
                                    onClick={handleSubscribe}
                                    className="py-2 px-4 bg-green-800 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                                    Subscribe To Package
                                </button>
                            </div>
                        </div>)}

                    {/* Features Section */}
                    {!selectedPlan && (<div className="mt-20">
                            <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">Why Choose Our
                                Us?</h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                <div
                                    className="bg-white p-6 rounded-xl shadow border border-green-100 transform transition-transform duration-300 hover:scale-105">
                                    <div
                                        className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <ShoppingBag size={24} className="text-green-800"/>
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900 mb-2">Grocery Shopping</h3>
                                    <p className="text-gray-600">We handle your grocery needs with personal shoppers who
                                        understand your preferences.</p>
                                </div>

                                <div
                                    className="bg-white p-6 rounded-xl shadow border border-green-100 transform transition-transform duration-300 hover:scale-105">
                                    <div
                                        className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <Settings size={24} className="text-green-800"/>
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900 mb-2">Maintenance & Service</h3>
                                    <p className="text-gray-600">Professional maintenance services for plumbing,
                                        electrical, and other home needs.</p>
                                </div>

                                <div
                                    className="bg-white p-6 rounded-xl shadow border border-green-100 transform transition-transform duration-300 hover:scale-105">
                                    <div
                                        className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <Home size={24} className="text-green-800"/>
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900 mb-2">Home Inventory</h3>
                                    <p className="text-gray-600">Access to high-quality appliances and home-related
                                        items delivered to your doorstep.</p>
                                </div>
                            </div>
                        </div>)}
                </main>
                {/*ChatBot Service*/}
                {/*<ChatBot
                    id="track-tidy-bot"
                    styles={chatBotStyles}
                    themes={chatBotTheme}
                    settings={botOptionStyle}
                />*/}
                {showChatbot && (<div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
                        <div
                            ref={modalRef}
                            className="relative bg-gradient-to-t from-green-50 via-slate-50 to-green-800 w-full max-w-2xl rounded-xl shadow-2xl p-6 animate-fade-in"
                        >
                            <button
                                className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
                                onClick={() => setShowChatbot(false)}
                                aria-label="Close chatbot"
                            >
                                &times;
                            </button>
                            <TrackTidyChatbot/>
                        </div>
                    </div>
                )}
                {/* Footer */}
                <Footer/>
            </div>

        </>
    );
};

export default TrackPackages;