/***************************************************************
 *
 *                src/components/ui/native-select.tsx
 *
 *         Author: Zander
 *           Date: 10/14/2026
 *
 *        Summary: Dropdown from the Figma hi-fi, built on a plain select
 *
 **************************************************************/

import { cn } from "cn";
import { ChevronDownIcon } from "lucide-react";
import { fieldStyles } from "@/components/ui/input";

function NativeSelect({ className, ...props }: React.ComponentProps<"select">) {
    return (
        <div className={cn("relative w-full", className)}>
            <select
                className={cn(fieldStyles, "appearance-none pr-9")}
                {...props}
            />
            <ChevronDownIcon
                className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
            />
        </div>
    );
}

export { NativeSelect };
