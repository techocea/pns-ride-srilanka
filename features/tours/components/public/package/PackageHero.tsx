'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import type { TourDetailData } from '@/features/tours/types'
import { Clock, MapPin, Users, type LucideIcon } from 'lucide-react'

export function PackageHero({ tour }: { tour: TourDetailData }) {
    const meta: { icon: LucideIcon; label: string }[] = [
        { icon: Clock, label: `${tour.durationDays} ${tour.durationDays === 1 ? 'day' : 'days'}` },
    ]
    if (tour.destination) meta.push({ icon: MapPin, label: tour.destination.title })
    if (tour.maxGroupSize) meta.push({ icon: Users, label: `Up to ${tour.maxGroupSize} guests` })

    return (
        <section className="relative flex min-h-[560px] items-end overflow-hidden">
            <motion.div
                initial={{ scale: 1.04 }}
                animate={{ scale: 1 }}
                className="absolute inset-0"
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
                {tour.coverImage && (
                    <Image src={tour.coverImage.url} alt={tour.coverImage.alt} fill sizes="100vw" className="object-cover" />
                )}
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-accent via-accent/55 to-ink/25" />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/85 to-transparent" />

            <div className="relative z-10 mx-auto w-full max-w-6xl w-full px-6 pb-16 text-left lg:px-12 lg:pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.25 }}
                    className="max-w-3xl"
                >
                    <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
                        {tour.typeLabel} Journey · Sri Lanka
                    </p>
                    <h1 className="font-serif text-5xl leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl">
                        {tour.title}
                    </h1>
                    {tour.tagline && (
                        <p className="mt-5 font-serif text-2xl italic text-white/70 sm:text-3xl">{tour.tagline}</p>
                    )}

                    <ul className="mt-9 flex flex-wrap border-y border-white/20">
                        {meta.map(({ icon: Icon, label }) => (
                            <li
                                key={label}
                                className="flex items-center gap-3 border-r border-white/20 px-5 py-4 first:pl-0 last:border-r-0"
                            >
                                <Icon size={15} className="text-gold" />
                                <span className="font-mono text-[10px] uppercase tracking-[0.18em]">{label}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </section>
    )
}