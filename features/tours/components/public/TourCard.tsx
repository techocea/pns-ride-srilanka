"use client";

import Link from 'next/link'
import Image from 'next/image'
import React from "react";
import {motion} from 'motion/react'
import {Button} from "@/components/ui/button";
import {TourCardData} from "@/features/tours/types";
import {InquiryButton} from "@/features/inquiries/components/public/InquiryButton";
import {calcDurationNights} from "@/features/tours/utils/calc-duration";

export function TourCard({tour}: { tour: TourCardData }) {
    const durationDays = tour.durationDays
    const durationNights = calcDurationNights(durationDays);

    return (
        <motion.article
            className="group relative flex flex-col border border-border bg-canvas">
            <Link href={`/packages/${tour.slug}`}>
                <div className="relative aspect-video overflow-hidden bg-ink">
                    {tour.image && (
                        <Image
                            src={tour.image.url}
                            alt={tour.image.alt}
                            fill
                            priority
                            loading="eager"
                            fetchPriority="high"
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition duration-500 group-hover:scale-105"
                        />
                    )}
                </div>
            </Link>
            <div className="flex flex-1 flex-col gap-2 p-5">
                <div className="flex flex-col gap-2 text-left">
                    <h3 className="font-serif font-normal text-xl leading-tight">
                        {tour.title}
                    </h3>
                    <div className="flex items-center justify-between w-full">
                        <p className="text-muted-foreground leading-6 capitalize text-sm">{durationDays} days
                            / {durationNights}</p>
                        <InquiryButton
                            variant={"ghost"}
                            label="get a quote"
                            tourTitle={tour.title}
                            className="font-semibold"
                        />
                    </div>
                </div>

                <div className="mt-4 flex items-center">
                    <Button size={"lg"} variant="default" className="uppercase w-full">
                        <Link href={`/packages/${tour.slug}`}>
                            view itinerary
                        </Link>
                    </Button>
                </div>
            </div>
        </motion.article>
    )
}