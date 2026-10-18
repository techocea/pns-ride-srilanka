'use client'

import Link from "next/link";
import dynamic from 'next/dynamic'
import {Button} from "@/components/ui/button";
import {Calendar, ChevronDown, Mail, MessageCircle, Users} from 'lucide-react'
import {useInquiryPanel} from "@/features/inquiries/hooks/useInquiryPanel";
import {Traveler, TRAVELER_OPTIONS, travelerLabel} from "@/features/inquiries/constants";

const InquiryDialog = dynamic(() => import('./InquiryDialog').then((m) => m.InquiryDialog))

type Props = { tourTitle: string; price: number; currency: string; whatsappNumber?: string }

const labelClass = 'mb-2 block font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground'
const controlClass =
    'w-full border border-line bg-secondary text-sm text-white outline-none transition-colors focus:border-gold'

export function InquiryPanel({tourTitle, price, currency, whatsappNumber}: Props) {
    const b = useInquiryPanel({tourTitle, whatsappNumber})
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
    }).format(price)

    return (
        <div className="border border-line bg-accent p-4 md:p-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">Plan this journey</p>

            <div className="mt-4 border-b border-line pb-6">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">From</span>
                <p className="font-serif text-4xl text-white">
                    <span className="mr-2 text-base text-gold">{currency}</span>
                    {formattedPrice}
                </p>
                <span className="text-xs text-muted-foreground">per person</span>
            </div>

            <div className="mt-6 space-y-5">
                <label className="block">
                    <span className={labelClass}>Preferred travel date</span>
                    <span className="relative block">
                    <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold"/>
                    <input
                        type="date"
                        value={b.travelDate}
                        min={b.minDate}
                        onChange={(e) => b.setTravelDate(e.target.value)}
                        className={`${controlClass} py-3  pl-10 pr-10`}
                    />
                    </span>
                </label>

                <label className="block">
                    <span className={labelClass}>Travelers</span>
                    <span className="relative block">
            <Users size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold"/>
            <select
                value={b.travelers}
                onChange={(e) => b.setTravelers(e.target.value as Traveler)}
                className={`${controlClass} appearance-none py-3 pl-11 pr-10`}
            >
              {TRAVELER_OPTIONS.map((o) => (
                  <option key={o} value={o}>{travelerLabel(o)}</option>
              ))}
            </select>
            <ChevronDown size={12} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gold"/>
          </span>
                </label>
            </div>

            <Button
                size={"lg"}
                type="button"
                onClick={b.openDialog}
                className="mt-6 flex w-full items-center justify-between  font-medium uppercase"
            >
                Request a proposal
                <Mail size={14}/>
            </Button>

            {b.whatsappUrl && (
                <Button variant={"outline"} size={"lg"} className="mt-3 w-full">
                    <Link
                        href={b.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-between uppercase tracking-[0.18em]"
                    >
                        Chat on WhatsApp
                        <MessageCircle size={14}/>
                    </Link>
                </Button>
            )}

            {b.everOpened && (
                <InquiryDialog
                    open={b.open}
                    onOpenChange={b.setOpen}
                    tourTitle={tourTitle}
                    defaults={{travelDate: b.travelDate, travelers: b.travelers}}
                />
            )}
        </div>
    )
}