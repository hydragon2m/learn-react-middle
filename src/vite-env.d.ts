/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_AUTH_MODE: 'token' | 'cookie';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
