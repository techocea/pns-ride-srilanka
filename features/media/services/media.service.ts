import 'server-only'
import { requireUser } from '@/features/auth/services/auth.service'
import type {ImageEntry} from "@/features/media/schemas/media.schema";

type NewEntry = Extract<ImageEntry, { kind: 'new' }>

/** Turns the form's ordered image list into media ids (order is kept). */
export async function resolveImageIds(entries: ImageEntry[], alt: string): Promise<string[]> {
    const { payload, user } = await requireUser()

    const findByKey = async (key: string) => {
        const { docs } = await payload.find({
            collection: 'media',
            where: { key: { equals: key } },
            limit: 1,
            depth: 0,
            user,
            overrideAccess: false,
        })
        return docs[0] ? String(docs[0].id) : null
    }

    const createOrReuse = async (entry: NewEntry) => {
        const existing = await findByKey(entry.key)
        if (existing) return existing

        try {
            const doc = await payload.create({
                collection: 'media',
                data: { url: entry.url, key: entry.key, name: entry.name, size: entry.size, alt },
                user,
                overrideAccess: false,
            })
            return String(doc.id)
        } catch (e) {
            // the same photo can appear twice in one save, so another call may have just created it
            const raced = await findByKey(entry.key)
            if (raced) return raced
            throw e
        }
    }

    return Promise.all(
        entries.map((entry) => (entry.kind === 'existing' ? entry.id : createOrReuse(entry))),
    )
}