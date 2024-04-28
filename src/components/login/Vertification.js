import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../login/AxiosInstance'; // Custom Axios instance

const VerifyAndNavigate = () => {
  const location = useLocation(); // Get query parameters
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cust_id = params.get('cust_id'); // Get customer ID from query parameters
    const target = params.get('target'); // Get the target page to navigate to

    const verifyCustId = async (cust_id, target) => {
      try {
        const response = await axios.post('/api/users/verify', { cust_id });

        if (response.status === 200 && response.data.verified) {
          navigate(`${target}?cust_id=${cust_id}`); // Navigate to the target page with `cust_id`
        } else {
          console.error('Verification failed: Invalid customer ID');
        }
      } catch (error) {
        console.error('Error during verification:', error);
      }
    };

    if (cust_id && target) {
      verifyCustId(cust_id, target);
    } else {
      console.error('Missing cust_id or target');
    }
  }, [location.search]);

  return <div>Verifying...</div>;
};

export default VerifyAndNavigate;
