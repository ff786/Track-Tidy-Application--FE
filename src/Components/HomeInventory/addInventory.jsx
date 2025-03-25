import React, { useState, useEffect } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddInventory = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    memberId: '',
    dob: '',
    gender: '',
    phoneNumber: '',
    serviceType: '',
    amount: '',
    receipt: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  // Set current date for dob field when component mounts
  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setFormData(prevData => ({
      ...prevData,
      dob: currentDate,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'receipt' && files && files[0]) {
      const selectedFile = files[0];
      setFormData({
        ...formData,
        [name]: selectedFile
      });

      // Create preview URL for the image
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const removeImage = () => {
    setFormData({
      ...formData,
      receipt: null
    });
    setImagePreview(null);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.memberId) newErrors.memberId = 'Member ID is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
    if (!formData.serviceType) newErrors.serviceType = 'Service Type is required';
    if (!formData.amount || formData.amount <= 0) newErrors.amount = 'Amount must be greater than 0';
    if (!formData.receipt) newErrors.receipt = 'Receipt is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields correctly!',
      });
      return;
    }

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      // Updated API endpoint to match the server context path
      await axios.post('/api/track-tidy/inventory', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add token if needed
        }
      });

      Swal.fire({
        icon: 'success',
        title: 'Record Added!',
        text: 'Your record has been successfully added.',
      });

      navigate('/view-records', { state: formData });
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.response?.data?.message || 'Something went wrong. Please try again later.',
      });
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-8 rounded-xl overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between rounded-lg overflow-hidden">
        {/* Left Side: Image with Overlay */}
        <div className="relative w-full lg:w-1/2 h-full">
          <img
            src="https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Track Tidy"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Track Your Records,</h2> 
            <h2 className="text-2xl font-semibold mb-4">Manage What Matters</h2>
          </div>
        </div>

        {/* Right Side: Form Section */}
        <div className="bg-white p-8 rounded-lg w-full lg:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-center text-primary mb-4">
            Add Home Inventory
          </h1>

          <form className="p-6 space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-m font-semibold text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Enter Email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  onChange={handleChange}
                  value={formData.email}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-m font-semibold text-gray-700 mb-1">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    placeholder="First Name" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    onChange={handleChange}
                    value={formData.firstName}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-m font-semibold text-gray-700 mb-1">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    placeholder="Last Name" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    onChange={handleChange}
                    value={formData.lastName}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                </div>
              </div>
              
              <div>
                <label htmlFor="memberId" className="block text-m font-semibold text-gray-700 mb-1">Member ID</label>
                <input 
                  type="text" 
                  id="memberId" 
                  name="memberId" 
                  placeholder="Enter Member ID" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  onChange={handleChange}
                  value={formData.memberId}
                />
                {errors.memberId && <p className="text-red-500 text-sm">{errors.memberId}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dob" className="block text-m font-semibold text-gray-700 mb-1">Date of Birth</label>
                  <input 
                    type="date" 
                    id="dob" 
                    name="dob" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    onChange={handleChange}
                    value={formData.dob}
                  />
                </div>
                
                <div>
                  <label htmlFor="gender" className="block text-m font-semibold text-gray-700 mb-1">Gender</label>
                  <select 
                    id="gender" 
                    name="gender" 
                    className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                    onChange={handleChange}
                    value={formData.gender}
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                </div>
              </div>
              
              <div>
                <label htmlFor="phoneNumber" className="block text-m font-semibold text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  id="phoneNumber" 
                  name="phoneNumber" 
                  placeholder="Enter Phone Number" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  onChange={handleChange}
                  value={formData.phoneNumber}
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
              </div>
              
              <div>
                <label htmlFor="serviceType" className="block text-m font-semibold text-gray-700 mb-1">Service Type</label>
                <select 
                  id="serviceType" 
                  name="serviceType" 
                  className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                  onChange={handleChange}
                  value={formData.serviceType}
                >
                  <option value="" disabled>Select Service Type</option>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                  <option value="vip">VIP</option>
                </select>
                {errors.serviceType && <p className="text-red-500 text-sm">{errors.serviceType}</p>}
              </div>
              
              <div>
                <label htmlFor="amount" className="block text-m font-semibold text-gray-700 mb-1">Amount</label>
                <input 
                  type="number" 
                  id="amount" 
                  name="amount" 
                  placeholder="Enter Amount" 
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  onChange={handleChange}
                  value={formData.amount}
                />
                {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
              </div>
              
              <div>
                <label htmlFor="receipt" className="block text-m font-semibold text-gray-700 mb-1">Receipt</label>
                
                {!imagePreview ? (
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="receipt" className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Camera className="w-8 h-8 text-gray-400 mb-1" />
                        <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PNG, JPG or WEBP (max. 2MB)</p>
                      </div>
                      <input 
                        type="file" 
                        id="receipt" 
                        name="receipt" 
                        accept="image/*" 
                        className="hidden"
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="rounded-lg overflow-hidden border border-gray-300">
                      <div className="flex items-center justify-between bg-gray-100 px-3 py-2">
                        <div className="flex items-center">
                          <Upload size={16} className="text-gray-500 mr-2" />
                          <span className="text-sm text-gray-600 truncate max-w-xs">
                            {formData.receipt?.name || "Receipt Image"}
                          </span>
                        </div>
                        <button 
                          type="button" 
                          onClick={removeImage}
                          className="text-gray-500 hover:text-red-500 focus:outline-none"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      <div className="flex justify-center p-2 bg-white">
                        <img 
                          src={imagePreview} 
                          alt="Receipt preview" 
                          className="h-40 object-contain" 
                        />
                      </div>
                    </div>
                  </div>
                )}
                {errors.receipt && <p className="text-red-500 text-sm">{errors.receipt}</p>}
              </div>
            </div>
            
            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md"
              >
                Add Inventory
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddInventory;