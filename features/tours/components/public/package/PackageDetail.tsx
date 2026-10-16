'use client'

import React from "react";
import { cn } from '@/lib/utils'
import { MotionConfig } from 'motion/react'
import type { TourDetailData } from '@/features/tours/types'
import {PackageHero} from "@/features/tours/components/public/package/PackageHero";
import {PackageOverview} from "@/features/tours/components/public/package/PackageOverview";
import {PackageGallery} from "@/features/tours/components/public/package/PackageGallery";
import {PackageItinerary} from "@/features/tours/components/public/package/PackageItinerary";

type Props = {
    tour: TourDetailData
    booking: React.ReactNode
}

export function PackageDetail({ tour, booking }: Props) {
    const hasItinerary = tour.itinerary.length > 0

    return (
       <MotionConfig reducedMotion="user">
            <PackageHero tour={tour} />
            <PackageOverview tour={tour} />
            <PackageGallery images={tour.photos} title={tour.title} />

            <section className="border-y border-line bg-canvas py-20 lg:py-28">
                <div
                    className={cn(
                        'mx-auto grid max-w-6xl w-full gap-16 px-6 text-left lg:px-12',
                        hasItinerary ? 'lg:grid-cols-[1fr_380px]' : 'lg:grid-cols-[380px] lg:justify-center',
                    )}
                >
                    {hasItinerary && <PackageItinerary days={tour.itinerary} />}

                    <aside className="lg:sticky lg:top-24 lg:self-start">{booking}</aside>
                </div>
            </section>
        </MotionConfig>
    )
}