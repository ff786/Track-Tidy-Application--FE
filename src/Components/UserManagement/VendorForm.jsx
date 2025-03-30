import React, { useState } from "react";
import UserImage from "../../assets/user.jpg"; // Ensure this path is correct

const VendorForm = ({ addVendor }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    company: "", // Company name is now required for all users
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new vendor object with an ID and other details
    const newVendor = { id: Date.now(), ...userData }; // Using current timestamp as ID
    addVendor(newVendor); // Call addVendor prop to add the new vendor to the list
    setUserData({ name: "", email: "", company: "" }); // Clear form fields after submission
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-8 rounded-xl">
      <div className="flex flex-col lg:flex-row items-center justify-between rounded-lg overflow-hidden shadow-lg">

        {/* Left Side: Image with Overlay */}
        <div className="relative w-full lg:w-1/2">
          <img
            src={UserImage}
            alt="User Profile"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Add New Vendor</h2>
            <p className="text-lg">Create a new vendor profile with company details.</p>
          </div>
        </div>

        {/* Right Side: Form Section */}
        <div className="bg-white p-8 rounded-lg w-full lg:w-1/2 max-w-md mx-auto flex flex-col justify-center shadow-xl border border-gray-300">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">Vendor Form</h1>
          <p className="text-lg text-center mt-2 mb-6 text-gray-700">
            Provide the vendor's details and assign them a company.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Vendor Name */}
            <div>
              <label className="text-gray-600 mb-2 block">Full Name*</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Enter full name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-600 mb-2 block">Email Address*</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Enter email"
                required
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="text-gray-600 mb-2 block">Company Name*</label>
              <input
                type="text"
                name="company"
                value={userData.company}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Enter company name"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="text-center mt-6">
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Add Vendor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorForm;
