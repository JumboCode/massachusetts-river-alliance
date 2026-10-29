/***************************************************************
 *
 *                src/app/layout.tsx
 *
 *         Author: Zander
 *           Date: 10/6/2026
 *
 *        Summary: Root layout, loads the font and global styles
 *
 **************************************************************/

import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

// theme.css builds the sans font stack from --font-inter.
const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

// Hi-fi heading font.
const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
    weight: "700",
});

// "lofi" or "hifi". Both themes live in src/styles/theme.css.
const THEME = "lofi";

export const metadata: Metadata = {
    title: "Massachusetts Rivers Alliance",
    description: "Massachusetts Rivers Alliance",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            data-theme={THEME}
            className={`${inter.variable} ${montserrat.variable} h-full`}
        >
            <body className="flex min-h-full flex-col">{children}</body>
        </html>
    );
}
