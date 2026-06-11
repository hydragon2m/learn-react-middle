import axios from 'axios';

import { useAuthStore } from '@/shared/stores/auth.store';

const isCookieMode = import.meta.env.VITE_AUTH_MODE === 'cookie';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: isCookieMode,
});

httpClient.interceptors.request.use((config) => {
  // Chỉ đính kèm header Authorization thủ công khi chạy chế độ Token
  if (!isCookieMode) {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});
