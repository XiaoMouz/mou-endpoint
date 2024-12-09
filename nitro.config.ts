export default defineNitroConfig({
  preset: 'cloudflare-module',
  minify: false,
  srcDir: './src',

  routeRules: {
    '/**': {
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': 'localhost, *.mou.best, mou.best',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
      },
    },
  },

  commonJS: {
    requireReturnsDefault: 'preferred',
  },

  apiBaseURL: '/',
  errorHandler: '~/error.ts',
  storage: {
    kv: {
      driver: 'cloudflare-kv-binding',
      binding: 'KV_STORAGE',
    },
    blob: {
      driver: 'cloudflareR2Binding',
      binding: 'FILE_BLOB',
    },
  },

  devStorage: {
    kv: {
      driver: 'fs',
      base: './.nitro/db',
    },
    blob: {
      driver: 'fs',
      base: './.nitro/blob',
    },
  },

  typescript: {
    strict: true,
    tsConfig: {
      compilerOptions: {
        module: 'preserve',
        noEmit: true,
        moduleDetection: 'force',
        isolatedModules: true,
        skipLibCheck: true,
      },
    },
  },

  compatibilityDate: '2024-12-03',
})
