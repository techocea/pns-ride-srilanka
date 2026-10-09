export function DestinationHighlights({ items }: { items: string[] }) {
    if (items.length === 0) return null

    return (
        <ul className="flex flex-wrap gap-2">
            {items.map((text) => (
                <li
                    key={text}
                    className="border border-gold/40 bg-gold-soft px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-gold"
                >
                    {text}
                </li>
            ))}
        </ul>
    )
}