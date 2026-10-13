'use server'

import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {AuthFormState} from "@/features/auth/types";
import {tourSchema} from "@/features/tours/schemas/tour.schema";
import {imageEntriesSchema} from "@/features/media/schemas/media.schema";
import {removeTour, saveTour, toggleVisibilty} from "@/features/tours/services/tour.service";

const readJson = (value: FormDataEntryValue | null): unknown => {
    try {
        return JSON.parse(String(value ?? '[]'))
    } catch {
        return null
    }
}

export async function toggleVisibilityAction(id: string) {
    await toggleVisibilty(id)
    revalidatePath('/cms/tours')
}

export async function deleteTourAction(id: string) {
    await removeTour(id)
    revalidatePath('/cms/tours')
}

export async function saveTourAction(_prev: AuthFormState, formData: FormData) {
    const parsed = tourSchema.safeParse({
        title: String(formData.get('title') ?? ''),
        description: String(formData.get('description') ?? ''),
        tourType: String(formData.get('tourType') ?? ''),
        destination: String(formData.get('destination') ?? ''),
        durationDays: String(formData.get('durationDays') ?? ''),
        price: String(formData.get('price') ?? ''),
        itinerary: readJson(formData.get('itinerary')),
        status: String(formData.get('status') ?? ''),
        featured: formData.get('featured') === 'on',
    })

    const fieldErrors: Record<string, string> = {}
    if (!parsed.success) {
        for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] ??= issue.message
        return {error: 'Please fix the highlighted fields', fieldErrors}
    }

    const images = imageEntriesSchema.safeParse(JSON.parse(String(formData.get('images') || '[]')))
    if (!images.success || images.data.length === 0) {
        return {error: 'Please fix the highlighted fields', fieldErrors: {images: 'Add at least one image'}}
    }

    try {
        await saveTour({
            id: String(formData.get('id') ?? '') || undefined,
            input: parsed.data,
            images: images.data,
        })
        // console.log("tour details:", tour);
    } catch (e) {
        console.error('saveTour failed:', e)
        const data = (e as { data?: unknown })?.data
        if (data) console.error(JSON.stringify(data, null, 2))
        return {error: e instanceof Error ? e.message : 'Something went wrong'}
    }

    revalidatePath('/cms/tours')
    redirect('/cms/tours')
}