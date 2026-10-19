"use client"

import {Dialog, DialogContent, DialogDescription, DialogTitle} from "@/components/ui/dialog";
import {InquiryRow} from "@/features/inquiries/types";
import {formatReceived, formatTravelDate, formatTravelers, replyHref} from "@/features/inquiries/utils/format";
import {InquiryStatusSelect} from "@/features/inquiries/components/InquiryStatusSelect";

type Props = { inquiry: InquiryRow; open: boolean; onOpenChange: (open: boolean) => void }

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="grid gap-1">
            <dt className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</dt>
            <dd className="text-sm text-white/90">{children}</dd>
        </div>
    )
}

export function InquiryDetailDialog({ inquiry: i, open, onOpenChange }: Props) {
    const none = <span className="text-muted-foreground">-</span>

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90svh] overflow-y-auto rounded-none border-line bg-accent sm:max-w-2xl">
                <DialogTitle className="font-serif text-3xl text-white font-normal">{i.name}</DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">Received {formatReceived(i.createdAt)}</DialogDescription>

                <dl className="mt-2 grid gap-5 sm:grid-cols-2">
                    <Detail label="Email">
                        <a href={`mailto:${i.email}`} className="break-all text-gold hover:underline">{i.email}</a>
                    </Detail>
                    <Detail label="Phone / WhatsApp">
                        {i.phone ? <a href={`tel:${i.phone}`} className="text-gold hover:underline">{i.phone}</a> : none}
                    </Detail>
                    <Detail label="Package">{i.tourTitle || 'General enquiry'}</Detail>
                    <Detail label="Travellers">{formatTravelers(i.travelers) || none}</Detail>
                    <Detail label="Preferred travel date">{formatTravelDate(i.travelDate) || none}</Detail>
                    <Detail label="Status">
                        <InquiryStatusSelect id={i.id} status={i.status} />
                    </Detail>
                </dl>

                <div className="mt-2 grid gap-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Message</p>
                    <p className="whitespace-pre-wrap border border-line bg-surface p-4 text-sm leading-relaxed text-white/90">
                        {i.message}
                    </p>
                </div>

                <a
                    href={replyHref(i)}
                    className="mt-2 flex h-12 items-center justify-center bg-gold text-[11px] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-gold/90"
                >
                    Reply by email
                </a>
            </DialogContent>
        </Dialog>
    )
}