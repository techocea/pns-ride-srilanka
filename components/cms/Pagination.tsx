import Link from 'next/link'

type Props = { page: number; totalPages: number; hrefFor: (page: number) => string }

const base = 'border border-line px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] transition'

export function Pagination({ page, totalPages, hrefFor }: Props) {
    if (totalPages <= 1) return null

    return (
        <nav aria-label="Pagination" className="mt-6 flex items-center justify-between">
            {page > 1 ? (
                <Link href={hrefFor(page - 1)} className={`${base} text-muted hover:border-gold hover:text-gold`}>Previous</Link>
            ) : (
                <span className={`${base} opacity-30`}>Previous</span>
            )}

            <span className="text-xs text-muted">Page {page} of {totalPages}</span>

            {page < totalPages ? (
                <Link href={hrefFor(page + 1)} className={`${base} text-muted hover:border-gold hover:text-gold`}>Next</Link>
            ) : (
                <span className={`${base} opacity-30`}>Next</span>
            )}
        </nav>
    )
}