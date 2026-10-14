/***************************************************************
 *
 *                src/app/layout.tsx
 *
 *         Author: Zander
 *           Date: 10/6/2026
 *
 *        Summary: Root layout, loads fonts and global styles
 *
 **************************************************************/

import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

// Body font. Figma uses Avenir, which isn't free, so Inter stands in.
const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

// Heading font from the Figma hi-fi.
const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
    weight: "700",
});

export const metadata: Metadata = {
    title: "Massachusetts Rivers Alliance",
    description: "Massachusetts Rivers Alliance",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={`${inter.variable} ${montserrat.variable} h-full font-sans antialiased`}
        >
            <body className="min-h-full flex flex-col">{children}</body>
        </html>
    );
}
