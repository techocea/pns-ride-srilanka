'use server'

import { inquirySchema, type InquiryResult } from '@/features/inquiries/schemas/inquiry.schema'
import { createInquiry } from '@/features/inquiries/services/inquiry.service'

export async function submitInquiryAction(formData: FormData): Promise<InquiryResult> {
    // real people never see this field. Bots fill it, so pretend it worked
    if (String(formData.get('website') ?? '')) return { ok: true }

    const parsed = inquirySchema.safeParse({
        name: String(formData.get('name') ?? ''),
        email: String(formData.get('email') ?? ''),
        phone: String(formData.get('phone') ?? ''),
        message: String(formData.get('message') ?? ''),
        tourTitle: String(formData.get('tourTitle') ?? ''),
    })

    if (!parsed.success) {
        const fieldErrors: Record<string, string> = {}
        for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] ??= issue.message
        return { error: 'Please fix the highlighted fields', fieldErrors }
    }

    try {
        await createInquiry(parsed.data)
    } catch (e) {
        console.error(e)
        return { error: 'We could not send your enquiry. Please try again.' }
    }

    return { ok: true }
}