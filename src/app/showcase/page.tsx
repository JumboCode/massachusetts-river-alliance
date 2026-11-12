/***************************************************************
 *
 *                src/app/showcase/page.tsx
 *
 *         Author: Will and Vienna
 *           Date: 10/6/2026
 *
 *        Summary: Development only showcase page
 *
 **************************************************************/
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import ThemeToggle from "./_components/theme-toggle";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import type { Status } from "@/lib/arcgis/schemas";

export default function Showcase() {
    if (process.env.NODE_ENV === "production") notFound();

    return (
        <main className="min-h-screen bg-background px-8 py-10 md:px-12">
            <div className="mx-auto max-w-7xl space-y-12">
                {/* Header */}
                <div className="flex flex-col gap-5 border-b pb-8">
                    <div>
                        <h1 className="text-title font-semibold tracking-tight">
                            Showcase
                        </h1>
                        <p className="mt-2 text-body text-muted-foreground">
                            Tokens and components from Figma. Development only.
                        </p>
                    </div>

                    <ThemeToggle />
                </div>

                <Section title="Colors">
                    <ColorGrid />
                </Section>

                <Section title="Typography">
                    <TypographyGrid />
                </Section>

                <Section title="Radius">
                    <RadiusGrid />
                </Section>

                <Section title="Button Variants">
                    <ButtonGrid />
                </Section>

                <Section title="Status Badges">
                    <StatusBadgeGrid />
                </Section>
            </div>
        </main>
    );
}

type SectionProps = {
    title: string;
    children: ReactNode;
};

function Section({ title, children }: SectionProps) {
    return (
        <section className="space-y-6">
            <div className="border-b pb-3">
                <h2 className="text-heading font-semibold tracking-tight">
                    {title}
                </h2>
            </div>

            {children}
        </section>
    );
}

function ColorGrid() {
    const colorTokens = [
        "background",
        "foreground",
        "card",
        "card-foreground",
        "primary",
        "primary-foreground",
        "primary-hover",
        "accent",
        "destructive",
        "muted",
        "muted-foreground",
        "success",
        "warning",
        "border",
        "input",
        "ring",
        "chart-1",
    ];

    return (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {colorTokens.map((token) => (
                <div
                    key={token}
                    className="space-y-2 rounded-lg border bg-card p-3"
                >
                    <div
                        className="h-16 w-full rounded-md border"
                        style={{
                            backgroundColor: `var(--${token})`,
                        }}
                    />

                    <p className="text-body font-semibold">{token}</p>

                    <p className="text-meta text-muted-foreground">{token}</p>
                </div>
            ))}
        </div>
    );
}

function TypographyGrid() {
    const typographyTokens = [
        "font-family-sans",
        "font-family-heading",
        "text-label",
        "text-field-label",
        "text-meta",
        "text-button",
        "text-ui",
        "text-body",
        "text-mobile-input",
        "text-section",
        "text-heading",
        "text-title",
        "text-display",
        "text-reading",
    ];

    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {typographyTokens.map((token) => {
                const isFont = token.startsWith("font-");

                return (
                    <div
                        key={token}
                        className="flex flex-col justify-between gap-5 rounded-lg border bg-card p-5"
                    >
                        <div>
                            <p className="text-body font-semibold">{token}</p>
                            <p className="text-meta text-muted-foreground">
                                {isFont ? "Font family" : "Font size"}
                            </p>
                        </div>

                        <div className="flex min-h-20 items-center">
                            <p
                                style={
                                    isFont
                                        ? { fontFamily: `var(--${token})` }
                                        : { fontSize: `var(--${token})` }
                                }
                            >
                                Aa Bb Cc 123
                            </p>
                        </div>

                        <p className="border-t pt-3 text-meta text-muted-foreground">
                            {token}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}
function RadiusGrid() {
    const radiusTokens = [
        "radius",
        "radius-button",
        "radius-control",
        "radius-card",
        "radius-sm",
        "radius-md",
        "radius-lg",
        "radius-xl",
    ];

    return (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
            {radiusTokens.map((token) => (
                <div
                    key={token}
                    className="space-y-4 rounded-lg border bg-card p-5"
                >
                    <div className="flex h-36 items-center justify-center rounded-md bg-muted">
                        <div
                            className="h-24 w-40 bg-primary"
                            style={{
                                borderRadius: `var(--${token})`,
                            }}
                        />
                    </div>

                    <div>
                        <p className="text-body font-semibold">{token}</p>
                        <p className="mt-1 text-meta text-muted-foreground">
                            {token}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

function ButtonGrid() {
    const variants = ["default", "outline", "destructive"] as const;

    return (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {variants.map((variant) => (
                <div
                    key={variant}
                    className="flex flex-col items-center justify-center gap-5 rounded-lg border bg-card p-6"
                >
                    <Button variant={variant}>Button</Button>

                    <p className="text-body font-medium capitalize">
                        {variant}
                    </p>
                </div>
            ))}
        </div>
    );
}

function StatusBadgeGrid() {
    const statuses: Status[] = ["pending", "approved", "rejected"];

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {statuses.map((status) => (
                <div
                    key={status}
                    className="flex flex-col items-center justify-center gap-4 rounded-lg border bg-card p-8"
                >
                    <StatusBadge status={status} />

                    <p className="text-body font-semibold capitalize">
                        {status}
                    </p>
                </div>
            ))}
        </div>
    );
}
