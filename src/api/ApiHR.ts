import axios from 'axios';

const ApiHR = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
});

// middleware que intercepta el token
ApiHR.interceptors.request.use(async (config) => {
  // busca el token, si hay agregalo en la request
  const token = localStorage.getItem('token');

  if (token) {
    config.headers!['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default ApiHR;
