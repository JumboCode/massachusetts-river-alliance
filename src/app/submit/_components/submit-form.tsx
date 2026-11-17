/***************************************************************
 *
 *                src/app/submit/_components/submit-form.tsx
 *
 *         Author: Will, Micah, Vienna, Michele
 *           Date: 10/27/2026
 *      Edited By: Bethiah and Tycho
 *           Date: 11/7/2026
 *
 *        Summary: Volunteer form for submitting a gage height measurement
 *
 **************************************************************/

"use client";

import { useState } from "react";
import { FormCard } from "@/components/form-card";
import { PhotoUpload } from "@/components/photo-upload";
import { SiteSelect } from "@/components/site-select";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { format, parse } from "date-fns";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { z } from "zod";
import { submissionSchema } from "@/lib/arcgis/schemas";

const pad = (n: number) => String(n).padStart(2, "0");
const HOURS = Array.from({ length: 12 }, (_, i) => pad(i === 0 ? 12 : i));
const MINUTES = Array.from({ length: 60 }, (_, i) => pad(i));

function TimeColumn({
    values,
    selected,
    onPick,
    divider,
}: {
    values: string[];
    selected: string;
    onPick: (value: string) => void;
    divider?: boolean;
}) {
    return (
        <div
            className={`flex h-60 w-16 flex-col gap-1 overflow-y-auto p-1 ${divider ? "border-r border-border" : ""}`}
        >
            {values.map((v) => (
                <Button
                    key={v}
                    type="button"
                    variant="outline"
                    data-selected={v === selected}
                    className={
                        v === selected
                            ? "border-transparent bg-primary text-primary-foreground hover:bg-primary"
                            : "border-transparent bg-transparent"
                    }
                    onClick={() => onPick(v)}
                >
                    {v}
                </Button>
            ))}
        </div>
    );
}

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
    const [dateOpen, setDateOpen] = useState(false);
    const today = parse(now.date, "yyyy-MM-dd", new Date());
    const selectedDate = parse(date, "yyyy-MM-dd", new Date());
    const [h24, min] = time.split(":").map(Number);
    const hour = pad(h24 % 12 || 12);
    const minute = pad(min);
    const period = h24 >= 12 ? "PM" : "AM";

    const setTimeParts = (h: string, m: string, p: string) =>
        setTime(`${pad((Number(h) % 12) + (p === "PM" ? 12 : 0))}:${m}`);

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
                            name="monitorName"
                            autoComplete="name"
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
                            name="monitorEmail"
                            autoComplete="email"
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
                            <Popover open={dateOpen} onOpenChange={setDateOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="date"
                                        type="button"
                                        variant="outline"
                                        aria-invalid={!!errors.date}
                                        className="h-9 w-full justify-between rounded-control border-input bg-card px-3.5 py-1 text-mobile-input font-normal text-foreground md:text-body"
                                    >
                                        {format(selectedDate, "MM/dd/yyyy")}
                                        <CalendarIcon data-icon="inline-end" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        required
                                        autoFocus
                                        selected={selectedDate}
                                        onSelect={(day) => {
                                            setDate(format(day, "yyyy-MM-dd"));
                                            setDateOpen(false);
                                        }}
                                        defaultMonth={selectedDate}
                                        today={today}
                                        disabled={{ after: today }}
                                    />
                                </PopoverContent>
                            </Popover>
                            {errors.date && (
                                <FieldError>{errors.date[0]}</FieldError>
                            )}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="time" required>
                                Time
                            </FieldLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="time"
                                        type="button"
                                        variant="outline"
                                        aria-invalid={!!errors.time}
                                        className="h-9 w-full justify-between rounded-control border-input bg-card px-3.5 py-1 text-mobile-input font-normal text-foreground md:text-body"
                                    >
                                        {hour}:{minute} {period}
                                        <ChevronDownIcon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                    onOpenAutoFocus={() =>
                                        document
                                            .querySelectorAll(
                                                '[data-selected="true"]',
                                            )
                                            .forEach((el) =>
                                                el.scrollIntoView({
                                                    block: "center",
                                                }),
                                            )
                                    }
                                >
                                    <div className="flex">
                                        <TimeColumn
                                            values={HOURS}
                                            selected={hour}
                                            onPick={(h) =>
                                                setTimeParts(h, minute, period)
                                            }
                                            divider
                                        />
                                        <TimeColumn
                                            values={MINUTES}
                                            selected={minute}
                                            onPick={(m) =>
                                                setTimeParts(hour, m, period)
                                            }
                                            divider
                                        />
                                        <TimeColumn
                                            values={["AM", "PM"]}
                                            selected={period}
                                            onPick={(p) =>
                                                setTimeParts(hour, minute, p)
                                            }
                                        />
                                    </div>
                                </PopoverContent>
                            </Popover>
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
                            name="gageHeightFt"
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
                        <Select
                            value={weather}
                            onValueChange={(v) =>
                                setWeather(v === "none" ? "" : (v ?? ""))
                            }
                        >
                            <SelectTrigger id="weather-select">
                                <SelectValue placeholder="Select Weather" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="Sunny">Sunny</SelectItem>
                                <SelectItem value="Partly cloudy">
                                    Partly cloudy
                                </SelectItem>
                                <SelectItem value="Overcast">
                                    Overcast
                                </SelectItem>
                                <SelectItem value="Light rain">
                                    Light rain
                                </SelectItem>
                                <SelectItem value="Heavy rain">
                                    Heavy rain
                                </SelectItem>
                                <SelectItem value="Snow">Snow</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="conditions">
                            Stream conditions & observations (optional)
                        </FieldLabel>
                        <Textarea
                            id="conditions"
                            name="conditions"
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
                            name="notes"
                            placeholder="Add context about the reading"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </Field>
                    <PhotoUpload value={photo} onChange={setPhoto} />
                    {errors.form && <FieldError>{errors.form[0]}</FieldError>}
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
                <p role="status" className="text-body">
                    Thanks! Your measurement was submitted
                </p>
            )}
        </FormCard>
    );
}
