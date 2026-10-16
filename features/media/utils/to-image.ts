export type PublicImage = { url: string; alt: string }

export function toImage(m: PublicImage | string | null, fallbackAlt: string): PublicImage | null {
    return m && typeof m === 'object' && m.url ? { url: m.url, alt: m.alt || fallbackAlt } : null
}