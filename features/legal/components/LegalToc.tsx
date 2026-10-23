'use client'

import { cn } from '@/lib/utils'
import { useActiveSection } from '../hooks/useActiveSection'

type Props = { items: { id: string; title: string }[] }

export function LegalToc({ items }: Props) {
    const active = useActiveSection(items.map((i) => i.id))

    return (
        <nav aria-label="On this page">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-gold">On this page</p>
            <ol className="grid border-l border-line">
                {items.map((item, i) => (
                    <li key={item.id}>
                        <a
                            href={`#${item.id}`}
                            aria-current={active === item.id ? 'location' : undefined}
                            className={cn(
                                '-ml-px block border-l py-2 pl-4 text-sm transition-colors',
                                active === item.id ? 'border-gold text-white' : 'border-transparent text-muted hover:text-white',
                            )}
                        >
                            <span className="mr-2 font-mono text-[10px] text-gold">{String(i + 1).padStart(2, '0')}</span>
                            {item.title}
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    )
}