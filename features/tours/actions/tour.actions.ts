'use server'

import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {AuthFormState} from "@/features/auth/types";
import {tourSchema} from "@/features/tours/schemas/tour.schema";
import {removeTour, saveTour, toggleVisibilty} from "@/features/tours/services/tour.service";

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
        tourType: String(formData.get('tourType') ?? ''),
        destination: String(formData.get('destination') ?? ''),
        durationDays: String(formData.get('durationDays') ?? ''),
        price: String(formData.get('price') ?? ''),
        summary: String(formData.get('summary') ?? ''),
        status: String(formData.get('status') ?? ''),
        featured: formData.get('featured') === 'on',
    })

    if (!parsed.success) {
        const fieldErrors: Record<string, string> = {}
        for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] ??= issue.message
        return {error: 'Please fix the highlighted fields', fieldErrors}
    }

    const file = formData.get('coverImage')

    try {
        await saveTour({
            id: String(formData.get('id') ?? '') || undefined,
            input: parsed.data,
            coverFile: file instanceof File ? file : null,
            existingCover: String(formData.get('existingCover') ?? '') || undefined,
        })
    } catch (e) {
        return {error: e instanceof Error ? e.message : 'Something went wrong'}
    }

    revalidatePath('/cms/tours')
    redirect('/cms/tours')
}