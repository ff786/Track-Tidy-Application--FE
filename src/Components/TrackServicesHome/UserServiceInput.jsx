import React from "react";
import ServiceLady from "../../assets/ServiceLady.png";

const ServiceInput = () => {
  return (
      <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-8 rounded-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between rounded-lg overflow-hidden">
          {/* Left Side: Image with Overlay */}
          <div className="relative w-full lg:w-1/2 h-full">
            <img
                src={ServiceLady}
                alt="Service Lady"
                className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8 text-center">
              <h2 className="text-2xl font-semibold mb-4">
                Get the Best Service at Home
              </h2>
              <p className="text-lg">
                Our experts are ready to assist you. Book now to experience
                top-tier service!
              </p>
            </div>
          </div>

          {/* Right Side: Form Section */}
          <div className="bg-white p-8 rounded-lg w-full lg:w-1/2 flex flex-col justify-center">
            {/* Header */}
            <h1 className="text-3xl font-bold text-center text-primary mb-4">
              QuickHelp
            </h1>
            <p className="text-lg text-center mt-2 mb-6 text-gray-700">
              Reliable care for your home at your fingertips using experienced and
              trusted Service Professionals
            </p>

            {/* Stats Section */}
            <div className="text-center mt-6 text-gray-600 space-x-4">
              <span>5,000+ Customers</span>
              <span>•</span>
              <span>14,000+ Jobs Done</span>
              <span>•</span>
              <span>4.7 Positive Ratings</span>
            </div>

            {/* Booking Form */}
            <div className="mt-8 space-y-6">
              <h2 className="text-xl font-semibold text-center mb-4">
                Book your service provider now!
              </h2>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">1. Service Details</h3>

                {/* Service Selection */}
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Service Required (Select)*
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-blue-500">
                    <option value="">Select...</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="electrician">Electrician</option>
                  </select>
                </div>

                {/* Job Description */}
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Tell us a little bit about the job*
                  </label>
                  <textarea
                      className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-blue-500"
                      rows="4"
                      required
                      placeholder="Describe the service required..."
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center mt-6">
                <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200">
                  Next
                </button>
              </div>

              {/* Alternative Contact */}
              <div className="mt-4 text-center text-gray-600">
                <span>Mail us instead</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ServiceInput;
