import type { MetadataRoute } from 'next'
import { getTourSitemapEntries } from '@/features/tours/services/tour.service.public'
import { site } from '@/lib/site'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    if (!site.indexable) return []

    const tours = await getTourSitemapEntries()

    return [
        { url: site.url },
        { url: `${site.url}/about` },
        { url: `${site.url}/destinations` },
        { url: `${site.url}/privacy` },
        { url: `${site.url}/terms` },
        ...tours.map((t) => ({ url: `${site.url}/packages/${t.slug}`, lastModified: new Date(t.updatedAt) })),
    ]
}