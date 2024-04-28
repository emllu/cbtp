import React, { useState, useEffect } from 'react';
import axios from '../login/AxiosInstance'; // Custom axios instance
import { useLocation, useNavigate } from 'react-router-dom';

const Forms = () => {
  const [custId, setCustId] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const actionType = params.get('action');
  }, [location.search]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!/^\d{6}$/.test(custId)) {
      setErrorMessage('Invalid customer ID. Please enter a 6-digit number.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5525/api/users/forms', { cust_id: custId });

      if (response.status === 200) {
        if (location.search.includes('action=buy')) {
          navigate(`/products?cust_id=${custId}`); // Pass `cust_id` as a query parameter
        } else if (location.search.includes('action=userinfo')) {
          navigate(`/userinfo?cust_id=${custId}`); // Pass `cust_id` as a query parameter
        }
      } else {
        setErrorMessage('Unexpected response. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Login failed. Please check the ID or try again later.');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>Customer ID:</label>
        <input
          type="text"
          value={custId}
          onChange={(e) => setCustId(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

export default Forms;








































// import React, { useState, useEffect } from 'react';
// import axios from '../login/AxiosInstance'; // Custom axios instance
// import { useLocation, useNavigate } from 'react-router-dom';

// const Forms = () => {
//   const [custId, setCustId] = useState('');
//   const [errorMessage, setErrorMessage] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const actionType = params.get('action');
//     console.log('Action Type:', actionType);
//   }, [location.search]);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     // Validate cust_id to be a 6-digit number
//     if (!/^\d{6}$/.test(custId)) {
//       setErrorMessage('Invalid customer ID. Please enter a 6-digit number.');
//       return;
//     }

//     try {
//       // Send POST request to login
//       const response = await axios.post('http://localhost:5525/api/users/forms', { cust_id: custId });

//       if (response.status === 200) {
//         if (location.search.includes('action=buy')) {
//           navigate('/products'); // Redirect to products page
//         } else if (location.search.includes('action=userinfo')) {
//           navigate('/userinfo'); // Redirect to user info page
//         }
//       } else {
//         setErrorMessage('Unexpected response. Please try again.');
//       }
//     } catch (error) {
//       setErrorMessage('Login failed. Please check the ID or try again later.');
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleLogin}>
//         <label>Customer ID:</label>
//         <input
//           type="text"
//           value={custId}
//           onChange={(e) => setCustId(e.target.value.trim())}
//           required
//         />
//         <button type="submit">Log In</button>
//       </form>
//       {errorMessage && <div>{errorMessage}</div>}
//     </div>
//   );
// };

// export default Forms;






























// import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// import axiosInstance from './AxiosInstance'; // Custom Axios instance for authorization

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
// //   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axiosInstance.post('/api/users/login', {
//         email,
//         password,
//       });

//       if (response.status === 200) {
//         const token = response.data.token;

//         // Store the token in localStorage
//         localStorage.setItem('authToken', token);
// {<h1 >hello  admin</h1>}
//         // Navigate to the items list page
//         // navigate('/items'); // Corrected path to a relative route
//       } else {
//         console.error('Unexpected response:', response);
//       }
//     } catch (error) {
//       console.error('Login failed:', error);

//       // Optionally, provide feedback to the user
//       alert('Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;
