"use client"

import Link from 'next/link'
import Image from "next/image";
import {site} from '@/lib/site'
import {motion} from 'motion/react';
import {FOOTER_LINKS} from "@/lib/constants";
import {uploadthingLoader} from "@/features/gallery/utils/uploadthing-loader";
import {InquiryButton} from "@/features/inquiries/components/public/InquiryButton";

export function Footer() {
    return (
        <footer className="bg-secondary border-t border-border">
            <div className="max-w-6xl w-full mx-auto px-6 lg:px-12">
                <div className="py-20 lg:py-24 grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 border-b border-border">
                    <div className="space-y-4">
                        <Link
                            href={"/"}
                            className="flex items-center gap-3 text-left"
                            aria-label="Return to PNS ride sri lanka home"
                        >
                            <Image src="/logo.jpg" width={100} height={80}  className="object-cover" loader={uploadthingLoader}
                                   alt={site.description}/>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-8">
                            Architects of extraordinary journeys across the Pearl of the
                            Indian Ocean since 2009. Every experience is curated for the
                            discerning traveller.
                        </p>
                        <div className="space-y-3">
                            {site.contacts.map((item) => (
                                <div key={item.label} className="flex items-start gap-3">
                                    <item.icon size={14} className="text-gold mt-0.5 flex-shrink-0"/>
                                    <span className=" text-xs text-muted-foreground tracking-wide">
                          {item.description}
                        </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-6">
                            Packages
                        </p>
                        <ul className="space-y-3">
                            {[
                                "Cultural Circuits",
                                "Beach Escapes",
                                "Wildlife Safaris",
                                "Highland Retreats",
                                "Grand Island Tours",
                                "Private Charters",
                            ].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#packages"
                                        className=" text-sm text-muted-foreground hover:text-white transition-colors duration-200"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-6">
                            Destinations
                        </p>
                        <ul className="space-y-3">
                            {[
                                "Sigiriya",
                                "Ella",
                                "Mirissa",
                                "Kandy",
                                "Yala",
                                "Galle Fort",
                                "Nuwara Eliya",
                            ].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#destinations"
                                        className=" text-sm text-muted-foreground hover:text-white transition-colors duration-200"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className=" text-[11px] tracking-[0.3em] uppercase text-gold mb-6">
                            Company
                        </p>
                        <div className="flex flex-col space-y-3 mb-10">
                            {FOOTER_LINKS.slice(2, 5).map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-sm text-muted-foreground hover:text-white transition-colors duration-200"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                        <div className="flex gap-4">
                            {site.socials.map((social) => (
                                <Link
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="border border-border p-2 text-muted-foreground hover:border-gold hover:text-gold transition-colors duration-300"
                                >
                                    <social.icon size={14}/>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className=" text-[11px] text-muted tracking-wider">
                        &copy; {new Date().getFullYear()} {site.name} Travel & Experiences. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        {FOOTER_LINKS.slice(0, 2).map((l) => (
                            <Link key={l.href} href={l.href}
                                  className="text-[11px] hover:text-primary transition-colors duration-200">{l.label}</Link>
                        ))}
                    </div>
                </div>
            </div>

            <motion.div
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                className="border-t border-border py-14 bg-accent"
            >
                <div
                    className="max-w-6xl w-full mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="font-serif text-white text-xl lg:text-2xl text-center md:text-left">
                        Ready to discover Ceylon&apos;s hidden wonders?
                    </p>
                    <InquiryButton size="lg" label="Plan my journey" className="uppercase" />
                </div>
            </motion.div>
        </footer>
    )
}