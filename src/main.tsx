import '@/shared/i18n/i18n.config';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppProvider } from '@/app/providers/app-provider';
import { AppRouter } from '@/app/router/app-router';
import '@/styles/global.css';

async function enableMocking() {
  // Chỉ bật MSW trong môi trường phát triển khi VITE_MSW_ENABLED=true
  if (!import.meta.env.DEV || import.meta.env.VITE_MSW_ENABLED !== 'true') {
    return;
  }

  const { worker } = await import('@/shared/mocks/browser');
  return worker.start({
    onUnhandledRequest: 'bypass', // Bỏ qua các request không có handler thay vì báo lỗi
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </React.StrictMode>,
  );
});
