import { httpClient } from '@/shared/api/http-client';

import type { LoginPayload, LoginResponse, ProfileResponse } from '../types/auth.type';

export async function loginApi(payload: LoginPayload) {
  const response = await httpClient.post<LoginResponse>('/auth/login', payload);
  return response.data;
}

export async function getProfileApi() {
  const response = await httpClient.get<ProfileResponse>('/auth/me');
  return response.data;
}
