import React, { useState } from "react";
import ServiceLady from "../../assets/ServiceLady.png";

const faqData = [
  {
    question: "What is Track Tidy Services?",
    answer:
        "We are a marketplace for services – working hard to redefine home services! We make it easier, safer, and smarter for you to book Expert Home Service Providers.",
  },
  {
    question: "Do you know these Service Partners on your platform?",
    answer:
        "Yes! Every partner goes through a background check and training process before being listed.",
  },
  {
    question: "What are the areas you cover?",
    answer:
        "Currently, we operate in selected regions. You can check availability by entering your location on our homepage.",
  },
  {
    question: "How can I contact you?",
    answer:
        "You can reach out to us via our Contact Us page, email us at tracktidy1@gmail.com.",
  },
];

const QAService = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
      <div className="bg-green-800 p-10 shadow-lg rounded-[16px] max-w-auto mx-auto">
        <h2 className="text-3xl font-black text-gray-900 mb-6">
          Frequently Asked <span className="text-white">Questions</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* FAQ Section */}
          <div className="p-6 rounded-lg shadow-xs">
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                  <div
                      key={index}
                      className="border border-white rounded-[16px] p-4 cursor-pointer"
                      onClick={() => toggleFAQ(index)}
                  >
                    <h3 className="font-semibold flex items-center text-start text-gray-300 justify-between">
                      <span>{faq.question}</span>
                      <span>{openIndex === index ? "➖" : "➕"}</span>
                    </h3>
                    {openIndex === index && (
                        <p className="text-white mt-2 text-start font-bold">
                          {faq.answer}
                        </p>
                    )}
                  </div>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="relative mt-[24px]">
            <img
                src={ServiceLady}
                alt="Service Lady"
                className="rounded-lg shadow-lg w-full"
            />
            <div className="absolute top-3 h-[50px] right-3 bg-gray-400 bg-opacity-25 backdrop-blur-sm text-white p-3 rounded-lg shadow-md">
              <p className="text-sm font-semibold text-end">
                What does Track Tidy do?
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default QAService;
