"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {useGalleryUpload} from "@/features/gallery/hooks/useGalleryUpload";
import {ImageUploadZone} from "@/components/cms/ImageUploadZone";

export function GalleryUploader() {
    const {handleSubmit, pending, error, resetKey} = useGalleryUpload()
    const [busy, setBusy] = useState(false)

    return (
        <form onSubmit={handleSubmit} className="mb-8 border border-line bg-surface p-6">
            <p className="mb-4 text-xs uppercase tracking-widest text-gold">
                Landing gallery · Multi-image upload
            </p>

            <ImageUploadZone key={resetKey} name="images" maxFiles={12} onBusyChange={setBusy}/>

            {error && (
                <p role="alert" className="mt-3 text-xs text-red-400">
                    {error}
                </p>
            )}


            <div className="flex items-center justify-center w-full">
                <Button size={"lg"} type="submit" disabled={pending || busy} className="mt-4 uppercase w-full md:w-auto">
                    {pending ? 'Adding...' : busy ? 'Uploading images...' : 'Add to gallery'}
                </Button>
            </div>
        </form>
    )
}