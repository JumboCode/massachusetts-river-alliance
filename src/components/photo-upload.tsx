/***************************************************************
 *
 *                src/components/photo-upload.tsx
 *
 *         Author: Zander, Tycho, Caitlyn
 *           Date: 10/14/2026
 *         Edited by: Michele
 *           Date: 11/09/2026
 *         Edited by: Micah
 *           Date: 11/10/2026
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

//convert small files to KB and keep larger ones in MB
function formatFileSize(bytes: number) {
    const kilobytes = bytes / 1024;
    if (kilobytes < 1024) {
        return `${Math.round(kilobytes)} KB`;
    } else {
        return `${(kilobytes / 1024).toFixed(1)} MB`;
    }
}

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
                <div className="flex w-full items-center gap-3 rounded-md border border-input p-2">
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-md">
                        {previewUrl && (
                            <Image
                                alt="Preview of uploaded photo"
                                className="object-cover"
                                src={previewUrl}
                                fill
                            />
                        )}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-body">{value.name}</span>
                        <span className="text-meta text-muted-foreground">
                            {formatFileSize(value.size)}
                        </span>
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        className="border-transparent text-muted-foreground underline"
                        onClick={handleRemove}
                    >
                        <X />
                        Remove
                    </Button>
                </div>
            ) : (
                <Button
                    type="button"
                    variant="outline"
                    className="h-30 w-full flex-col items-center justify-center gap-1 rounded-md"
                    onClick={() => inputRef.current?.click()}
                >
                    <Upload className="size-8.75 text-muted-foreground" />
                    <span className="underline">Add a photo</span>
                    <span className="text-muted-foreground">JPG or PNG</span>
                </Button>
            )}
            {error && <FieldError>{error}</FieldError>}
        </Field>
    );
}
