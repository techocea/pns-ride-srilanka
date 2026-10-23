"use client";

import {useRef} from "react";
import Image from "next/image"
import {ArrowRight} from "lucide-react";
import {motion, useScroll, useTransform} from "motion/react";
import {DestinationCardData} from "@/features/destinations/types";

const MotionImage = motion.create(Image);

export function DestinationBlock({
                                     dest,
                                     index,
                                 }: {
    dest: DestinationCardData
    index: number
}) {
    const ref = useRef<HTMLDivElement>(null)
    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })
    const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])
    const textX = useTransform(scrollYProgress, [0, 1], [
        index % 2 === 0 ? "-3%" : "3%",
        "0%",
    ])

    const isEven = index % 2 === 0

    return (
        <div ref={ref} className="border-t border-border overflow-hidden">
            <div className={`grid lg:grid-cols-2 min-h-[70vh] ${isEven ? "" : ""}`}>
                <div
                    className={`relative overflow-hidden bg-surface ${
                        isEven ? "order-1" : "order-2 lg:order-2"
                    }`}
                >
                    {dest.image && (
                        <motion.div
                            style={{y: imgY}}
                            className="absolute inset-0 will-change-transform"
                        >
                            <MotionImage
                                src={dest.image.url}
                                alt={dest.image.alt}
                                fill
                                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                className="w-full h-[115%] object-cover object-center"
                            />
                            <div
                                className={`absolute inset-0 bg-gradient-to-${
                                    isEven ? "r" : "l"
                                } from-transparent to-accent/80`}
                            />
                        </motion.div>
                    )}
                    <div
                        className="absolute bottom-6 left-6 font-mono text-[10px] tracking-[0.25em] uppercase text-gold bg-accent/70 px-3 py-1.5">
                        {dest.province}
                    </div>
                    <div
                        className="absolute top-6 right-6 font-serif text-7xl lg:text-8xl font-medium text-white/[0.06] pointer-events-none select-none">
                        {String(index + 1).padStart(2, "0")}
                    </div>
                </div>

                <motion.div
                    style={{x: textX}}
                    className={`flex flex-col justify-center text-center px-10 lg:px-16 py-16 lg:py-20 ${
                        isEven ? "order-2" : "order-1 lg:order-1"
                    }`}
                >
                    <motion.p
                        initial={{opacity: 0, y: 10}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        className="font-mono text-[11px] tracking-[0.3em] uppercase text-gold mb-4"
                    >
                        Destination {String(index + 1).padStart(2, "0")}
                    </motion.p>
                    <motion.h2
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{delay: 0.1}}
                        className="font-serif text-5xl lg:text-6xl text-white leading-tight mb-8"
                    >
                        {dest.title}
                    </motion.h2>
                    <motion.p
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        viewport={{once: true}}
                        transition={{delay: 0.2}}
                        className="text-muted-foreground font-sans text-base lg:text-lg leading-relaxed mb-10 max-w-md mx-auto"
                    >
                        {dest.description}
                    </motion.p>

                    <div className="grid grid-cols-2 gap-px bg-border/90 border border-border mb-10">
                        {dest.highlights.map((fact) => (
                            <div key={fact} className="bg-accent px-4 py-3">
                <span className="font-mono text-[10px] text-muted tracking-wide">
                  {fact}
                </span>
                            </div>
                        ))}
                    </div>

                    <motion.a
                        href="#packages"
                        whileHover={{x: 6}}
                        transition={{duration: 0.25}}
                        className="inline-flex items-center justify-center gap-3 text-gold font-mono text-xs tracking-[0.2em] uppercase group"
                    >
                        Explore Tours
                        <ArrowRight
                            size={14}
                            className="group-hover:translate-x-1 transition-transform duration-300"
                        />
                    </motion.a>
                </motion.div>
            </div>
        </div>
    )
}
