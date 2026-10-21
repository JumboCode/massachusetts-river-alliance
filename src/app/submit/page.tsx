/***************************************************************
 *
 *                src/app/submit/page.tsx
 *
 *         Author: Will and Micah
 *           Date: 10/14/2026
 *
 *        Summary: Volunteer form for submitting a gage height measurement
 *
 **************************************************************/

"use client";

import { useState } from "react";
import { FormCard } from "@/components/form-card";
import { PhotoUpload } from "@/components/photo-upload";
import { SiteSelect } from "@/components/site-select";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { SITES } from "@/lib/sites";
import Image from "next/image";

export default function SubmitPage() {
    type Measurement = {
        siteId: string;
        gageHeight: number;
        notes: string;
        photo: File | null;
    };

    const [site, setSite] = useState("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [gageHeight, setGageHeight] = useState("");
    const [notes, setNotes] = useState("");
    const [submission, setSubmission] = useState<Measurement | null>(null);
    const [siteError, setSiteError] = useState("");
    const [gageError, setGageError] = useState("");

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const siteMissing = site === "";
        const gageMissing = gageHeight === "";
        setSiteError(siteMissing ? "This field is required" : "");
        setGageError(gageMissing ? "This field is required" : "");
        if (siteMissing || gageMissing) {
            setSubmission(null);
            return;
        }

        setSubmission({
            siteId: site,
            gageHeight: Number(gageHeight),
            notes: notes,
            photo: photo,
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
                    <SiteSelect
                        value={site}
                        onChange={setSite}
                        error={siteError}
                    />
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
                        {gageError && (
                            <p className="text-[14px]">{gageError}</p>
                        )}
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

            {submission && !gageError && (
                <div className="text-[14px]">
                    <p>
                        Site Name:{" "}
                        {SITES.find((s) => s.id === submission.siteId)?.name}
                    </p>
                    <p>Gage Height: {submission.gageHeight}</p>
                    <p>Notes: {submission.notes}</p>
                    <p>Photo file: {submission.photo?.name}</p>
                </div>
            )}
        </FormCard>
    );
}
