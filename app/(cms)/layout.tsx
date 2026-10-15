import React from "react";
import type {Metadata} from "next";
import {Cormorant, Manrope} from 'next/font/google'
import '@/app/globals.css'
import {MotionProvider} from "@/components/cms/MotionProvider";
import {site} from "@/lib/site";

const cormorant = Cormorant({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    variable: '--font-cormorant',
})
const manrope = Manrope({subsets: ['latin'], variable: '--font-manrope'})

export const metadata: Metadata = {
    metadataBase: new URL(site.url),
    title: {default: `${site.name} | Sri Lanka Tours`, template: `%s | ${site.name}`},
    description: site.description,
    openGraph: {type: 'website', siteName: site.name, locale: 'en_US'},
    twitter: {card: 'summary_large_image'},
    robots: {index: false, follow: false},
    verification: {google: process.env.GOOGLE_SITE_VERIFICATION},
}

export default function CmsRootLayout({children}: { children: React.ReactNode }) {
    return (
        <MotionProvider>
            <html suppressHydrationWarning={true} lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
            <body>
            {children}
            </body>
            </html>
        </MotionProvider>
    )
}