import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      open: true, // Automatically opens report in browser
      filename: "bundle-report.html", // Output file
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
