import React, { useState, useEffect, useRef } from 'react';
import ServiceRequest from "../AllServiceRequest/ServiceRequests.jsx";
import AdminViewInventory from "./InventoryAdmin/InventoryAdmin.jsx";
import UserList from "../UserManagement/UserList.jsx";
import { useAuth } from '../../service/AuthContext.jsx';

import {
    Home, PackageSearch, Wrench, ShoppingCart, UserCog,
    Settings, ShieldCheck, HelpCircle, Lock, Unlock, ChevronRight, Box
} from 'lucide-react';
import AdminViewGrocery from "./GroceryAdmin/GroceryAdmin.jsx";
import PackagesAdmin from "./PackagesAdmin/PackagesAdmin.jsx";
import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy.jsx";
import AboutUs from "../AboutUs/AboutUs.jsx";

// Demo component to showcase the sidebar
const SideNavPreview = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isSidebarLocked, setIsSidebarLocked] = useState(false);
    const [userData, setUserData] = useState(null);
    const sidebarRef = useRef(null);
    const [activePath, setActivePath] = useState('/');
    const { user } = useAuth();

    const navItems = [
        {
            section: 'Main',
            links: [
                { to: '/', icon: <Home size={20} />, label: 'Home' },
                { to: '/view-in', icon: <PackageSearch size={20} />, label: 'My Inventory' },
                { to: '/view-service', icon: <Wrench size={20} />, label: 'Maintenance Service' },
                { to: '/view-grocery', icon: <ShoppingCart size={20} />, label: 'Grocery List   ' },
                { to: '/user-management', icon: <UserCog size={20} />, label: 'Profile Management' },
                { to: '/view-packages', icon: <Box size={20} />, label: 'Packages Management' },
            ]
        },
        {
            section: 'Admin',
            links: [
                { to: '/settings', icon: <Settings size={20} />, label: 'Settings' }
            ]
        }
    ];

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

    /*useEffect(() => {
        setUserData({
            firstName: 'John Doe',
            email: 'john.doe@example.com',
        });
    }, []);*/

    // Fetch user info
    useEffect(() => {
        if (user?.email) {
            fetch('http://localhost:8080/api/track-tidy/admin/getAll')
                .then((res) => res.json())
                .then((data) => {

                    const matchedUser = data.find((u) => u.email === user.email);
                    if (matchedUser) {
                        setUserData(matchedUser);
                    }
                })
                .catch((err) => console.error('Failed to fetch user info', err));
        }
    }, [user]);

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

    // Render the appropriate content based on the active path
    const renderContent = () => {
        switch (activePath) {
            case '/view-service':
                return <ServiceRequest />;
                case '/view-in':
                    return <AdminViewInventory />;
                    case '/user-management':
                        return <UserList />;
                        case '/view-grocery':
                            return <AdminViewGrocery />;
                            case '/view-packages':
                                return <PackagesAdmin />;
            default:
                return (
                    <>
                        <h1 className="text-2xl font-bold text-gray-800">Welcome to Track Tidy</h1>
                        <p className="text-gray-600 mt-2">
                            Select an option from the sidebar to begin managing your services.
                        </p>
                    </>
                );
        }
    };

    // Inline styles to bypass CSS conflicts
    const styles = {
        wrapper: {
            display: 'flex',
            height: '100vh',
            position: 'relative',
            overflow: 'hidden'
        },
        sidebarContainer: {
            position: 'relative',
            zIndex: 50,
            height: '100%'
        },
        sidebar: {
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: isExpanded ? '16rem' : '5rem',
            background: 'linear-gradient(to bottom, #065f46, #022c22)',
            color: 'white',
            transition: 'all 0.3s',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 50,
            overflow: 'hidden',
        },
        logoContainer: {
            position: 'relative',
        },
        logoPattern: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '6rem',
            background: '#059669',
            opacity: 0.2,
            borderBottomLeftRadius: '100%',
            borderBottomRightRadius: '100%',
        },
        headerContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            marginBottom: '1.5rem',
            position: 'relative',
            zIndex: 10,
        },
        logoBox: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
        },
        logoCircle: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.5rem',
            height: '2.5rem',
            background: 'white',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        },
        logoText: {
            color: '#065f46',
            fontWeight: 800,
            fontSize: '1.25rem',
        },
        brandName: {
            fontSize: '1.25rem',
            fontWeight: 700,
            transition: 'opacity 0.3s',
            opacity: isExpanded ? 1 : 0,
            pointerEvents: isExpanded ? 'auto' : 'none',
        },
        lockButton: {
            padding: '0.5rem',
            borderRadius: '9999px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
        },
        navContent: {
            padding: '0 0.75rem',
            flex: 1,
        },
        sectionTitle: {
            textAlign: 'left',
            textTransform: 'uppercase',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#6ee7b7',
            letterSpacing: '0.05em',
            marginBottom: '0.5rem',
            marginLeft: '0.5rem',
            transition: 'opacity 0.3s',
            opacity: isExpanded ? 1 : 0,
            pointerEvents: isExpanded ? 'auto' : 'none',
        },
        navSection: {
            marginBottom: '1.5rem',
        },
        navList: {
            textAlign: 'left',
            fontWeight: '600',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
        },
        navItem: (isActive) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            backgroundColor: isActive ? '#059669' : 'transparent',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.2s',
            textDecoration: 'none',
            boxShadow: isActive ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none',
        }),
        icon: (isActive) => ({
            color: isActive ? 'white' : '#6ee7b7',
        }),
        label: {
            flex: 1,
            fontSize: '0.875rem',
            fontWeight: 500,
            transition: 'opacity 0.3s',
            opacity: isExpanded ? 1 : 0,
            pointerEvents: isExpanded ? 'auto' : 'none',
        },
        userSection: {
            marginTop: 'auto',
            borderTop: '1px solid rgba(52, 211, 153, 0.3)',
        },
        userContainer: {
            textAlign: 'left',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left',
            gap: '0.75rem',
            transition: 'background-color 0.2s',
            cursor: 'pointer',
        },
        userAvatar: {
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            backgroundColor: '#059669',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 600,
            border: '2px solid #34d399',
            padding: '0.125rem',
        },
        userName: {
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'white',
            marginBottom: '0',
        },
        userEmail: {
            fontSize: '0.75rem',
            color: '#6ee7b7',
            marginBottom: '0',
        },
        userInfo: {
            alignItems: 'middle',
            transition: 'opacity 0.3s',
            opacity: isExpanded ? 1 : 0,
            pointerEvents: isExpanded ? 'auto' : 'none',
        },
        toggleButton: {
            position: 'fixed',
            bottom: '1rem',
            left: isExpanded ? '16rem' : '1rem',
            backgroundColor: '#047857',
            color: 'white',
            padding: '0.5rem',
            borderRadius: '9999px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            zIndex: 50,
            display: 'flex',
        },
        rotatedIcon: {
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 150ms ease-in-out'
        },
        content: {
            marginLeft: isExpanded ? '16rem' : '5rem',
            transition: 'margin-left 0.3s',
            padding: '1.5rem',
            flex: 1,
            backgroundColor: '#f3f4f6',
            borderRadius: '5px',
            marginBottom: '0.5rem',
            height: 'max-screen',
            overflowY: 'auto', // Add scrolling if content is too long
        }
    };

    // Mock link component for demo
    const Link = ({ to, style, children }) => {
        return (
            <div
                onClick={() => setActivePath(to)}
                style={style}
            >
                {children}
            </div>
        );
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.sidebarContainer}>
                <nav
                    ref={sidebarRef}
                    style={styles.sidebar}
                >
                    {/* Logo & Toggle */}
                    <div style={styles.logoContainer}>
                        {/* Stylish top background pattern */}
                        <div style={styles.logoPattern}></div>

                        <div style={styles.headerContainer}>
                            <div style={styles.logoBox}>
                                <div style={styles.logoCircle}>
                                    <span style={styles.logoText}>TT</span>
                                </div>
                                <span style={styles.brandName}>
                  Track Tidy
                </span>
                            </div>
                            <button
                                onClick={toggleLock}
                                style={styles.lockButton}
                                title={isSidebarLocked ? 'Unlock Sidebar' : 'Lock Sidebar'}
                            >
                                {isSidebarLocked ? <Lock size={18} /> : <Unlock size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Navigation Sections */}
                    <div style={styles.navContent}>
                        {navItems.map((section) => (
                            <div key={section.section} style={styles.navSection}>
                                <p style={styles.sectionTitle}>
                                    {section.section}
                                </p>
                                <ul style={styles.navList}>
                                    {section.links.map((link) => {
                                        const isActive = activePath === link.to;
                                        return (
                                            <li key={link.to}>
                                                <Link
                                                    to={link.to}
                                                    style={styles.navItem(isActive)}
                                                >
                                                    <div style={styles.icon(isActive)}>
                                                        {link.icon}
                                                    </div>
                                                    <span style={styles.label}>
                            {link.label}
                          </span>
                                                    {isExpanded && isActive && (
                                                        <ChevronRight size={16} style={{ color: '#6ee7b7' }} />
                                                    )}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* User Profile */}
                    <div style={styles.userSection}>
                        {userData && (
                            <div style={styles.userContainer}>
                                <div style={styles.userAvatar}>
                                    {userData.firstName.charAt(0)}
                                </div>
                                <div style={styles.userInfo}>
                                    <p style={styles.userName}>{userData.firstName}</p>
                                    <p style={styles.userEmail}>{userData.email}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>

                {/* Sidebar toggle button */}
                <button
                    onClick={() => setIsExpanded((prev) => !prev)}
                    style={styles.toggleButton}
                >
                    <ChevronRight size={18} style={styles.rotatedIcon} />
                </button>
            </div>

            {/* Main content area - Now using the renderContent function */}
            <main style={styles.content}>
                {renderContent()}
            </main>
        </div>
    );
};

export default SideNavPreview;