/***************************************************************
 *
 *                src/components/ui/native-select.tsx
 *
 *         Author: Zander
 *           Date: 10/26/2026
 *
 *        Summary: shadcn native-select primitive (Radix)
 *
 **************************************************************/

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";

function NativeSelect({ className, ...props }: React.ComponentProps<"select">) {
    return (
        <div
            className={cn(
                "group/native-select relative w-fit has-[select:disabled]:opacity-50",
                className,
            )}
            data-slot="native-select-wrapper"
        >
            <select
                data-slot="native-select"
                className="h-9 w-full min-w-0 appearance-none rounded-control border border-input bg-card py-1 pr-9 pl-3.5 text-mobile-input text-foreground transition-colors outline-none select-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:cursor-not-allowed aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-body"
                {...props}
            />
            <ChevronDownIcon
                className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground select-none"
                aria-hidden="true"
                data-slot="native-select-icon"
            />
        </div>
    );
}

export { NativeSelect };
