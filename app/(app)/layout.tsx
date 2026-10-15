import type {Metadata} from "next";
import {Manrope, Cormorant,} from "next/font/google";
import "@/app/globals.css";
import {site} from "@/lib/site";
import {JsonLd} from "@/components/seo/JsonLd";
import {organizationJsonLd} from "@/lib/seo";
import {Header} from "@/components/landing/Header";
import {Footer} from "@/components/landing/Footer";

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
    robots: site.indexable ? {index: true, follow: true} : {index: false, follow: false},
    verification: {google: process.env.GOOGLE_SITE_VERIFICATION},
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            className={`${manrope.variable} ${cormorant.variable} h-full antialiased`}
        >
        <body>
        <a href="#main"
           className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-gold focus:p-3 focus:text-black">
            Skip to content
        </a>
        <Header/>
        <main id="main" className="bg-secondary">{children}</main>
        <Footer/>
        <JsonLd data={organizationJsonLd()}/>
        </body>
        </html>
    )
        ;
}
