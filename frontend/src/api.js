import axios from 'axios';

// create an instance of axios with the base URL set to the backend API

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

export default api // what is the default keyword and why does this type like C++?