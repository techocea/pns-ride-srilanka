'use client'

import Image from 'next/image'
import {cn} from '@/lib/utils'
import {motion} from 'motion/react'
import {ChevronLeft, ChevronRight} from 'lucide-react'
import {useLightbox} from '@/features/tours/hooks/useLightBox'
import type {PublicImage} from '@/features/media/utils/to-image'
import {Dialog, DialogContent, DialogDescription, DialogTitle} from '@/components/ui/dialog'

type Props = { images: PublicImage[]; title: string }

export function PackageGallery({images, title}: Props) {
    const {active, open, close, step} = useLightbox(images.length)
    if (images.length === 0) return null

    const current = active === null ? null : images[active]

    return (
        <section className="bg-accent py-20 lg:py-24">
            <div className="mx-auto max-w-6xl w-full px-6 lg:px-12">
                <div className="mb-12 flex items-end justify-between gap-8 text-left">
                    <div>
                        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Journey
                            Gallery</p>
                        <h2 className="font-serif text-4xl capitalize sm:text-5xl">A glimpse of what awaits</h2>
                    </div>
                    <span className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-muted sm:block">
            Select to explore
          </span>
                </div>

                <div className="grid auto-rows-[220px] grid-cols-2 gap-1 lg:auto-rows-[280px] lg:grid-cols-4">
                    {images.map((image, index) => (
                        <motion.button
                            type="button"
                            key={image.url}
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{delay: Math.min(index, 6) * 0.08}}
                            onClick={() => open(index)}
                            aria-label={`Open journey image ${index + 1}`}
                            className={cn(
                                'group relative overflow-hidden bg-surface',
                                index === 0 && 'col-span-2 row-span-2',
                                index === 3 && 'col-span-2 lg:col-span-1',
                            )}
                        >
                            <Image
                                src={image.url}
                                alt={`${title} journey view ${index + 1}`}
                                fill
                                sizes="(min-width: 1024px) 25vw, 50vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <span className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/30"/>
                            <span
                                className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/80">
                {String(index + 1).padStart(2, '0')} · View
              </span>
                        </motion.button>
                    ))}
                </div>
            </div>

            <Dialog open={active !== null} onOpenChange={(isOpen) => !isOpen && close()}>
                <DialogContent
                    className="max-w-5xl border-0 bg-transparent p-0 shadow-none sm:max-w-5xl"
                    onKeyDown={(e) => {
                        if (e.key === 'ArrowRight') step(1)
                        if (e.key === 'ArrowLeft') step(-1)
                    }}
                >
                    <DialogTitle className="sr-only">{title} photo viewer</DialogTitle>
                    <DialogDescription className="sr-only">
                        Photo {active === null ? '' : active + 1} of {images.length}
                    </DialogDescription>

                    {current && active !== null && (
                        <div className="relative aspect-[3/2] w-full">
                            <Image
                                src={current.url}
                                alt={`${title} journey view ${active + 1}`}
                                fill
                                sizes="90vw"
                                className="object-contain"
                            />
                        </div>
                    )}

                    {images.length > 1 && (
                        <>
                            <button type="button" aria-label="Previous photo" onClick={() => step(-1)}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-ink/70 p-3 text-white hover:text-gold">
                                <ChevronLeft size={20}/>
                            </button>
                            <button type="button" aria-label="Next photo" onClick={() => step(1)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-ink/70 p-3 text-white hover:text-gold">
                                <ChevronRight size={20}/>
                            </button>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    )
}