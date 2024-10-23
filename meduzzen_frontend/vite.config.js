import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
        plugins: [react()],
        envDir: './',
        server: {
            port: env.PORT,
            host: '0.0.0.0'
        },
        preview: {
            port: env.PORT
        }
    }
})