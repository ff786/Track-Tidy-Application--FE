import React, { useState, useEffect, useRef } from 'react';
import { Home, Settings, FileText, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../service/AuthContext.jsx';

function TopHeader() {
    const { user, logout } = useAuth();
    const [activeLink, setActiveLink] = useState('/');
    const [isOpen, setIsOpen] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [packageType, setPackageType] = useState('Loading...');
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);

    // Fetch user info
    useEffect(() => {
        if (user?.email) {
            fetch('http://localhost:8080/api/track-tidy/admin/getAll')
                .then((res) => res.json())
                .then((data) => {

                    const matchedUser = data.find((u) => u.email === user.email);
                    if (matchedUser) {
                        setUserInfo(matchedUser);
                    }
                })
                .catch((err) => console.error('Failed to fetch user info', err));
        }
    }, [user]);//This is done finallyyyyyyyyy

    // Fetch package info for this user
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLinkClick = (path) => {
        setActiveLink(path);
        navigate(path);
    };

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <motion.nav
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
            className="bg-green-100 shadow-md sticky top-0 z-50"
        >
            <div className="max-w-auto mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleLinkClick('/dashboard')}>
                            <Home className="h-6 w-6 text-green-900 hover:text-green-600 transition" />
                            <span className="text-xl font-bold text-gray-800">TrackTidy</span>
                        </div>

                        <div className="md:flex gap-4 ml-6">
                            {[
                                { label: 'Home', path: '/dashboard' },
                                { label: 'Inventory', path: '/inventory' },
                                { label: 'Services', path: '/user-services' },
                                { label: 'Packages', path: '/packages' },
                                { label: 'Grocery', path: '/grocery-home' },
                            ].map(({ label, path }) => (
                                <a
                                    key={path}
                                    href={path}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleLinkClick(path);
                                    }}
                                    className={`text-sm font-medium transition-all pb-1 no-underline ${
                                        activeLink === path
                                            ? 'text-green-800 border-b-2 border-green-800'
                                            : 'text-gray-500 hover:text-gray-700 hover:border-b-2 border-transparent'
                                    }`}
                                >
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Avatar + Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleDropdown}
                            className="w-10 h-10 rounded-full bg-green-800 text-white flex items-center justify-center hover:bg-green-700 text-lg font-semibold"
                        >
                            {userInfo?.firstName?.charAt(0).toUpperCase() || 'U'}
                        </motion.button>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-2 w-72 bg-green-100 bg-opacity-80 backdrop-blur-sm shadow-lg rounded-xl z-50 border border-gray-900"
                                >
                                    <div className="flex flex-col gap-2 p-4 bg-green-50 rounded-xl border-b-2 border-gray-900">
                                        <div className="flex items-center justify-between">
                                            <p className="text-base font-semibold text-gray-900">
                                                {userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : 'User'}
                                            </p>
                                            <span className="text-sm font-medium text-green-800 bg-green-200 px-3 py-1 rounded-full">
                                                {packageType}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="py-2">
                                        <button
                                            onClick={() => navigate('/account')}
                                            className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-100 transition"
                                        >
                                            <Settings className="w-5 h-5 text-gray-900" />
                                            <span className="text-gray-800 text-sm">Manage Account</span>
                                        </button>

                                        <button
                                            onClick={() => navigate('/requests')}
                                            className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-100 transition"
                                        >
                                            <FileText className="w-5 h-5 text-gray-600" />
                                            <span className="text-gray-800 text-sm">My Requests</span>
                                        </button>

                                        <div className="px-4 pt-2 pb-3 border-t border-gray-900">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-sm bg-green-800 border border-gray-200 rounded-md px-4 py-2 hover:bg-gray-100 text-gray-200 transition"
                                            >
                                                <div className="flex items-center justify-center gap-2">
                                                    <LogOut className="w-4 h-4" />
                                                    Logout
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}

export default TopHeader;
