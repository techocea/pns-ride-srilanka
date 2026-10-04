"use client";

import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {motion} from "motion/react";
import {ArrowRight, Hourglass} from "lucide-react"

export default function Home() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-canvas text-white">
            <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_68%_38%,rgba(202,157,51,0.12),transparent_32%)]"/>
            <div
                className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,transparent_49.9%,rgba(255,255,255,0.1)_50%)] bg-[size:25%_100%]"/>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent"/>

            <div className="relative z-10 mx-auto flex min-h-screen max-w-[1440px] flex-col px-6 lg:px-12">
                <header className="flex h-full py-2 items-center justify-between border-b border-border">
                    <Link
                        href={"/"}
                        className="flex items-center gap-3 text-left"
                        aria-label="Return to PNS ride sri lanka home"
                    >
                        <span className="h-8 w-[2px] bg-gold"/>
                        <Image src="/logo.jpg" width={100} height={80} alt="logo"/>
                    </Link>
                    <span className=" text-[10px] uppercase tracking-[0.3em] text-muted">
            Sri Lanka · Indian Ocean
          </span>
                </header>

                <div className="grid flex-1 items-center py-16 lg:grid-cols-[1fr_auto] lg:gap-24">
                    <motion.section
                        initial={{opacity: 0, y: 24}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.7, ease: [0.22, 1, 0.36, 1]}}
                        className="max-w-3xl text-center justify-center md:text-left"
                    >
                        <div className="mb-8 flex justify-center md:justify-start items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center border border-primary text-primary">
                <Hourglass size={16}/>
              </span>
                            <span className="text-[11px] uppercase tracking-[0.3em] text-primary">
                A new journey is taking shape
              </span>
                        </div>

                        <h1 className="font-heading text-6xl leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
                            Something
                            <br/>
                            <span className="italic text-primary">Extraordinary</span>
                        </h1>
                        <p className="mt-8 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                            We are curating a new Ceylon Luxe experience, shaped by rare places, considered details, and
                            the quiet magic of Sri Lanka. It will be worth the wait.
                        </p>

                        <Button
                            type="button"
                            size={"lg"}
                            className="mt-10 inline-flex px-7 py-4 items-center gap-8"
                        >
                            Explore Us
                            <ArrowRight size={14}/>
                        </Button>
                    </motion.section>
                </div>
            </div>
        </main>
    );
}
