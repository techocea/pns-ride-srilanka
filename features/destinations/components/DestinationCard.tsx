'use client'

import Image from 'next/image'
import {useRef} from 'react'
import {motion, useReducedMotion, useScroll, useTransform} from 'motion/react'
import type {Destination} from '@/payload-types'
import {RowActions} from './RowActions'

type Props = { destination: Destination; index: number }

export function DestinationCard({destination: dest, index}: Props) {
    const ref = useRef<HTMLElement>(null)
    const reduceMotion = useReducedMotion()

    const {scrollYProgress} = useScroll({target: ref, offset: ['start end', 'end start']})
    const parallaxY = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])

    const cover = typeof dest.coverImage === 'object' ? dest.coverImage : null
    const draft = dest.status === 'draft'

    return (
        <motion.article
            ref={ref}
            initial={reduceMotion ? false : {opacity: 0, y: 24}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-60px'}}
            transition={{duration: 0.5, ease: 'easeOut', delay: (index % 3) * 0.1}}
            className={[
                'flex flex-col',
                'border-b border-line last:border-b-0',
                'lg:border-b-0 lg:border-l lg:[&:nth-child(3n+1)]:border-l-0',
                'lg:[&:nth-child(n+4)]:border-t',
            ].join(' ')}
        >
            <div className={`flex flex-1 flex-col items-center px-8 py-6 text-center ${draft ? 'opacity-60' : ''}`}>

                <div className="relative aspect-[2/1] w-full overflow-hidden bg-ink">
                    {cover?.url ? (
                        <motion.div
                            style={reduceMotion ? undefined : {y: parallaxY}}
                            className="absolute inset-x-0 top-[-10%] h-[120%]"
                        >
                            <Image
                                src={cover.url}
                                alt={cover.alt ?? dest.title}
                                fill
                                sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                className="object-cover"
                            />
                        </motion.div>
                    ) : (
                        <span className="absolute inset-0 grid place-items-center text-xs text-muted">No cover</span>
                    )}

                    {draft && (
                        <span
                            className="absolute left-3 top-3 bg-muted/80 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-black font-medium">
              Draft
            </span>
                    )}
                </div>

                <h3 className="mt-6 font-serif text-3xl leading-tight text-white">{dest.title}</h3>
                <p className="mt-3 text-[10px] uppercase tracking-[0.15em] text-gold">{dest.province}</p>

                {dest.description && (
                    <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-muted-foreground">{dest.description}</p>
                )}

                <div className="mt-auto pt-6">
                    <RowActions id={dest.id} draft={draft} title={dest.title}/>
                </div>
            </div>
        </motion.article>
    )
}