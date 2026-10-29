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
                    "bg-primary text-primary-foreground hover:bg-primary-hover aria-expanded:bg-primary-hover",
                outline:
                    "border-input bg-card text-foreground hover:bg-accent aria-expanded:bg-accent",
                destructive:
                    "border-input bg-card text-destructive hover:bg-destructive/10 focus-visible:border-destructive focus-visible:ring-destructive/20",
            },
            size: {
                "sm": "h-6.5 gap-1 px-3 text-meta font-semibold [&_svg:not([class*='size-'])]:size-3.5",
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

export { Button, buttonVariants };
