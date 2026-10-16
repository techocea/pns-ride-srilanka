import { absoluteUrl, site } from '@/lib/site'
import type { TourDetailData } from './types'
import {PRICE_CURRENCY} from "@/lib/constants";

export function tourJsonLd(tour: TourDetailData) {
    const url = absoluteUrl(`/packages/${tour.slug}`)

    return {
        '@context': 'https://schema.org',
        '@type': 'TouristTrip',
        name: tour.title,
        description: tour.paragraphs[0],
        url,
        image: tour.coverImage ? [tour.coverImage.url] : undefined,
        provider: { '@type': 'TravelAgency', name: site.name, url: site.url },
        itinerary: tour.itinerary.length
            ? {
                '@type': 'ItemList',
                itemListElement: tour.itinerary.map((d, i) => ({
                    '@type': 'ListItem',
                    position: i + 1,
                    name: d.title,
                    description: d.details ?? undefined,
                })),
            }
            : undefined,
        offers: { '@type': 'Offer', price: tour.price, priceCurrency: PRICE_CURRENCY, url },
    }
}