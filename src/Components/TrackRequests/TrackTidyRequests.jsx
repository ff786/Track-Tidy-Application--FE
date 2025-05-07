import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopHeader from "../common/TopHeader/TopHeader.jsx";
import { motion } from "framer-motion"; // Assuming you have framer-motion installed

// Mock data for demonstration
const mockRequests = [
    { id: 1, type: 'inventory', title: 'Office Supplies', status: 'pending', date: '2025-04-10', description: 'Need new pens, notebooks, and staplers for the office' },
    { id: 2, type: 'service', title: 'IT Support', status: 'completed', date: '2025-04-08', description: 'Fix network connectivity issues in meeting room B' },
    { id: 3, type: 'grocery', title: 'Kitchen Restock', status: 'pending', date: '2025-04-12', description: 'Restock coffee, sugar, and snacks for the kitchen area' },
    { id: 4, type: 'inventory', title: 'Desk Chairs', status: 'in-progress', date: '2025-04-09', description: 'Order 5 ergonomic desk chairs for the design team' },
    { id: 5, type: 'service', title: 'Plumbing Repair', status: 'pending', date: '2025-04-11', description: 'Fix leaking faucet in the second floor bathroom' },
    { id: 6, type: 'grocery', title: 'Team Lunch Items', status: 'completed', date: '2025-04-07', description: 'Order catering for the team lunch on Friday' },
    { id: 7, type: 'inventory', title: 'Printer Paper', status: 'in-progress', date: '2025-04-13', description: 'Order A4 paper for all office printers' },
    { id: 8, type: 'service', title: 'Network Setup', status: 'pending', date: '2025-04-10', description: 'Set up new WiFi access point in the conference room' },
];

