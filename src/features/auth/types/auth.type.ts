export type User = {
  id: string;
  name: string;
  email: string;
};

export type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setAuth: (payload: { user: User; accessToken?: string }) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => void;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  accessToken?: string;
};

export type ProfileResponse = {
  user: User;
};
