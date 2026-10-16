"use client";

import Image from "next/image";
import {MapPin} from "lucide-react";
import {HERO_SLIDES} from "@/lib/constants";
import React, {useEffect, useRef, useState} from "react";
import {AnimatePresence, useScroll, useTransform, motion} from "motion/react";
import {uploadthingLoader} from "@/features/gallery/utils/uploadthing-loader";

const MotionImage = motion.create(Image);

export function HeroCarousel() {
    const ref = useRef<HTMLDivElement>(null)
    const [activeSlide, setActiveSlide] = useState(0)
    const {scrollYProgress} = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    })
    const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
    const slide = HERO_SLIDES[activeSlide]

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setActiveSlide((current) => (current + 1) % HERO_SLIDES.length)
        }, 6500)
        return () => window.clearTimeout(timer)
    }, [activeSlide])

    return (
        <section
            ref={ref}
            id="hero"
            className="relative w-full min-h-screen min-h-[660px] overflow-hidden bg-accent"
        >
            <motion.div
                style={{y: imgY}}
                className="absolute inset-0 will-change-transform"
            >
                <AnimatePresence initial={false}>
                    <MotionImage
                        key={slide.image}
                        src={slide.image}
                        alt={slide.alt}
                        initial={{opacity: 0, scale: 1.04}}
                        animate={{opacity: 1, scale: 1}}
                        exit={{opacity: 0}}
                        transition={{
                            opacity: {duration: 1.1},
                            scale: {duration: 4.5, ease: "linear"},
                        }}
                        fill
                        loader={uploadthingLoader}
                        className="absolute inset-0 w-full h-[115%] object-cover object-center"
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-b from-accent/55 via-accent/20 to-accent"/>
                <div className="absolute inset-0 bg-gradient-to-r from-accent/85 via-accent/35 to-accent/10"/>
                <div
                    className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,transparent_49.9%,rgba(255,255,255,0.12)_50%)] bg-[size:25%_100%]"/>
            </motion.div>

            <motion.div
                style={{y: textY, opacity}}
                className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 lg:px-20 max-w-[1440px] mx-auto pt-12"
            >
                <motion.div
                    initial={{opacity: 0, x: -30}}
                    animate={{opacity: 1, x: 0}}
                    transition={{duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1]}}
                    className="flex items-center justify-center gap-3 mb-6"
                >
                    <MapPin size={12} className="text-gold"/>
                    <span className="font-mono text-xs tracking-[0.3em] uppercase text-gold">
            Sri Lanka · Indian Ocean
          </span>
                </motion.div>

                <div className="overflow-hidden">
                    <motion.h1
                        initial={{y: 80, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1]}}
                        className="font-serif text-white leading-[0.92] tracking-tight text-6xl"

                    >
                        Discover
                    </motion.h1>
                </div>
                <div className="overflow-hidden py-1.5">
                    <motion.h1
                        initial={{y: 80, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{duration: 1, delay: 0.52, ease: [0.22, 1, 0.36, 1]}}
                        className="font-serif italic text-gold leading-[0.92] tracking-tight text-6xl"

                    >
                        Sri Lanka
                    </motion.h1>
                </div>
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{y: 80, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{duration: 1, delay: 0.64, ease: [0.22, 1, 0.36, 1]}}
                        className="font-serif text-white leading-[0.92] tracking-tight text-6xl"

                    >
                        Your Way
                    </motion.h1>
                </div>

                <motion.p
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, delay: 0.85}}
                    className="mt-8 text-muted-foreground font-sans text-base lg:text-lg max-w-lg leading-relaxed"
                >
                    Private journeys to Sri Lanka’s most unforgettable places — from
                    Sigiriya and Ella to Yala&apos;s wild landscapes and the Indian Ocean
                    coast.
                </motion.p>
            </motion.div>
        </section>
    )
}