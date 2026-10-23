"use client";

import {STATS} from "@/lib/constants";
import {motion} from "motion/react";

export function StatsSection() {
    return (
        <section id="statistics" className="border-y border-border bg-accent">
            <div className="max-w-6xl w-full mx-auto px-0 md:px-12">
                <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
                    {STATS.map(({value, label, icon: Icon}, i) => (
                        <motion.div
                            key={label}
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{delay: i * 0.1}}
                            className="px-8 py-12 text-center border-b lg:border-b-0 border-border"
                        >
                            <Icon size={24} className="text-gold mx-auto mb-4"/>
                            <div className="font-serif text-4xl text-white mb-2">{value}</div>
                            <div className="font-mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
                                {label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}