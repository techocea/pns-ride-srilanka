import type {Inquiry} from '@/payload-types'
import type {InquiryRow} from "@/features/inquiries/types";
import {isInquiryStatus} from "@/features/inquiries/constants";


export function toInquiryRow(d: Inquiry): InquiryRow {
    return {
        id: d.id,
        name: d.name,
        email: d.email,
        phone: d.phone ?? '',
        message: d.message,
        tourTitle: d.tourTitle ?? '',
        travelDate: d.travelDate ?? '',
        travelers: d.travelers ?? '',
        status: isInquiryStatus(d.status) ? d.status : 'new',
        createdAt: d.createdAt,
    }
}