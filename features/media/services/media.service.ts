import 'server-only'
import { requireUser } from '@/features/auth/services/auth.service'
import type {ImageEntry} from "@/features/media/schemas/media.schema";


/** Turns the form's ordered image list into media ids (order is kept). */
export async function resolveImageIds(entries: ImageEntry[], alt: string): Promise<string[]> {
    const { payload, user } = await requireUser()

    return Promise.all(
        entries.map(async (entry) => {
            if (entry.kind === 'existing') return entry.id

            const doc = await payload.create({
                collection: 'media',
                data: { url: entry.url, key: entry.key, name: entry.name, size: entry.size, alt },
                user,
                overrideAccess: false,
            })
            return String(doc.id)
        }),
    )
}