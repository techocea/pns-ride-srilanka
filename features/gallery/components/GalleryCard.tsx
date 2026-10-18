'use client'

import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import type { Gallery } from '@/payload-types'
import { Input } from '@/components/ui/input'
import {useCaptionEditor} from "@/features/gallery/hooks/useCaptionEditor";
import {useDeleteGalleryItem} from "@/features/gallery/hooks/useDeleteGalleryItems";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {uploadthingLoader} from "@/features/gallery/utils/uploadthing-loader";

export function GalleryCard({ item }: { item: Gallery }) {
    const image = typeof item.image === 'object' ? item.image : null
    const { value, setValue, save, status, error } = useCaptionEditor(item.id, item.caption)
    const { pending, remove, error: deleteError } = useDeleteGalleryItem(item.id, item.caption)

    return (
        <div className={`relative bg-surface p-3 transition-opacity ${pending ? 'opacity-50' : ''}`}>
            <div className="relative mb-3 aspect-square overflow-hidden bg-ink">
                {image?.url ? (
                    <Image
                        src={image.url}
                        alt={value || 'Gallery image'}
                        fill
                        loader={uploadthingLoader}
                        sizes="(min-width: 768px) 25vw, 50vw"
                        className="object-cover"
                    />
                ) : (
                    <span className="absolute inset-0 grid place-items-center text-xs text-muted">No image</span>
                )}
            </div>

            <Button variant={"destructive"}
                type="button"
                onClick={remove}
                disabled={pending}
                aria-label={`Delete ${item.caption}`}
                className="absolute right-5 top-5"
            >
                <Trash2 size={12} />
            </Button>

            <Label htmlFor={`caption-${item.id}`} className="block text-[9px] uppercase tracking-wider text-muted">
                Caption · used as alt text
            </Label>
            <Input
                id={`caption-${item.id}`}
                value={value}
                maxLength={120}
                onChange={(e) => setValue(e.target.value)}
                onBlur={save}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur() // blur triggers the save
                }}
                className="mt-1"
            />

            <p
                aria-live="polite"
                className={`mt-1 h-4 text-[10px] ${status === 'error' || deleteError ? 'text-red-400' : 'text-muted'}`}
            >
                {status === 'saving' && 'Saving...'}
                {status === 'saved' && 'Saved'}
                {status === 'error' && error}
                {deleteError}
            </p>
        </div>
    )
}