/***************************************************************
 *
 *                vitest.config.mts
 *
 *         Author: Zander
 *           Date: 11/03/2026
 *
 *        Summary: Vitest config for unit tests
 *
 **************************************************************/

import { defineConfig } from "vitest/config";

export default defineConfig({
    resolve: { tsconfigPaths: true },
    test: {
        environment: "node",
        include: ["src/**/*.test.ts"],
        passWithNoTests: true,
    },
});
