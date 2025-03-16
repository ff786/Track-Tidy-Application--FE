import React from "react";
import {Mail} from "lucide-react";
import ServiceLady from "../../assets/ServiceLady.png";

const ServiceInput = () => {
    return (
        <div className="relative max-w-max h-120 " style={{
            backgroundImage: `url(${ServiceLady})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            borderRadius: "15px",
            backgroundPosition: "top-left",
            JustifyContent: "center",
            alignItems: "center",
        }}>
            {/* Main Container */}
            <div className="flex flex-row" style={{
                   height: "max-content",
                   gap: "100px",
                   padding: "5px",
                   alignItems: "center",
            }}>
                {/* Main Content Area with Background */}
                <div className="relative rounded-lg mt-4 overflow-hidden">
                    {/* Content Overlay */}
                    <div className="relative z-10 p-10 text-black" style={{textAlign: "start", alignContent: "middle"}}>
                        <h2 className="text-2xl font-bold mb-2">Track Tidy Services</h2>

                        <h1 className="text-4xl font-bold mb-3">
                            Reliable care for your home <br/>
                            at your fingertips <span className="text-lg font-semibold">using experienced and</span>
                        </h1>

                        <p className="text-xl mb-8">trusted Service Professionals</p>

                        {/* Stats Row */}
                        <div className="flex flex-wrap items-center gap-6 mt-4 mb-32">
                            <div className="flex items-center">
                                <span className="font-bold">5,000+</span>&nbsp;Customers
                            </div>

                            <div className="flex items-center">
                                <span className="font-bold">14,000+</span>&nbsp;Jobs Done
                            </div>

                            <div className="flex items-center">
                                <span className="font-bold">4.7</span>&nbsp;Positive Ratings
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking Form Card */}
                <div className="relative right-8 top-5 max-w-max max-w-md bg-white opacity-90 rounded-lg shadow-lg" style={{
                  justifyContent: "center",
                }}>
                    {/* Card Header */}
                    <div className="bg-black text-white text-xl p-3 rounded-t-lg opacity-80">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                            <h3 className="text-lg font-medium">Book your service provider now!</h3>
                        </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4">
                        {/* Steps Indicator */}
                        <div className="flex mb-6">
                            <div className="flex items-center">
                                <div
                                    className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">1
                                </div>
                                <span className="ml-2 text-sm font-medium">Service Details</span>
                            </div>
                            <div className="flex-1"></div>
                            <div className="flex items-center opacity-50">
                                <div
                                    className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold">2
                                </div>
                                <span className="ml-2 text-sm font-medium">Your Details</span>
                            </div>
                        </div>

                        {/* Form Elements */}
                        <div className="space-y-4">
                            {/* Service Selection */}
                            <div>
                                <div className="relative">
                                    <select
                                        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring focus:border-blue-300 text-gray-700">
                                        <option>Service Required (Select)*</option>
                                        <option>Cleaning</option>
                                        <option>Electrical Work</option>
                                        <option>Plumbing</option>
                                        <option>Handyman</option>
                                    </select>
                                    <div
                                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 20 20">
                                            <path
                                                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Job Description */}
                            <div>
                <textarea
                    className="w-full h-32 px-4 py-2 border border-gray-300 rounded shadow focus:outline-none focus:ring focus:border-blue-300 text-gray-700"
                    placeholder="Tell us a little bit about the job*"
                ></textarea>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-between items-center">
                                <button
                                    className="bg-black text-white py-2 px-6 rounded font-medium hover:bg-gray-800 transition">
                                    Next
                                </button>

                                <button className="flex items-center text-gray-700 hover:text-gray-900">
                                    <Mail className="h-5 w-5 mr-1"/>
                                    Mail us instead
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceInput;