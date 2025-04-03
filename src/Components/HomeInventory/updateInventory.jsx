import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Camera, Upload, X } from 'react-feather';

const UpdateInventory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    productName: '',
    userId: '',
    productId: '',
    quantity: '',
    purchaseDate: '',
    productValue: '',
    warrantyDate: '',
    productCategory: '',
    ProductImage: null,
    Faulted: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingItem, setLoadingItem] = useState(true);
  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchInventoryItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/track-tidy/inventory/update/${id}`);
        const item = response.data;
        
        setFormData({
          productName: item.productName,
          userId: item.userId,
          productId: item.productId,
          quantity: item.quantity,
          purchaseDate: item.purchaseDate.split('T')[0],
          productValue: item.productValue,
          warrantyDate: item.warrantyDate.split('T')[0],
          productCategory: item.productCategory,
          Faulted: item.Faulted
        });

        if (item.ProductImage) {
          setExistingImage(`http://localhost:8080/uploads/${item.ProductImage}`);
        }

        setLoadingItem(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch inventory item.');
        setLoadingItem(false);
      }
    };

    fetchInventoryItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file' && name === 'ProductImage') {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setExistingImage(null); // Clear existing image when new one is selected
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, ProductImage: null });
    setImagePreview(null);
    setExistingImage(null);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.productId) {
      newErrors.productId = 'Product ID is required';
    }
    if (formData.quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }
    if (formData.productValue <= 0) {
      newErrors.productValue = 'Product value must be greater than 0';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined) {
          if (key === 'ProductImage') {
            formDataToSend.append(key, formData[key]);
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }
      });

      const response = await axios.put(
        `http://localhost:8080/api/track-tidy/inventory/update/${id}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data) {
        navigate('/view-in');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update inventory item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loadingItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading inventory item...</div>
      </div>
    );
  }

  return (
    <div 
      className="w-full flex items-center justify-center p-4 min-h-screen"
      style={{
        background: 'linear-gradient(135deg,rgb(4, 95, 86) 0%,rgb(49, 231, 213) 50%, #ccfbf6 100%)',
      }}
    >
      <motion.div 
              className="w-full max-w-2xl p-8 rounded-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
              }}
            >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-2">
            Update Inventory Item
          </h2>
          <p className="text-gray-200">
            Edit the details of this inventory item
          </p>
        </motion.div>

        {error && (
          <motion.div
            className="bg-red-100 bg-opacity-90 border border-red-400 text-red-700 px-4 py-2 rounded-lg mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <input
                type="text"
                name="productName"
                required
                className="w-full px-4 py-2 rounded-full bg-opacity-20 border border-white border-opacity-30 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                placeholder="Product Name"
                value={formData.productName}
                onChange={handleChange}
                style={{ backdropFilter: 'blur(5px)' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <input
                type="text"
                name="userId"
                required
                className="w-full px-4 py-2 rounded-full bg-opacity-20 border border-white border-opacity-30 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                placeholder="User ID"
                value={formData.userId}
                onChange={handleChange}
                style={{ backdropFilter: 'blur(5px)' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <input
                type="text"
                name="productId"
                required
                className="w-full px-4 py-2 rounded-full bg-opacity-20 border border-white border-opacity-30 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                placeholder="Product ID"
                value={formData.productId}
                onChange={handleChange}
                style={{ backdropFilter: 'blur(5px)' }}
              />
              {errors.productId && <p className="text-red-500 text-xs mt-1">{errors.productId}</p>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <input
                type="number"
                name="quantity"
                required
                min="1"
                className="w-full px-4 py-2 rounded-full bg-opacity-20 border border-white border-opacity-30 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleChange}
                style={{ backdropFilter: 'blur(5px)' }}
              />
              {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label className="text-gray-500">Purchase Date</label>
              <input
                type="date"
                name="purchaseDate"
                required
                min={today}
                className="w-full px-4 py-2 rounded-full bg-opacity-20 border border-white border-opacity-30 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                placeholder="Purchase Date"
                value={formData.purchaseDate}
                onChange={handleChange}
                style={{ backdropFilter: 'blur(5px)' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <input
                type="number"
                name="productValue"
                required
                min="1"
                className="mt-4 w-full px-4 py-2 rounded-full bg-opacity-20 border border-white border-opacity-30 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                placeholder="Product Value"
                value={formData.productValue}
                onChange={handleChange}
                style={{ backdropFilter: 'blur(5px)' }}
              />
              {errors.productValue && <p className="text-red-500 text-xs mt-1">{errors.productValue}</p>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            > 
              <label className="text-gray-500">Warranty Date</label>
              <input
                type="date"
                name="warrantyDate"
                required
                className="w-full px-4 py-2 rounded-full bg-opacity-20 border border-white border-opacity-30 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                placeholder="Warranty Date"
                value={formData.warrantyDate}
                onChange={handleChange}
                style={{ backdropFilter: 'blur(5px)' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
            >
              <select
                name="productCategory"
                required
                className="mt-4 w-full px-4 py-2 rounded-full bg-opacity-20 border border-white border-opacity-30 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                value={formData.productCategory}
                onChange={handleChange}
                style={{ backdropFilter: 'blur(5px)' }}
              >
                <option value="" disabled hidden>Select Category</option>
                <option value="Electronics" className="text-gray-700">Electronics</option>
                <option value="Furniture" className="text-gray-700">Furniture</option>
                <option value="Office Supplies" className="text-gray-700">Home Appliance</option>
              </select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
            >
              <select
                name="Faulted"
                required
                className="w-1/2 px-4 py-2 rounded-full bg-opacity-20 border border-white border-opacity-30 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                value={formData.Faulted}
                onChange={handleChange}
                style={{ backdropFilter: 'blur(5px)' }}
              >
                <option value="" disabled hidden>Working Condition</option>
                <option value="No" className="text-gray-700">Not Faulted</option>
                <option value="Yes" className="text-gray-700">Faulted</option>
              </select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="md:col-span-2"
            >
              <label className="block mb-2 text-gray-600">Product Image</label>
              {existingImage ? (
                <div className="relative">
                  <div className="rounded-lg overflow-hidden border border-white border-opacity-30 bg-opacity-10">
                    <div className="flex items-center justify-between px-3 py-2 bg-opacity-20">
                      <div className="flex items-center">
                        <Upload size={16} className="text-white mr-2" />
                        <span className="text-sm text-white truncate max-w-xs">
                          Existing Image
                        </span>
                      </div>
                      <button 
                        type="button" 
                        onClick={removeImage}
                        className="text-red-500 hover:text-red-300 focus:outline-none transition-colors"
                      >
                        <X size={28} />
                      </button>
                    </div>
                    <div className="flex justify-center p-2 bg-opacity-10">
                      <img 
                        src={existingImage} 
                        alt="Product preview" 
                        className="h-40 object-contain" 
                      />
                    </div>
                  </div>
                </div>
              ) : imagePreview ? (
                <div className="relative">
                  <div className="rounded-lg overflow-hidden border border-white border-opacity-30 bg-opacity-10">
                    <div className="flex items-center justify-between px-3 py-2 bg-opacity-20">
                      <div className="flex items-center">
                        <Upload size={16} className="text-white mr-2" />
                        <span className="text-sm text-white truncate max-w-xs">
                          {formData.ProductImage?.name || "New Product Image"}
                        </span>
                      </div>
                      <button 
                        type="button" 
                        onClick={removeImage}
                        className="text-red-500 hover:text-red-300 focus:outline-none transition-colors"
                      >
                        <X size={28} />
                      </button>
                    </div>
                    <div className="flex justify-center p-2 bg-opacity-10">
                      <img 
                        src={imagePreview} 
                        alt="Product preview" 
                        className="h-40 object-contain" 
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="ProductImage" className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-opacity-20 hover:bg-opacity-30 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Camera className="w-8 h-8 mb-1" style={{ color: '#0d9488' }} />
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG or WEBP (max. 2MB)</p>
                    </div>
                    <input 
                      type="file" 
                      id="ProductImage" 
                      name="ProductImage" 
                      accept="image/*" 
                      className="hidden"
                      onChange={handleChange}
                    />
                  </label>
                </div>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="mt-6 flex justify-between"
          >
            <motion.button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 rounded-full bg-gray-500 text-white font-semibold hover:bg-gray-600 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
            <motion.button
                          type="submit"
                          className="px-6 py-2 rounded-full font-semibold transition-all"
                          style={{ 
                            background: 'linear-gradient(to right, #5eeadb, #99f6ec)',
                            boxShadow: '0 4px 10px rgba(93, 234, 219, 0.3)' 
                          }}
                          whileHover={{ scale: 1.02, boxShadow: '0 6px 15px rgba(93, 234, 219, 0.4)' }}
                          whileTap={{ scale: 0.98 }}
                          disabled={loading}
                        >
              {loading ? 'Updating Item...' : 'Update Inventory Item'}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateInventory;