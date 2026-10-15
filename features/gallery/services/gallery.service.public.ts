import 'server-only'
import {cache} from 'react'
import {getPayloadClient} from '@/lib/payload'
import {toImage, type PublicImage} from '@/features/media/utils/to-image'

export type GalleryItemData = {
    id: string;
    caption: string;
    image: PublicImage;
}

export const getPublicGallery = cache(async (): Promise<GalleryItemData[]> => {
    const payload = await getPayloadClient()
    const {docs} = await payload.find({
        collection: 'gallery',
        depth: 1,
        limit: 60,
        sort: '-createdAt',
        overrideAccess: false,
    })

    return docs.flatMap((g) => {
        const image = toImage(g.image, g.caption)
        return image ? [{id: g.id, caption: g.caption, image}] : []
    })
})