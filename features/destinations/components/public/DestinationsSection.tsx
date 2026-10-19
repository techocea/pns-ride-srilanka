    "use client";

import {motion} from "motion/react";
import {type DestinationCardData} from "@/features/destinations/types";
import {DestinationBlock} from "@/features/destinations/components/public/DestinationBlock";

export default function Destinations({
                                         destinations
                                     }: {
    destinations: DestinationCardData[]
}) {
    return (
        <section id="destinations" aria-labelledby="destinations-title" className="scroll-mt-20 py-20">
            <div className="mx-auto max-w-6xl w-full">
                <div className="md:max-w-lg w-full mx-auto space-y-6 text-center mb-12">
                    <motion.p
                        initial={{opacity: 0, y: 10}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        className="font-mono text-[11px] tracking-[0.3em] uppercase text-gold mb-4"
                    >
                        Iconic Locations
                    </motion.p>
                    <motion.h2
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{delay: 0.1}}
                        className="font-serif text-4xl lg:text-5xl text-white leading-tight"
                    >
                        Landmark
                        <br/>
                        <span className="italic text-muted-foreground">Destinations</span>
                    </motion.h2>
                </div>
            </div>

            {destinations.map((dest, i) => (
                <DestinationBlock key={dest.id} dest={dest} index={i}/>
            ))}
        </section>
    )
}