import 'server-only'
import { cache } from 'react'
import type { Where } from 'payload'
import { getPayloadClient } from '@/lib/payload'
import { toTourCard } from '../mappers'

const isPublished: Where = { status: { equals: 'published' } }

export const getPublishedTours = cache(async () => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
        collection: 'tours',
        where: isPublished,
        depth: 1,
        limit: 100,
        sort: '-createdAt',
        overrideAccess: false,
    })
    return docs
        .map(toTourCard)
        .filter((t) => t.slug)
        .sort((a, b) => Number(b.featured) - Number(a.featured))
})

export const getTourBySlug = cache(async (slug: string) => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
        collection: 'tours',
        where: { and: [isPublished, { slug: { equals: slug } }] },
        depth: 1,
        limit: 1,
        overrideAccess: false,
    })
    return docs[0] ?? null
})

export async function getTourSitemapEntries() {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
        collection: 'tours',
        where: isPublished,
        depth: 0,
        limit: 1000,
        overrideAccess: false,
    })
    return docs.flatMap((t) => (t.slug ? [{ slug: t.slug, updatedAt: t.updatedAt }] : []))
}