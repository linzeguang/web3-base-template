/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_PROJECT_ID: string
  readonly VITE_MONAD_RPC: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
