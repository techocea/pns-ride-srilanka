import Link from 'next/link'
import { cn } from '@/lib/utils'
import {INQUIRY_STATUSES, InquiryStatus} from "@/features/inquiries/constants";
import {inquiriesHref} from "@/features/inquiries/utils/cms-url";

type Props = { active?: InquiryStatus; counts: Record<'all' | InquiryStatus, number> }

export function InquiryFilters({ active, counts }: Props) {
    const tabs: { value?: InquiryStatus; label: string; count: number }[] = [
        { label: 'All', count: counts.all },
        ...INQUIRY_STATUSES.map((s) => ({ value: s.value, label: s.label, count: counts[s.value] })),
    ]

    return (
        <nav aria-label="Filter enquiries" className="mb-6 flex flex-wrap">
            {tabs.map((t) => {
                const isActive = t.value === active
                return (
                    <Link
                        key={t.label}
                        href={inquiriesHref({ status: t.value })}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                            'flex items-center gap-2 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] transition',
                            isActive ? 'bg-gold text-black' : 'border border-line text-muted hover:text-white',
                        )}
                    >
                        {t.label}
                        <span className={isActive ? 'text-black/60' : 'text-muted'}>{t.count}</span>
                    </Link>
                )
            })}
        </nav>
    )
}