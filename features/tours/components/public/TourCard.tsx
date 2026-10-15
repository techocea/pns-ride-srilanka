"use client";

import Link from 'next/link'
import Image from 'next/image'
import {useState} from "react";
import {motion} from 'motion/react';
import {ArrowUpRight} from "lucide-react";
import {Button} from "@/components/ui/button";
import {TourCardData} from "@/features/tours/types";
import {TOUR_TYPES} from "@/features/tours/schemas/tour.schema";
import {uploadthingLoader} from "@/features/gallery/utils/uploadthing-loader";

export function TourCard({tour}: { tour: TourCardData }) {
    const [hovered, setHovered] = useState(false)

    const typeLabel = TOUR_TYPES.find((t) => t.value === tour.tourType)?.label

    return (
        <motion.article onHoverStart={() => setHovered(true)}
                        onHoverEnd={() => setHovered(false)}
                        className="group relative flex flex-col border border-border bg-canvas">
            <Link href={`/packages/${tour.slug}`}>
                <div className="relative aspect-video overflow-hidden bg-ink">
                    {tour.image && (
                        <Image
                            src={tour.image.url}
                            alt={tour.image.alt}
                            fill
                            loader={uploadthingLoader}
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition duration-500 group-hover:scale-105"
                        />
                    )}
                    {typeLabel && (
                        <span
                            className="absolute left-3 top-3 bg-gold text-white px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-gold">
            {typeLabel}
          </span>
                    )}
                </div>

                <div className="flex flex-1 flex-col gap-2 p-5">
                    <div className="flex flex-col gap-2 text-center">
                        <h3 className="font-serif font-normal text-xl leading-tight">
                            {tour.title}
                        </h3>
                        <p className="text-muted-foreground leading-6 text-sm">{tour.description}</p>
                    </div>
                    <hr className="my-4"/>
                    <div className="mt-auto flex items-center justify-between text-sm">
                        <p className="text-[11px] uppercase text-muted-foreground">From <br/>
                            <span
                                className="font-serif text-lg text-primary"> ${tour.price.toLocaleString('en-US')}</span>
                        </p>
                        <Button size={"sm"} variant="outline" className="uppercase">view itinerary</Button>
                        <Button variant="default">
                            <motion.span
                                animate={{x: hovered ? [0, 4, 0] : 0}}
                                transition={{duration: 1, repeat: hovered ? Infinity : 0}}
                            >
                                <ArrowUpRight size={17}/>
                            </motion.span>
                        </Button>
                    </div>
                </div>
            </Link>
        </motion.article>
    )
}