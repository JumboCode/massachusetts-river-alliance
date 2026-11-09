/***************************************************************
 *
 *                src/components/photo-upload.tsx
 *
 *         Author: Zander, Tycho, Caitlyn
 *           Date: 10/14/2026
 *         Edited by: Michele
 *           Date: 11/09/2026
 *
 *        Summary: Optional photo picker for a measurement
 *
 **************************************************************/

import { type ChangeEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
    const inputRef = useRef<HTMLInputElement>(null);

    function showPreview(file: File | null) {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(file ? URL.createObjectURL(file) : null);
    }

    function handlePhotoChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null;
        if (file && file.size > MAX_PHOTO_SIZE_BYTES) {
            e.currentTarget.value = "";
            onChange(null);
            showPreview(null);
            setError("Photo must be 10 MB or smaller.");
            return;
        }

        setError(null);
        onChange(file);
        showPreview(file);
    }

    function handleRemove() {
        if (inputRef.current) inputRef.current.value = "";
        showPreview(null);
        setError(null);
        onChange(null);
    }

    return (
        <Field>
            <FieldLabel htmlFor="photo">Photo (optional)</FieldLabel>
            <Input
                ref={inputRef}
                className="hidden"
                id="photo"
                name="photo"
                type="file"
                accept="image/jpeg,image/png"
                onChange={handlePhotoChange}
            />
            {value ? (
                //TODO: Step 7, replace entire preview w one bordered row
                //need 56px square thumbnail, rounded, cropped to fill
                //file name (truncated) over its size (muted text)
                //remove button at the end (calls handleRemove)
                //MICAH
                <div className="relative flex h-30 w-full items-center justify-center overflow-hidden rounded-md border border-input">
                    {previewUrl && (
                        <Image
                            alt="Preview of uploaded photo"
                            className="h-full w-full object-contain p-2"
                            src={previewUrl}
                            fill
                        />
                    )}
                    <Button
                        className="absolute top-2 right-2 rounded-full"
                        variant="outline"
                        size="icon-sm"
                        type="button"
                        aria-label="Remove photo"
                        onClick={handleRemove}
                    >
                        <X />
                    </Button>
                </div>
            ) : (
                //TODO: Step 6, replace <label> with Button with onClick call to
                //inputRef.current?.click()
                //keep upload icon
                //"add a photo" and muted "jpg or png" line under
                //remove classes once input no longer uses peer
                //MICAH
                <label
                    className="flex h-30 w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-md border border-input text-body underline peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50"
                    htmlFor="photo"
                >
                    <Upload size={35} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Add a photo</span>
                </label>
            )}
            {error && <FieldError>{error}</FieldError>}
        </Field>
    );
}
