import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:3000',
  timeout: parseInt(import.meta.env.VITE_TIMEOUT) || 5000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export default axiosClient;