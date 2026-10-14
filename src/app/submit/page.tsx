/***************************************************************
 *
 *                src/app/submit/page.tsx
 *
 *         Author: Zander
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

export default function SubmitPage() {
    const [site, setSite] = useState("");
    const [photo, setPhoto] = useState<File | null>(null);

    return (
        <FormCard>
            <h1>Submit Measurement</h1>
            <div className="flex flex-col gap-4">
                <SiteSelect value={site} onChange={setSite} />
                {/* Gage height and notes go here */}
                <PhotoUpload value={photo} onChange={setPhoto} />
                {/* Submit button goes here */}
            </div>
        </FormCard>
    );
}
