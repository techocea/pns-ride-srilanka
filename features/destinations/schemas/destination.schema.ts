import {z} from 'zod'
import {HIGHLIGHT_LIMITS, parseHighlights} from "@/features/destinations/utils/highlights";

export const destinationSchema = z.object({
    title: z.string().trim().min(2, 'Title is required'),
    province: z.string().trim().min(2, 'Province is required'),
    description: z.string().min(3, 'Description is required'),
    highlights: z
        .string()
        .transform(parseHighlights)
        .refine((a) => a.length <= HIGHLIGHT_LIMITS.maxItems, `Max ${HIGHLIGHT_LIMITS.maxItems} highlights`)
        .refine(
            (a) => a.every((t) => t.length <= HIGHLIGHT_LIMITS.maxLength),
            `Each highlight can be at most ${HIGHLIGHT_LIMITS.maxLength} characters`,
        )
        .transform((a) => a.map((text) => ({text}))),
    status: z.enum(['draft', 'published']),
})

export type DestinationInput = z.output<typeof destinationSchema>