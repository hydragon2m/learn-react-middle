import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { STORAGE_KEY } from '@/shared/constants/storage-key';

import type { AuthState } from '../types/auth.type';

const isCookieMode = import.meta.env.VITE_AUTH_MODE === 'cookie';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,

      setAuth: ({ user, accessToken }) => {
        set({
          user,
          accessToken: isCookieMode ? null : accessToken || null,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      setLoading: (isLoading) => set({ isLoading }),

      logout: () => {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },
    }),
    {
      name: STORAGE_KEY.ACCESS_TOKEN,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: isCookieMode ? null : state.accessToken,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state || isCookieMode) {
          return;
        }

        state.isAuthenticated = Boolean(state.accessToken);
      },
    },
  ),
);
