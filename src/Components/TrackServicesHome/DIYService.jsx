import React from "react";

import ServiceLady from "../../assets/ServiceLady.png";

const DIYSection = () => {
  return (
      <div className="container mx-auto px-6 py-12">
          {/* Header */}
          <p className="text-gray-500 text-sm">Informative resources and guides</p>
          <h2 className="text-3xl font-bold mt-2">
              Explore our <span className="text-blue-500">DIY section</span>
          </h2>

          {/* Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {/* Card 1 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                      src={ServiceLady}
                      alt="Service Lady"
                      className="w-full h-56 object-cover"
                  />
                  <div className="p-4">
                      <h3 className="text-lg font-semibold">Why you need to hire professional sofa cleaners?</h3>
                      <p className="text-gray-600 mt-2">
                          One of the most essential components of a healthy lifestyle is cleanliness. Our surroundings have
                      </p>
                      <a href="#!" className="text-blue-500 font-medium mt-3 inline-block">Read More</a>
                  </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative">
                      <img 
                          src={ServiceLady}
                                                    alt="Service Lady" 
                          className="w-full h-56 object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white p-2 rounded">
                          <p className="text-sm font-semibold">QuickHelp Closes Seed Funding Round</p>
                      </div>
                  </div>
                  <div className="p-4">
                      <h3 className="text-lg font-semibold">QuickHelp successfully closes Seed Funding round</h3>
                      <p className="text-gray-600 mt-2">
                          We are excited to announce that we closed our Seed Funding round earlier this month.
                      </p>
                      <a href="#!" className="text-blue-500 font-medium mt-3 inline-block">Read More</a>
                  </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img 
                      src={ServiceLady}
                                                alt="Service Lady"
                      className="w-full h-56 object-cover"
                  />
                  <div className="p-4">
                      <h3 className="text-lg font-semibold">Does Your Garden Need A Professional Gardener?</h3>
                      <p className="text-gray-600 mt-2">
                          Finding a gardener around you to help you start with gardening can sometimes be challenging.
                      </p>
                      <a href="#!" className="text-blue-500 font-medium mt-3 inline-block">Read More</a>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default DIYSection;
