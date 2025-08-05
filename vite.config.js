import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // 🔧 important for relative paths to work on Vercel
  build: {
    outDir: "dist", // 🔧 must match the distDir in vercel.json
  },
});
