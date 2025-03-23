import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from "react-helmet";

const SideNav = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSidebarLocked, setIsSidebarLocked] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState('dashboard'); // Initialize with the first dropdown open
    const [userData, setUserData] = useState(null);
    const sidebarRef = useRef(null);

    const toggleLock = () => {
        setIsSidebarLocked(!isSidebarLocked);
        // If locking sidebar, ensure it's expanded
        if (!isSidebarLocked) {
            setIsExpanded(true);
        }
    };

    const hideSidebar = () => {
        if (!isSidebarLocked) {
            setIsExpanded(false);
        }
    };

    const showSidebar = () => {
        if (!isSidebarLocked) {
            setIsExpanded(true);
        }
    };

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const handleDropdownToggle = (dropdownId) => {
        // Always ensure sidebar is expanded when opening a dropdown
        if (!isExpanded) {
            setIsExpanded(true);
        }
        setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
    };

    // Adding mock user data for testing
    useEffect(() => {
        // Simulating fetching user data
        setUserData({
            firstName: "John Doe",
            email: "john.doe@example.com"
        });
    }, []);

    useEffect(() => {
        // Adding event listeners to handle mouse enter and leave events
        const sidebar = sidebarRef.current;
        if (sidebar) {
            sidebar.addEventListener("mouseenter", showSidebar);
            sidebar.addEventListener("mouseleave", hideSidebar);

            // Cleanup function to remove event listeners
            return () => {
                sidebar.removeEventListener("mouseenter", showSidebar);
                sidebar.removeEventListener("mouseleave", hideSidebar);
            };
        }
    }, [isSidebarLocked]); // Re-run effect when isSidebarLocked changes

    return (
        <>
            <Helmet>
                <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet"/>
            </Helmet>
            <div className={`sticky z-50 ${isExpanded ? 'expanded' : 'collapsed'} items-start`}>
                <nav ref={sidebarRef}
                     className={`flex flex-col fixed top-0 left-0 h-full bg-[#02072D] transition-all duration-500 ease-in-out p-4 shadow-md z-5 ${
                         isExpanded ? 'w-80' : 'w-20'
                     } ${isSidebarLocked ? 'locked' : ''}`}>
                    <div className="min-h-full bg-[#02072D] relative flex flex-col items-start">
                        <div className="flex gap-1 items-start mt-3 w-full">
                            <span className={`text-3xl text-[#68F0F5] font-bold transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'} text-start items-start justify-start`}>
                                Track Tidy
                            </span>
                            <i className={`bx ${isSidebarLocked ? 'bx-lock-alt' : 'bx-lock-open-alt'} p-2 text-2xl text-white cursor-pointer transition-all duration-300 ${isExpanded ? '' : 'opacity-0 pointer-events-none'}`}
                               title={isSidebarLocked ? "Unlock Sidebar" : "Lock Sidebar"}
                               onClick={toggleLock}></i>
                            <i className="bx bx-x p-2 text-xl text-white cursor-pointer transition-all duration-300 md:block hidden"
                               onClick={toggleSidebar}></i>
                        </div>
                        <div><p className={`text-white text-m text-left mt-2 mb-3 ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                            An Organized Home Inventory Track Management System
                        </p>
                        </div>
                        <div className="block mb-auto overflow-y-auto h-full max-h-screen w-full">
                            <div className="menu_items w-full">
                                <ul className="list-none p-0 w-full">
                                    <div className="relative cursor-pointer h-12 text-white flex flex-row items-start w-full"
                                         onClick={() => handleDropdownToggle('dashboard')}>
                                        <span className={`ml-4 p-1 transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'} text-start`}>Menu</span>
                                        <i className={`bx ${activeDropdown === 'dashboard' ? 'bx-chevron-up' : 'bx-chevron-down'} ml-auto`}></i>
                                    </div>
                                    {activeDropdown === 'dashboard' && (
                                        <ul className="list-none p-0" style={{ display: isExpanded ? 'block' : 'none' }}>
                                            <li className="py-2 px-2 w-full">
                                                <a href="#" className="no-underline rounded-lg mb-0.5 text-white flex items-start hover:bg-[#97A0F2] p-2">
                                                    <i className="bx bx-home-alt h-12 min-w-14 flex text-xl items-start"></i>
                                                    <span className="ml-2 text-left">Home</span>
                                                </a>
                                            </li>
                                            <li className="py-2 px-2 w-full">
                                                <a href="#" className="no-underline rounded-lg mb-0.5 text-white flex items-start hover:bg-[#97A0F2] p-2">
                                                    <i className="bx bx-user h-12 min-w-14 flex text-xl items-start"></i>
                                                    <span className="ml-2 text-left">My Inventory</span>
                                                </a>
                                            </li>
                                            <li className="py-2 px-2 w-full">
                                                <a href="/user-services" className="no-underline rounded-lg mb-0.5 text-white flex items-start hover:bg-[#97A0F2] p-2">
                                                    <i className="bx bx-archive h-12 min-w-14 flex text-xl items-start"></i>
                                                    <span className="ml-2 text-left">Maintenance Service</span>
                                                </a>
                                            </li>
                                            <li className="py-2 px-2 w-full">
                                                <a href="/" className="no-underline rounded-lg mb-0.5 text-white flex items-start hover:bg-[#97A0F2] p-2">
                                                    <i className="bx bx-archive h-12 min-w-14 flex text-xl items-start"></i>
                                                    <span className="ml-2 text-left">Grocery</span>
                                                </a>
                                            </li>
                                            <li className="py-2 px-2 w-full">
                                                <a href="/" className="no-underline rounded-lg mb-0.5 text-white flex items-start hover:bg-[#97A0F2] p-2">
                                                    <i className="bx bx-archive h-12 min-w-14 flex text-xl items-start"></i>
                                                    <span className="ml-2 text-left">Profile Management</span>
                                                </a>
                                            </li>
                                        </ul>
                                    )}
                                </ul>
                                <ul className="list-none p-0">
                                    <div className="relative cursor-pointer h-12 text-white flex flex-row justify-between items-center"
                                         onClick={() => handleDropdownToggle('dashboard2')}>
                                        <span className={`ml-4 transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>User Management</span>
                                        <span className={`absolute left-1/2 transform -translate-x-1/2 h-0.5 w-5 bg-white rounded-full transition-all duration-300 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}></span>
                                        <i className={`bx ${activeDropdown === 'dashboard2' ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
                                    </div>
                                    {activeDropdown === 'dashboard2' && (
                                        <ul className="list-none p-0" style={{ display: isExpanded ? 'block' : 'none' }}>
                                            <li className="py-2 px-5">
                                                <a href="#" className="no-underline rounded-lg mb-0.5 text-white flex items-center hover:bg-[#97A0F2]">
                                                    <i className="bx bx-cog h-12 min-w-14 flex text-xl items-center justify-center rounded"></i>
                                                    <span className="whitespace-nowrap">Settings</span>
                                                </a>
                                            </li>
                                            <li className="py-2 px-5">
                                                <a href="#" className="no-underline rounded-lg mb-0.5 text-white flex items-center hover:bg-[#97A0F2]">
                                                    <i className="bx bx-shield-alt h-12 min-w-14 flex text-xl items-center justify-center rounded"></i>
                                                    <span className="whitespace-nowrap">Privacy Policy</span>
                                                </a>
                                            </li>
                                            <li className="py-2 px-5">
                                                <a href="#" className="no-underline rounded-lg mb-0.5 text-white flex items-center hover:bg-[#97A0F2]">
                                                    <i className="bx bx-help-circle h-12 min-w-14 flex text-xl items-center justify-center rounded"></i>
                                                    <span className="whitespace-nowrap">About Us</span>
                                                </a>
                                            </li>
                                        </ul>
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className="absolute bottom-2 w-20">
                            {userData && (
                                <div className="flex items-center gap-4 pt-4 mt-4 border-t-2 border-white mx-auto">
                                    <span className="flex min-w-16 justify-center">
                                        {/* User avatar could go here */}
                                    </span>
                                    <div className={`transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                                        <span className="text-lg text-white">{userData.firstName}</span><br/>
                                        <span className="text-sm text-white">{userData.email}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            </div>

            {/* Toggle Switch for Dark/Light Mode (Optional) */}
            <div className="absolute bottom-5 left-5 flex items-center">
                <label className="relative inline-block w-16 h-8">
                    <input type="checkbox" className="opacity-0 w-0 h-0" />
                    <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 transition-all duration-400 rounded-full before:absolute before:content-[''] before:h-6 before:w-6 before:left-1 before:bottom-1 before:bg-black before:transition-all before:duration-400 before:rounded-full"></span>
                </label>
                <span className="ml-2 text-sm">Mode</span>
            </div>
        </>
    );
};

export default SideNav;
