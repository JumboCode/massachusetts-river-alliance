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

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const trimmedEmail = email.trim();
        setEmailError(trimmedEmail === "" ? "This field is required" : "");
        setPasswordError(password === "" ? "This field is required" : "");
        setLoggedIn(trimmedEmail !== "" && password !== "");
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
                        className="w-full h-auto max-w-[235px]"
                    />

                    <h1 className="font-heading font-bold text-[40px] leading-[100%] tracking-[0.08em] text-center">
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
                            aria-invalid={!!emailError}
                        ></Input>
                        {emailError && <FieldError>{emailError}</FieldError>}
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
                            aria-invalid={!!passwordError}
                        ></Input>
                        {passwordError && (
                            <FieldError>{passwordError}</FieldError>
                        )}
                    </Field>
                    {/* Login button and forgot password link */}
                    <div className="flex flex-col items-center gap-4">
                        <Button type="submit" className="w-full">
                            Login
                        </Button>

                        {loggedIn && (
                            <p className="text-green-600">Logged in!</p>
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
