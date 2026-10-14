/***************************************************************
 *
 *                src/components/photo-upload.tsx
 *
 *         Author: Zander
 *           Date: 10/14/2026
 *
 *        Summary: Optional photo picker for a measurement
 *
 **************************************************************/

import { Field, FieldLabel } from "@/components/ui/field";

type PhotoUploadProps = {
    value: File | null;
    onChange: (photo: File | null) => void;
};

export function PhotoUpload({ value, onChange }: PhotoUploadProps) {
    return (
        <Field>
            <FieldLabel htmlFor="photo">PHOTO (OPTIONAL)</FieldLabel>
            <input
                id="photo"
                type="file"
                accept="image/jpeg,image/png"
                onChange={(e) => onChange(e.target.files?.[0] ?? null)}
            />
            {value && <p>{value.name}</p>}
        </Field>
    );
}
