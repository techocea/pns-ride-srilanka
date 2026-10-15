import type { Tour } from '@/payload-types'
import { toImage } from '@/features/media/utils/to-image'
import type { TourCardData } from './types'

export function toTourCard(t: Tour): TourCardData {
    return {
        id: t.id,
        slug: t.slug ?? '',
        title: t.title,
        description: t.description,
        // tagline: t.tagline ?? null, //TODO
        price: t.price,
        durationDays: t.durationDays,
        tourType: t.tourType,
        featured: !!t.featured,
        image: toImage(t.coverImage, t.title),
    }
}