import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240, // 10 KB
      algorithm: "gzip",
      ext: ".gz",
      deleteOriginFile: false,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: { api: "modern-compiler" },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    cors: true,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        chunkFileNames: "js/[name].[hash].js",
        entryFileNames: "js/[name].[hash].js",
        assetFileNames: "[ext]/[name].[hash].[ext]",
        manualChunks(id) {
          if (id.includes("node_modules")) {
            const knownKeys = [
              "vue",
              "echarts",
              "lodash",
              "vuex",
              "echarts-gl",
            ];
            for (const key of knownKeys) {
              if (id.includes(key)) {
                return key; // 按包名分组
              }
            }
            // 其他包统一归为 vendor
            return "vendor";
          }
        },
      },
    },
  },
});
