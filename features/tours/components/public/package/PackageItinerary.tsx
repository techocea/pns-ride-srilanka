'use client'

import { motion } from 'motion/react'
import type { ItineraryDay } from '@/features/tours/types'

export function PackageItinerary({ days }: { days: ItineraryDay[] }) {
    return (
        <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Day by Day</p>
            <h2 className="mb-14 font-serif text-4xl sm:text-5xl">Your itinerary</h2>

            <ol className="border-t border-line">
                {days.map((day, index) => (
                    <motion.li
                        key={`${index}-${day.title}`}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        className="grid gap-4 border-b border-line py-8 sm:grid-cols-[110px_1fr]"
                    >
                        <div>
                            <span className="font-serif text-3xl text-white/20">{String(index + 1).padStart(2, '0')}</span>
                            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-gold">Day {index + 1}</p>
                        </div>
                        <div>
                            <h3 className="font-serif text-2xl">{day.title}</h3>
                            {day.details && <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{day.details}</p>}
                        </div>
                    </motion.li>
                ))}
            </ol>
        </div>
    )
}