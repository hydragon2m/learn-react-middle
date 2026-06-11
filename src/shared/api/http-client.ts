import axios from 'axios';

import { useAuthStore } from '@/shared/stores/auth.store';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

httpClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});