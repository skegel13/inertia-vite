import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const { resolve } = require("path");

export default defineConfig({
  plugins: [vue()],
  root: "resources",
  base: `/dist/`,
  resolve: {
    // Set the '@' alias so Vite can find the Breeze component imports.
    alias: {
      "@": "/js",
    },
    // Need to add the ".vue" extension. This is not recommended by Vite
    // (https://vitejs.dev/config/#resolve-extensions) but necessary until
    // the Breeze component imports are updated with .vue.
    extensions: [".vue", ".js", ".json", ".jsx", ".ts", ".tsx"],
  },
  build: {
    sourcemap: true,
    outDir: resolve(__dirname, "public/dist"),
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: "./resources/js/app.js",
    },
  },
  optimizeDeps: {
    include: [
      "vue",
      "@inertiajs/inertia",
      "@inertiajs/inertia-vue3",
      "@inertiajs/progress",
      "axios",
    ],
  },
});
