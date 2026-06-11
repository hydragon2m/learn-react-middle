import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { isCookieAuthMode } from '@/shared/config/auth-mode';
import { STORAGE_KEY } from '@/shared/constants/storage-key';

import type { AuthState } from '../types/auth.type';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: isCookieAuthMode,

      setAuth: ({ user, accessToken }) => {
        set({
          user,
          accessToken: isCookieAuthMode ? null : accessToken || null,
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
      name: STORAGE_KEY.AUTH,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: isCookieAuthMode ? null : state.accessToken,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state || isCookieAuthMode) {
          return;
        }

        state.isAuthenticated = Boolean(state.accessToken);
        state.isLoading = Boolean(state.accessToken);
      },
    },
  ),
);
