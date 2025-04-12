import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        role: 'user',
        companyName: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // First check if we have user data passed via state
        if (location.state?.user) {
            const userData = location.state.user;
            setUser({
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                email: userData.email || '',
                mobileNumber: userData.mobileNumber || '',
                role: userData.role || 'user',
                companyName: userData.companyName || ''
            });
            setLoading(false);
        } else {
            // Fallback to API fetch if no state data
            setLoading(true);
            const fetchUser = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/user/getUserById/${id}`);
                    const userData = response.data;
                    setUser({
                        firstName: userData.firstName || userData.username?.split(' ')[0] || '',
                        lastName: userData.lastName || userData.username?.split(' ')[1] || '',
                        email: userData.email || '',
                        mobileNumber: userData.mobileNumber || '',
                        role: userData.role || 'user',
                        companyName: userData.companyName || ''
                    });
                } catch (err) {
                    setError(err.response?.data?.message || 'Failed to fetch user data');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchUser();
        }
    }, [id, location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const userData = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                mobileNumber: user.mobileNumber,
                role: user.role,
                companyName: user.role === 'vendor' ? user.companyName : ''
            };

            // Check if this is a local user (ID starts with "local-")
            if (id.startsWith('local-')) {
                // Handle local storage update
                const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
                const userIndex = parseInt(id.split('-')[1]);

                // Create updated user list
                const updatedUsers = [...registeredUsers];
                updatedUsers[userIndex] = {
                    ...updatedUsers[userIndex],
                    firstName: user.firstName,
                    lastName: user.lastName,
                    mobileNumber: user.mobileNumber,
                    role: user.role,
                    companyName: user.role === 'vendor' ? user.companyName : ''
                };

                // Save back to localStorage
                localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
            } else {
                // Handle API update for non-local users
                const response = await axios.put(`http://localhost:8080/user/update/${id}`, userData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }

            setSuccessMessage('User updated successfully!');
            setTimeout(() => {
                navigate('/user-list', { state: { message: 'User updated successfully!' } });
            }, 1500);
        } catch (err) {
            console.error('Update error:', err);
            setError(err.response?.data?.message || err.message || 'Failed to update user');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-white text-xl">Loading user data...</div>
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
                className="w-full max-w-md p-8 rounded-3xl"
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
                <h2 className="text-3xl font-bold mb-6 text-center">Edit User</h2>

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

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={user.firstName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={user.lastName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 rounded-lg bg-white bg-opacity-70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 ${id.startsWith('local-') ? 'bg-gray-100 cursor-not-allowed' : ''
                                }`}
                            required
                            disabled={id.startsWith('local-')}
                        />
                        {id.startsWith('local-') && (
                            <p className="text-sm text-gray-500 mt-1">Email cannot be changed for local users</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Mobile Number</label>
                        <input
                            type="tel"
                            name="mobileNumber"
                            value={user.mobileNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Role</label>
                        <select
                            name="role"
                            value={user.role}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            <option value="user">User</option>
                            <option value="vendor">Vendor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {user.role === 'vendor' && (
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Company Name</label>
                            <input
                                type="text"
                                name="companyName"
                                value={user.companyName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                required
                            />
                        </div>
                    )}

                    <div className="flex justify-between mt-6">
                        <motion.button
                            type="button"
                            onClick={() => navigate('/user-list')}
                            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Cancel
                        </motion.button>

                        <motion.button
                            type="submit"
                            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Update User
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default EditUser;