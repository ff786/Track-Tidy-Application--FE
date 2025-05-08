import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Lock, Edit2, Save, X, ShieldCheck, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../service/AuthContext.jsx';

const AccountManagement = () => {

    const { user } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [editMode, setEditMode] = useState({
        personalInfo: false,
        contactInfo: false,
        password: false
    });
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
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
                            phone: matchedUser.phoneNumber || '',
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: ''
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

    // Fetch package info
    const [packageInfo, setPackageInfo] = useState(null);

    useEffect(() => {
        if (user?.email) {
            fetch('http://localhost:8080/api/track-tidy/package/getAll')
                .then(res => res.json())
                .then(data => {
                    const matchedPackage = data.find(pkg => pkg.email === user.email);
                    if (matchedPackage) {
                        setPackageInfo(matchedPackage);
                    }
                })
                .catch(err => console.error('Failed to fetch package info', err));
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
                phone: userData?.phoneNumber || '',
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
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
                phone: formData.phone
            }));
            toggleEditMode('contactInfo');
            showNotification('Contact information updated successfully!', 'success');
            setLoading(false);
        }, 800);
    };

    const savePassword = () => {
        // Password validation
        if (formData.newPassword !== formData.confirmPassword) {
            showNotification('New passwords do not match!', 'error');
            return;
        }

        if (formData.newPassword.length < 8) {
            showNotification('Password must be at least 8 characters long!', 'error');
            return;
        }

        // Mock API call - replace with actual implementation
        setLoading(true);
        setTimeout(() => {
            toggleEditMode('password');
            showNotification('Password updated successfully!', 'success');
            setFormData(prev => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }));
            setLoading(false);
        }, 800);
    };

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    if (loading && !userData) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 p-4 rounded-lg text-red-800">
                <AlertTriangle className="inline-block mr-2" />
                {error}
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto px-4 py-8"
        >
            {/* Notification */}
            {notification && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`fixed top-20 right-4 p-4 rounded-lg shadow-lg z-50 ${
                        notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
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
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Account Management</h1>
                <p className="text-gray-600">Manage your personal information and account settings</p>
            </div>

            {/* Account Overview Card */}
            <div className="bg-green-50 rounded-xl shadow-md p-6 mb-8 border border-green-800 border-opacity-20">
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-green-800 text-white flex items-center justify-center text-2xl font-semibold">
                        {userData?.firstName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">{userData?.firstName} {userData?.lastName}</h2>
                        <p className="text-gray-600">{userData?.email}</p>
                        <div className="mt-1 inline-block bg-green-800 text-white text-xs px-2 py-1 rounded-full">
                            {packageInfo?.packageType || 'No Package'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
                <div className="flex justify-between items-center bg-green-100 p-4 border-b border-green-200">
                    <div className="flex items-center">
                        <User className="mr-2 text-green-800" />
                        <h3 className="font-medium text-gray-800">Personal Information</h3>
                    </div>
                    <button
                        onClick={() => toggleEditMode('personalInfo')}
                        className="text-sm flex items-center text-green-800 hover:text-green-600"
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    onClick={savePersonalInfo}
                                    className="flex items-center px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 transition"
                                >
                                    <Save size={16} className="mr-2" />
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">First Name</p>
                                <p className="font-medium">{userData?.firstName}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Last Name</p>
                                <p className="font-medium">{userData?.lastName}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
                <div className="flex justify-between items-center bg-green-100 p-4 border-b border-green-200">
                    <div className="flex items-center">
                        <Mail className="mr-2 text-green-800" />
                        <h3 className="font-medium text-gray-800">Contact Information</h3>
                    </div>
                    <button
                        onClick={() => toggleEditMode('contactInfo')}
                        className="text-sm flex items-center text-green-800 hover:text-green-600"
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    onClick={saveContactInfo}
                                    className="flex items-center px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 transition"
                                >
                                    <Save size={16} className="mr-2" />
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Email Address</p>
                                <p className="font-medium">{userData?.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Phone Number</p>
                                <p className="font-medium">{userData?.phone || 'Not provided'}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Password */}
            <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
                <div className="flex justify-between items-center bg-green-100 p-4 border-b border-green-200">
                    <div className="flex items-center">
                        <Lock className="mr-2 text-green-800" />
                        <h3 className="font-medium text-gray-800">Password</h3>
                    </div>
                    <button
                        onClick={() => toggleEditMode('password')}
                        className="text-sm flex items-center text-green-800 hover:text-green-600"
                    >
                        {editMode.password ? (
                            <>
                                <X size={16} className="mr-1" /> Cancel
                            </>
                        ) : (
                            <>
                                <Edit2 size={16} className="mr-1" /> Change Password
                            </>
                        )}
                    </button>
                </div>

                <div className="p-6">
                    {editMode.password ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    onClick={savePassword}
                                    className="flex items-center px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 transition"
                                >
                                    <Save size={16} className="mr-2" />
                                    Update Password
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <p className="text-gray-600">Password last changed on {new Date().toLocaleDateString()}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Subscription and Billing */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-green-100 p-4 border-b border-green-200">
                    <div className="flex items-center">
                        <ShieldCheck className="mr-2 text-green-800" />
                        <h3 className="font-medium text-gray-800">Subscription & Billing</h3>
                    </div>
                </div>

                <div className="p-6">
                    <div className="mb-6">
                        <p className="text-sm text-gray-500 mb-1">Current Package</p>
                        <div className="flex items-center">
                            <span className="font-medium text-lg">{packageInfo?.packageType || 'No Package'}</span>
                            {packageInfo && (
                                <span className="ml-2 px-2 py-1 bg-green-100 text-xs rounded-full text-green-800">
                  Active
                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={() => window.location.href = '/packages'}
                            className="px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-700 transition"
                        >
                            Manage Subscription
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AccountManagement;