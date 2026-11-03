/***************************************************************
 *
 *                eslint.config.mjs
 *
 *         Author: Zander
 *           Date: 10/26/2026
 *
 *        Summary: ESLint rules for the project
 *
 **************************************************************/

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import tseslint from "typescript-eslint";
import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import betterTailwind from "eslint-plugin-better-tailwindcss";

const PALETTE =
    "slate|gray|zinc|neutral|stone|mauve|olive|mist|taupe|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";
const PRE = "^(?:.+:)?!?";
const POST = String.raw`(?:/\S+)?!?$`;

const COLOR_BANS = [
    {
        pattern: String.raw`${PRE}-?[a-z-]+-(?:${PALETTE})-\d{2,3}${POST}`,
        message: "Raw palette color. Use a theme token.",
    },
    {
        pattern: `${PRE}-?[a-z-]+-(?:black|white)${POST}`,
        message: "Raw black/white. Use a theme token.",
    },
    {
        pattern: String.raw`${PRE}-?[a-z-]+-\[(?:color:)?(?:#|(?:rgba?|hsla?|hwb|oklch|oklab|lab|lch|color)\()`,
        message: "Arbitrary color value. Add a token to src/styles/theme.css.",
    },
    {
        pattern: String.raw`${PRE}\[(?:color|background(?:-color)?|border(?:-[a-z]+)?-color|fill|stroke|outline-color):`,
        message:
            "Arbitrary color property. Add a token to src/styles/theme.css.",
    },
    {
        pattern: String.raw`color-mix\(`,
        message:
            "color-mix in a class. Add a token (e.g. --primary-hover) to src/styles/theme.css.",
    },
];

const TOKEN_BANS = [
    {
        pattern: String.raw`${PRE}text-(?:xs|sm|base|lg|[2-9]?xl)${POST}`,
        message:
            "Default text size. Use a type token: text-label, text-field-label, text-meta, text-ui, text-body, text-section, text-heading, text-title, text-reading.",
    },
    {
        pattern: String.raw`${PRE}-?[a-z-]+-\[-?[\d.]+px\]${POST}`,
        message:
            "Arbitrary px value. Use the spacing scale or a token in src/styles/theme.css.",
    },
    {
        pattern: String.raw`${PRE}-?z-(?:\d+|\[.+\])${POST}`,
        message: "Numeric z-index. Use the z-* scale in src/styles/theme.css.",
    },
];

const BASE_IMPORT_BANS = [
    {
        regex: "^cn$",
        message:
            "Import cn from @/lib/utils; it knows the theme's text-*, rounded-* and shadow-* names.",
    },
];

const MAP_SDK_BAN = {
    group: ["leaflet", "leaflet/*", "react-leaflet", "react-leaflet/*"],
    message: "Use SiteMap from @/components/site-map.",
};

const restrictImports = (...patterns) => [
    "error",
    { patterns: [...BASE_IMPORT_BANS, MAP_SDK_BAN, ...patterns] },
];

const eslintConfig = defineConfig([
    ...nextVitals,
    tseslint.configs.recommended,
    comments.recommended,
    {
        linterOptions: { reportUnusedDisableDirectives: "error" },
        plugins: { "better-tailwindcss": betterTailwind },
        settings: {
            "better-tailwindcss": { entryPoint: "src/app/globals.css" },
        },
        rules: {
            "no-console": "warn",
            "no-var": "error",
            "eqeqeq": ["error", "always"],
            "@next/next/no-img-element": "warn",
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                { caughtErrors: "none" },
            ],

            "react-hooks/exhaustive-deps": "error",
            "react-hooks/set-state-in-effect": "error",
            "react-hooks/refs": "error",
            "react-hooks/preserve-manual-memoization": "off",
            "react-hooks/incompatible-library": "off",

            "@eslint-community/eslint-comments/require-description": "error",
            "@eslint-community/eslint-comments/disable-enable-pair": [
                "error",
                { allowWholeFile: true },
            ],

            "better-tailwindcss/no-restricted-classes": [
                "error",
                { restrict: [...COLOR_BANS, ...TOKEN_BANS] },
            ],

            "react/forbid-elements": [
                "error",
                {
                    forbid: ["button", "input", "select", "textarea"].map(
                        (element) => ({
                            element,
                            message: `Use the ui/ primitive instead of a raw <${element}>.`,
                        }),
                    ),
                },
            ],

            "no-restricted-imports": restrictImports({
                group: ["@/app/*"],
                message: "Shared code can't import route code.",
            }),
        },
    },
    {
        files: ["src/components/ui/**"],
        rules: {
            "react/forbid-elements": "off",
            "better-tailwindcss/no-restricted-classes": [
                "error",
                { restrict: COLOR_BANS },
            ],
            "no-restricted-imports": restrictImports({
                group: [
                    "@/app/*",
                    "@/lib/*",
                    "!@/lib/utils",
                    "@/components/*",
                    "!@/components/ui",
                ],
                message: "components/ui/ only imports other ui/ files.",
            }),
        },
    },
    {
        files: ["src/components/site-map/**"],
        rules: {
            "no-restricted-imports": [
                "error",
                {
                    patterns: [
                        ...BASE_IMPORT_BANS,
                        {
                            group: ["@/app/*"],
                            message: "Shared code can't import route code.",
                        },
                    ],
                },
            ],
        },
    },
    {
        files: ["src/app/**"],
        rules: {
            "no-restricted-imports": restrictImports({
                group: ["@/app/*", "../**/_components", "../**/_components/*"],
                message:
                    "Don't import another route's _components. Move it to src/components/ once two routes need it.",
            }),
        },
    },
    globalIgnores([
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
        ".vercel/**",
        "/node_modules/**",
    ]),
]);

export default eslintConfig;
