import {z} from 'zod'
import {INQUIRY_STATUS_VALUES, TRAVELER_OPTIONS} from "@/features/inquiries/constants";

export const inquirySchema = z.object({
    name: z.string().trim().min(2, 'Please enter your name').max(80),
    email: z.email('Enter a valid email').max(120),
    phone: z.string().trim().max(30),
    travelDate: z
        .string()
        .trim()
        .refine((v) => v === '' || (/^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v))), 'Enter a valid date'),
    travelers: z
        .string()
        .refine((v) => v === '' || (TRAVELER_OPTIONS as readonly string[]).includes(v), 'Choose a group size'),
    message: z.string().trim().min(10, 'Tell us a little more (10+ characters)').max(1000),
    tourTitle:
        z.string().trim().max(120),
})


const id = z.string().regex(/^[a-f0-9]{24}$/i, 'Invalid id')

export const inquiryIdSchema = z.object({ id })
export const inquiryStatusSchema = z.object({ id, status: z.enum(INQUIRY_STATUS_VALUES) })

export type InquiryInput = z.output<typeof inquirySchema>
export type InquiryResult = { ok?: boolean; error?: string; fieldErrors?: Record<string, string> }