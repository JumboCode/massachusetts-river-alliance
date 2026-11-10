/***************************************************************
 *
 *                src/app/login/page.tsx
 *
 *         Author: Grant, Tanish
 *           Date: 10/18/2026
 *
 *        Summary: Admin login page
 *
 **************************************************************/

"use client";

import { useState } from "react";
import Image from "next/image";
import { FormCard } from "@/components/form-card";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TextLink } from "@/components/text-link";

import { z } from "zod";
import { emailSchema, REQUIRED } from "@/lib/arcgis/schemas";

const loginSchema = z.object({
    email: emailSchema,
    password: z.string({ error: REQUIRED }).min(1, REQUIRED),
});

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<Partial<Record<string, string[]>>>({});
    const [loggedIn, setLoggedIn] = useState(false);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const result = loginSchema.safeParse({ email, password });
        if (!result.success) {
            setErrors(z.flattenError(result.error).fieldErrors);
            setLoggedIn(false);
            return;
        }

        setErrors({});
        setLoggedIn(true);
    }

    return (
        <FormCard>
            <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-7.5"
            >
                {/* Image and header */}
                <div className="flex flex-col items-center gap-2.5">
                    <Image
                        src="/logo-waves.png"
                        alt="Logo"
                        width={235}
                        height={110}
                        loading="eager"
                        sizes="(max-width: 235px) 100vw, 235px"
                        className="h-auto w-full max-w-58.75"
                    />

                    <h1 className="text-center font-heading text-display">
                        Admin Login
                    </h1>
                </div>

                {/* Email and password */}
                <div className="flex flex-col gap-4">
                    <Field>
                        <FieldLabel htmlFor="email-input" required>
                            Email
                        </FieldLabel>
                        <Input
                            id="email-input"
                            value={email}
                            type="email"
                            placeholder="Enter Email Address"
                            onChange={(e) => setEmail(e.target.value)}
                            aria-invalid={!!errors.email}
                        ></Input>
                        {errors.email && (
                            <FieldError>{errors.email[0]}</FieldError>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="password-input" required>
                            Password
                        </FieldLabel>
                        <Input
                            id="password-input"
                            value={password}
                            type="password"
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                            aria-invalid={!!errors.password}
                        ></Input>
                        {errors.password && (
                            <FieldError>{errors.password[0]}</FieldError>
                        )}
                    </Field>
                    {/* Login button and forgot password link */}
                    <div className="flex flex-col items-center gap-4">
                        <Button type="submit" size="lg" className="w-full">
                            Login
                        </Button>

                        {loggedIn && (
                            <p className="text-muted-foreground">Logged in!</p>
                        )}
                        <TextLink href="/forgot-password">
                            Forgot Password?
                        </TextLink>
                    </div>
                </div>
            </form>
        </FormCard>
    );
}