const TrackTidyRequests = () => {
    // State for the selected tab and filtered requests
    const [activeTab, setActiveTab] = useState('all');
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedRow, setExpandedRow] = useState(null);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
    const [showModal, setShowModal] = useState(false);
    const [requestToCancel, setRequestToCancel] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
        setOpen(false); // Close dropdown after navigation
    };

    // Handle responsive layout
    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Simulate fetching data from a database
    useEffect(() => {
        setLoading(true);
        // In a real app, this would be an API call
        const fetchRequests = () => {
            return new Promise(resolve => {
                setTimeout(() => resolve(mockRequests), 800);
            });
        };

        fetchRequests().then(data => {
            setFilteredRequests(data);
            setLoading(false);
        });
    }, []);

    // Filter requests when tab changes
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            if (activeTab === 'all') {
                setFilteredRequests(mockRequests);
            } else {
                const filtered = mockRequests.filter(request => request.type === activeTab);
                setFilteredRequests(filtered);
            }
            setLoading(false);
        }, 400); // Small delay for transition effect
    }, [activeTab]);

    // Tab selection handler
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setExpandedRow(null); // Close any expanded rows on tab change
    };

    // Row expansion handler
    const toggleRowExpansion = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    // Cancel request handlers
    const openCancelModal = (e, request) => {
        e.stopPropagation(); // Prevent row expansion when clicking the cancel button
        setRequestToCancel(request);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setRequestToCancel(null);
    };

    const confirmCancelRequest = () => {
        // In a real app, you would make an API call to cancel the request
        // For this demo, we'll just update the UI by removing the request
        const updatedRequests = filteredRequests.filter(
            request => request.id !== requestToCancel.id
        );
        setFilteredRequests(updatedRequests);
        setShowModal(false);
        setRequestToCancel(null);
    };

    // Helper function to get status badge color
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
            case 'in-progress': return 'bg-blue-100 text-blue-800 border border-blue-300';
            case 'completed': return 'bg-green-100 text-green-800 border border-green-300';
            default: return 'bg-gray-100 text-gray-800 border border-gray-300';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return '⏳';
            case 'in-progress': return '🔄';
            case 'completed': return '✅';
            default: return '❓';
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'inventory': return '📦';
            case 'service': return '🔧';
            case 'grocery': return '🛒';
            default: return '📄';
        }
    };

    // Animation variants for framer-motion
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 }
        }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: { duration: 0.2 }
        }
    };

    return (
        <>
            <TopHeader />
            <div className="flex flex-col-2 md:flex-row min-h-screen bg-gradient-to-b from-green-50 via-slate-50 to-white">
                {/* Sidebar Navigation */}
                <div className={`${isMobileView ? 'w-full' : 'w-72'} bg-green-800 shadow-md p-3`}>
                    <h2 className="text-xl text-start font-black mb-6 text-white flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Request Manager
                    </h2>
                    <nav className={`${isMobileView ? 'flex flex-wrap gap-2' : 'space-y-2'}`}>
                        <button
                            className={`${isMobileView ? 'flex-1' : 'w-full'} font-bold text-start px-4 py-3 rounded-lg transition-all duration-300 transform hover:translate-x-1 ${activeTab === 'all' ? 'bg-green-200 border-2 border-green-800 text-black shadow-lg' : 'bg-gray-900 text-white hover:bg-green-900'}`}
                            onClick={() => handleTabClick('all')}
                        >
                            <span className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                                All Requests
                            </span>
                        </button>
                        <button
                            className={`${isMobileView ? 'flex-1' : 'w-full'} font-bold text-start px-4 py-3 rounded-lg transition-all duration-300 transform hover:translate-x-1 ${activeTab === 'inventory' ? 'bg-green-200 border-2 border-green-800 text-black shadow-lg' : 'bg-gray-900 text-white hover:bg-green-900'}`}
                            onClick={() => handleTabClick('inventory')}
                        >
                            <span className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                Inventory
                            </span>
                        </button>
                        <button
                            className={`${isMobileView ? 'flex-1' : 'w-full'} font-bold text-start px-4 py-3 rounded-lg transition-all duration-300 transform hover:translate-x-1 ${activeTab === 'service' ? 'bg-green-200 border-2 border-green-800 text-black shadow-lg' : 'bg-gray-900 text-white hover:bg-green-900'}`}
                            onClick={() => handleTabClick('service')}
                        >
                            <span className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Service
                            </span>
                        </button>
                        <button
                            className={`${isMobileView ? 'flex-1' : 'w-full'} font-bold text-start px-4 py-3 rounded-lg transition-all duration-300 transform hover:translate-x-1 ${activeTab === 'grocery' ? 'bg-green-200 border-2 border-green-800 text-black shadow-lg' : 'bg-gray-900 text-white hover:bg-green-900'}`}
                            onClick={() => handleTabClick('grocery')}
                        >
                            <span className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Grocery
                            </span>
                        </button>
                    </nav>

                    {/* Additional Sidebar Content - Stats Summary */}
                    <div className="mt-8 p-3 bg-gray-900 bg-opacity-50 rounded-lg text-white">
                        <h3 className="text-lg font-semibold mb-2">Request Stats</h3>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="p-2 bg-gray-800 bg-opacity-60 rounded">
                                <div className="text-sm">Pending</div>
                                <div className="text-xl font-bold">{mockRequests.filter(r => r.status === 'pending').length}</div>
                            </div>
                            <div className="p-2 bg-gray-800 bg-opacity-60 rounded">
                                <div className="text-sm">Completed</div>
                                <div className="text-xl font-bold">{mockRequests.filter(r => r.status === 'completed').length}</div>
                            </div>
                            <div className="p-2 bg-gray-800 bg-opacity-60 rounded">
                                <div className="text-sm">In Progress</div>
                                <div className="text-xl font-bold">{mockRequests.filter(r => r.status === 'in-progress').length}</div>
                            </div>
                            <div className="p-2 bg-gray-800 bg-opacity-60 rounded">
                                <div className="text-sm">Total</div>
                                <div className="text-xl font-bold">{mockRequests.length}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-4 md:p-8">
                    <motion.div
                        className="bg-green-100 rounded-lg shadow-lg p-4 md:p-6 transition-all duration-300 hover:shadow-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                            <h1 className="text-2xl font-bold text-green-800">
                                {activeTab === 'all' ? 'All Requests' :
                                    activeTab === 'inventory' ? 'Inventory Requests' :
                                        activeTab === 'service' ? 'Service Requests' : 'Grocery Requests'}
                            </h1>
                            <div className="relative mt-2 md:mt-0">
                                <button
                                    onClick={() => setOpen(!open)}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition-colors flex items-center"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                    New Request
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 ml-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {open && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-20">
                                        <button
                                            onClick={() => handleNavigate('/inventory')}
                                            className="w-full text-left px-4 py-2 hover:bg-green-100 text-gray-800"
                                        >
                                            Inventory
                                        </button>
                                        <button
                                            onClick={() => handleNavigate('/user-services')}
                                            className="w-full text-left px-4 py-2 hover:bg-green-100 text-gray-800"
                                        >
                                            Services
                                        </button>
                                        <button
                                            onClick={() => handleNavigate('/grocery-home')}
                                            className="w-full text-left px-4 py-2 hover:bg-green-100 text-gray-800"
                                        >
                                            Grocery
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
                            </div>
                        ) : filteredRequests.length > 0 ? (
                            <motion.div
                                className="overflow-x-auto"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                                    <thead className="bg-green-700 text-white">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Title</th>
                                        {!isMobileView && (
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Type</th>
                                        )}
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                                        {!isMobileView && (
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                                        )}
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredRequests.map((request) => (
                                        <React.Fragment key={request.id}>
                                            <motion.tr
                                                className={`hover:bg-green-50 cursor-pointer ${expandedRow === request.id ? 'bg-green-50' : ''}`}
                                                variants={itemVariants}
                                                onClick={() => toggleRowExpansion(request.id)}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-left">
                                                    <div className="flex items-center">
                                                        <span className="mr-2">{getTypeIcon(request.type)}</span>
                                                        {request.title}
                                                    </div>
                                                </td>
                                                {!isMobileView && (
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-start capitalize">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-800 border border-green-200">
                                                            {request.type}
                                                        </span>
                                                    </td>
                                                )}
                                                <td className="px-6 py-4 whitespace-nowrap justify-start text-start">
                                                    <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
                                                        {getStatusIcon(request.status)} {request.status}
                                                    </span>
                                                </td>
                                                {!isMobileView && (
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-start text-gray-500">
                                                        {request.date}
                                                    </td>
                                                )}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            className="p-1 rounded-full hover:bg-gray-100 text-blue-600"
                                                            onClick={(e) => toggleRowExpansion (e, request)}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            className="p-1 rounded-full hover:bg-gray-100 text-red-600"
                                                            onClick={(e) => openCancelModal(e, request)}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                            {expandedRow === request.id && (
                                                <motion.tr
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <td colSpan={isMobileView ? 3 : 5} className="px-6 py-4 bg-green-50">
                                                        <div className="text-sm text-gray-700">
                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                                <div>
                                                                    <p className="font-semibold">Description:</p>
                                                                    <p>{request.description}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="font-semibold">Type:</p>
                                                                    <p className="capitalize">{request.type}</p>
                                                                    {isMobileView && (
                                                                        <>
                                                                            <p className="font-semibold mt-2">Date:</p>
                                                                            <p>{request.date}</p>
                                                                        </>
                                                                    )}
                                                                </div>{/*
                                                                <div>
                                                                    <button
                                                                        className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow transition-colors"
                                                                        onClick={(e) => openCancelModal(e, request)}
                                                                    >
                                                                        Cancel Request
                                                                    </button>
                                                                </div>*/}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                    </tbody>
                                </table>
                            </motion.div>
                        ) : (
                            <motion.div
                                className="text-center py-12 text-gray-500 bg-white rounded-lg shadow p-8"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-xl font-semibold">
                                    {activeTab === 'all'
                                        ? 'No requests found'
                                        : `No ${activeTab} requests found`}
                                </p>
                                <p className="mt-2">Create your first request by clicking the New Request button above.</p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Cancel Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        className="bg-white rounded-lg shadow-lg max-w-md w-full p-6"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="flex items-center justify-center mb-4 text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-center mb-4">Cancel Request</h3>
                        <p className="text-gray-600 mb-6 text-center">
                            Are you sure you want to cancel the request "{requestToCancel?.title}"? This action cannot be undone.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition-colors"
                                onClick={closeModal}
                            >
                                No, Keep It
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center"
                                onClick={confirmCancelRequest}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Yes, Cancel Request
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </>
    );
}

export default TrackTidyRequests;