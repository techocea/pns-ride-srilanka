import 'server-only'
import {Where} from "payload";
import {getPayloadClient} from '@/lib/payload'
import {toInquiryRow} from "@/features/inquiries/mappers";
import type {InquiryInput} from '@/features/inquiries/schemas/inquiry.schema'
import {InquiryStatus} from "@/features/inquiries/constants";
import {requireUser} from "@/features/auth/services/auth.service";

// IMPLEMENT EMAIL NOTIFICATION LATER

// const oneLine = (s: string) => s.replace(/\s+/g, ' ').trim()

// async function notifyOwner(i: InquiryInput) {
//     const {RESEND_API_KEY, INQUIRY_FROM_EMAIL, INQUIRY_TO_EMAIL} = process.env
//     if (!RESEND_API_KEY || !INQUIRY_FROM_EMAIL || !INQUIRY_TO_EMAIL) return
//
//     // if TypeScript rejects a field name here, check the current Resend docs
//     await new Resend(RESEND_API_KEY).emails.send({
//         from: INQUIRY_FROM_EMAIL,
//         to: INQUIRY_TO_EMAIL,
//         replyTo: i.email,
//         subject: oneLine(`New enquiry from ${i.name}${i.tourTitle ? ` - ${i.tourTitle}` : ''}`),
//         text: [
//             `Name: ${i.name}`,
//             `Email: ${i.email}`,
//             `Phone: ${i.phone || '-'}`,
//             `Package: ${i.tourTitle || '-'}`,
//             `Preferred date: ${i.travelDate || '-'}`,
//             `Travelers: ${i.travelers || '-'}`,
//             '',
//             i.message,
//         ].join('\n'),
//     })
// }

export const INQUIRY_PAGE_SIZE = 20

export async function listInquiries({ status, page = 1 }: { status?: InquiryStatus; page?: number }) {
    const { payload, user } = await requireUser()
    const where: Where | undefined = status ? { status: { equals: status } } : undefined

    const result = await payload.find({
        collection: 'inquiries',
        where,
        sort: '-createdAt',
        limit: INQUIRY_PAGE_SIZE,
        page,
        depth: 0,
        user,
        overrideAccess: false,
    })

    return { docs: result.docs.map(toInquiryRow), totalPages: result.totalPages }
}

export async function getInquiryCounts(): Promise<Record<'all' | InquiryStatus, number>> {
    const { payload, user } = await requireUser()
    const count = (status?: InquiryStatus) =>
        payload.count({
            collection: 'inquiries',
            where: status ? { status: { equals: status } } : undefined,
            user,
            overrideAccess: false,
        })

    const [all, n, contacted, closed] = await Promise.all([count(), count('new'), count('contacted'), count('closed')])
    return { all: all.totalDocs, new: n.totalDocs, contacted: contacted.totalDocs, closed: closed.totalDocs }
}

export async function updateInquiryStatus(id: string, status: InquiryStatus) {
    const { payload, user } = await requireUser()
    await payload.update({ collection: 'inquiries', id, data: { status }, user, overrideAccess: false })
}

export async function removeInquiry(id: string) {
    const { payload, user } = await requireUser()
    await payload.delete({ collection: 'inquiries', id, user, overrideAccess: false })
}

export async function createInquiry(input: InquiryInput) {
    const payload = await getPayloadClient()

    await payload.create({
        collection: 'inquiries',
        data: {
            ...input
        },

    })
    // console.log("Inquiry:", result)
    // await notifyOwner(input).catch((e) => console.error('Inquiry email failed', e))
}