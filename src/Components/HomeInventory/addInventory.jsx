import React, { useState } from 'react';
import { Camera, Upload, X, Calendar, DollarSign, Package, Tag, Layers, FileText, Loader } from 'lucide-react';

const AddInventory = ({ setIsModalOpen }) => {

  const [formData, setFormData] = useState({
    productName: "",
    productId: "",
    quantity: "",
    purchaseDate: "",
    productValue: "",
    WarrantyPeriod : "",
    productCategory: "",
    ProductImage: null,
  });

  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file' && name === 'ProductImage') {
        const file = files[0];
        setFormData({ ...formData, [name]: file });

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    } else if (type === 'number') {
        if (name === 'productValue') {
            // Validate product value to have max 2 decimal places and be >= 0.01
            const regex = /^\d*\.?\d{0,2}$/;  // Only allows up to 2 decimal places
            if (value === '' || regex.test(value)) {
                const numValue = parseFloat(value);
                if (numValue >= 0.01 || value === '') {  // Minimum value of 0.01
                    setFormData({ ...formData, [name]: value });
                }
            }
        } else if (name === 'quantity') {
            const numValue = parseInt(value);
            if (numValue >= 0 || value === '') {  // Changed from > 0 to >= 1
                setFormData({ ...formData, [name]: value });
            }
        } else {
            // For warranty period - only positive whole numbers
            const numValue = parseInt(value);
            if (numValue > 0 || value === '') {
                setFormData({ ...formData, [name]: value });
            }
        }
    } else {
        setFormData({ ...formData, [name]: value });
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, ProductImage: null });
    setImagePreview(null);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.ProductImage) {
      newErrors.ProductImage = 'Product image is required';
    }
    if (!formData.productId) {
      newErrors.productId = 'Product ID is required';
    }
    if (!formData.quantity || formData.quantity < 1) {  // Changed from <= 0 to < 1
      newErrors.quantity = 'Quantity must be at least 1';
    }
    if (!formData.productValue || formData.productValue <= 0) {
      newErrors.productValue = 'Product value must be greater than 0';
    }
    if (!formData.WarrantyPeriod || formData.WarrantyPeriod <= 0) {
      newErrors.WarrantyPeriod = 'Warranty period must be greater than 0';
    }
    return newErrors;
  };

  const handleSubmit = async () => {
    // Reset previous errors and messages
    setError('');
    setSuccessMessage('');

    // Validate form
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Create FormData object for multipart/form-data submission (needed for file upload)
      const submitData = new FormData();

      // Append all form fields to FormData
      Object.keys(formData).forEach(key => {
        if (key === 'ProductImage' && formData[key]) {
          submitData.append(key, formData[key]);
        } else if (formData[key] !== null && formData[key] !== '') {
          submitData.append(key, formData[key]);
        }
      });

      // Make API request
      const response = await fetch('http://localhost:8080/api/track-tidy/inventory/create', {
        method: 'POST',
        body: submitData,
        // Don't set Content-Type header - fetch will automatically set it with boundary for FormData
      });

      // Handle response
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Error: ${response.status}`);
      }

      const result = await response.json();
      setSuccessMessage('Inventory item added successfully!');

      // Close modal after short delay
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1500);

    } catch (err) {
      console.error('Error adding inventory:', err);
      setError(err.message || 'Failed to add inventory item. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="w-full flex items-center justify-center p-4 min-h-screen">
        {/* Modal background */}
        <div
            className="fixed inset-0 bg-gray-800 bg-opacity-70 backdrop-blur-sm flex justify-center items-center"
            onClick={() => setIsModalOpen(false)} // Close modal when clicking outside
        >
          {/* Modal content - Landscape orientation */}
          <div
              className="w-full max-w-5xl bg-gradient-to-br from-green-800 to-green-900 text-white rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="bg-green-700 p-6 border-b border-green-600">
                <h2 className="text-3xl font-bold text-center">Add New Inventory Item</h2>
                <p className="text-green-200 text-center mt-1">Complete the form to add a new item to your inventory</p>
              </div>

              {/* Error message */}
              {error && (
                  <div className="mx-6 mt-4 bg-red-500 bg-opacity-20 border border-red-400 text-red-100 px-4 py-2 rounded-lg">
                    {error}
                  </div>
              )}

              <div className="p-6 flex-1 overflow-auto">
                <div className="grid grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-5">
                    {/* Product Name */}
                    <div className="relative">
                      <label htmlFor="productName" className="block text-green-200 mb-2 font-medium">
                        <Package size={16} className="inline mr-2" /> Product Name
                      </label>
                      <input
                          type="text"
                          name="productName"
                          id="productName"
                          value={formData.productName}
                          onChange={handleChange}
                          className="w-full p-3 border border-green-500 rounded-lg bg-green-800 bg-opacity-50 text-white"
                          required
                      />
                      {errors.productName && <p className="text-red-300 text-sm mt-1">{errors.productName}</p>}
                    </div>

                    {/* Product ID */}
                    <div className="relative">
                      <label htmlFor="productId" className="block text-green-200 mb-2 font-medium">
                        <Tag size={16} className="inline mr-2" /> Product ID
                      </label>
                      <input
                          type="text"
                          name="productId"
                          id="productId"
                          value={formData.productId}
                          onChange={handleChange}
                          className="w-full p-3 border border-green-500 rounded-lg bg-green-800 bg-opacity-50 text-white"
                          required
                      />
                      {errors.productId && <p className="text-red-300 text-sm mt-1">{errors.productId}</p>}
                    </div>

                    {/* Quantity */}
                    <div className="relative">
                      <label htmlFor="quantity" className="block text-green-200 mb-2 font-medium">
                        <Layers size={16} className="inline mr-2" /> Quantity
                      </label>
                      <input
                          type="number"
                          name="quantity"
                          id="quantity"
                          min="0" 
                          value={formData.quantity}
                          onChange={handleChange}
                          onWheel={(e) => e.target.blur()} // Prevent mousewheel from changing value
                          className="w-full p-3 border border-green-500 rounded-lg bg-green-800 bg-opacity-50 text-white"
                          required
                          placeholder="Enter quantity (min: 0)"
                      />
                      {errors.quantity && <p className="text-red-300 text-sm mt-1">{errors.quantity}</p>}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-5">
                    {/* Product Value */}
                    <div className="relative">
                      <label htmlFor="productValue" className="block text-green-200 mb-2 font-medium">
                        <DollarSign size={16} className="inline mr-2" /> Product Value
                      </label>
                      <input
                          type="number"
                          name="productValue"
                          id="productValue"
                          min="10.00"
                          step="1"
                          value={formData.productValue}
                          onChange={handleChange}
                          onWheel={(e) => e.target.blur()}
                          className="w-full p-3 border border-green-500 rounded-lg bg-green-800 bg-opacity-50 text-white"
                          required
                          placeholder="Enter price (min:10.00)"
                      />
                      {errors.productValue && <p className="text-red-300 text-sm mt-1">{errors.productValue}</p>}
                    </div>

                    {/* Warranty Period */}
                    <div className="relative">
                      <label htmlFor="WarrantyPeriod" className="block text-green-200 mb-2 font-medium">
                        <FileText size={16} className="inline mr-2" /> Warranty Period
                      </label>
                      <input
                          type="number"
                          name="WarrantyPeriod"
                          id="WarrantyPeriod"
                          min="1"
                          value={formData.WarrantyPeriod}
                          onChange={handleChange}
                          onWheel={(e) => e.target.blur()}
                          className="w-full p-3 border border-green-500 rounded-lg bg-green-800 bg-opacity-50 text-white"
                          required
                      />
                    </div>

                    {/* Product Category */}
                    <div className="relative">
                      <label htmlFor="productCategory" className="block text-green-200 mb-2 font-medium">
                        <Tag size={16} className="inline mr-2" /> Product Category
                      </label>
                      <select
                          name="productCategory"
                          id="productCategory"
                          value={formData.productCategory}
                          onChange={handleChange}
                          className="w-full p-3 border border-green-500 rounded-lg bg-green-800 bg-opacity-50 text-white"
                          required
                      >
                        <option value="" disabled>Select a category</option>
                        <option value="kitchen">Kitchen</option>
                        <option value="bathroom">Bathroom</option>
                        <option value="bedroom">Bedroom</option>
                        <option value="livingRoom">Living Room</option>
                        <option value="laundry">Laundry</option>
                        <option value="smartHome">Smart Home</option>
                        <option value="homeOffice">Home Office</option>
                        <option value="outdoor">Outdoor</option>
                      </select>
                    </div>

                  </div>
                </div>

                {/* Image Upload */}
                <div className="relative mt-5">
                  <label className="block text-green-200 mb-2 font-medium">
                    <Camera size={16} className="inline mr-2" /> Product Image
                  </label>
                  <div className="flex items-center space-x-2">
                    <label className="flex-1 flex items-center justify-center p-3 border-2 border-dashed border-green-500 rounded-lg bg-green-800 bg-opacity-30 hover:bg-opacity-50 cursor-pointer">
                      <Upload size={20} className="mr-2" />
                      <span>Choose File</span>
                      <input
                          type="file"
                          name="ProductImage"
                          accept="image/*"
                          onChange={handleChange}
                          className="hidden"
                          required
                      />
                    </label>

                     {imagePreview ? (
                                                                    <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                                                                        <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                                                                        <button
                                                                            type="button"
                                                                            onClick={removeImage}
                                                                            className="absolute top-0 right-0 bg-red-500 rounded-full p-1 shadow-lg"
                                                                        >
                                                                            <X size={14} />
                                                                        </button>
                                                                    </div>
                                                                ) : (
                                                                    <div className="h-16 w-16 rounded-lg bg-green-700 flex items-center justify-center">
                                                                        <Camera size={24} />
                                                                    </div>
                                                                )}
                  </div>
                  {errors.ProductImage && <p className="text-red-300 text-sm mt-1">{errors.ProductImage}</p>}
                </div>

                {/* Buttons */}
                <div className="flex justify-center space-x-4 mt-8">
                  <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className={`${
                          isLoading ? 'bg-teal-700' : 'bg-teal-500 hover:bg-teal-600'
                      } text-white font-medium px-8 py-3 rounded-full shadow-lg flex items-center justify-center transition-colors duration-200`}
                  >
                    {isLoading ? (
                        <>
                          <Loader size={18} className="animate-spin mr-2" />
                          Submitting...
                        </>
                    ) : (
                        'Submit'
                    )}
                  </button>

                  <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="bg-gray-600 text-white font-medium px-8 py-3 rounded-full shadow-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AddInventory;