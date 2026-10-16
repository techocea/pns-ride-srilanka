import 'server-only'
import { Resend } from 'resend'
import { getPayloadClient } from '@/lib/payload'
import type { InquiryInput } from '../schemas/inquiry.schema'

const oneLine = (s: string) => s.replace(/\s+/g, ' ').trim()

async function notifyOwner(i: InquiryInput) {
    const { RESEND_API_KEY, INQUIRY_FROM_EMAIL, INQUIRY_TO_EMAIL } = process.env
    if (!RESEND_API_KEY || !INQUIRY_FROM_EMAIL || !INQUIRY_TO_EMAIL) return

    // if TypeScript rejects a field name here, check the current Resend docs
    await new Resend(RESEND_API_KEY).emails.send({
        from: INQUIRY_FROM_EMAIL,
        to: INQUIRY_TO_EMAIL,
        replyTo: i.email,
        subject: oneLine(`New enquiry from ${i.name}${i.tourTitle ? ` - ${i.tourTitle}` : ''}`),
        text: [`Name: ${i.name}`, `Email: ${i.email}`, `Phone: ${i.phone || '-'}`, `Package: ${i.tourTitle || '-'}`, '', i.message].join('\n'),
    })
}

export async function createInquiry(input: InquiryInput) {
    const payload = await getPayloadClient()

    // stored first, so the lead is never lost if the email fails
    await payload.create({
        collection: 'inquiries',
        data: { ...input, phone: input.phone || undefined, tourTitle: input.tourTitle || undefined },
    })

    await notifyOwner(input).catch((e) => console.error('Inquiry email failed', e))
}