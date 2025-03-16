import React, { useState, useEffect } from 'react';
import { Camera, Upload, X } from 'lucide-react';

const UpdateInventory = ({ existingItem }) => {
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
    
    // Load existing data when component mounts or existingItem changes
    useEffect(() => {
      if (existingItem) {
        setFormData({
          userid: existingItem.userid || '',
          productname: existingItem.productname || '',
          productid: existingItem.productid || '',
          quantity: existingItem.quantity || '',
          productvalue: existingItem.productvalue || '',
          purchasedate: existingItem.purchasedate || '',
          warrantyperiod: existingItem.warrantyperiod || '',
          productcategory: existingItem.productcategory || '',
          productimage: existingItem.productimage || null
        });
        
        // Set image preview if it exists
        if (existingItem.imageUrl) {
          setImagePreview(existingItem.imageUrl);
        }
      }
    }, [existingItem]);
    
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
    
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form submitted for update:', formData);
      // Add update logic here
      // This would typically involve an API call to update the item
    };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-8 rounded-xl overflow-hidden">
           <div className="flex flex-col lg:flex-row items-center justify-between rounded-lg overflow-hidden">
             {/* Left Side: Image with Overlay */}
             <div className="relative w-full lg:w-1/2 h-full">
               <img
                   src="/api/placeholder/800/600"
                   alt="Home inventory update"
                   className="w-full h-full object-cover rounded-lg"
               />
               <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
               <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8 text-center">
                 <h2 className="text-2xl font-semibold mb-4">
                 Update Your Inventory,</h2> <h2 className="text-2xl font-semibold mb-4">Keep Records Current</h2> 
               </div>
             </div>
   
             {/* Right Side: Form Section */}
             <div className="bg-white p-8 rounded-lg w-full lg:w-1/2 flex flex-col justify-center">
               {/* Header */}
               <h1 className="text-3xl font-bold text-center text-primary mb-4">
                 Update Inventory
               </h1>
   
               <form className="p-6 space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="userid" className="block text-sm font-medium text-gray-700 mb-1 mr-70">User ID</label>
                <input 
                  type="text" 
                  id="userid" 
                  name="userid" 
                  placeholder="Enter User ID" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  onChange={handleChange}
                  value={formData.userid}
                  readOnly
                />
              </div>
              
              <div>
                <label htmlFor="productname" className="block text-sm font-medium text-gray-700 mb-1 mr-55">Product Name</label>
                <input 
                  type="text" 
                  id="productname" 
                  name="productname" 
                  placeholder="Enter Product Name" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  onChange={handleChange}
                  value={formData.productname}
                />
              </div>
              
              <div>
                <label htmlFor="productid" className="block text-sm font-medium text-gray-700 mb-1 mr-60">Product ID</label>
                <input 
                  type="text" 
                  id="productid" 
                  name="productid" 
                  placeholder="Enter Product ID" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  onChange={handleChange}
                  value={formData.productid}
                  readOnly
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1 mr-30">Quantity</label>
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
                </div>
                
                <div>
                  <label htmlFor="productvalue" className="block text-sm font-medium text-gray-700 mb-1 mr-20">Value ($)</label>
                  <input 
                    type="text" 
                    id="productvalue" 
                    name="productvalue" 
                    placeholder="Enter Value" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    onChange={handleChange}
                    value={formData.productvalue}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="purchasedate" className="block text-sm font-medium text-gray-700 mb-1 mr-10">Purchase Date</label>
                  <input 
                    type="date" 
                    id="purchasedate" 
                    name="purchasedate" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    onChange={handleChange}
                    value={formData.purchasedate}
                  />
                </div>
                
                <div>
                  <label htmlFor="warrantyperiod" className="block text-sm font-medium text-gray-700 mb-1 mr-10">Warranty (months)</label>
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
                </div>
              </div>
              
              <div>
                <label htmlFor="productcategory" className="block text-sm font-medium text-gray-700 mb-1 mr-50">Product Category</label>
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
              </div>
              
              <div>
                <label htmlFor="productimage" className="block text-sm font-medium text-gray-700 mb-1 mr-50">Product Image</label>
                
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
            
            <div className="flex gap-4 pt-4">
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-md"
              >
                Update Inventory
              </button>
              <button 
                type="button" 
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors shadow-md"
                onClick={() => console.log('Cancel clicked')}
              >
                Cancel
              </button>
            </div>
          </form>
             </div>
           </div>
         </div>
  )
}

export default UpdateInventory;