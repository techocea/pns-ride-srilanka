import { z } from 'zod'

export const TOUR_TYPES = [
    { label: 'Cultural', value: 'cultural' },
    { label: 'Nature', value: 'nature' },
    { label: 'Adventure', value: 'adventure' },
    { label: 'Beach', value: 'beach' },
    { label: 'Wildlife', value: 'wildlife' },
    { label: 'Wellness', value: 'wellness' },
] as const

export const tourSchema = z.object({
    title: z.string().trim().min(2, 'Title is required'),
    description: z.string().min(3, 'Description is required'),
    tourType: z.enum(['cultural', 'nature', 'adventure', 'beach', 'wildlife', 'wellness']),
    destinations: z.string().min(1, 'Enter a destination'),
    durationDays: z.coerce.number().int().min(1, 'At least 1 day'),
    price: z.coerce.number().min(0, 'Invalid price'),
    summary: z.string().trim().min(10, 'Write at least 10 characters'),
    status: z.enum(['draft', 'published']),
    featured: z.boolean()
})

export type TourInput = z.output<typeof tourSchema>