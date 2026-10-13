import {z} from 'zod'

export const TOUR_TYPES = [
    {label: 'Cultural', value: 'cultural'},
    {label: 'Nature', value: 'nature'},
    {label: 'Adventure', value: 'adventure'},
    {label: 'Beach', value: 'beach'},
    {label: 'Wildlife', value: 'wildlife'},
    {label: 'Wellness', value: 'wellness'},
] as const

const itineraryRow = z.object({
    title: z.string().trim().min(2, 'Each day needs a title').max(80, 'Day titles: max 80 characters'),
    details: z.string().trim().max(600, 'Day details: max 600 characters'),
})

export const tourSchema = z.object({
    title: z.string().trim().min(2, 'Title is required'),
    description: z.string().min(3, 'Description is required'),
    tourType: z.enum(['cultural', 'nature', 'adventure', 'beach', 'wildlife', 'wellness']),
    destination: z.string().min(1, 'Enter a destination'),
    durationDays: z.coerce.number().int().min(1, 'At least 1 day'),
    price: z.coerce.number().min(0, 'Invalid price'),
    status: z.enum(['draft', 'published']),
    featured: z.boolean(),
    itinerary: z.array(itineraryRow).max(21, 'Max 21 days'),
})

export type TourInput = z.output<typeof tourSchema>