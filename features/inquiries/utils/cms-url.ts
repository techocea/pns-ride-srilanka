export function inquiriesHref({ status, page }: { status?: string; page?: number }) {
    const q = new URLSearchParams()
    if (status) q.set('status', status)
    if (page && page > 1) q.set('page', String(page))
    const s = q.toString()
    return `/cms/inquiries${s ? `?${s}` : ''}`
}