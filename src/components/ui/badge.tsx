/***************************************************************
 *
 *                src/components/ui/badge.tsx
 *
 *         Author: Zander
 *           Date: 10/26/2026
 *
 *        Summary: shadcn badge primitive (Radix)
 *
 **************************************************************/

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "group/badge inline-flex h-7 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-xl px-2.5 text-ui whitespace-nowrap transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 has-data-[icon=inline-end]:pr-2 [&>svg]:pointer-events-none [&>svg]:size-3!",
    {
        variants: {
            variant: {
                destructive: "bg-danger text-danger-foreground",
                success: "bg-success text-success-foreground",
                warning: "bg-warning text-warning-foreground",
            },
        },
        defaultVariants: {
            variant: "warning",
        },
    },
);

function Badge({
    className,
    variant = "warning",
    ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
    return (
        <span
            data-slot="badge"
            data-variant={variant}
            className={cn(badgeVariants({ variant }), className)}
            {...props}
        />
    );
}

export { Badge };
