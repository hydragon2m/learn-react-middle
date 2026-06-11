import axios from 'axios';

const isCookieMode = import.meta.env.VITE_AUTH_MODE === 'cookie';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: isCookieMode,
});
