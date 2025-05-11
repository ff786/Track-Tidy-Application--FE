import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Home,
    PackageSearch,
    Wrench,
    ShoppingCart,
    UserCog,
    Settings,
    ShieldCheck,
    HelpCircle,
    Lock,
    Unlock
} from 'lucide-react';

const navItems = [
    {
        section: 'Main',
        links: [
            { to: '/', icon: <Home size={20} />, label: 'Home' },
            { to: '/view-in', icon: <PackageSearch size={20} />, label: 'My Inventory' },
            { to: '/user-services', icon: <Wrench size={20} />, label: 'Maintenance Service' },
            { to: '/grocery', icon: <ShoppingCart size={20} />, label: 'Grocery' },
            { to: '/profile', icon: <UserCog size={20} />, label: 'Profile Management' }
        ]
    },
    {
        section: 'Admin',
        links: [
            { to: '/settings', icon: <Settings size={20} />, label: 'Settings' },
            { to: '/privacy', icon: <ShieldCheck size={20} />, label: 'Privacy Policy' },
            { to: '/about', icon: <HelpCircle size={20} />, label: 'About Us' }
        ]
    }
];

const SideNav = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSidebarLocked, setIsSidebarLocked] = useState(false);
    const [userData, setUserData] = useState(null);
    const sidebarRef = useRef(null);
    const location = useLocation();

    const toggleLock = () => {
        setIsSidebarLocked(!isSidebarLocked);
        if (!isSidebarLocked) setIsExpanded(true);
    };

    const hideSidebar = () => {
        if (!isSidebarLocked) setIsExpanded(false);
    };

    const showSidebar = () => {
        if (!isSidebarLocked) setIsExpanded(true);
    };

    useEffect(() => {
        setUserData({
            firstName: 'John Doe',
            email: 'john.doe@example.com'
        });
    }, []);

    useEffect(() => {
        const sidebar = sidebarRef.current;
        if (sidebar) {
            sidebar.addEventListener('mouseenter', showSidebar);
            sidebar.addEventListener('mouseleave', hideSidebar);
            return () => {
                sidebar.removeEventListener('mouseenter', showSidebar);
                sidebar.removeEventListener('mouseleave', hideSidebar);
            };
        }
    }, [isSidebarLocked]);

    return (
        <div className={`sticky z-50 ${isExpanded ? 'expanded' : 'collapsed'} items-start`}>
            <nav
                ref={sidebarRef}
                className={`flex flex-col fixed top-0 left-0 h-full bg-[#065f46] text-white transition-all duration-300 p-4 shadow-lg z-50 ${
                    isExpanded ? 'w-64' : 'w-20'
                } ${isSidebarLocked ? 'locked' : ''}`}
            >
                <div className="flex justify-between items-center mb-6">
          <span
              className={`text-2xl font-bold transition-opacity duration-300 ${
                  isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
          >
            Track Tidy
          </span>
                    <button onClick={toggleLock} title={isSidebarLocked ? 'Unlock Sidebar' : 'Lock Sidebar'}>
                        {isSidebarLocked ? <Lock className="text-white" /> : <Unlock className="text-white" />}
                    </button>
                </div>

                {navItems.map((section) => (
                    <div key={section.section} className="mb-4">
                        <p
                            className={`uppercase text-sm font-semibold text-green-100 tracking-wide mb-2 pl-2 transition-opacity duration-300 ${
                                isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`}
                        >
                            {section.section}
                        </p>
                        <ul className="space-y-1">
                            {section.links.map((link) => {
                                const isActive = location.pathname === link.to;
                                return (
                                    <li key={link.to}>
                                        <Link
                                            to={link.to}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                                                isActive ? 'bg-green-700' : 'hover:bg-green-600'
                                            }`}
                                        >
                                            {link.icon}
                                            <span
                                                className={`transition-opacity duration-300 ${
                                                    isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                                }`}
                                            >
                        {link.label}
                      </span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}

                <div className="mt-auto pt-4 border-t border-green-300">
                    {userData && (
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-800 rounded-full"></div>
                            <div
                                className={`transition-opacity duration-300 ${
                                    isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                }`}
                            >
                                <p className="text-sm font-medium">{userData.firstName}</p>
                                <p className="text-xs text-green-100">{userData.email}</p>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default SideNav;
