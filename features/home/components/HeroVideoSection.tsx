import React from "react";
import {HeroVideo} from "@/components/ui/hero-video";
import {InquiryButton} from "@/features/inquiries/components/public/InquiryButton";

export function HeroVideoSection() {

    return (
        <section
            id={"hero"}
            className="relative w-full min-h-[75dvh] lg:h-[660px] flex items-center justify-center overflow-hidden bg-secondary text-white">
            {/* Background Video Player */}
            <HeroVideo
                mp4="https://g4518yf2e3.ufs.sh/f/iz1TLKwtTZx3uRSwJ5doECTmnDZUaWcL1MI7yq6SXHkFsQOJ"
                webm="/videos/hero.webm"
                poster="/videos/hero-poster.webp"
            />

            {/* Hero Overlay Content */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/85 via-accent/35 to-accent/10"/>
            <div
                className="relative z-10 container mx-auto px-4 sm:px-6  md:pt-20 py-10 sm:pb-12 text-center flex flex-col items-center">
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight max-w-4xl leading-[1.1] mb-4 sm:mb-6">
                    Discover Sri Lanka in Authentic Luxury
                </h1>

                <p className="text-sm sm:text-base md:text-lg text-muted/60 max-w-2xl mb-6 sm:mb-8 font-light leading-relaxed px-2">
                    Tailor-made travel itineraries, private transfers, and curated local experiences crafted for
                    timeless memories.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <InquiryButton variant={"outline"} label={"Plan Now"} className="px-8 py-4"/>
                </div>
            </div>
        </section>
    )
}