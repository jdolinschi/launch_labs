import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path' // Add this import for path resolution

// https://vite.dev/config/
export default defineConfig({
  base: '/launch_labs/',
  plugins: [
    vue(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // Add this alias configuration
    }
  }
})