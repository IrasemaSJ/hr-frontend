import axios from 'axios';

const ApiHR = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
});

export default ApiHR;
