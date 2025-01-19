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
	server: {
		open: true,
		hmr: {
			host: 'localhost',
			port: 5137,
			protocol: 'ws'
		}
	},
	
	plugins: [svgr(), react()/* , mkcert() */],
});
