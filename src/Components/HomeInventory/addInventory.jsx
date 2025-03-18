import React, { useState, useEffect } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import axios from 'axios'; // Import axios for HTTP requests
import Swal from 'sweetalert2';


const addInventory = () => {
  const navigate = useNavigate(); // Initialize navigate function for page redirection

  const [formData, setFormData] = useState({
    userid: '',
    productname: '',
    productid: '',
    quantity: '',
    productvalue: '',
    purchasedate: '',
    warrantyperiod: '',
    productcategory: '',
    productimage: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({}); // To store validation errors

  // Set current date for purchase date field when component mounts
  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    setFormData((prevData) => ({
      ...prevData,
      purchasedate: currentDate,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'productimage' && files && files[0]) {
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
      productimage: null
    });
    setImagePreview(null);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.userid) newErrors.userid = 'User ID is required';
    if (!formData.productname) newErrors.productname = 'Product Name is required';
    if (!formData.productid) newErrors.productid = 'Product ID is required';
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = 'Quantity must be greater than 0';
    if (!formData.productvalue || formData.productvalue <= 0) newErrors.productvalue = 'Product Value must be greater than 0';
    if (!formData.warrantyperiod || formData.warrantyperiod < 0) newErrors.warrantyperiod = 'Warranty Period must be 0 or greater';
    if (!formData.productcategory) newErrors.productcategory = 'Product Category is required';
    if (!formData.productimage) newErrors.productimage = 'Product Image is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // If no errors, return true
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation (check if all fields are valid)
    if (!validateForm()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields correctly!',
      });
      return;
    }

    // If valid, proceed with form submission
    try {
      // Create FormData object to handle image upload
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      // Add your form submission logic here (e.g., API call)
      await axios.post('/api/inventory', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      Swal.fire({
        icon: 'success',
        title: 'Product Added!',
        text: 'Your product has been successfully added.',
      });

      // After successful submission, redirect to /view-in with form data
      navigate('/view-in', { state: formData });
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Something went wrong. Please try again later.',
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
                   alt="Home inventory"
                   className="w-full h-full object-cover rounded-lg"
               />
               <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
               <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8 text-center">
                 <h2 className="text-2xl font-semibold mb-4">
                 Track What You Own,</h2> <h2 className="text-2xl font-semibold mb-4">Protect What You Value</h2> 
               </div>
             </div>
   
             {/* Right Side: Form Section */}
             <div className="bg-white p-8 rounded-lg w-full lg:w-1/2 flex flex-col justify-center">
               {/* Header */}
               <h1 className="text-3xl font-bold text-center text-primary mb-4">
                 Home Inventory
               </h1>
   
               <form className="p-6 space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="userid" className="block text-m font-semibold text-gray-700 mb-1 mr-70">User ID</label>
                <input 
                  type="text" 
                  id="userid" 
                  name="userid" 
                  placeholder="Enter User ID" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  onChange={handleChange}
                  value={formData.userid}
                />
                 {errors.userid && <p className="text-red-500 text-sm">{errors.userid}</p>}
              </div>
              
              <div>
                <label htmlFor="productname" className="block text-m font-semibold text-gray-700 mb-1 mr-58">Product Name</label>
                <input 
                  type="text" 
                  id="productname" 
                  name="productname" 
                  placeholder="Enter Product Name" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  onChange={handleChange}
                  value={formData.productname}
                />
                 {errors.productname && <p className="text-red-500 text-sm">{errors.productname}</p>}
              </div>
              
              <div>
                <label htmlFor="productid" className="block text-m font-semibold text-gray-700 mb-1 mr-60">Product ID</label>
                <input 
                  type="text" 
                  id="productid" 
                  name="productid" 
                  placeholder="Enter Product ID" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  onChange={handleChange}
                  value={formData.productid}
                />
                 {errors.productid && <p className="text-red-500 text-sm">{errors.productid}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quantity" className="block text-m font-semibold text-gray-700 mb-1 mr-30">Quantity</label>
                  <input 
                    type="number" 
                    id="quantity" 
                    name="quantity" 
                    placeholder="Enter Quantity" 
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    onChange={handleChange}
                    value={formData.quantity}
                  />
                   {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
                </div>
                
                <div>
                  <label htmlFor="productvalue" className="block text-m font-semibold text-gray-700 mb-1 mr-20">Value ($)</label>
                  <input 
                    type="text" 
                    id="productvalue" 
                    name="productvalue" 
                    placeholder="Enter Value" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    onChange={handleChange}
                    value={formData.productvalue}
                  />
                   {errors.productvalue && <p className="text-red-500 text-sm">{errors.productvalue}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="purchasedate" className="block text-m font-semibold text-gray-700 mb-1 mr-10">Purchase Date</label>
                  <input 
                    type="date" 
                    id="purchasedate" 
                    name="purchasedate" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    onChange={handleChange}
                    value={formData.purchasedate}
                    readOnly={true} 
                  />
                </div>
                
                <div>
                  <label htmlFor="warrantyperiod" className="block text-m font-semibold text-gray-700 mb-1 mr-8">Warranty (months)</label>
                  <input 
                    type="number" 
                    id="warrantyperiod" 
                    name="warrantyperiod" 
                    placeholder="Months" 
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    onChange={handleChange}
                    value={formData.warrantyperiod}
                  />
                   {errors.warrantyperiod && <p className="text-red-500 text-sm">{errors.warrantyperiod}</p>}
                </div>
              </div>
              
              <div>
                <label htmlFor="productcategory" className="block text-m font-semibold text-gray-700 mb-1 mr-50">Product Category</label>
                <select 
                  id="productcategory" 
                  name="productcategory" 
                  className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                  onChange={handleChange}
                  value={formData.productcategory}
                >
                  <option value="" disabled>Select Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="furniture">Furniture</option>
                  <option value="householdappliance">Household Appliance</option>
                </select>
                {errors.productcategory && <p className="text-red-500 text-sm">{errors.productcategory}</p>}
              </div>
              
              <div>
                <label htmlFor="productimage" className="block text-m font-semibold text-gray-700 mb-1 mr-50">Product Image</label>
                
                {!imagePreview ? (
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="productimage" className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Camera className="w-8 h-8 text-gray-400 mb-1" />
                        <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PNG, JPG or WEBP (max. 2MB)</p>
                      </div>
                      <input 
                        type="file" 
                        id="productimage" 
                        name="productimage" 
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
                            {formData.productimage?.name || "Product Image"}
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
                          alt="Product preview" 
                          className="h-40 object-contain" 
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md"
              >
                Add to Inventory
              </button>
            </div>
          </form>
             </div>
           </div>
         </div>
  )
}

export default addInventory;
