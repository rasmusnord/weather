import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import VitePluginFaviconsInject from "vite-plugin-favicons-inject";

export default defineConfig({
  plugins: [
    react(),
    VitePluginFaviconsInject("src/assets/logo.svg", {
      appName: "Weather",
      appShortName: "Weather",
      display: "standalone",
      appleStatusBarStyle: "black",
      background: "#c4fcef",
      theme_color: "#c4fcef",
      orientation: "portrait",
    }),
  ],
});
