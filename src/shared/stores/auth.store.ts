import { create } from 'zustand';

import { STORAGE_KEY } from '@/shared/constants/storage-key';

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  setAuth: (payload: { user: User; accessToken: string }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN),
  isAuthenticated: Boolean(localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)),

  setAuth: ({ user, accessToken }) => {
    localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, accessToken);

    set({
      user,
      accessToken,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);

    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    });
  },
}));