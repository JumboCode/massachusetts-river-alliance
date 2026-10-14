/***************************************************************
 *
 *                src/components/ui/button.tsx
 *
 *         Author: Zander
 *           Date: 10/14/2026
 *
 *        Summary: Blue button from the Figma hi-fi
 *
 **************************************************************/

import { cn } from "cn";

function Button({ className, ...props }: React.ComponentProps<"button">) {
    return (
        <button
            className={cn(
                "cursor-pointer rounded-[5px] bg-primary px-12.5 py-2.5 text-[15px] font-black tracking-[0.08em] text-white transition-colors outline-none hover:bg-input focus-visible:ring-3 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50",
                className,
            )}
            {...props}
        />
    );
}

export { Button };
