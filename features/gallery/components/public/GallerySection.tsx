"use client"

import Image from "next/image";
import {motion} from "motion/react";
import {GalleryItemData} from "@/features/gallery/services/gallery.service.public";

export function GallerySection({gallery}: { gallery: GalleryItemData[] }) {
    return (
        <section id="gallery" aria-labelledby="gallery-title" className="scroll-mt-20 px-6 py-20">
            <div className="mx-auto max-w-6xl w-full">
                <div className="md:max-w-lg w-full mx-auto space-y-6 text-center mb-12">
                    <motion.p
                        initial={{opacity: 0, y: 10}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        className="font-mono text-[11px] tracking-[0.3em] uppercase text-gold mb-4"
                    >
                        visual archive
                    </motion.p>
                    <motion.h2
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{delay: 0.1}}
                        className="font-serif text-4xl lg:text-5xl text-white capitalize leading-tight"
                    >
                        experience
                        <br/>
                        <span className="italic text-muted-foreground">gallery</span>
                    </motion.h2>
                    <p className="text-sm md:text-base text-muted-foreground">A curated visual anthology of Ceylon's
                        timeless landscapes, sacred heritage, and untamed wilderness.</p>
                </div>

                {gallery.length === 0 ? (
                    <div className="mt-12 text-center text-muted">
                        <p>No tours match this search.</p>
                    </div>
                ) : (
                    <div className="mt-12 md:px-8 grid sm:grid-cols-2 lg:grid-cols-3">
                        {gallery.map((image) => (
                            <div key={image.id} className="relative aspect-3/2 overflow-hidden bg-ink">
                                {image.image?.url ? (
                                    <Image
                                        src={image.image.url}
                                        alt={image.caption || 'Gallery image'}
                                        fill
                                        sizes="(min-width: 768px) 25vw, 50vw"
                                        className="object-cover"
                                    />
                                ) : (
                                    <span className="absolute inset-0 grid place-items-center text-xs text-muted">No image</span>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )

}