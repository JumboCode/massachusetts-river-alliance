/***************************************************************
 *
 *                src/app/submit/_components/submit-form.tsx
 *
 *         Author: Will, Micah, Vienna, Michele
 *           Date: 10/27/2026
 *
 *        Summary: Volunteer form for submitting a gage height measurement
 *
 **************************************************************/

"use client";

import { useState } from "react";
import { FormCard } from "@/components/form-card";
import { PhotoUpload } from "@/components/photo-upload";
import { SiteSelect } from "@/components/site-select";
import { NativeSelect } from "@/components/ui/native-select";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

import { z } from "zod";
import { submissionSchema } from "@/lib/arcgis/schemas";

// `now` is today's date and time in Massachusetts, from the server.
export function SubmitForm({ now }: { now: { date: string; time: string } }) {
    const [monitorName, setMonitorName] = useState("");
    const [monitorEmail, setMonitorEmail] = useState("");
    const [date, setDate] = useState(now.date);
    const [time, setTime] = useState(now.time);
    const [site, setSite] = useState("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [gageHeightFt, setGageHeightFt] = useState("");
    const [weather, setWeather] = useState("");
    const [conditions, setConditions] = useState("");
    const [notes, setNotes] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<string, string[]>>>({});

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitted(false);

        const result = submissionSchema.safeParse({
            siteId: site,
            gageHeightFt:
                gageHeightFt === "" ? undefined : Number(gageHeightFt),
            date,
            time,
            monitorName,
            monitorEmail,
            weather,
            conditions,
            notes,
        });

        if (!result.success) {
            setErrors(z.flattenError(result.error).fieldErrors);
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        try {
            const res = await fetch("/api/submissions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(result.data),
            });

            // res.ok is true for any 2xx status
            if (!res.ok) {
                const data = await res.json().catch(() => null);
                setErrors(
                    data?.errors ?? {
                        form: ["Something went wrong. Please try again."],
                    },
                );
                return;
            }

            setIsSubmitted(true);
        } catch {
            setErrors({ form: ["Failed to connect to the server."] });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <FormCard>
            <div className="flex flex-col gap-2">
                <Image
                    alt=""
                    width="100"
                    height="47"
                    className="mx-auto h-11.75 w-25"
                    src="/logo-waves.png"
                />
                <h1 className="mx-auto font-heading text-title">
                    Submit Measurement
                </h1>
                <p className="mx-auto text-body">
                    Share a current gage height from a monitoring site.
                </p>
            </div>

            <form noValidate onSubmit={submit}>
                <div className="flex flex-col gap-4">
                    <Field>
                        <FieldLabel htmlFor="monitor-name" required>
                            Monitor name
                        </FieldLabel>
                        <Input
                            id="monitor-name"
                            placeholder="Enter your name"
                            value={monitorName}
                            aria-invalid={!!errors.monitorName}
                            onChange={(e) => setMonitorName(e.target.value)}
                        />
                        {errors.monitorName && (
                            <FieldError>{errors.monitorName[0]}</FieldError>
                        )}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="monitor-email" required>
                            Monitor email
                        </FieldLabel>
                        <Input
                            id="monitor-email"
                            type="email"
                            placeholder="Enter Email Address"
                            value={monitorEmail}
                            aria-invalid={!!errors.monitorEmail}
                            onChange={(e) => setMonitorEmail(e.target.value)}
                        />
                        {errors.monitorEmail && (
                            <FieldError>{errors.monitorEmail[0]}</FieldError>
                        )}
                    </Field>
                    <SiteSelect
                        value={site}
                        onChange={setSite}
                        error={errors.siteId?.[0] ?? ""}
                    />
                    <div className="flex gap-4">
                        <Field>
                            <FieldLabel htmlFor="date" required>
                                Date
                            </FieldLabel>
                            <Input
                                id="date"
                                type="date"
                                value={date}
                                aria-invalid={!!errors.date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            {errors.date && (
                                <FieldError>{errors.date[0]}</FieldError>
                            )}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="time" required>
                                Time
                            </FieldLabel>
                            <Input
                                id="time"
                                type="time"
                                value={time}
                                aria-invalid={!!errors.time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                            {errors.time && (
                                <FieldError>{errors.time[0]}</FieldError>
                            )}
                        </Field>
                    </div>
                    <Field>
                        <FieldLabel htmlFor="gage-height" required>
                            Gage height (ft)
                        </FieldLabel>

                        <Input
                            id="gage-height"
                            type="number"
                            step="0.01"
                            placeholder="e.g. 4.82"
                            value={gageHeightFt}
                            aria-invalid={!!errors.gageHeightFt}
                            onChange={(e) => setGageHeightFt(e.target.value)}
                        />
                        {errors.gageHeightFt && (
                            <FieldError>{errors.gageHeightFt[0]}</FieldError>
                        )}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="weather-select">
                            Weather (optional)
                        </FieldLabel>
                        <NativeSelect
                            id="weather-select"
                            value={weather}
                            onChange={(e) => setWeather(e.target.value)}
                        >
                            <option value="">Select weather</option>
                            <option value="Sunny">Sunny</option>
                            <option value="Partly cloudy">Partly cloudy</option>
                            <option value="Overcast">Overcast</option>
                            <option value="Light rain">Light rain</option>
                            <option value="Heavy rain">Heavy rain</option>
                            <option value="Snow">Snow</option>
                            <option value="Other">Other</option>
                        </NativeSelect>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="conditions">
                            Stream conditions & observations (optional)
                        </FieldLabel>
                        <Textarea
                            id="conditions"
                            rows={4}
                            value={conditions}
                            placeholder="Add context about stream conditions"
                            onChange={(e) => setConditions(e.target.value)}
                        />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="notes">
                            Notes (optional)
                        </FieldLabel>
                        <Input
                            id="notes"
                            placeholder="Add context about the reading"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </Field>
                    <PhotoUpload value={photo} onChange={setPhoto} />
                    {errors.form && (
                        <p className="text-body text-destructive">
                            {errors.form[0]}
                        </p>
                    )}
                    <Button
                        type="submit"
                        size="lg"
                        className="mx-auto w-39"
                        disabled={isSubmitting}
                    >
                        Submit
                    </Button>
                </div>
            </form>
            {isSubmitted && (
                <p className="text-body">
                    Thanks! Your measurement was submitted
                </p>
            )}
        </FormCard>
    );
}
