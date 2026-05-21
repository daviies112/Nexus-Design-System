import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  root: "client",
  build: {
    outDir: "../public",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'client/index.html'),
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: true,
    hmr: {
      port: 5000,
      host: "0.0.0.0",
    },
    allowedHosts: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./client/src"),
      "@assets": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./attached_assets"),
    },
  },
});