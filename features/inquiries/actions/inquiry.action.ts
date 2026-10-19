'use server'

import {inquiryIdSchema, inquirySchema, inquiryStatusSchema} from '@/features/inquiries/schemas/inquiry.schema'
import {createInquiry, removeInquiry, updateInquiryStatus} from '@/features/inquiries/services/inquiry.service'
import {AuthFormState} from "@/features/auth/types";
import {requireUser} from "@/features/auth/services/auth.service";
import {revalidatePath} from "next/cache";
import {CmsActionResult} from "@/features/inquiries/types";

export async function submitInquiryAction(_prev: AuthFormState, formData: FormData) {
    // real people never see this field. Bots fill it, so pretend it worked
    if (String(formData.get('trap_field') ?? '')) {
        console.warn('[inquiry] honeypot filled, ignored')
        return { ok: true }
    }

    const parsed = inquirySchema.safeParse({
        name: String(formData.get('name') ?? ''),
        email: String(formData.get('email') ?? ''),
        phone: String(formData.get('phone') ?? ''),
        travelers: String(formData.get('travelers') ?? ''),
        travelDate: String(formData.get('travelDate') ?? ''),
        message: String(formData.get('message') ?? ''),
        tourTitle: String(formData.get('tourTitle') ?? ''),
    })

    if (!parsed.success) {
        console.warn('[inquiry] validation failed', parsed.error.flatten().fieldErrors)
        const fieldErrors: Record<string, string> = {}
        for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] ??= issue.message
        return { error: 'Please fix the highlighted fields', fieldErrors }
    }

    try {
        await createInquiry(parsed.data)
    } catch (e) {
        console.error('[inquiry] save failed:', e)
        console.error('[inquiry] details:', JSON.stringify((e as { data?: unknown }).data, null, 2))
        return { error: 'We could not send your enquiry. Please try again.' }
    }

    return { ok: true }
}

export async function updateInquiryStatusAction(id: string, status: string): Promise<CmsActionResult> {
    // outside the try block on purpose: requireUser() redirects by throwing, and a catch would swallow it
    await requireUser()

    const parsed = inquiryStatusSchema.safeParse({ id, status })
    if (!parsed.success) return { error: 'Invalid request' }

    try {
        await updateInquiryStatus(parsed.data.id, parsed.data.status)
    } catch (e) {
        console.error('[inquiry-cms] status update failed', e)
        return { error: 'Could not update the status' }
    }

    revalidatePath('/cms/inquiries')
    return {}
}

export async function deleteInquiryAction(id: string): Promise<CmsActionResult> {
    await requireUser()

    const parsed = inquiryIdSchema.safeParse({ id })
    if (!parsed.success) return { error: 'Invalid request' }

    try {
        await removeInquiry(parsed.data.id)
    } catch (e) {
        console.error('[inquiry-cms] delete failed', e)
        return { error: 'Could not delete the enquiry' }
    }

    revalidatePath('/cms/inquiries')
    return {}
}