/***************************************************************
 *
 *                src/components/ui/checkbox.tsx
 *
 *         Author: Zander
 *           Date: 11/03/2026
 *
 *        Summary: shadcn checkbox primitive (Radix)
 *
 **************************************************************/

"use client";

import * as React from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox as CheckboxPrimitive } from "radix-ui";

function Checkbox({
    className,
    ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
    return (
        <CheckboxPrimitive.Root
            data-slot="checkbox"
            className={cn(
                "peer flex size-4 shrink-0 items-center justify-center rounded-button border border-input bg-card text-card transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-foreground data-[state=checked]:bg-foreground",
                className,
            )}
            {...props}
        >
            <CheckboxPrimitive.Indicator className="grid place-content-center">
                <CheckIcon className="size-3 stroke-3" />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    );
}

export { Checkbox };
