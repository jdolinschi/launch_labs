import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/launch_labs/', // Base URL for deployment
  plugins: [
    vue(),        // Vue plugin
    tailwindcss() // Tailwind CSS plugin
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // Alias @ to src directory
    }
  }
})