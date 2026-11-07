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
import { SITES } from "@/lib/sites";
import Image from "next/image";
import { format, parse } from "date-fns";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

type Measurement = {
    monitorName: string;
    monitorEmail: string;
    siteId: string;
    date: string;
    time: string;
    gageHeight: number;
    weather: string;
    conditions: string;
    notes: string;
    photo: File | null;
};

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
                    variant="ghost"
                    data-selected={v === selected}
                    className={
                        v === selected
                            ? "bg-primary text-primary-foreground"
                            : ""
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
    const [gageHeight, setGageHeight] = useState("");
    const [weather, setWeather] = useState("");
    const [conditions, setConditions] = useState("");
    const [notes, setNotes] = useState("");
    const [submission, setSubmission] = useState<Measurement | null>(null);
    const [siteError, setSiteError] = useState("");
    const [gageError, setGageError] = useState("");
    const [timeError, setTimeError] = useState("");
    const [dateError, setDateError] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [dateOpen, setDateOpen] = useState(false);
    const today = parse(now.date, "yyyy-MM-dd", new Date());
    const selectedDate = parse(date, "yyyy-MM-dd", new Date());
    const [h24, min] = time.split(":").map(Number);
    const hour = pad(h24 % 12 || 12);
    const minute = pad(min);
    const period = h24 >= 12 ? "PM" : "AM";

    const setTimeParts = (h: string, m: string, p: string) =>
        setTime(`${pad((Number(h) % 12) + (p === "PM" ? 12 : 0))}:${m}`);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const nameMissing = monitorName === "";
        const emailMissing = monitorEmail === "";
        const dateMissing = date === "";
        const timeMissing = time === "";
        const siteMissing = site === "";
        const gageMissing = gageHeight === "";
        setNameError(nameMissing ? "This field is required" : "");
        setEmailError(emailMissing ? "This field is required" : "");
        setDateError(dateMissing ? "This field is required" : "");
        setTimeError(timeMissing ? "This field is required" : "");
        setSiteError(siteMissing ? "This field is required" : "");
        setGageError(gageMissing ? "This field is required" : "");
        if (
            siteMissing ||
            gageMissing ||
            nameMissing ||
            emailMissing ||
            dateMissing ||
            timeMissing
        ) {
            setSubmission(null);
            return;
        }

        setSubmission({
            siteId: site,
            gageHeight: Number(gageHeight),
            weather: weather,
            conditions: conditions,
            notes: notes,
            photo: photo,
            monitorName: monitorName,
            monitorEmail: monitorEmail,
            date: date,
            time: time,
        });
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

            <form onSubmit={submit}>
                <div className="flex flex-col gap-4">
                    <Field>
                        <FieldLabel htmlFor="monitor-name" required>
                            Monitor name
                        </FieldLabel>
                        <Input
                            id="monitor-name"
                            placeholder="Enter your name"
                            value={monitorName}
                            aria-invalid={!!nameError}
                            onChange={(e) => setMonitorName(e.target.value)}
                        />
                        {nameError && <FieldError>{nameError}</FieldError>}
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
                            aria-invalid={!!emailError}
                            onChange={(e) => setMonitorEmail(e.target.value)}
                        />
                        {emailError && <FieldError>{emailError}</FieldError>}
                    </Field>
                    <SiteSelect
                        value={site}
                        onChange={setSite}
                        error={siteError}
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
                                        aria-invalid={!!dateError}
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
                            {dateError && <FieldError>{dateError}</FieldError>}
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
                                        aria-invalid={!!timeError}
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
                            {timeError && <FieldError>{timeError}</FieldError>}
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
                            value={gageHeight}
                            aria-invalid={!!gageError}
                            onChange={(e) => setGageHeight(e.target.value)}
                        />
                        {gageError && <FieldError>{gageError}</FieldError>}
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
                    <Button type="submit" size="lg" className="mx-auto w-39">
                        Submit
                    </Button>
                </div>
            </form>
            {submission && (
                <div className="text-body">
                    <p>Monitor Name: {submission.monitorName}</p>
                    <p>Monitor Email: {submission.monitorEmail}</p>
                    <p>
                        Site Name:{" "}
                        {SITES.find((s) => s.id === submission.siteId)?.name}
                    </p>
                    <p>Date: {submission.date}</p>
                    <p>Time: {submission.time}</p>
                    <p>Gage Height: {submission.gageHeight}</p>
                    <p>Weather: {submission.weather}</p>
                    <p>Stream Conditions: {submission.conditions}</p>
                    <p>Notes: {submission.notes}</p>
                    <p>Photo file: {submission.photo?.name}</p>
                </div>
            )}
        </FormCard>
    );
}
