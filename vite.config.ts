import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr'; // transform svg to react component

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   // watch: {
  //     // usePolling: true,
  //   // },
  //   host: '0.0.0.0', // needed for the Docker Container port mapping to work
  //   // strictPort: true,
  //   port: 5173, // you can replace this port with any port
  // },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  plugins: [react(), svgr()],
});
