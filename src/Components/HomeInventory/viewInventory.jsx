import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Edit, Trash2, Eye, Plus, Download } from 'react-feather';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const ViewInventory = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/track-tidy/inventory/getAll');
        setInventory(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch inventory items.');
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this inventory item?')) {
      try {
        await axios.delete(`http://localhost:8080/api/track-tidy/inventory/delete/${id}`);
        setInventory(inventory.filter(item => item._id !== id));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete inventory item.');
      }
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();
    
    // Title and headers
    doc.setFontSize(24).setFont("helvetica", "bold").setTextColor("#4B9CD3");
    doc.text("Track Tidy Inventory Report", 105, 15, { align: "center" });
    
    doc.setFont("helvetica", "normal").setFontSize(12).setTextColor("#666");
    doc.text(`Report Generated: ${date}`, 105, 25, { align: "center" });
    
    // Filtered data or all data
    const dataToExport = searchTerm ? filteredInventory : inventory;
    
    // Table columns
    const tableColumn = [
      "Product ID",
      "Name",
      "Category",
      "User ID",
      "Quantity",
      "Value",
      "Status"
    ];
    
    // Table rows
    const tableRows = dataToExport.map(item => [
      item.productId || 'N/A',
      item.productName || 'N/A',
      item.productCategory || 'N/A',
      item.userId || 'N/A',
      item.quantity || '0',
      `$${item.productValue || '0'}`,
      item.Faulted === 'Yes' ? 'Faulted' : 'Good'
    ]);
    
    // Add table to document
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      styles: { fontSize: 9 },
      headStyles: {
        fillColor: [44, 62, 80],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 30 },
        2: { cellWidth: 25 },
        3: { cellWidth: 25 },
        4: { cellWidth: 15 },
        5: { cellWidth: 20 },
        6: { cellWidth: 20 }
      }
    });
    
    // Save the PDF
    doc.save(`Inventory_Report_${date}.pdf`);
  };

  const filteredInventory = inventory.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (item.productId && item.productId.toLowerCase().includes(searchLower)) ||
      (item.productName && item.productName.toLowerCase().includes(searchLower)) ||
      (item.productCategory && item.productCategory.toLowerCase().includes(searchLower)) ||
      (item.userId && item.userId.toLowerCase().includes(searchLower)) ||
      (item.quantity && item.quantity.toString().includes(searchTerm)) ||
      (item.productValue && item.productValue.toString().includes(searchTerm))
    );
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInventory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading inventory...</div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen w-full p-6"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/5157368/pexels-photo-5157368.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div 
        className="w-full p-8 rounded-3xl"
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
          className="flex flex-col md:flex-row justify-between items-center mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-4 md:mb-0">
            Inventory Overview
          </h2>
          <div className="flex space-x-4">
            <motion.button
              onClick={generatePDF}
              className="px-4 py-2 rounded-full bg-gray-500 text-white font-semibold hover:bg-amber-700 transition-all flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={18} className="mr-2" />
              Generate PDF
            </motion.button>
            <motion.button
              onClick={() => navigate('/add-in')}
              className="px-4 py-2 rounded-full bg-green-500 text-white font-semibold hover:bg-green-700 transition-all flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={18} className="mr-2" />
              Add New Item
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

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by ID, name, category, user ID, quantity or value..."
            className="w-full px-4 py-2 rounded-full bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            style={{ backdropFilter: 'blur(5px)' }}
          />
        </div>

        <div className="overflow-x-auto">
          <motion.table
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <thead>
              <tr className="text-white border-b border-white border-opacity-30">
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Product Name</th>
                <th className="px-4 py-3 text-left">Product ID</th>
                <th className="px-4 py-3 text-left">User ID</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Quantity</th>
                <th className="px-4 py-3 text-left">Value</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <motion.tr
                    key={item._id}
                    className="text-white border-b border-white border-opacity-20 hover:bg-white hover:bg-opacity-10 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-4 py-3">
                      {item.ProductImage ? (
                        <img
                          src={`http://localhost:8080/uploads/${item.ProductImage}`}
                          alt={item.productName}
                          className="w-10 h-10 object-cover rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center">
                          <span className="text-xs">No Image</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">{item.productName}</td>
                    <td className="px-4 py-3">{item.productId}</td>
                    <td className="px-4 py-3">{item.userId}</td>
                    <td className="px-4 py-3">{item.productCategory}</td>
                    <td className="px-4 py-3">{item.quantity}</td>
                    <td className="px-4 py-3">${item.productValue}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${item.Faulted === 'Yes' ? 'bg-red-500' : 'bg-green-500'}`}>
                        {item.Faulted === 'Yes' ? 'Faulted' : 'Good'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <motion.button
                          onClick={() => navigate(`/view-in/${item._id}`)}
                          className="p-2 bg-blue-500 rounded-full hover:bg-blue-700 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="View Details"
                        >
                          <Eye size={16} className="text-white" />
                        </motion.button>
                        <motion.button
                          onClick={() => navigate(`/update-in/${item._id}`)}
                          className="p-2 bg-yellow-500 rounded-full hover:bg-yellow-700 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Edit"
                        >
                          <Edit size={16} className="text-white" />
                        </motion.button>
                        <motion.button
                          onClick={() => handleDelete(item._id)}
                          className="p-2 bg-red-500 rounded-full hover:bg-red-700 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Delete"
                        >
                          <Trash2 size={16} className="text-white" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <motion.tr
                  className="text-white text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <td colSpan="9" className="py-6">
                    {searchTerm ? 'No matching items found' : 'No inventory items available'}
                  </td>
                </motion.tr>
              )}
            </tbody>
          </motion.table>
        </div>

        {filteredInventory.length > itemsPerPage && (
          <div className="flex justify-center mt-6">
            <nav className="flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <motion.button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 rounded-full ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white bg-opacity-20 text-white'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {number}
                </motion.button>
              ))}
            </nav>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ViewInventory;