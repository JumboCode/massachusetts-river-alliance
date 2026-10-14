/***************************************************************
 *
 *                src/components/ui/field.tsx
 *
 *         Author: Zander
 *           Date: 10/14/2026
 *
 *        Summary: Label and error pieces for form fields
 *
 **************************************************************/

import { cn } from "cn";

const smallText = "text-[11px] font-extrabold tracking-[0.08em]";

// Wraps one label + input (+ error) with even spacing.
function Field({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            className={cn("flex w-full flex-col gap-2", className)}
            {...props}
        />
    );
}

// Pass `required` to show the red *.
function FieldLabel({
    className,
    required,
    children,
    ...props
}: React.ComponentProps<"label"> & { required?: boolean }) {
    return (
        <label
            className={cn("flex gap-2 text-label", smallText, className)}
            {...props}
        >
            {children}
            {required && <span className="text-destructive">*</span>}
        </label>
    );
}

function FieldError({ className, ...props }: React.ComponentProps<"p">) {
    return (
        <p
            role="alert"
            className={cn("text-destructive", smallText, className)}
            {...props}
        />
    );
}

export { Field, FieldError, FieldLabel };
