import { http, HttpResponse } from 'msw';

// ==========================================
// MSW Handlers – Mock API endpoints
// ==========================================
// Mỗi handler mô phỏng một endpoint của Backend.
// Khi Backend đã sẵn sàng, chỉ cần tắt MSW đi bằng cách
// đặt VITE_MSW_ENABLED=false trong file .env
// ==========================================

const mockUser = {
  id: '1',
  name: 'Nguyen Van A',
  email: 'admin@example.com',
};

export const handlers = [
  // GET /auth/me – Lấy thông tin profile của user đang đăng nhập
  http.get(`${import.meta.env.VITE_API_URL}/auth/me`, () => {
    return HttpResponse.json({ user: mockUser }, { status: 200 });
  }),

  // POST /auth/login – Đăng nhập
  http.post(`${import.meta.env.VITE_API_URL}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };

    if (body.email === 'admin@example.com' && body.password === '123456') {
      return HttpResponse.json(
        {
          user: mockUser,
          accessToken: 'mock-access-token-xyz',
        },
        { status: 200 },
      );
    }

    return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }),

  // POST /auth/logout – Đăng xuất
  http.post(`${import.meta.env.VITE_API_URL}/auth/logout`, () => {
    return HttpResponse.json({ message: 'Logged out successfully' }, { status: 200 });
  }),
];
