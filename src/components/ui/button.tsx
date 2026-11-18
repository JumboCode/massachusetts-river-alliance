/***************************************************************
 *
 *                src/components/ui/button.tsx
 *
 *         Author: Zander
 *           Date: 10/26/2026
 *
 *        Summary: shadcn button primitive (Radix)
 *
 **************************************************************/

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Slot } from "radix-ui";

const buttonVariants = cva(
    "group/button inline-flex shrink-0 items-center justify-center gap-1.5 rounded-button border border-transparent bg-clip-padding whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    {
        variants: {
            variant: {
                default:
                    "border-primary bg-primary text-primary-foreground hover:border-primary-hover hover:bg-primary-hover aria-expanded:border-primary-hover aria-expanded:bg-primary-hover",
                outline:
                    "border-input bg-card text-foreground hover:bg-accent aria-expanded:bg-accent",
                approve:
                    "border-approve bg-approve text-foreground hover:border-approve/90 hover:bg-approve/90",
                destructive:
                    "border-destructive bg-destructive text-foreground hover:border-destructive/90 hover:bg-destructive/90 focus-visible:border-destructive focus-visible:ring-destructive/20",
            },
            size: {
                "default": "h-9 px-4 text-meta font-semibold",
                "lg": "h-10 px-7.5 text-button",
                "icon-sm": "size-6.5 [&_svg:not([class*='size-'])]:size-3.5",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

function Button({
    className,
    variant = "default",
    size = "default",
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot.Root : "button";

    return (
        <Comp
            data-slot="button"
            data-variant={variant}
            data-size={size}
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export { Button };
