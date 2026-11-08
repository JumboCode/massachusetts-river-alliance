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
"use client";
import { notFound } from "next/navigation";
import { ReactNode, useMemo, useState } from "react";

export default function Showcase() {
    if (process.env.NODE_ENV === "production") notFound();
    const [state, setState] = useState<string>("lofi");
    if (state === "hifi") {
        setState("lofi");
    }

    return (
        <main className="">
            <p className="text-body text-muted-foreground">Showcase</p>
            <p className="text-body text-muted-foreground">
                Tokens and components from the Figma. Dev only.
            </p>

            <Section title="Colors">
                <ColorGrid state={state}></ColorGrid>
            </Section>
        </main>
    );
}

type SectionProps = {
    title: string;
    children: ReactNode;
};

function Section({ title, children }: SectionProps) {
    return (
        <div>
            <h1>{title}</h1>
            {children}
        </div>
    );
}

type ColorProps = {
    name: string;
    color: string;
};

function Color_Swatch({ name, color }: ColorProps) {
    return (
        <div>
            <div
                className="w-20 h-10 outline outline-gray"
                style={{ backgroundColor: color }}
            ></div>
            {name}
        </div>
    );
}

type ColorGridProps = {
    state: string;
};
function ColorGrid({ state }: ColorGridProps) {
    const colorNames = useMemo(() => {
        let colors;
        if (state === "lofi") {
            colors = document.querySelector(":root");
        } else if (state === "hifi") {
            colors = document.querySelector('[data-theme="hifi"]');
        }

        if (!colors) return;

        const styles = getComputedStyle(colors);

        const tempColors = Array.from(styles)
            .filter((property) => property.startsWith("--"))
            .map((property) => ({
                name: property.replace("--", ""),
                color: styles.getPropertyValue(property).trim(),
            }))
            .filter((item) => {
                const value = item.color;

                return (
                    CSS.supports("color", value) &&
                    !CSS.supports("width", value)
                );
            });

        return tempColors;
    }, [state]);

    return (
        <div className="grid w-200 h-100 grid-cols-5 gap-3">
            {colorNames?.map((elem) => (
                <Color_Swatch
                    key={elem.name}
                    name={elem.name}
                    color={elem.color}
                ></Color_Swatch>
            ))}
        </div>
    );
}
