"use client"

import {INQUIRY_STATUSES, InquiryStatus, isInquiryStatus} from "@/features/inquiries/constants";
import {useInquiryStatus} from "@/features/inquiries/hooks/useInquiryStatus";
import {cn} from "@/lib/utils";

const styles: Record<InquiryStatus, string> = {
    new: 'bg-gold-soft text-gold',
    contacted: 'bg-white/5 text-white/70',
    closed: 'bg-white/5 text-muted',
}

export function InquiryStatusSelect({ id, status }: { id: string; status: InquiryStatus }) {
    const { value, change, error } = useInquiryStatus(id, status)

    return (
        <div>
            <select
                aria-label="Enquiry status"
                value={value}
                onChange={(e) => isInquiryStatus(e.target.value) && change(e.target.value)}
                className={cn(
                    'cursor-pointer text-center appearance-none px-3 py-1 text-[10px] font-medium border border-primary uppercase tracking-[0.15em] outline-none [color-scheme:dark] focus-visible:ring-1 focus-visible:ring-gold',
                    styles[value],
                )}
            >
                {INQUIRY_STATUSES.map((s) => (
                    <option key={s.value} value={s.value} className="text-black">{s.label}</option>
                ))}
            </select>
            {error && <p role="alert" className="mt-1 text-[10px] text-red-400">{error}</p>}
        </div>
    )
}