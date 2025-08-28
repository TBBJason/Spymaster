import axios from 'axios';

// Create an instance of axios with the base URL set to the backend API
// Use the environment variable if available, otherwise fall back to localhost
console.log('API URL:', process.env.REACT_APP_API_URL);

const API_BASE_URL = process.env.REACT_APP_API_URL;
const api = axios.create({
  baseURL: API_BASE_URL, // Use the variable here instead of hardcoding
  timeout: 10000, // Add a timeout to prevent hanging requests
  headers: {
    Accept: 'application/json',
  },
});

export default api;

