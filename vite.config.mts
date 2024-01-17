import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    base: '/',
    plugins: [react(), viteTsconfigPaths()],
    server: {    
        open: false,
        port: 3000, 
        host: '0.0.0.0',
    },
})