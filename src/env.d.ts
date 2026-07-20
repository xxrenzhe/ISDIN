/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_ISDIN_AFFILIATE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
