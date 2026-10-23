"use client"

import Image from "next/image";
import {motion} from "motion/react";
import {InquiryButton} from "@/features/inquiries/components/public/InquiryButton";

export default function ContactSection() {
    return (
        <section
            id="contact"
            className="py-20 lg:py-28 bg-secdonary border-t border-border"
        >
            <div className="max-w-6xl w-full mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <div>
                        <motion.p
                            initial={{opacity: 0, y: 10}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            className="font-mono text-[11px] tracking-[0.3em] uppercase text-gold mb-4"
                        >
                            Begin Your Journey
                        </motion.p>
                        <motion.h2
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{delay: 0.1}}
                            className="font-serif text-5xl lg:text-6xl text-white leading-tight mb-8"
                        >
                            Let&apos;s Plan
                            <br/>
                            <span className="italic text-gold">Together</span>
                        </motion.h2>
                        <motion.p
                            initial={{opacity: 0}}
                            whileInView={{opacity: 1}}
                            viewport={{once: true}}
                            transition={{delay: 0.2}}
                            className="text-muted-foreground text-base leading-relaxed max-w-md mb-10"
                        >
                            Every great journey begins with a conversation. Share your vision
                            — destinations, pace, interests — and our specialists will craft
                            something unforgettable.
                        </motion.p>
                        <motion.div
                            initial={{opacity: 0, y: 10}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{delay: 0.3}}
                            whileHover={{x: 4}}
                            className="max-sm:flex max-sm:justify-center max-sm:w-full"
                        >
                            <InquiryButton size="lg" label="Send an enquiry" />
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{opacity: 0, x: 30}}
                        whileInView={{opacity: 1, x: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.7}}
                        className="relative"
                    >
                        <div className="relative overflow-hidden bg-surface aspect-[4/3]">
                            <Image
                                src="/benthota.jpg"
                                alt="Ceylon highlands in morning mist"
                                fill
                                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#000]/60 to-transparent"/>
                        </div>
                        <div className="absolute -bottom-6 -left-6 border border-border bg-accent p-6">
                            <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-gold mb-1">
                                Response Time
                            </div>
                            <div className="font-serif text-white text-2xl">Within 24h</div>
                            <div className="font-mono text-[11px] text-muted-foreground mt-1">
                                Guaranteed
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}