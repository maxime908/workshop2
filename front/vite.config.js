import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),

        bassDesktop: resolve(__dirname, 'src/bass/desktop/index.html'),
        bassMobile: resolve(__dirname, 'src/bass/mobile/index.html'),

        lamarrDesktop: resolve(__dirname, 'src/lamarr/desktop/index.html'),
        lamarrMobile: resolve(__dirname, 'src/lamarr/mobile/index.html'),

        turingDesktop: resolve(__dirname, 'src/turing/desktop/index.html'),
        turingMobile: resolve(__dirname, 'src/turing/mobile/index.html'),

        teslaDesktop: resolve(__dirname, 'src/tesla/desktop/index.html'),
        teslaMobile: resolve(__dirname, 'src/tesla/mobile/index.html'),

        stats: resolve(__dirname, 'src/stats/index.html'),
      }
    }
  }
})