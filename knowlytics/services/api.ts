// src/services/api.ts
import axios from 'axios';
import { getToken } from '../utils/tokenStorage';

const api = axios.create({
  baseURL: 'https://your-api-url.com',
});

api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
