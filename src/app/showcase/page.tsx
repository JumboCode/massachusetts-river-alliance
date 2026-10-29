/***************************************************************
 *
 *                src/app/showcase/page.tsx
 *
 *         Author: Zander
 *           Date: 10/28/2026
 *
 *        Summary: Theme tokens and components from the Figma (dev only)
 *
 **************************************************************/

import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { ThemeToggle } from "./_components/theme-toggle";

// Literal class names so Tailwind generates them.
const SWATCHES = [
    ["background", "bg-background"],
    ["foreground", "bg-foreground"],
    ["card", "bg-card"],
    ["primary", "bg-primary"],
    ["primary-hover", "bg-primary-hover"],
    ["selected", "bg-selected"],
    ["emphasis", "bg-emphasis"],
    ["muted", "bg-muted"],
    ["muted-foreground", "bg-muted-foreground"],
    ["label-foreground", "bg-label-foreground"],
    ["destructive", "bg-destructive"],
    ["warning", "bg-warning"],
    ["border", "bg-border"],
    ["input", "bg-input"],
    ["chart-1", "bg-chart-1"],
];

const TYPE = [
    ["text-label uppercase", "Card labels, status pills, table head"],
    ["text-field-label uppercase", "Form labels, section titles"],
    ["text-meta", "Meta lines, table cells, small buttons"],
    ["text-button", "Buttons"],
    ["text-ui", "Row and detail values"],
    ["text-body", "Body text and inputs (default)"],
    ["text-section", "Section titles, station cards"],
    ["text-heading", "Header bar, column headings"],
    ["text-title", "Page titles"],
    ["text-display", "Log in title"],
    ["text-reading", "Large gage reading"],
];

const RADII = [
    "rounded-button",
    "rounded-control",
    "rounded-card",
    "rounded-full",
];

const BUTTON_VARIANTS = ["default", "outline", "destructive"] as const;
const BUTTON_SIZES = ["sm", "default", "lg"] as const;

export default function ShowcasePage() {
    if (process.env.NODE_ENV === "production") notFound();

    return (
        <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-8">
            <div className="flex flex-col gap-1">
                <h1 className="text-title">Showcase</h1>
                <p className="text-muted-foreground">
                    Tokens and components from the Figma. Dev only.
                </p>
                <ThemeToggle />
            </div>

            <Section title="Colors">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
                    {SWATCHES.map(([token, className]) => (
                        <div key={token} className="flex flex-col gap-1">
                            <div
                                className={`h-12 rounded-control border ${className}`}
                            />
                            <code className="text-meta">{token}</code>
                        </div>
                    ))}
                </div>
            </Section>

            <Section title="Type">
                <div className="grid gap-3">
                    {TYPE.map(([className, role]) => (
                        <div
                            key={className}
                            className="grid grid-cols-[14rem_1fr] items-baseline gap-4"
                        >
                            <code className="text-meta text-muted-foreground">
                                {className}
                            </code>
                            <p className={className}>{role}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section title="Radius">
                <Row>
                    {RADII.map((r) => (
                        <div
                            key={r}
                            className={`flex h-12 w-40 items-center justify-center border border-input bg-card text-meta ${r}`}
                        >
                            {r}
                        </div>
                    ))}
                </Row>
            </Section>

            <Section title="Button">
                {BUTTON_SIZES.map((size) => (
                    <Row key={size}>
                        {BUTTON_VARIANTS.map((variant) => (
                            <Button key={variant} variant={variant} size={size}>
                                {variant} {size}
                            </Button>
                        ))}
                    </Row>
                ))}
                <Row>
                    <Button asChild>
                        <a href="#">Link styled as a button</a>
                    </Button>
                </Row>
            </Section>

            <Section title="StatusBadge">
                <Row>
                    <StatusBadge status="pending" />
                </Row>
            </Section>

            <Section title="Card">
                <Card className="max-w-sm">
                    <CardHeader>
                        <CardTitle>Card title</CardTitle>
                        <CardDescription>Card description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Card content</p>
                    </CardContent>
                </Card>
            </Section>

            <Section title="Form fields">
                <div className="grid max-w-md gap-4">
                    <Field>
                        <FieldLabel htmlFor="demo-input" required>
                            Input
                        </FieldLabel>
                        <Input id="demo-input" placeholder="Placeholder" />
                    </Field>
                    <Field data-invalid>
                        <FieldLabel htmlFor="demo-invalid">Invalid</FieldLabel>
                        <Input id="demo-invalid" aria-invalid />
                        <FieldError>This field is required</FieldError>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="demo-select">
                            Native select
                        </FieldLabel>
                        <NativeSelect id="demo-select">
                            <option>Option one</option>
                            <option>Option two</option>
                        </NativeSelect>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="demo-textarea">
                            Textarea
                        </FieldLabel>
                        <Textarea id="demo-textarea" />
                    </Field>
                </div>
            </Section>
        </main>
    );
}

function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-heading">{title}</h2>
            {children}
        </section>
    );
}

function Row({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-wrap items-center gap-3">{children}</div>;
}
