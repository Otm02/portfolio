interface ImportMetaEnv {
  /** Overrides the Cloudflare Web Analytics token in Base.astro. */
  readonly PUBLIC_CF_BEACON_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
