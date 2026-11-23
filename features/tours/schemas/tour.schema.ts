import {z} from 'zod'
import {imageEntrySchema} from "@/features/media/schemas/media.schema";

export const TOUR_TYPES = [
    {label: 'Private Guided Journey', value: 'guided'},
    {label: 'Private Romantic Journey', value: 'romantic'},
    {label: 'Private Wildlife Adventure', value: 'wildlife'},
    {label: 'Private Coastal Journey', value: 'beach'},
    {label: 'Private Family Journey', value: 'family'},
    {label: 'Private Luxury Journey', value: 'luxury'},
] as const

const itineraryRow = z.object({
    title: z.string().trim().min(2, 'Each day needs a title').max(80, 'Day titles: max 80 characters'),
    details: z.string().trim().max(600, 'Day details: max 600 characters'),
    cover: imageEntrySchema.nullable().refine((v) => v !== null, 'Add a photo for each day'),
})

export const tourSchema = z.object({
    title: z.string().trim().min(2, 'Title is required'),
    description: z.string().min(3, 'Description is required'),
    tourType: z.enum(['guided', 'romantic', 'wildlife', 'beach', 'family', 'luxury']),
    destination: z.string().min(1, 'Enter a destination'),
    durationDays: z.coerce.number().int().min(1, 'At least 1 day'),
    price: z.coerce.number().min(0, 'Invalid price').nullable(),
    status: z.enum(['draft', 'published']),
    featured: z.boolean(),
    itinerary: z.array(itineraryRow).max(21, 'Max 21 days'),
})

export type TourInput = z.output<typeof tourSchema>