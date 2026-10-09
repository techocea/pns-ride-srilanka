export function parseHighlights(raw: string): string[] {
    const seen = new Set<string>()
    const result: string[] = []

    for (const part of raw.split(',')) {
        const text = part.trim()
        const key = text.toLowerCase()
        if (text && !seen.has(key)) {
            seen.add(key)
            result.push(text)
        }
    }
    return result
}

export const HIGHLIGHT_LIMITS = { maxItems: 8, maxLength: 40 } as const