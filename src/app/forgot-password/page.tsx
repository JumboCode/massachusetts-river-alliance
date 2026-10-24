/***************************************************************
 *
 *                src/app/forgot-password/page.tsx
 *
 *         Author: Zander
 *           Date: 10/14/2026
 *
 *      Edited by: Bethiah
 *           Date: 10/18/2026
 *      Edited by: Michele
 *           Date: 10/20/2026
 *
 *        Summary: Forgot password page
 *
 **************************************************************/

"use client";

import { FormCard } from "@/components/form-card";
import { useState } from "react";
import Image from "next/image";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { TextLink } from "@/components/text-link";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
    // Use states
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [sent, setSent] = useState(false);

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        // check email, set error or set sent
        e.preventDefault();

        // gets rid of the extra spaces at the beginning at end, so people
        // cant put in blank emails
        const trimmed = email.trim();
        if (trimmed === "") {
            setError("This field is required");
            return;
        }

        setError("");
        setSent(true);
    }

    // email set state
    if (sent) {
        return (
            <FormCard>
                <div className="flex flex-col items-center gap-6">
                    <Image
                        src="/logo-waves.png"
                        alt="Massachusetts Rivers Alliance logo"
                        width={100}
                        height={47}
                    />
                    <p className="text-center text-sm">
                        If an account exists for that email, we&apos;ve sent a
                        reset link.
                    </p>
                    <TextLink href="/login">Back to Login</TextLink>
                </div>
            </FormCard>
        );
    }

    return (
        <FormCard>
            <div className="flex flex-col items-center gap-2">
                <Image
                    src="/logo-waves.png"
                    alt="Massachusetts Rivers Alliance logo"
                    width={100}
                    height={47}
                />
                <h1 className="font-heading text-center text-[32px] font-bold tracking-[0.08em]">
                    Forgot Password
                </h1>
            </div>
            <form onSubmit={handleSubmit} noValidate>
                <Field>
                    <FieldLabel htmlFor="email" required>
                        EMAIL
                    </FieldLabel>

                    {/* Input box */}
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        // if they do not submit anything, make border red
                        aria-invalid={!!error}
                    />
                    {/* if error, show the error message in red */}
                    {error && <FieldError>{error}</FieldError>}
                </Field>

                <div className="mt-6 flex flex-col items-center gap-1">
                    {/* Submit Button */}
                    <Button type="submit">Send Reset Link</Button>
                    {/* Link back to login page */}
                    <TextLink href="/login">Back to Login</TextLink>
                </div>
            </form>
        </FormCard>
    );
}
