/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GA4_MEASUREMENT_ID?: string;
  readonly PUBLIC_GOOGLE_SITE_VERIFICATION?: string;
  readonly PUBLIC_GTM_ID?: string;
  readonly PUBLIC_ISDIN_AFFILIATE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
