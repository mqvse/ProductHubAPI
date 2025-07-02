import axios from 'axios';

const api = axios.create({
  baseURL: 'https://memphislaptop-sierracorrect-3001.codio-box.uk/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;