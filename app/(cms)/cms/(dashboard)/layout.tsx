import React from "react";
import type {Metadata} from "next";
import {Cormorant, Manrope} from 'next/font/google'
import '@/app/globals.css'
import {CmsHeader} from "@/components/cms/CmsHeader";
import {CmsMenuTabs} from "@/components/cms/CmsMenuTabs";

const cormorant = Cormorant({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    variable: '--font-cormorant',
})
const manrope = Manrope({subsets: ['latin'], variable: '--font-manrope'})

export const metadata: Metadata = {title: 'DASHBOARD - PNS RIDE SRI LANKA'}

export default function DashboardLayout({children}: { children: React.ReactNode }) {
    return (
        <div>
            <body>
            <CmsHeader/>
            <main className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10">
                <div className="mb-10 flex flex-col items-center justify-center">
                    <h1 className="font-serif text-2xl text-white mb-1">
                        Content Management
                    </h1>
                    <p className="text-xs text-muted-foreground  tracking-wider">
                        Manage packages, destinations, and gallery content
                    </p>
                    <div className="mt-8">
                        <CmsMenuTabs/>
                    </div>
                </div>
                {children}
            </main>
            </body>
        </div>
    )
}