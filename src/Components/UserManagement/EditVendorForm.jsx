import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserImage from "../../assets/user.jpg"; // Ensure this path is correct

const EditVendorForm = ({ updateVendor }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const vendorData = location.state?.vendor;

  const [vendor, setVendor] = useState(vendorData || { id: "", name: "", email: "", company: "" });

  const handleChange = (e) => {
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateVendor(vendor); // Update the vendor in the user list
    navigate("/user-management");
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-8 rounded-xl">
      <div className="flex flex-col lg:flex-row items-center justify-between rounded-lg overflow-hidden">
        {/* Left Side: Image with Overlay */}
        <div className="relative w-full lg:w-1/2">
          <img
            src={UserImage}
            alt="User Profile"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Edit Vendor</h2>
            <p className="text-lg">Update vendor details and company information.</p>
          </div>
        </div>

        {/* Right Side: Form Section */}
        <div className="bg-white p-8 rounded-lg w-full lg:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">Edit Vendor Form</h1>
          <p className="text-lg text-center mt-2 mb-6 text-gray-700">
            Modify vendor details and ensure accuracy.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Vendor Name */}
            <div>
              <label className="text-gray-600 mb-2 block">Full Name*</label>
              <input
                type="text"
                name="name"
                value={vendor.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-blue-500"
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
                value={vendor.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-blue-500"
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
                value={vendor.company}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter company name"
                required
              />
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="text-center mt-6">
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => navigate("/user-management")}
                className="w-full py-2 mt-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditVendorForm;
