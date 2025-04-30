import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Edit, Trash2, Download } from 'react-feather';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const UserList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiUsers = await fetchApiUsers();
        const localStorageUsers = getLocalStorageUsers();
        const combinedUsers = combineUsers(apiUsers, localStorageUsers);
        
        setUsers(combinedUsers);
      } catch (err) {
        console.error("Error:", err);
        setError('API failed - showing local users');
        setUsers(getLocalStorageUsers());
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const fetchApiUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/user/getUsers');
      return response.data.map(user => ({
        ...user,
        source: 'api',
        firstName: user.firstName || user.username?.split(' ')[0],
        lastName: user.lastName || user.username?.split(' ')[1] || '',
        mobileNumber: user.mobileNumber || 'N/A',
        role: user.role || 'user'
      }));
    } catch (err) {
      console.warn("API request failed, will try localStorage");
      return [];
    }
  };

  const getLocalStorageUsers = () => {
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    
    return registeredUsers.map((user, index) => ({
      _id: `local-${index}-${Date.now()}`, // Fixed: Added backticks for template literal
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      role: 'user',
      source: 'localStorage'
    }));
  };

  const combineUsers = (apiUsers, localStorageUsers) => {
    // Create a Set of existing emails from API users
    const existingEmails = new Set(apiUsers.map(user => user.email.toLowerCase()));
    
    // Track emails we've already seen from localStorage
    const seenLocalEmails = new Set();
    
    // Filter localStorage users to only include unique emails
    const uniqueLocalUsers = localStorageUsers.filter(user => {
      const emailLower = user.email.toLowerCase();
      const isUnique = !existingEmails.has(emailLower) && !seenLocalEmails.has(emailLower);
      if (isUnique) {
        seenLocalEmails.add(emailLower);
      }
      return isUnique;
    });
    
    return [...apiUsers, ...uniqueLocalUsers];
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        if (id.startsWith('local-')) {
          // Delete from localStorage
          const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
          
          // Extract the index from the ID (assuming format is "local-index")
          const userIndex = parseInt(id.split('-')[1]);
          
          // Filter out the user by index
          const updatedUsers = registeredUsers.filter((user, index) => index !== userIndex);
          
          localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
        } else {
          // Delete from API
          await axios.delete(`http://localhost:8080/user/delete/${id}`);
        }
        
        setUsers(users.filter(user => user._id !== id));
        setSuccessMessage('User deleted!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        setError('Delete failed: ' + err.message);
      }
    }
  };

  const generatePDF = () => {
    // Create new PDF with landscape orientation for better fit
    const doc = new jsPDF({
      orientation: "landscape"
    });
  
    // Add title with styling
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.setFont("helvetica", "bold");
    doc.text("User List Report", 14, 20);
  
    // Add subtitle with generation date
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 27);
  
    // Calculate available width (subtract left and right margins)
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14; // 14mm left/right margin
    const availableWidth = pageWidth - (margin * 2);
  
    // Prepare table data
    const tableData = filteredUsers.map(user => [
      user.firstName || 'N/A',
      user.lastName || 'N/A',
      user.email,
      user.mobileNumber || 'N/A',
      user.role || 'user'
    ]);
  
    // Generate table with full-page width
    autoTable(doc, {
      head: [['First Name', 'Last Name', 'Email', 'Mobile', 'Role']],
      body: tableData,
      startY: 35,
      margin: { horizontal: margin }, // Set left/right margins
      tableWidth: 'wrap', // Will use available width
      styles: {
        fontSize: 10,
        cellPadding: 6, // Increased padding
        overflow: 'linebreak',
        textColor: [40, 40, 40],
        fillColor: [255, 255, 255],
        lineWidth: 0.1,
        lineColor: [200, 200, 200]
      },
      headStyles: {
        fillColor: [4, 95, 86], // Dark teal color
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 11,
        cellPadding: 8 // Extra padding for headers
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      },
      columnStyles: {
        0: { cellWidth: 'auto' }, // First Name - auto width
        1: { cellWidth: 'auto' }, // Last Name - auto width
        2: { cellWidth: 'auto' }, // Email - will take more space
        3: { cellWidth: 'auto' }, // Mobile
        4: { cellWidth: 'auto' }  // Role
      },
      // This ensures columns expand to fill available space
      horizontalPageBreak: true,
      showHead: 'everyPage',
      // Stretch columns proportionally
      didParseCell: (data) => {
        if (data.section === 'head') {
          data.cell.styles.fontSize = 11;
        }
      }
    });
  
    // Add page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width - 25,
        doc.internal.pageSize.height - 10
      );
    }
  
    // Save the PDF with date in filename
    doc.save(`user_list_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (user.firstName && user.firstName.toLowerCase().includes(searchLower)) ||
      (user.lastName && user.lastName.toLowerCase().includes(searchLower)) ||
      (user.email && user.email.toLowerCase().includes(searchLower)) ||
      (user.role && user.role.toLowerCase().includes(searchLower))
    );
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center p-4 min-h-screen"
      style={{
        background: 'linear-gradient(135deg,rgb(4, 95, 86) 0%,rgb(49, 231, 213) 50%, #ccfbf6 100%)',
      }}
    >
      <motion.div 
        className="w-full max-w-4xl p-8 rounded-3xl"
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
        {successMessage && (
          <motion.div
            className="bg-green-100 bg-opacity-90 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {successMessage}
          </motion.div>
        )}

        {error && (
          <motion.div
            className="bg-red-100 bg-opacity-90 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-center mb-8"
        >
          <h2 className="text-3xl font-bold mb-4 md:mb-0">
            User List Overview
          </h2>
          <motion.button
            onClick={generatePDF}
            className="px-4 py-2 rounded-full bg-gray-500 text-white font-semibold hover:bg-amber-700 transition-all flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={18} className="mr-2" />
            Generate PDF
          </motion.button>
        </motion.div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, email, or role..."
            className="w-full px-4 py-2 rounded-full bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
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
              <tr className="border-b border-white border-opacity-30">     
                <th className="px-4 py-3 text-left">First Name</th>
                <th className="px-4 py-3 text-left">Last Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Mobile</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((user) => (
                  <motion.tr
                    key={user._id}
                    className="text-gray-400 border-b border-white border-opacity-20 hover:bg-white hover:bg-opacity-10 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-4 py-3">{user.firstName}</td>
                    <td className="px-4 py-3">{user.lastName}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.mobileNumber}</td>
                    <td className="px-4 py-3">{user.role}</td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <motion.button
                          onClick={() => navigate(`/edit-user/${user._id}`)}
                          className="p-2 bg-yellow-500 rounded-full hover:bg-yellow-700 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Edit"
                        >
                          <Edit size={16} className="text-white" />
                        </motion.button>
                        <motion.button
                          onClick={() => handleDelete(user._id)}
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
                  className="text-gray-400 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <td colSpan="6" className="py-6">
                    {searchTerm ? 'No matching users found' : 'No users available'}
                  </td>
                </motion.tr>
              )}
            </tbody>
          </motion.table>
        </div>

        {filteredUsers.length > itemsPerPage && (
          <div className="flex justify-center mt-6">
            <nav className="flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <motion.button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 rounded-full ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white bg-opacity-20 text-gray-500'}`}
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

export default UserList;