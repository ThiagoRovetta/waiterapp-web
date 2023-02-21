import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.0.76:3001'
});

api.interceptors.response.use((response) => response, (error) => {
  if (error?.response?.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  return Promise.reject(error);
});
