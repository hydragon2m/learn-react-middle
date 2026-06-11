export const AUTH_MODE = import.meta.env.VITE_AUTH_MODE;

export const isCookieAuthMode = AUTH_MODE === 'cookie';
export const isTokenAuthMode = AUTH_MODE === 'token';
