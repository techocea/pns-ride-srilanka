'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
    {
        q: 'Are fuel costs and highway tolls included in the tour price?',
        a: 'Yes! All PNS Ride Sri Lanka quotes include private driver fees, vehicle fuel, express highway tolls, parking charges, and driver accommodations.',
    },
    {
        q: 'How does airport pickup work at Colombo Katunayake (CMB) Airport?',
        a: 'Your driver will await you inside the arrivals hall holding a personalized name sign, assist with your luggage, and escort you directly to your private vehicle.',
    },
    {
        q: 'Can we change or customize our daily itinerary while traveling?',
        a: 'Absolutely. Because you have a dedicated private driver and vehicle, your daily schedule is completely flexible. You can adjust departure times or stop for photos anytime.',
    },
    {
        q: 'What vehicles do you use for tours?',
        a: 'We operate modern, fully insured, air-conditioned vehicles ranging from luxury sedans (for couples) to high-roof passenger vans (for families and groups).',
    },
]

export function FaqSection() {
    const [open, setOpen] = useState<number | null>(0)

    return (
        <section className="px-6 py-20">
            <div className="mx-auto max-w-6xl w-full space-y-10">
                <div className="md:max-w-lg w-full mx-auto space-y-6 text-center">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-gold">got questions?</p>
                    <h2 id="packages-title" className="mt-3 font-serif capitalize text-4xl md:text-5xl">frequently asked questions</h2>
                </div>

                <div className="space-y-4 max-w-3xl w-full mx-auto">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="border border-border overflow-hidden bg-accent">
                            <button
                                type="button"
                                onClick={() => setOpen(open === idx ? null : idx)}
                                className="w-full p-5 text-left flex items-center justify-between font-medium text-sm sm:text-base gap-4"
                            >
                                <span>{faq.q}</span>
                                <ChevronDown
                                    className={`size-5 text-gold shrink-0 transition-transform ${open === idx ? 'rotate-180' : ''}`}/>
                            </button>
                            {open === idx && (
                                <div
                                    className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-4">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}