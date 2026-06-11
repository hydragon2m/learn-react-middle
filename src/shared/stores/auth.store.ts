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
  isLoading: boolean;

  setAuth: (payload: { user: User; accessToken?: string }) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => void;
};

const isCookieMode = import.meta.env.VITE_AUTH_MODE === 'cookie';
const initialToken = isCookieMode ? null : localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: initialToken,
  // Ở chế độ cookie, cần gọi API check profile trước nên mặc định chưa authenticated.
  // Ở chế độ token, nếu có token trong local storage thì coi như đã authenticated tạm thời.
  isAuthenticated: isCookieMode ? false : Boolean(initialToken),
  isLoading: true, // Bật màn hình loading lúc khởi tạo app để check session

  setAuth: ({ user, accessToken }) => {
    if (!isCookieMode && accessToken) {
      localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, accessToken);
    }

    set({
      user,
      accessToken: accessToken || null,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  setLoading: (isLoading) => set({ isLoading }),

  logout: () => {
    if (!isCookieMode) {
      localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
    }

    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },
}));
