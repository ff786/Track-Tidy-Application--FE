import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Edit, Trash2, ArrowLeft } from 'react-feather';

const ViewOneInventory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    const fetchInventoryItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/track-tidy/inventory/get/${id}`);
        setItem(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch inventory item.');
        setLoading(false);
      }
    };

    fetchInventoryItem();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/track-tidy/inventory/delete/${id}`);
      navigate('/view-in');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete inventory item.');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading inventory item...</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Inventory item not found</div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/8583818/pexels-photo-8583818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div 
        className="w-full max-w-3xl p-8 rounded-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-between items-center mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="mr-2" />
            Back to Inventory
          </button>
          <div className="flex space-x-4">
            <motion.button
              onClick={() => navigate(`/update-in/${id}`)}
              className="px-4 py-2 rounded-full bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-all flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Edit size={18} className="mr-2" />
              Edit Item
            </motion.button>
            <motion.button
              onClick={() => setConfirmDelete(true)}
              className="px-4 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition-all flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Trash2 size={18} className="mr-2" />
              Delete Item
            </motion.button>
          </div>
        </motion.div>

        {error && (
          <motion.div
            className="bg-red-100 bg-opacity-90 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        {confirmDelete && (
          <motion.div
            className="bg-white bg-opacity-20 border border-white border-opacity-30 p-4 rounded-lg mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-white mb-4">Are you sure you want to delete this item? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-2 rounded-full bg-gray-500 text-white hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </motion.div>
        )}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col items-center">
            {item.ProductImage ? (
              <motion.div
                className="w-64 h-64 rounded-lg overflow-hidden border-2 border-white border-opacity-30"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={`http://localhost:8080/uploads/${item.ProductImage}`}
                  alt={item.productName}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ) : (
              <div className="w-64 h-64 rounded-lg bg-white bg-opacity-10 border-2 border-white border-opacity-30 flex items-center justify-center">
                <span className="text-white">No Image Available</span>
              </div>
            )}
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-bold text-white">{item.productName}</h3>
              <p className="text-white opacity-80">{item.productCategory}</p>
              <div className={`mt-2 px-4 py-1 rounded-full inline-block ${item.Faulted === 'Yes' ? 'bg-red-500' : 'bg-green-500'}`}>
                {item.Faulted === 'Yes' ? 'Faulted' : 'Good Condition'}
              </div>
            </div>
          </div>

          <div className="text-white">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold opacity-70">Product ID</h4>
                <p className="text-lg">{item.productId}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold opacity-70">User ID</h4>
                <p className="text-lg">{item.userId}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold opacity-70">Quantity</h4>
                <p className="text-lg">{item.quantity}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold opacity-70">Product Value</h4>
                <p className="text-lg">${item.productValue}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold opacity-70">Purchase Date</h4>
                <p className="text-lg">{formatDate(item.purchaseDate)}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold opacity-70">Warranty Date</h4>
                <p className="text-lg">{formatDate(item.warrantyDate)}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 pt-6 border-t border-white border-opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Additional Information</h3>
          <div className="bg-white bg-opacity-10 p-4 rounded-lg">
            {item.additionalNotes ? (
              <p className="text-white">{item.additionalNotes}</p>
            ) : (
              <p className="text-white opacity-70">No additional information available for this item.</p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ViewOneInventory;