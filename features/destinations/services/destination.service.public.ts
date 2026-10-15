import 'server-only'
import {cache} from 'react'
import {getPayloadClient} from '@/lib/payload'
import {toImage} from '@/features/media/utils/to-image'
import {DestinationCardData} from "@/features/destinations/types";

export const getPublishedDestinations = cache(async (): Promise<DestinationCardData[]> => {
    const payload = await getPayloadClient()
    const {docs} = await payload.find({
        collection: 'destinations',
        where: {status: {equals: 'published'}},
        depth: 1,
        limit: 50,
        sort: 'createdAt',
        overrideAccess: false,
    })

    return docs.map((d) => ({
        id: d.id,
        slug: d.slug ?? '',
        title: d.title,
        province: d.province,
        description: d.description ?? '',
        highlights: d.highlights?.map((h) => h.text) ?? [],
        image: toImage(d.coverImage, d.title),
    }))
})