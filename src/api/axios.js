import axios from 'axios';

// Basic wrapper for Axios configured with base URL and Request Interceptor for Token
const instance = axios.create({
  baseURL: 'http://localhost:8080/api', // Spring Boot endpoint
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && token !== 'mock-token') {
      config.headers.Authorization = `Bearer ${token}`; // Typical JWT pattern
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
