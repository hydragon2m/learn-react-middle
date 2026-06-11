/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_AUTH_MODE: 'token' | 'cookie';
  readonly VITE_MSW_ENABLED: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
