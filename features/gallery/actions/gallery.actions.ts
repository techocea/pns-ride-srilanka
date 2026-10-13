'use server'

import { revalidatePath } from 'next/cache'
import type { GalleryActionResult } from '@/features//gallery/types'
import { captionSchema } from '@/features//gallery/schemas/gallery.schema'
import { imageEntriesSchema, type ImageEntry, type NewImageEntry } from '@/features/media/schemas/media.schema'
import { addGalleryItems, removeGalleryItem, updateCaption } from '@/features/gallery/services/gallery.service'

const isNew = (e: ImageEntry): e is NewImageEntry => e.kind === 'new'
const message = (e: unknown) => (e instanceof Error ? e.message : 'Something went wrong')

export async function addGalleryImagesAction(formData: FormData): Promise<GalleryActionResult> {
    let raw: unknown
    try {
        raw = JSON.parse(String(formData.get('images') ?? '[]'))
    } catch {
        return { error: 'Invalid images' }
    }

    const parsed = imageEntriesSchema.safeParse(raw)
    if (!parsed.success) return { error: 'Invalid images' }

    const entries = parsed.data.filter(isNew)
    if (entries.length === 0) return { error: 'Add at least one image first' }

    try {
        await addGalleryItems(entries)
    } catch (e) {
        return { error: message(e) }
    }

    revalidatePath('/cms/gallery')
    return {}
}

export async function updateCaptionAction(id: string, caption: string): Promise<GalleryActionResult> {
    const parsed = captionSchema.safeParse({ id, caption })
    if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Invalid caption' }

    try {
        await updateCaption(parsed.data.id, parsed.data.caption)
    } catch (e) {
        return { error: message(e) }
    }

    revalidatePath('/cms/gallery')
    return {}
}

export async function deleteGalleryItemAction(id: string): Promise<GalleryActionResult> {
    try {
        await removeGalleryItem(id)
    } catch (e) {
        return { error: message(e) }
    }

    revalidatePath('/cms/gallery')
    return {}
}