import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// import mkcert from "vite-plugin-mkcert";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
  },
  build: {
    outDir: "./build",
    emptyOutDir: true, // also necessary
  },
  server: {
    open: true,
    hmr: {
      host: "localhost",
      port: 5137,
      protocol: "ws",
    },
  },
  base: "/defect-tool",
  plugins: [svgr(), react() /* , mkcert() */],
});
