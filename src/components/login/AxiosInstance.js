import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5525', // Your server base URL
});

// Intercept every request to add the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to the request header
    }

    return config; // Return the updated config
  },
  (error) => {
    return Promise.reject(error); // Return any error that occurred during intercepting
  }
);

export default axiosInstance;
