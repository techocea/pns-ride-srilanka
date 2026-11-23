import type { Media } from '@/payload-types'

export type PublicImage = { url: string; alt: string }

export function toImage(
    m: PublicImage | Media | string | null | undefined,
    fallbackAlt: string,
): PublicImage | null {
    return m && typeof m === 'object' && m.url
        ? { url: m.url, alt: m.alt || fallbackAlt }
        : null
}