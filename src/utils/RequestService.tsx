import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1/',
  responseType: 'text',
  headers: { Accept: 'application/json' }
});
