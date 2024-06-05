import { ConfigEnv, UserConfig, defineConfig } from 'vite'

export default defineConfig((mode: ConfigEnv): UserConfig => {
  return {
    root: './src',
    base: './',
    build: {
      target: 'esnext',
      minify: false,
      outDir: '../dist'
    }
  }
})
