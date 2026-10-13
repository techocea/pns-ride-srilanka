"use server"

import {revalidatePath} from "next/cache";
import {
    removeDestination,
    saveDestination,
    toggleVisibilty
} from "@/features/destinations/services/destination.service";
import {AuthFormState} from "@/features/auth/types";
import {imageEntriesSchema} from "@/features/media/schemas/media.schema";
import {redirect} from "next/navigation";
import {destinationSchema} from "@/features/destinations/schemas/destination.schema";

export async function toggleVisibilityAction(id: string) {
    await toggleVisibilty(id)
    revalidatePath('/cms/destinations')
}

export async function deleteDestinationAction(id: string) {
    await removeDestination(id)
    revalidatePath('/cms/destinations')
}

export async function saveDestinationAction(_prev: AuthFormState, formData: FormData) {
    const parsed = destinationSchema.safeParse({
        title: String(formData.get('title') ?? ''),
        province: String(formData.get('province') ?? ''),
        description: String(formData.get('description') ?? ''),
        highlights: String(formData.get('highlights') ?? ''),
        status: String(formData.get('status') ?? ''),
    })

    if (!parsed.success) {
        const fieldErrors: Record<string, string> = {}
        for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] ??= issue.message
        return {error: 'Please fix the highlighted fields', fieldErrors}
    }

    const images = imageEntriesSchema.safeParse(JSON.parse(String(formData.get('images') || '[]')))
    if (!images.success || images.data.length === 0) {
        return {error: 'Please fix the highlighted fields', fieldErrors: {images: 'Add at least one image'}}
    }

    try {
        await saveDestination({
            input: parsed.data,
            images: images.data,
        })
    } catch (e) {
        console.error('Save Destination failed:', e)
        const data = (e as { data?: unknown })?.data
        if (data) console.error(JSON.stringify(data, null, 2))
        return {error: e instanceof Error ? e.message : 'Something went wrong'}
    }

    revalidatePath('/cms/destinations')
    redirect('/cms/destinations')
}