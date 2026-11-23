'use client'

import React from "react";
import {MotionConfig} from 'motion/react'
import type {TourDetailData} from '@/features/tours/types'
import {PackageHero} from "@/features/tours/components/public/package/PackageHero";
import {PackageOverview} from "@/features/tours/components/public/package/PackageOverview";
import {PackageGallery} from "@/features/tours/components/public/package/PackageGallery";
import {PackageItinerary} from "@/features/tours/components/public/package/PackageItinerary";

type Props = {
    tour: TourDetailData
}

export function PackageDetail({tour}: Props) {
    const hasItinerary = tour.itinerary.length > 0

    return (
        <MotionConfig reducedMotion="user">
            <PackageHero tour={tour}/>
            <PackageOverview tour={tour}/>
            <section className="border-y border-line bg-canvas py-20 lg:py-28">
                <div
                    className="mx-auto max-w-6xl w-full gap-16 px-6 text-left lg:px-12"
                >
                    {hasItinerary && <PackageItinerary days={tour.itinerary}/>}
                </div>
            </section>
            <PackageGallery images={tour.photos} title={tour.title}/>
        </MotionConfig>
    )
}