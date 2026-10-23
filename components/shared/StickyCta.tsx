'use client'

import {AnimatePresence, motion, useReducedMotion} from 'motion/react'
import {useStickyCta} from "@/features/inquiries/hooks/useStickyCta";
import {InquiryButton} from "@/features/inquiries/components/public/InquiryButton";
import {WhatsappButton} from "@/components/shared/WhatsAppButton";

type Props = { heroId?: string; endId?: string; text?: string; label?: string }

export function StickyCta({
                              heroId = 'hero',
                              text = 'Ready to plan your journey?',
                              label = 'Plan my journey',
                          }: Props) {
    const visible = useStickyCta({heroId})

    const reduceMotion = useReducedMotion()

    return (
        <AnimatePresence>
            {visible && (
                <motion.aside
                    aria-label="Plan your journey"
                    initial={reduceMotion ? false : {y: 80, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    exit={reduceMotion ? {opacity: 0} : {y: 80, opacity: 0}}
                    transition={{duration: 0.3, ease: 'easeOut'}}
                    className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-accent pb-[env(safe-area-inset-bottom)"
                >
                    <div className="mx-auto flex max-w-6xl items-center justify-between lg:gap-4 lg:p-6">
                        <p className="hidden font-serif text-2xl uppercase text-white md:block">{text}</p>
                        <div className="grid grid-cols-2 w-full md:w-auto md:flex items-center md:gap-3">
                            <WhatsappButton/>
                            <InquiryButton
                                label={label}
                                className="w-full md:w-auto rounded-none md:rounded-md py-4 h-full text-xs sm:text-sm font-semibold uppercase justify-center"
                            />
                        </div>
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    )
}