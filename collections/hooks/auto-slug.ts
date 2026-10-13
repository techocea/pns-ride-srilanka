import type { CollectionSlug, FieldHook } from 'payload'

export const slugify = (v: string) =>
    v
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

/** Builds the slug from `sourceField` on every save, and keeps it unique within the collection. */
export function autoSlug(sourceField: string): FieldHook {
    return async ({ data, originalDoc, req, collection }) => {
        const source = data?.[sourceField] ?? originalDoc?.[sourceField]

        // title unchanged: keep the current slug (no database check, URL stays stable)
        if (originalDoc?.slug && originalDoc[sourceField] === source) return originalDoc.slug

        const base = typeof source === 'string' ? slugify(source) : ''
        if (!base || !collection) return originalDoc?.slug

        for (let n = 1; n < 100; n++) {
            const candidate = n === 1 ? base : `${base}-${n}`

            const clash = await req.payload.find({
                collection: collection.slug as CollectionSlug,
                where: {
                    slug: { equals: candidate },
                    ...(originalDoc?.id ? { id: { not_equals: originalDoc.id } } : {}),
                },
                limit: 1,
                depth: 0,
                req,
            })

            if (clash.totalDocs === 0) return candidate
        }

        return `${base}-${Date.now()}`
    }
}