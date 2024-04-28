import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './components/login/AxiosInstance';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  const navigate = useNavigate();

  // Function to reset form fields
  const resetForm = () => {
    setEmail('');
    setPassword('');
    setErrorMessage('');
    setShowPassword(false);
  };

  // Clear form when component is first mounted
  useEffect(() => {
    resetForm();
  }, []); // Empty dependency array ensures it only runs once on mount

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setErrorMessage(''); // Clear error message before attempting login

    try {
      const response = await axiosInstance.post('/api/users/logs', {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        // Store the token in localStorage
        localStorage.setItem('authToken', token);

        // Navigate to the dashboard or home page
        navigate('/Dashboard');

      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        setErrorMessage(error.response.data.msg); // Set error message from server response
      }
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="section-1-wrapper">
        <h1>Digital coupon</h1>
        <div className="texts">
          <h2 className="text-1">Welcome back!</h2>
          <p className="text-2">We are glad to see you again! Get access to your accounts</p>
        </div>
      </div>

      <div className="section-2-wrapper">
        <h1>Login</h1>
        {errorMessage && (
          // If there's an error message, display it with a red background
          <div style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
          />
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
          />

          <div>
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>
          <button className="button login-button" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
