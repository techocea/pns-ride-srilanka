import type { InquiryStatus } from './constants'

export type InquiryRow = {
    id: string
    name: string
    email: string
    phone: string
    message: string
    tourTitle: string
    travelDate: string
    travelers: string
    status: InquiryStatus
    createdAt: string
}

export type CmsActionResult = { error?: string }