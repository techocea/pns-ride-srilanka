import React from "react";
import type {Metadata} from "next";
import '@/app/globals.css'
import {CmsHeader} from "@/components/cms/CmsHeader";

export const metadata: Metadata = {title: 'DASHBOARD - PNS RIDE SRI LANKA'}

export default function DashboardLayout({children}: { children: React.ReactNode }) {

    return (
        <div>
            <CmsHeader/>
            <main className="px-4 md:px-8 py-10 mx-auto w-full"> {children}</main>
        </div>
    )
}