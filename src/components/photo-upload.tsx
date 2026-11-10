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

//convert small files to KB and keep larger ones in MB
function formatFileSize(bytes: number) {
    const kilobytes = bytes / 1024;
    if (kilobytes < 1024) {
        return "${Math.round(kilobytes)} KB";
    } else {
        return "${(kilobytes / 1024).toFixed(1)} MB";
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
                //TODO: Step 7, replace entire preview w one bordered row
                //need 56px square thumbnail, rounded, cropped to fill
                //file name (truncated) over its size (muted text)
                //remove button at the end (calls handleRemove)
                //MICAH
                <div className="flex w-full items-center gap-3 rounded-md border border-input p-2">
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-md">
                        {/**NEED TO INCLUDE: set size to 56px, scale up image to fill entire box (hint: can be done with 1 tailwind class related to object-contain, but notice that object-contain doesnt fill the box)*/}
                        {/**Also notice in className (below) that we pad it with p-2, but we want no blank spaces around the image and we want it to fill the box */}
                        {previewUrl && (
                            <Image
                                alt="Preview of uploaded photo"
                                className="h-full w-full object-contain p-2"
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

                    {/*Here: we are currently using the Button **component** not the builtin HTML button.
                        The Button component has 3 variants: default, outline, destructive. None of these match
                        the Figma for what the button should look like (grey underlined text with x)
                        and we want to **avoid** overriding styles from the outside. Another option would be to
                        add to the component, but since the issue doesn't say to do that opt for using the built in HTML <button> tag instead.
                        In HTML: buttons inside <form>s submit the form by default, to specify we don't want
                        remove to submit the form we need to give the button a type, the default is type="submit" so what type should we give it?

                        Next will need to give it some className styling, because we want to:
                        1. put the X and Remove side by side, vertically centered, 4 px apart.
                        --> what are the tailwind classes for that? look them up in the docs one by one.
                        2. we also want to stop the button from being squeezed in, so if the filename is too long we should cut
                        it off with "..."
                        --> find the className styling that can do that
                        3. we want a hand cursor on hover (normal button uses the arrow, and the Button component handles it for us, but we aren't using that)
                        4. we want the small text size (this isnt in the docs, use text-meta)
                        5. we want the gray text color (this also isn't in the docs, use text-muted-foreground)
                        --> if you're curious about 4 and 5, you can look through src/app/globals.css or src/styles/theme.css, but i just kinda copy what the other similar looking things use)
                        6. we also want it underlined (check the Reference, Remove is underlined)
                        --> it might be underlined only on hover, but assume it's always underlined for now and we can confirm before making a PR

                        Finally, we want the same onClick functionality in our new button. Include this as the final part of the opening tag.

                        This is enough information to close the open tag <button (extra info from above)>
                        Now, HTML has open and close tags i.e. <button></button>
                        And we want an element to be inside the button. E.x.: <button>Click me!</button> 
                        Look at the existing code for the button:

                        We use the X from lucide-react. Lucide renders icons with 24x24 pixels by default (classname="size-6") 
                        but we want 16 pixels. What size should we set the classname to? What should the tag look like?
                        Look at the existing tag for the X below --> it is a self closing tag (technically <X></X> is the exact same as <X/> in this case)

                        If we wanted a very plain button that says remove, we would do <button>Remove</button>. But we want the X and Remove to be side by side, so we need to put them both inside the button. Where should we put Remove?

                        */}
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
