/***************************************************************
 *
 *                src/components/ui/field.tsx
 *
 *         Author: Zander
 *           Date: 10/26/2026
 *
 *        Summary: shadcn field primitive (Radix)
 *
 **************************************************************/

import { cn } from "@/lib/utils";

import { Label } from "@/components/ui/label";

function Field({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            role="group"
            data-slot="field"
            className={cn(
                "group/field flex w-full flex-col gap-2 data-[invalid=true]:text-destructive *:w-full [&>.sr-only]:w-auto",
                className,
            )}
            {...props}
        />
    );
}

function FieldLabel({
    className,
    required,
    children,
    ...props
}: React.ComponentProps<typeof Label> & { required?: boolean }) {
    return (
        <Label
            data-slot="field-label"
            className={cn(
                "flex w-fit gap-2 text-field-label leading-snug font-(--text-field-label--font-weight) text-label-foreground uppercase group-data-[disabled=true]/field:opacity-50",
                className,
            )}
            {...props}
        >
            {children}
            {required && (
                <span aria-hidden="true" className="text-destructive">
                    *
                </span>
            )}
        </Label>
    );
}

function FieldError({ className, ...props }: React.ComponentProps<"div">) {
    if (!props.children) return null;
    return (
        <div
            role="alert"
            data-slot="field-error"
            className={cn("text-meta font-medium text-destructive", className)}
            {...props}
        />
    );
}

export { Field, FieldLabel, FieldError };
