/** "sigiriya-rock_sunrise.jpg" → "sigiriya rock sunrise" (a starting point to edit) */
export function captionFromName(name: string): string {
    const base = name
        .replace(/\.[a-z0-9]+$/i, '')
        .replace(/[-_]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()

    return (base.length >= 2 ? base : 'Gallery image').slice(0, 120)
}