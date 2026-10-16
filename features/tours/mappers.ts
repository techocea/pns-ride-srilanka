import type { Tour } from '@/payload-types'
import { toImage } from '@/features/media/utils/to-image'
import type { TourCardData , TourDetailData} from './types'
import {TOUR_TYPES} from "@/features/tours/schemas/tour.schema";

export function toTourCard(t: Tour): TourCardData {
    const dest = typeof t.destination === 'object' ? t.destination : null

    return {
        id: t.id,
        slug: t.slug ?? '',
        title: t.title,
        description: t.description,
        destinationTitle: dest?.title ?? '',
        destinationSlug: dest?.slug ?? '',
        price: t.price,
        durationDays: t.durationDays,
        tourType: t.tourType,
        featured: !!t.featured,
        image: toImage(t.coverImage, t.title),
    }
}

export function toTourDetail(t: Tour): TourDetailData {
    const dest = typeof t.destination === 'object' ? t.destination : null

    return {
        slug: t.slug ?? '',
        title: t.title,
        // tagline: t.tagline ?? null,
        typeLabel: TOUR_TYPES.find((x) => x.value === t.tourType)?.label ?? '',
        durationDays: t.durationDays,
        price: t.price,
        maxGroupSize: t.maxGroupSize ?? null,
        destination: dest ? { title: dest.title, province: dest.province } : null,
        paragraphs: (t.description ?? '').split('\n').map((p) => p.trim()).filter(Boolean),
        coverImage: toImage(t.coverImage, t.title),
        photos: (t.images ?? []).flatMap((row) => {
            const img = toImage(row.image, t.title)
            return img ? [img] : []
        }),
        itinerary: t.itinerary?.map((d) => ({ title: d.title, details: d.details ?? null })) ?? [],
    }
}