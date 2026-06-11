import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend) // Tự động tải file từ /public/locales/*.json
  .use(LanguageDetector) // Tự động phát hiện ngôn ngữ trình duyệt
  .use(initReactI18next)
  .init({
    fallbackLng: 'vi', // Ngôn ngữ mặc định nếu không phát hiện được
    supportedLngs: ['vi', 'en'],
    debug: import.meta.env.DEV, // Chỉ bật log ở môi trường phát triển
    interpolation: {
      escapeValue: false, // React đã tự escape HTML
    },
    backend: {
      loadPath: '/locales/{{lng}}.json',
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'], // Ghi nhớ lựa chọn ngôn ngữ của người dùng
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n;
