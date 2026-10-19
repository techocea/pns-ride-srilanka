'use client'

import Link from 'next/link'
import {useEffect, useState} from 'react'
import {Menu, X} from 'lucide-react'
import {Button} from "@/components/ui/button";
import {AnimatePresence, motion, Variants} from "motion/react";
import {InquiryButton} from "@/features/inquiries/components/public/InquiryButton";

type Props = { links: readonly { href: string; label: string }[] }

const MotionLink = motion.create(Link);

const menuVariants: Variants = {
    closed: {opacity: 0, y: '-100%', transition: {duration: 0.25, ease: 'easeInOut'}},
    open: {opacity: 1, y: 0, transition: {duration: 0.3, ease: 'easeOut'}},
}

export function MobileMenu({links}: Props) {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [open])

    return (
        <div className="md:hidden">
            <Button
                variant="ghost"
                type="button"
                size="icon"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                onClick={() => setOpen(!open)}
                className="relative z-50 text-white"
            >
                {open ? <X className="size-6"/> : <Menu className="size-6"/>}
            </Button>
            <AnimatePresence>
                {open && (
                    <motion.div aria-label="Mobile"
                                variants={menuVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                                className="fixed inset-0 z-40 flex h-dvh w-full z-40 bg-secondary flex flex-col pt-20 px-6">
                        {links.map((l, i) => (
                            <MotionLink
                                key={l.href}
                                href={l.href}
                                onClick={() => setOpen(false)}
                                className="py-5 border-b border-border font-serif text-2xl text-center text-white hover:text-gold transition-colors"
                                initial={{opacity: 0, x: -20}}
                                animate={{opacity: 1, x: 0}}
                                transition={{delay: i * 0.07}}
                                whileHover={{scale: 1.05, x: 5}}
                                whileTap={{scale: 0.95}}
                            >
                                {l.label}
                            </MotionLink>
                        ))}
                        <div className="mt-12 w-full">
                            <InquiryButton variant={"outline"} size="sm" label="Enquire Now" className="uppercase"/>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}