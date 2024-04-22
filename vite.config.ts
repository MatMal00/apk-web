import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths(), svgr()],
    resolve: {
        alias: {
            icons: "/src/resources/icons",
        },
    },
});
