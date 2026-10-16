import { z } from 'zod'

export const inquirySchema = z.object({
    name: z.string().trim().min(2, 'Please enter your name').max(80),
    email: z.email('Enter a valid email').max(120),
    phone: z.string().trim().max(30),
    message: z.string().trim().min(10, 'Tell us a little more (10+ characters)').max(1000),
    tourTitle: z.string().trim().max(120),
})

export type InquiryInput = z.output<typeof inquirySchema>
export type InquiryResult = { ok?: boolean; error?: string; fieldErrors?: Record<string, string> }