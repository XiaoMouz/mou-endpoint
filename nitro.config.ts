export default defineNitroConfig({
  preset: 'cloudflare-module',
  minify: false,
  srcDir: './src',
  routeRules: {
    '/**': {
      cors: true
    }
  },
  commonJS: {
    requireReturnsDefault: 'preferred',
  },
  storage: {
    kv: {
      driver: 'cloudflare-kv-binding',
      binding: 'KV_STORAGE',
    },
  },
  devStorage: {
    kv: {
      driver: 'fs',
      base: './.nitro/db',
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
})
