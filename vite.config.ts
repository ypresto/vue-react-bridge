import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib/react-in-vue.ts'),
      name: 'vue-react-bridge',
      fileName: 'vue-react-bridge',
    },
  },
})
