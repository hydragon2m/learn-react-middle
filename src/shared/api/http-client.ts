import axios from 'axios';

import { STORAGE_KEY } from '@/shared/constants/storage-key';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});