"use client"

import {motion} from "motion/react";
import {TESTIMONIALS} from "@/lib/constants";
import {TestimonialCards} from "@/components/ui/testimonial-cards";

export default function TestimonialsSection() {
    return (
        <section className="scroll-mt-20 py-20 md:py-24">
            <div className="mx-auto max-w-6xl w-full">
                <div className="md:max-w-lg w-full mx-auto space-y-6 text-center mb-12">
                    <motion.p
                        initial={{opacity: 0, y: 10}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        className="font-mono text-[11px] tracking-[0.3em] uppercase text-gold mb-4"
                    >
                        Guest Voices
                    </motion.p>
                    <motion.h2
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{delay: 0.1}}
                        className="font-serif text-4xl lg:text-5xl text-white capitalize leading-tight"
                    >
                        Traveller
                        <br/>
                        <span className="italic text-muted-foreground">Testimonials</span>
                    </motion.h2>
                </div>

                <TestimonialCards items={TESTIMONIALS} direction="right"
                                  speed="fast" pauseOnHover={false}/>
            </div>
        </section>
    )
}