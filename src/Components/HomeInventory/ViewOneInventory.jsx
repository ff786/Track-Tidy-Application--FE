import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Edit, Trash2, ArrowLeft, Download } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ViewOneInventory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/track-tidy/inventory/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setRecord(response.data);
        
        // Create image URL if receipt exists
        if (response.data.receipt) {
          setImageUrl(`data:image/jpeg;base64,${response.data.receipt}`);
        }
      } catch (error) {
        console.error('Error fetching record:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to load record. Please try again later.',
        });
        navigate('/view-inventory');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecord();
  }, [id, navigate]);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/track-tidy/inventory/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        Swal.fire(
          'Deleted!',
          'The record has been deleted.',
          'success'
        );
        navigate('/view-inventory');
      } catch (error) {
        console.error('Error deleting record:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to delete record. Please try again later.',
        });
      }
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `receipt-${record.memberId || 'unknown'}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch {
      return 'Invalid Date';
    }
  };

  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getInitials = (firstName, lastName) => {
    const first = firstName?.charAt(0)?.toUpperCase() || '';
    const last = lastName?.charAt(0)?.toUpperCase() || '';
    return first + last;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Record not found</h2>
          <button
            onClick={() => navigate('/view-inventory')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center mx-auto"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Inventory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-6 text-white">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/view-inventory')}
              className="flex items-center text-white hover:text-gray-200"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back
            </button>
            <h1 className="text-2xl font-bold">Record Details</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => navigate(`/edit-inventory/${id}`, { state: { record } })}
                className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-1 px-3 rounded-lg flex items-center"
              >
                <Edit size={16} className="mr-1" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-white text-red-600 hover:bg-gray-100 font-medium py-1 px-3 rounded-lg flex items-center"
              >
                <Trash2 size={16} className="mr-1" />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Personal Info */}
            <div className="md:col-span-1 bg-gray-50 p-6 rounded-lg">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <span className="text-blue-600 text-2xl font-bold">
                    {getInitials(record.firstName, record.lastName)}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-center">
                  {[record.firstName, record.lastName].filter(Boolean).join(' ') || 'N/A'}
                </h2>
                <p className="text-gray-500">{record.memberId || 'N/A'}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="text-gray-900">{record.email || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p className="text-gray-900">{record.phoneNumber || 'N/A'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date of Birth</h3>
                  <p className="text-gray-900">{formatDate(record.dob)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Gender</h3>
                  <p className="text-gray-900 capitalize">{record.gender || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Middle Column - Service Details */}
            <div className="md:col-span-1 bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Service Information</h3>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Service Type</h3>
                  <p className="text-gray-900 capitalize">
                    {record.serviceType || 'N/A'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Amount Paid</h3>
                  <p className="text-gray-900">{formatCurrency(record.amount)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Registration Date</h3>
                  <p className="text-gray-900">{formatDate(record.createdAt)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                  <p className="text-gray-900">{formatDate(record.updatedAt)}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Receipt */}
            <div className="md:col-span-1 bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Receipt</h3>
                {imageUrl && (
                  <button
                    onClick={handleDownload}
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <Download size={16} className="mr-1" />
                    Download
                  </button>
                )}
              </div>
              
              {imageUrl ? (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={imageUrl}
                    alt="Receipt"
                    className="w-full h-auto object-contain"
                  />
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <p className="text-gray-500">No receipt available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOneInventory;