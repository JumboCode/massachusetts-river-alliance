/***************************************************************
 *
 *                src/app/submit/page.tsx
 *
 *         Author: Will, Micah, Vienna, Michele
 *           Date: 10/27/2026
 *
 *        Summary: Volunteer form for submitting a gage height measurement
 *
 **************************************************************/

"use client";

import { useEffect, useState } from "react";
import { FormCard } from "@/components/form-card";
import { PhotoUpload } from "@/components/photo-upload";
import { SiteSelect } from "@/components/site-select";
import { NativeSelect } from "@/components/ui/native-select";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SITES } from "@/lib/sites";
import Image from "next/image";

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

export default function SubmitPage() {
    const [monitorName, setMonitorName] = useState("");
    const [monitorEmail, setMonitorEmail] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
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

    useEffect(() => {
        setDate(new Date().toLocaleDateString("en-CA"));
        setTime(new Date().toTimeString().slice(0, 5));
    }, []);

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
                    className="w-[100px] h-[47px] mx-auto"
                    src="/logo-waves.png"
                />
                <h1 className="font-heading text-[32px] mx-auto font-bold tracking-[0.08em]">
                    Submit Measurement
                </h1>
                <p className="text-[14px] mx-auto">
                    Share a current gage height from a monitoring site.
                </p>
            </div>

            <form onSubmit={submit}>
                <div className="flex flex-col gap-4">
                    <Field>
                        <FieldLabel htmlFor="monitor-name" required>
                            MONITOR NAME
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
                            MONITOR EMAIL
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
                                DATE
                            </FieldLabel>
                            <Input
                                id="date"
                                type="date"
                                value={date}
                                aria-invalid={!!dateError}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            {dateError && <FieldError>{dateError}</FieldError>}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="time" required>
                                TIME
                            </FieldLabel>
                            <Input
                                id="time"
                                type="time"
                                value={time}
                                aria-invalid={!!timeError}
                                onChange={(e) => setTime(e.target.value)}
                            />
                            {timeError && <FieldError>{timeError}</FieldError>}
                        </Field>
                    </div>
                    <Field>
                        <FieldLabel htmlFor="gage-height" required>
                            GAGE HEIGHT (ft)
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
                            WEATHER (OPTIONAL)
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
                            STREAM CONDITIONS & OBSERVATIONS (OPTIONAL)
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
                            NOTES (OPTIONAL)
                        </FieldLabel>
                        <Input
                            id="notes"
                            placeholder="Add context about the reading"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </Field>
                    <PhotoUpload value={photo} onChange={setPhoto} />
                    <Button
                        type="submit"
                        className="w-[156px] h-[40px] mx-auto"
                    >
                        Submit
                    </Button>
                </div>
            </form>
            {submission && (
                <div className="text-[14px]">
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
