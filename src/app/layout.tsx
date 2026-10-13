/***************************************************************
 *
 *                src/app/layout.tsx
 *
 *         Author: Zander
 *           Date: 10/6/2026
 *
 *        Summary: Root layout, loads the Inter font and global styles
 *
 **************************************************************/

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Figma designs use Inter (400/500/600); Inter is a variable font, so all weights load.
const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Massachusetts Rivers Alliance",
    description: "Massachusetts Rivers Alliance",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en" className={`${inter.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col">{children}</body>
        </html>
    );
}
