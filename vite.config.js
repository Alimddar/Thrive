import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    server: {
    port: 3000, // Change this to your desired port
  },
  plugins: [react()],
})
