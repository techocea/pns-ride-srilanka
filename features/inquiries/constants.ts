export const TRAVELER_OPTIONS = ['1', '2', '3-4', '5-8', '9+'] as const
export type Traveler = (typeof TRAVELER_OPTIONS)[number]

export const travelerLabel = (v: Traveler) => `${v} ${v === '1' ? 'traveler' : 'travelers'}`

export const INQUIRY_STATUS_VALUES = ['new', 'contacted', 'closed'] as const
export type InquiryStatus = (typeof INQUIRY_STATUS_VALUES)[number]

export const INQUIRY_STATUSES: { value: InquiryStatus; label: string }[] = [
    {value: 'new', label: 'New'},
    {value: 'contacted', label: 'Contacted'},
    {value: 'closed', label: 'Closed'},
]

export const isInquiryStatus = (v: unknown): v is InquiryStatus =>
    (INQUIRY_STATUS_VALUES as readonly unknown[]).includes(v)