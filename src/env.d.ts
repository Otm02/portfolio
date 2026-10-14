interface ImportMetaEnv {
  /** Cloudflare Web Analytics token. Leave unset to build without analytics. */
  readonly PUBLIC_CF_BEACON_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
