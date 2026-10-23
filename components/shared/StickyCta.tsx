'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {useStickyCta} from "@/features/inquiries/hooks/useStickyCta";
import {InquiryButton} from "@/features/inquiries/components/public/InquiryButton";

type Props = { heroId?: string; endId?: string; text?: string; label?: string }

export function StickyCta({
                              heroId = 'hero',
                              text = 'Ready to plan your journey?',
                              label = 'Plan my journey',
                          }: Props) {
    const visible = useStickyCta({ heroId })

    const reduceMotion = useReducedMotion()

    return (
        <AnimatePresence>
            {visible && (
                <motion.aside
                    aria-label="Plan your journey"
                    initial={reduceMotion ? false : { y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={reduceMotion ? { opacity: 0 } : { y: 80, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-accent pb-[env(safe-area-inset-bottom)"
                >
                    <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 md:px-6 md:py-6 lg:px-12">
                        <p className="hidden font-serif text-2xl uppercase text-white md:block">{text}</p>

                        <InquiryButton label={label} className="uppercase w-full md:w-auto py-6 text-sm font-semibold" />
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    )
}