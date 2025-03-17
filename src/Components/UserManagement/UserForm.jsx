import React, { useState } from 'react';

const UserForm = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: 'User', // Default role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(userData);
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-8 rounded-xl overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between rounded-lg overflow-hidden">
        {/* Left Side: Image with Overlay */}
        <div className="relative w-full lg:w-1/2 h-full">
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Add New User</h2>
            <p className="text-lg">
              Create a new user profile and assign them a role.
            </p>
          </div>
        </div>

        {/* Right Side: Form Section */}
        <div className="bg-white p-8 rounded-lg w-full lg:w-1/2 flex flex-col justify-center">
          {/* Header */}
          <h1 className="text-3xl font-bold text-center text-primary mb-4">User Form</h1>
          <p className="text-lg text-center mt-2 mb-6 text-gray-700">
            Provide the user's details and assign them a role.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Name */}
            <div>
              <label className="text-gray-600 mb-2 block">Full Name*</label>
              <input
                type="text"
                name="name"
                value={userData.name}
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
                value={userData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
                required
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="text-gray-600 mb-2 block">Select Role*</label>
              <select
                name="role"
                value={userData.role}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-blue-500"
              >
                <option value="User">User</option>
                <option value="Vendor">Vendor</option>
                <option value="Staff">Staff</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="text-center mt-6">
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Add User
              </button>
            </div>
          </form>

          {/* Alternative Contact */}
          <div className="mt-4 text-center text-gray-600">
            <span>Need help? Contact support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
