import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Edit2, Save, X, ShieldCheck, AlertTriangle, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../service/AuthContext.jsx';
import TopHeader from "../common/TopHeader/TopHeader.jsx";

const AccountManagement = () => {
    const { user } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [editMode, setEditMode] = useState({
        personalInfo: false,
        contactInfo: false
    });

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    });

    const [notification, setNotification] = useState(null);

    // Fetch user data
    useEffect(() => {
        if (user?.email) {
            setLoading(true);
            fetch('http://localhost:8080/api/track-tidy/admin/getAll')
                .then(res => res.json())
                .then(data => {
                    const matchedUser = data.find(u => u.email === user.email);
                    if (matchedUser) {
                        setUserData(matchedUser);
                        setFormData({
                            firstName: matchedUser.firstName || '',
                            lastName: matchedUser.lastName || '',
                            email: matchedUser.email || '',
                            phoneNumber: matchedUser.phoneNumber || ''
                        });
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Failed to fetch user info', err);
                    setError('Failed to load account information. Please try again later.');
                    setLoading(false);
                });
        }
    }, [user]);

    const [packageType, setPackageType] = useState('Loading...');

    useEffect(() => {
        if (user?.email) {
            fetch('http://localhost:8080/api/track-tidy/package/getAll')
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    const matchedPackage = data.find((pkg) => pkg.userId === user.email);
                    if (matchedPackage) {
                        setPackageType(matchedPackage.packageType);
                    } else {
                        setPackageType('No Package');
                    }
                })
                .catch((err) => console.error('Failed to fetch package info', err));
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleEditMode = (section) => {
        setEditMode(prev => ({ ...prev, [section]: !prev[section] }));

        // Reset form data to current values if canceling edit
        if (editMode[section]) {
            setFormData(prev => ({
                ...prev,
                firstName: userData?.firstName || '',
                lastName: userData?.lastName || '',
                email: userData?.email || '',
                phoneNumber: userData?.phoneNumber || ''
            }));
        }
    };

    const savePersonalInfo = () => {
        // Mock API call - replace with actual implementation
        setLoading(true);
        setTimeout(() => {
            setUserData(prev => ({
                ...prev,
                firstName: formData.firstName,
                lastName: formData.lastName
            }));
            toggleEditMode('personalInfo');
            showNotification('Personal information updated successfully!', 'success');
            setLoading(false);
        }, 800);
    };

    const saveContactInfo = () => {
        // Mock API call - replace with actual implementation
        setLoading(true);
        setTimeout(() => {
            setUserData(prev => ({
                ...prev,
                email: formData.email,
                phoneNumber: formData.phoneNumber
            }));
            toggleEditMode('contactInfo');
            showNotification('Contact information updated successfully!', 'success');
            setLoading(false);
        }, 800);
    };

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    if (loading && !userData) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-800"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto my-8 bg-red-100 p-6 rounded-xl shadow-md text-red-800 flex items-center">
                <AlertTriangle className="mr-4 flex-shrink-0" size={24} />
                <div>
                    <h3 className="font-bold text-lg mb-1">Error Loading Account</h3>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <TopHeader />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto px-4 py-12"
            >
                {/* Notification */}
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`fixed top-20 right-4 p-4 rounded-lg shadow-xl z-50 ${
                            notification.type === 'success' ? 'bg-green-100 text-green-800 border-l-4 border-green-600' : 'bg-red-100 text-red-800 border-l-4 border-red-600'
                        }`}
                    >
                        {notification.type === 'success' ? (
                            <ShieldCheck className="inline-block mr-2" size={18} />
                        ) : (
                            <AlertTriangle className="inline-block mr-2" size={18} />
                        )}
                        {notification.message}
                    </motion.div>
                )}

                {/* Header */}
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">My Account</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">Manage your profile and account preferences</p>
                </div>

                {/* Account Overview Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg p-8 mb-10 border border-green-200"
                >
                    <div className="flex flex-col md:flex-row items-center md:space-x-8">
                        <div className="w-24 h-24 mb-4 md:mb-0 rounded-full bg-gradient-to-br from-green-700 to-green-900 text-white flex items-center justify-center text-3xl font-semibold shadow-md">
                            {userData?.firstName?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-1">{userData?.firstName} {userData?.lastName}</h2>
                            <p className="text-gray-600 mb-3 flex items-center justify-center md:justify-start">
                                <Mail size={16} className="mr-2 text-green-700" /> {userData?.email}
                            </p>
                            <div className="inline-block bg-gradient-to-r from-green-700 to-green-800 text-white text-sm px-4 py-1.5 rounded-full shadow-sm">
                                {packageType || 'No Package'} Plan
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-3 gap-8">
                    {/* Personal Information */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                    >
                        <div className="flex justify-between items-center bg-gradient-to-r from-green-100 to-green-50 p-5 border-b border-green-200">
                            <div className="flex items-center">
                                <UserCircle className="mr-3 text-green-800" size={22} />
                                <h3 className="font-semibold text-gray-800 text-lg">Personal Information</h3>
                            </div>
                            <button
                                onClick={() => toggleEditMode('personalInfo')}
                                className="text-sm flex items-center text-green-800 hover:text-green-600 bg-white px-3 py-1.5 rounded-md shadow-sm transition duration-200 hover:shadow"
                            >
                                {editMode.personalInfo ? (
                                    <>
                                        <X size={16} className="mr-1" /> Cancel
                                    </>
                                ) : (
                                    <>
                                        <Edit2 size={16} className="mr-1" /> Edit
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="p-6">
                            {editMode.personalInfo ? (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                                                placeholder="Enter your first name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                                                placeholder="Enter your last name"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-2">
                                        <button
                                            onClick={savePersonalInfo}
                                            className="flex items-center px-6 py-2.5 bg-gradient-to-r from-green-700 to-green-800 text-white rounded-lg hover:from-green-800 hover:to-green-900 transition shadow-md"
                                        >
                                            <Save size={18} className="mr-2" />
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">First Name</p>
                                        <p className="font-medium text-lg">{userData?.firstName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Last Name</p>
                                        <p className="font-medium text-lg">{userData?.lastName}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                    >
                        <div className="flex justify-between items-center bg-gradient-to-r from-green-100 to-green-50 p-5 border-b border-green-200">
                            <div className="flex items-center">
                                <Mail className="mr-3 text-green-800" size={22} />
                                <h3 className="font-semibold text-gray-800 text-lg">Contact Information</h3>
                            </div>
                            <button
                                onClick={() => toggleEditMode('contactInfo')}
                                className="text-sm flex items-center text-green-800 hover:text-green-600 bg-white px-3 py-1.5 rounded-md shadow-sm transition duration-200 hover:shadow"
                            >
                                {editMode.contactInfo ? (
                                    <>
                                        <X size={16} className="mr-1" /> Cancel
                                    </>
                                ) : (
                                    <>
                                        <Edit2 size={16} className="mr-1" /> Edit
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="p-6">
                            {editMode.contactInfo ? (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                                                placeholder="Enter your email address"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phoneNumber}
                                                onChange={handleInputChange}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                                                placeholder="Enter your phone number"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-2">
                                        <button
                                            onClick={saveContactInfo}
                                            className="flex items-center px-6 py-2.5 bg-gradient-to-r from-green-700 to-green-800 text-white rounded-lg hover:from-green-800 hover:to-green-900 transition shadow-md"
                                        >
                                            <Save size={18} className="mr-2" />
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Email Address</p>
                                        <p className="font-medium text-lg">{userData?.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                                        <p className="font-medium text-lg">{userData?.phoneNumber || 'Not provided'}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Subscription and Billing */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                    >
                        <div className="bg-gradient-to-r from-green-100 to-green-50 p-5 border-b border-green-200">
                            <div className="flex items-center">
                                <ShieldCheck className="mr-3 text-green-800" size={22} />
                                <h3 className="font-semibold text-gray-800 text-lg">Subscription & Billing</h3>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="mb-6">
                                <div className="flex justify-between items-end mb-4">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Current Plan</p>
                                        <span className="font-semibold text-xl text-gray-800">{packageType || 'No Package'}</span>
                                    </div>
                                    {packageType && (
                                        <span className="px-3 py-1.5 bg-green-100 text-sm rounded-full text-green-800 font-medium flex items-center">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                            Active
                                        </span>
                                    )}
                                </div>

                                {packageType && (
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <p className="text-gray-600 mb-2">Your subscription renews on {new Date().toLocaleDateString()}</p>
                                        <div className="h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                                            <div className="h-full bg-green-600 rounded-full" style={{ width: '75%' }}></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <button
                                    onClick={() => window.location.href = '/packages'}
                                    className="px-6 py-2.5 bg-gradient-to-r from-green-700 to-green-800 text-white rounded-lg hover:from-green-800 hover:to-green-900 transition shadow-md"
                                >
                                    Manage Subscription
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
};

export default AccountManagement;