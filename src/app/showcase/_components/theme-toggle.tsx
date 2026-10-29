/***************************************************************
 *
 *                src/app/showcase/_components/theme-toggle.tsx
 *
 *         Author: Zander
 *           Date: 10/28/2026
 *
 *        Summary: Switches the page between the lo-fi and hi-fi themes
 *
 **************************************************************/

"use client";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
    const setTheme = (theme: string) => {
        document.documentElement.dataset.theme = theme;
    };
    return (
        <div className="flex gap-2">
            <Button variant="outline" onClick={() => setTheme("lofi")}>
                Lo-fi
            </Button>
            <Button variant="outline" onClick={() => setTheme("hifi")}>
                Hi-fi
            </Button>
        </div>
    );
}
