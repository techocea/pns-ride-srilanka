import { z } from 'zod'

export const captionSchema = z.object({
    id: z.string().regex(/^[a-f0-9]{24}$/i, 'Invalid id'),
    caption: z.string().trim().min(2, 'Write a short caption').max(120, 'Max 120 characters'),
})