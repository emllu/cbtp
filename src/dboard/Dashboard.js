import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../components/login/AxiosInstance'; // Axios instance with auth interceptor
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import './db.css'; // Custom CSS for styling

const Dashboard = () => {
  const navigate = useNavigate(); // For navigation
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false); // Sidebar state

  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
    
    const checkAuthentication = async () => {
      if (!token) {
        navigate('/login'); // Redirect if no token
        return;
      }

      try {
        const response = await axiosInstance.get(
          'http://localhost:5525/api/users/check', // Endpoint to check authentication
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to request header
            },
          }
        );

        if (response.status === 200) {
          setIsAuthenticated(true); // User is authenticated
          console.log('Authentication successful:', response.data.msg);
        } else {
          console.log('Unexpected response from server.');
          navigate('/login'); // Redirect if unexpected response
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        localStorage.removeItem('authToken'); // Clear invalid token
        navigate('/login'); // Redirect on failure
      }
    };

    checkAuthentication(); // Call the authentication check function
  }, [navigate]); // Runs only once when the component is mounted

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle); // Toggle sidebar
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>; // Display loading while checking authentication
  }

  return (
    <div className="grids-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <Home />
    </div>
  );
};

export default Dashboard;
