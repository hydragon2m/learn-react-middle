import axios from 'axios';

import { isCookieAuthMode, isTokenAuthMode } from '@/shared/config/auth-mode';
import { STORAGE_KEY } from '@/shared/constants/storage-key';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: isCookieAuthMode,
});

function getStoredAccessToken() {
  const persistedAuth = localStorage.getItem(STORAGE_KEY.AUTH);

  if (!persistedAuth) {
    return null;
  }

  try {
    const parsed = JSON.parse(persistedAuth) as {
      state?: {
        accessToken?: string | null;
      };
    };

    return parsed.state?.accessToken || null;
  } catch {
    return null;
  }
}

httpClient.interceptors.request.use((config) => {
  if (!isTokenAuthMode) {
    return config;
  }

  const accessToken = getStoredAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
