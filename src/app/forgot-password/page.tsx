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
//for when image is used in the future (better to use <Image> over <img> because next handles the sizing and loading)
// import Image from "next/image";
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

        //Technically not wrong but not explicitly stated in design spec,
        //if they want us to implement it then just uncomment it below but
        //i think they just want us to follow the spec as closely as possible

        // tests to see if email provided fits regular email formatting
        // if (!/^\S+@\S+\.\S+$/.test(trimmed)) {
        //     setError("Enter a valid email address");
        //     return;
        // }

        setError("");
        setSent(true);
    }

    // email set state
    //includes commented out section for image when it is approved
    if (sent) {
        return (
            <FormCard>
                <div className="flex flex-col items-center gap-6">
                    {/* <Image
                            src="/logo-waves.png"
                            alt="Massachusetts River Alliance logo"
                            width={100}
                            height={47}
                    /> */}
                    <p className="text-center text-sm">
                        If an account exists for that email, we&apos;ve sent a
                        reset link.
                    </p>
                    <TextLink href="/login">Back to Login</TextLink>
                </div>
            </FormCard>
        );
    }

    //includes commented out section for image when it is approved
    return (
        <FormCard>
            {/* <Image
                            src="/logo-waves.png"
                            alt="Massachusetts River Alliance logo"
                            width={100}
                            height={47}
                    /> */}
            <h1 className="font-heading text-center text-2xl tracking-wide">
                Forgot Password
            </h1>

            <form onSubmit={handleSubmit} noValidate>
                <Field>
                    {/* changed original (below) to use built in instead of 
                    overriding with custom className, since it is already built in to the component
                    and changed email to caps like in figma                 
                    
                    <FieldLabel
                        htmlFor="email"
                        className="text-xs uppercase tracking-wider text-label"
                    >
                        Email <span className="text-destructive">*</span>
                    </FieldLabel> */}

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
                    {/*  changed original (below) to use built in components
                    
                    <Button
                        type="submit"
                        className="bg-primary hover:bg-input text-white"
                    >
                        Send Reset Link
                    </Button> */}

                    <Button type="submit">Send Reset Link</Button>
                    {/* Link back to login page */}
                    <TextLink href="/login">Back to Login</TextLink>
                </div>
            </form>
        </FormCard>
    );
}
