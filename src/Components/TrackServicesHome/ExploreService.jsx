import React from "react";

// Services Array
const services = [
  {name: "Home Cleaning", icon: "https://openui.fly.dev/openui/100x100.svg?text=🧹"},
  {name: "Air Conditioning", icon: "https://openui.fly.dev/openui/100x100.svg?text=❄️"},
  {name: "Plumbing", icon: "https://openui.fly.dev/openui/100x100.svg?text=🚰"},
  {name: "Carpentry", icon: "https://openui.fly.dev/openui/100x100.svg?text=🔨"},
  {name: "Masonry", icon: "https://openui.fly.dev/openui/100x100.svg?text=🧱"},
  {name: "Handyman", icon: "https://openui.fly.dev/openui/100x100.svg?text=🛠️"},
  {name: "Roofing", icon: "https://openui.fly.dev/openui/100x100.svg?text=🏠"},
  {name: "Sofa Cleaning", icon: "https://openui.fly.dev/openui/100x100.svg?text=🛋️"},
  {name: "Carpet Cleaning", icon: "https://openui.fly.dev/openui/100x100.svg?text=🧼"},
  {name: "Mattress Cleaning", icon: "https://openui.fly.dev/openui/100x100.svg?text=🛏️"},
  {name: "Washing Machine Repairing", icon: "https://openui.fly.dev/openui/100x100.svg?text=🧺"},
  {name: "Refrigerator Repairing", icon: "https://openui.fly.dev/openui/100x100.svg?text=❄️"},
  {name: "TV Repairing", icon: "https://openui.fly.dev/openui/100x100.svg?text=📺"},
  {name: "Electric", icon: "https://openui.fly.dev/openui/100x100.svg?text=⚡"},
  {name: "Gardening", icon: "https://openui.fly.dev/openui/100x100.svg?text=🌱"},
  {name: "Floor Polishing", icon: "https://openui.fly.dev/openui/100x100.svg?text=🧽"},
];

const ExploreService = () => {

  return (

      <div className="border border-lg rounded-[16px] shadow-xs bg-green-50 w-auto">
        <div className="max-w-auto mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">
            Explore our <span className="text-green-800">Services</span>
          </h1>

          {/* Category Filters */}
          <div className="mb-6 overflow-x-auto">
            <ul className="flex flex-wrap gap-4">
              <li className="cursor-pointer text-blue-500 font-medium hover:underline">All</li>
              <li className="cursor-pointer hover:text-blue-500">Home Services</li>
              <li className="cursor-pointer hover:text-blue-500">Home Repairs</li>
              <li className="cursor-pointer hover:text-blue-500">Cleaning and Pest Control</li>
              <li className="cursor-pointer hover:text-blue-500">Outdoor Services</li>
              <li className="cursor-pointer hover:text-blue-500">Construction & Repairs</li>
            </ul>
          </div>

          {/* Grid Container */}
          <div className="grid grid-cols-8 sm:grid-cols-4 lg:grid-cols-6 gap-6">
            {services.map((service, index) => (
                <div key={index}
                     className="flex flex-col items-center p-4 border rounded-lg shadow hover:shadow-md transition duration-300 bg-white">
                  <img
                      src={service.icon}
                      alt={service.name}
                      className="w-12 h-12 object-contain mb-2"
                  />
                  <p className="text-center font-medium">{service.name}</p>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
}

export default ExploreService;
