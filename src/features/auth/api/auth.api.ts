import { httpClient } from '@/shared/api/http-client';

type User = {
  id: string;
  name: string;
  email: string;
};

export async function getProfileApi() {
  const response = await httpClient.get<{ user: User }>('/auth/me');
  return response.data;
}
