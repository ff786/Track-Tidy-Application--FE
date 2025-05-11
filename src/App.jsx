import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Components/Auth/Login.jsx';

// Components
import TrackTidyHomePage from './Home.jsx';
import ResetPassword from './Components/Auth/ResetPassword.jsx';
import EditUser from './Components/UserManagement/EditUser.jsx';
import ForgotPassword from './Components/Auth/ForgotPassword.jsx';
import OtpVerification from './Components/Auth/OtpVerification.jsx';
import UserServices from './Components/TrackServicesHome/UserServices.jsx';
import UserList from './Components/UserManagement/UserList.jsx';
import Signup from './Components/Auth/Signup.jsx';
import AddInventory from './Components/HomeInventory/addInventory.jsx';
import ViewInventory from './Components/HomeInventory/viewInventory.jsx';
import UpdateInventory from './Components/HomeInventory/updateInventory.jsx';
import ViewOneInventory from './Components/HomeInventory/ViewOneInventory.jsx';
import InventoryPage from './Components/HomeInventory/inventoryPage.jsx';
import ServiceRequest from './Components/AllServiceRequest/ServiceRequests.jsx';
import TrackTidyRequests from './Components/TrackRequests/TrackTidyRequests.jsx';
import TrackPackages from './Components/TTPackages/TtPackage.jsx';
import TrackTidyGrocery from './Components/GroceryDisplay/GroceryMarketPlace.jsx';
import HomeInventory from './Components/InventoryHome/HomeInventory.jsx';
import AboutUs from './Components/AboutUs/AboutUs.jsx';
import PrivacyPolicy from './Components/PrivacyPolicy/PrivacyPolicy.jsx';
import TermsAndConditions from './Components/Terms&Conditions/Terms.jsx';
import DashboardOverview from './Components/AdminDashboards/DashBoardAdmin/dashboardAdmin.jsx';
import AdminViewGrocery from './Components/AdminDashboards/GroceryAdmin/GroceryAdmin.jsx';
import PackagesAdmin from './Components/AdminDashboards/PackagesAdmin/PackagesAdmin.jsx';
import AccountManagement from './Components/UserAccountManagent/AccountManagement.jsx';

// Function to check if user is admin
const isAdmin = () => {
  return sessionStorage.getItem('isAdmin') === 'true' || 
         localStorage.getItem('userRole') === 'admin';
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/dashboard',
    element: <TrackTidyHomePage />
  },
  {
    path: '/packages',
    element: <TrackPackages />
  },
  {
    path: '/inventory',
    element: <HomeInventory />
  },
  {
    path: '/requests',
    element: <TrackTidyRequests />
  },
  {
    path: '/user-services',
    element: <UserServices />
  },
  {
    path: '/grocery-home',
    element: <TrackTidyGrocery />
  },
  {
    path: '/view-grocery',
    element: <AdminViewGrocery />
  },
  {
    path: '/about-us',
    element: <AboutUs />
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicy />
  },
  {
    path: '/terms-&-conditions',
    element: <TermsAndConditions />
  },
  {
    path: '/user-management',
    element: <UserList />
  },
  {
    path: '/add-in',
    element: <AddInventory />
  },
  {
    path: '/view-in',
    element: <ViewInventory />
  },
  {
    path: '/update-in/:id',
    element: <UpdateInventory />
  },
  {
    path: '/view-one-in/:id',
    element: <ViewOneInventory />
  },
  {
    path: '/in-page',
    element: <InventoryPage />
  },
  {
    path: '/view-service',
    element: <ServiceRequest />
  },
  {
    path: '/admin/bgi/dashboard',
    element: <DashboardOverview />
  },
  {
    path: '/view-packages',
    element: <PackagesAdmin />
  },
  {
    path: '/account',
    element: <AccountManagement />
  },
  // Protected Routes
  {
    path: '/user-list',
    element: isAdmin() ? <UserList /> : <Navigate to="/" />
  },
  {
    path: '/edit-user/:id',
    element: isAdmin() ? <EditUser /> : <Navigate to="/" />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/reset-password',
    element: <ResetPassword />
  },
  {
    path: '/otp-verification',
    element: <OtpVerification />
  }
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

