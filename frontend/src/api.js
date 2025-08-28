import axios from 'axios';

// Create an instance of axios with the base URL set to the backend API
// Use the environment variable if available, otherwise fall back to localhost
console.log('API URL:', process.env.REACT_APP_API_URL);

const API_BASE_URL = process.env.REACT_APP_API_URL;
const api = axios.create({
  baseURL: API_BASE_URL, // Use the variable here instead of hardcoding
  timeout: 10000, // Add a timeout to prevent hanging requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized access - redirect to login');
    }
    return Promise.reject(error);
  }
);

export default api;

