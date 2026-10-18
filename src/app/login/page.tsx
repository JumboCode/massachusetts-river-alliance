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

        setEmailError(email === "" ? "This field is required" : "");
        setPasswordError(password === "" ? "This field is required" : "");
        setLoggedIn(email !== "" && password !== "");
    }

    return (
        <FormCard>
            <form onSubmit={handleSubmit} noValidate>
                {/* Image and header */}

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "30px",
                        height: "515px",
                        padding: "40px",
                        borderRadius: "10px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >
                        <Image
                            src="/logo-waves.png"
                            alt="Logo"
                            width={235}
                            height={110}
                            loading="eager"
                            sizes="(max-width: 235px) 100vw, 235px"
                            style={{
                                width: "100%",
                                height: "auto",
                                maxWidth: "235px",
                            }}
                        />

                        <h1
                            className="font-heading"
                            style={{
                                height: "49px",
                                fontWeight: 700,
                                fontSize: "40px",
                                lineHeight: "100%",
                                letterSpacing: "0.08em",
                                textAlign: "center",
                                color: "#000000",
                            }}
                        >
                            Admin Login
                        </h1>
                    </div>

                    {/* Email and password */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "16px",
                        }}
                    >
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
                            {emailError && (
                                <FieldError>{emailError}</FieldError>
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
                                aria-invalid={!!passwordError}
                            ></Input>
                            {passwordError && (
                                <FieldError>{passwordError}</FieldError>
                            )}
                        </Field>
                        {/* Login button and forgot password link */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "16px",
                                width: "420px",
                            }}
                        >
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
                </div>
            </form>
        </FormCard>
    );
}
