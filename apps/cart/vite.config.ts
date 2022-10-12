import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    server: { host: true, cors: false },
    ssr: { target: "webworker", noExternal: true },
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
  };
});
