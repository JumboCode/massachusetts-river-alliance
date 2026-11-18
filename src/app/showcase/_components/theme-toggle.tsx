/***************************************************************
 *
 *                src/app/showcase/_components/theme-toggle.tsx
 *
 *         Author: Will and Vienna
 *           Date: 10/6/2026
 *
 *        Summary: Theme toggle for showcase page
 *
 **************************************************************/
"use client";

import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
    function changeTheme(theme: "lofi" | "hifi") {
        document.documentElement.dataset.theme = theme;
    }

    return (
        <div className="inline-flex w-fit rounded-lg border bg-muted p-1">
            <Button
                onClick={() => changeTheme("lofi")}
                className="rounded-md px-5 py-2 text-body font-medium"
            >
                Lo-fi
            </Button>

            <Button
                onClick={() => changeTheme("hifi")}
                className="rounded-md px-5 py-2 text-body font-medium"
            >
                Hi-fi
            </Button>
        </div>
    );
}
