import { z } from 'zod'

const uploadedImage = z.object({
    kind: z.literal('new'),
    url: z.url().refine((u) => {
        const host = new URL(u).hostname
        return host === 'utfs.io' || host.endsWith('.ufs.sh')
    }, 'Invalid image host'),
    key: z.string().min(1),
    name: z.string().min(1),
    size: z.number().nonnegative(),
})

const existingImage = z.object({ kind: z.literal('existing'), id: z.string().min(1) })

export const imageEntriesSchema = z.array(z.discriminatedUnion('kind', [uploadedImage, existingImage]))

export type ImageEntry = z.infer<typeof imageEntriesSchema>[number]

export type NewImageEntry = Extract<ImageEntry, { kind: 'new' }>