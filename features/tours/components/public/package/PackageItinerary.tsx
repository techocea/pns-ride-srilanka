'use client'

import {motion} from 'motion/react'
import Image from 'next/image'
import type {ItineraryDay} from '@/features/tours/types'

export function PackageItinerary({days}: { days: ItineraryDay[] }) {
    return (
        <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Day by Day</p>
            <h2 className="mb-14 font-serif text-4xl sm:text-5xl">Your itinerary</h2>

            <ol className="border-t border-line">
                {days.map((day, index) => (
                    <motion.li
                        key={`${index}-${day.title}`}
                        initial={{opacity: 0, y: 16}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true, margin: '-40px'}}
                        className={`grid gap-4 border-b border-line py-6 sm:gap-6 ${
                            day.itineraryCover ? 'sm:grid-cols-[160px_1fr] md:grid-cols-[200px_1fr]' : ''
                        }`}
                    >
                        {/* Left Column: Day Image */}
                        {day.itineraryCover && (
                            <div
                                className="relative aspect-[4/3] w-36 shrink-0 overflow-hidden border border-white/10 bg-white/5 sm:w-full">
                                <Image
                                    src={day.itineraryCover.url}
                                    alt={day.itineraryCover.alt || day.title}
                                    fill
                                    sizes="(max-width: 640px) 144px, 200px"
                                    className="object-cover object-center transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                        )}

                        {/* Right Column: Day Number + Text Content */}
                        <div className="flex flex-col justify-center">
                            <div className="mb-1 flex items-baseline gap-3">
                                <h3 className="font-serif text-2xl">
                                    Day {index + 1}
                                </h3>
                                <h3 className="font-serif text-2xl">{day.title}</h3>
                            </div>
                            {day.details && (
                                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                                    {day.details}
                                </p>
                            )}
                        </div>
                    </motion.li>
                ))}
            </ol>
        </div>
    )
}