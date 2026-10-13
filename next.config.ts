/***************************************************************
 *
 *                next.config.ts
 *
 *         Author: Zander
 *           Date: 10/6/2026
 *
 *        Summary: Next.js config
 *
 **************************************************************/

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    agentRules: false,
    cacheComponents: true,
    partialPrefetching: true,
    turbopack: {
        rules: {
            "*.css": {
                loaders: ["@tailwindcss/turbopack"],
                as: "*.css",
            },
        },
    },
};

export default nextConfig;
