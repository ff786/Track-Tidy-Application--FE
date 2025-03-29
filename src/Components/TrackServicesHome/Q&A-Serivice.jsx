import React from "react";

import ServiceLady from "../../assets/ServiceLady.png";

const QAService = () => {
  return (
    <div className="bg-gray-100 p-10 rounded-lg shadow-lg rounded-[16px] max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-black mb-6">
        Frequently Asked <span className="text-blue-500">Questions</span>
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* FAQ Section */}
        <div className="p-6 rounded-lg shadow-xs">
          <div className="space-y-4">
            <div className="border border-gray-300 rounded-[16px] p-4">
              <h3 className="font-semibold flex items-center">
                <span className="mr-2">➖</span> What is QuickHelp?
              </h3>
              <p className="text-gray-600 mt-2">
                We are a marketplace for services – working hard to redefine
                home services! We make it easier, safer, and smarter for you to
                book Expert Home Service Providers.
              </p>
            </div>

            <div className="border border-gray-300 rounded-[16px] p-4 flex items-center">
              <span className="mr-2">➕</span> Do you know these Service
              Partners on your platform?
            </div>

            <div className="border border-gray-300 rounded-[16px] p-4 flex items-center">
              <span className="mr-2">➕</span> What are the areas you cover?
            </div>

            <div className="border border-gray-300 rounded-[16px] p-4 flex items-center">
              <span className="mr-2">➕</span> How can I contact you?
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative mt-[24px]">
          <img
            src={ServiceLady}
                          alt="Service Lady"
            className="rounded-lg shadow-lg w-full"
          />
          <div className="absolute top-3 h-[80px] right-3 bg-gray-400 bg-opacity-25 backdrop-blur-sm text-white p-3 rounded-lg shadow-md">
            <p className="text-sm font-semibold">What does QuickHelp do?</p>
            <p className="text-xs">
              Do you know these technicians on your platform?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QAService;
