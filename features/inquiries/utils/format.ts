import type {InquiryRow} from "@/features/inquiries/types";

const received = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Colombo' })
const day = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeZone: 'UTC' })

export const formatReceived = (iso: string) => received.format(new Date(iso))

export function formatTravelDate(value: string) {
    if (!value) return ''
    const date = new Date(`${value}T12:00:00Z`)
    return Number.isNaN(date.getTime()) ? value : day.format(date)
}

export const formatTravelers = (value: string) =>
    value ? `${value} ${value === '1' ? 'person' : 'people'}` : ''

export function replyHref(i: Pick<InquiryRow, 'email' | 'tourTitle'>) {
    const subject = `Re: your enquiry${i.tourTitle ? ` about ${i.tourTitle}` : ''}`
    return `mailto:${i.email}?subject=${encodeURIComponent(subject)}`
}