/***************************************************************
 *
 *                src/app/login/page.tsx
 *
 *         Author: Grant, Tanish
 *           Date: 10/14/2026
 *
 *        Summary: Admin login page
 *
 **************************************************************/

"use client";

import { useState } from "react";
import Image from "next/image";
import { FormCard } from "@/components/form-card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <FormCard>
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
                        width={0}
                        height={0}
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
                    <Field
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                            alignItems: "flex-start",
                            width: "420px",
                            height: "60px",
                        }}
                    >
                        <FieldLabel
                            htmlFor="email-input"
                            style={{
                                fontSize: "11px",
                                fontWeight: "heavy",
                                fontFamily: "Avenir",
                                color: "#404F5A",
                            }}
                        >
                            Email <span style={{ color: "#EA7E7E" }}>*</span>
                        </FieldLabel>

                        <Input
                            id="email-input"
                            value={email}
                            type="email"
                            placeholder="Enter Email Address"
                            onChange={(e) => setEmail(e.target.value)}
                        ></Input>
                    </Field>

                    <Field
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                            alignItems: "flex-start",
                            width: "420px",
                            height: "60px",
                        }}
                    >
                        <FieldLabel
                            htmlFor="password-input"
                            style={{
                                fontSize: "11px",
                                fontWeight: "heavy",
                                fontFamily: "Avenir",
                                color: "#404F5A",
                            }}
                        >
                            Password <span style={{ color: "#EA7E7E" }}>*</span>
                        </FieldLabel>

                        <Input
                            id="password-input"
                            value={password}
                            type="password"
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                        ></Input>
                    </Field>
                </div>
            </div>
        </FormCard>
    );
}
