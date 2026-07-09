import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vitest/config";

// Statische Bild-Importe (import logo from "@/public/…") in Tests stubben
function stubStaticAssets(): Plugin {
  return {
    name: "stub-static-assets",
    load(id) {
      if (/\.(png|jpe?g|webp|gif|svg)$/i.test(id)) {
        return `export default { src: ${JSON.stringify("/" + path.basename(id))}, width: 100, height: 100 };`;
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), stubStaticAssets()],
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    passWithNoTests: true,
  },
});
