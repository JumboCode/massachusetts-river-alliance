/***************************************************************
 *
 *                src/components/photo-upload.tsx
 *
 *         Author: Zander, Tycho, Caitlyn
 *           Date: 10/14/2026
 *
 *        Summary: Optional photo picker for a measurement
 *
 **************************************************************/

import { type ChangeEvent, useState } from "react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Upload, X } from "lucide-react";
import Image from "next/image";

const MAX_PHOTO_SIZE_BYTES = 10 * 1024 * 1024;

type PhotoUploadProps = {
    value: File | null;
    onChange: (photo: File | null) => void;
};

export function PhotoUpload({ value, onChange }: PhotoUploadProps) {
    const [error, setError] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    function handlePhotoChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null;
        if (file && file.size > MAX_PHOTO_SIZE_BYTES) {
            e.currentTarget.value = "";
            onChange(null);
            setError("Photo must be 10 MB or smaller.");
            return;
        }

        setError(null);
        onChange(file);
        if (!file) {
            setPreviewUrl(null);
            return;
        }

        setPreviewUrl(URL.createObjectURL(file));
    }

    return (
        <Field>
            <FieldLabel htmlFor="photo">PHOTO (OPTIONAL)</FieldLabel>
            <input
                className="hidden"
                id="photo"
                type="file"
                accept="image/jpeg,image/png"
                onChange={handlePhotoChange}
            />
            {value ? (
                <div className="relative flex h-30 w-full items-center justify-center overflow-hidden rounded-md border border-input">
                    {previewUrl && (
                        <Image
                            alt="Preview of uploaded photo"
                            className="h-full w-full object-contain p-2"
                            src={previewUrl}
                            fill
                        />
                    )}
                    <button
                        className="absolute right-2 top-2 flex size-7 cursor-pointer items-center justify-center rounded-full bg-label/20"
                        type="button"
                        onClick={() => {
                            if (previewUrl !== null) {
                                document
                                    .getElementById("photo")
                                    ?.setAttribute("value", "");
                            }
                            setPreviewUrl(null);
                            setError(null);
                            onChange(null);
                        }}
                    >
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <label
                    className="flex h-30 w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-input text-sm underline"
                    htmlFor="photo"
                >
                    <Upload size={35} className="text-label" />
                    <span className="text-label">Add a photo</span>
                </label>
            )}
            {error && <FieldError>{error}</FieldError>}
        </Field>
    );
}
