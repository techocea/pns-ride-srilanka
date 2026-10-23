"use client"

import {Compass, Award, Star, Users, ShieldCheck, HeartHandshake, type LucideIcon} from "lucide-react";
import {motion} from "motion/react";
import {StatItem} from "@/types";

const ICON_MAP: Record<string, LucideIcon> = {
    Compass,
    Award,
    Star,
    Users,
    HeartHandshake,
    ShieldCheck
};

export function StatsSection({items}: { items: StatItem[] }) {
    return (
        <section className="bg-accent border-y border-border text-white py-6">
            <div className="max-w-6xl w-full mx-auto px-0 md:px-12">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 divide-x divide-border">
                    {items.map((item, index) => {
                        const Icon = ICON_MAP[item.icon] || Compass; // Fallback icon if key missing
                        return (
                            <motion.div
                                key={index}
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 0.5, delay: index * 0.1}}
                                viewport={{once: true}}
                                className="flex flex-col items-center text-center gap-2 p-4"
                            >
                                <div className="p-2.5 bg-gold/10 text-gold shrink-0">
                                    <Icon className="size-5" />
                                </div>
                                <span className="text-xl font-serif tracking-tight text-white mb-1">
                  {item.value}
                </span>
                                <span className="text-[11px] uppercase font-sans tracking-widest text-white/60 font-medium">
                  {item.label}
                </span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}