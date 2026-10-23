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
        <section className="py-20 bg-background text-foreground">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-12">
                    <span className="text-xs uppercase tracking-widest text-gold font-semibold">Got Questions?</span>
                    <h2 className="text-3xl font-bold tracking-tight mt-2">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="border border-border rounded-lg overflow-hidden bg-card">
                            <button
                                type="button"
                                onClick={() => setOpen(open === idx ? null : idx)}
                                className="w-full p-5 text-left flex items-center justify-between font-medium text-sm sm:text-base gap-4"
                            >
                                <span>{faq.q}</span>
                                <ChevronDown className={`size-5 text-gold shrink-0 transition-transform ${open === idx ? 'rotate-180' : ''}`} />
                            </button>
                            {open === idx && (
                                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-4">
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