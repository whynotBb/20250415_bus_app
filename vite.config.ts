import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vite.dev/config/
export default defineConfig({
	build: {
		outDir: "dist", // 기본값이 'dist'
	},
	plugins: [
		react(),
		viteStaticCopy({
			targets: [
				{
					src: "public/_redirects", // public 안에 있는 _redirects
					dest: ".", // dist/ 루트로 복사
				},
			],
		}),
	],
	// 프록시서버
	server: {
		proxy: {
			"/api": {
				target: "http://ws.bus.go.kr", // SEOUL_BUS_API_URL의 도메인
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
});
