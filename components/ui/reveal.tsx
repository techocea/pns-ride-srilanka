'use client'

import { motion, useReducedMotion } from 'motion/react'
import React from "react";

const ease = [0.22, 1, 0.36, 1] as const

type RevealProps = {
    children: React.ReactNode
    className?: string
    delay?: number
    y?: number
    as?: 'div' | 'li'
}

/** Fades and slides in once, when it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 20, as = 'div' }: RevealProps) {
    const reduceMotion = useReducedMotion()
    const Tag = as === 'li' ? motion.li : motion.div

    return (
        <Tag
            initial={reduceMotion ? false : { opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay, ease }}
            className={className}
        >
            {children}
        </Tag>
    )
}

/** Slow zoom-out for the hero image. */
export function ScaleIn({ children, className }: { children: React.ReactNode; className?: string }) {
    const reduceMotion = useReducedMotion()

    return (
        <motion.div
            initial={reduceMotion ? false : { scale: 1.04 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease }}
            className={className}
        >
            {children}
        </motion.div>
    )
}