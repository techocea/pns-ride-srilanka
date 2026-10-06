import React from "react";
import type {Metadata} from "next";
import {Cormorant, Manrope} from 'next/font/google'
import '@/app/globals.css'

const cormorant = Cormorant({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    variable: '--font-cormorant',
})
const manrope = Manrope({subsets: ['latin'], variable: '--font-manrope'})

export const metadata: Metadata = {title: 'DASHBOARD - PNS RIDE SRI LANKA'}

export default function DashboardLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
        <body>{children}</body>
        </html>
    )
}