import React from "react";
import {HeroVideo} from "@/components/ui/hero-video";
import {InquiryButton} from "@/features/inquiries/components/public/InquiryButton";
import {Button} from "@/components/ui/button";
import { MapPinSearch} from "lucide-react";
import Link from "next/link";

export function HeroVideoSection() {

    return (
        <section
            id="hero"
            className="relative w-full min-h-[580px] sm:min-h-[600px] lg:h-[680px] xl:h-[740px] flex items-center justify-center overflow-hidden bg-black text-white"
        >
            {/* Background Video Player */}
            <HeroVideo
                mp4="https://g4518yf2e3.ufs.sh/f/iz1TLKwtTZx3uRSwJ5doECTmnDZUaWcL1MI7yq6SXHkFsQOJ"
                webm="/videos/hero.webm"
                poster="/videos/hero-poster.webp"
            />

            {/* Balanced Dark Overlay (Improves text contrast over the bright green daylight video) */}
            <div className="absolute inset-0 bg-black/5 bg-gradient-to-b from-black/75 via-black/40 to-black/75"/>

            {/* Hero Content */}
            <div
                className="relative z-10 container mx-auto px-4 sm:px-6 pt-24 pb-12 sm:pt-28 sm:pb-16 text-center flex flex-col items-center">

                {/* Decorative Lotus Divider (Optional icon placeholder above eyebrow) */}
                <div className="flex items-center justify-center gap-3 w-full max-w-md mb-3">
                    <div className="bg-primary/70 h-[1px] flex-1"/>
                    <span className="text-primary text-lg">❀</span>
                    <div className="bg-primary/70 h-[1px] flex-1"/>
                </div>

                {/* Eyebrow Subtitle */}
                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="hidden sm:block bg-primary/80 h-[1.5px] w-12 md:w-20"/>
                    <p className="uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold text-gray-200">
                        WELCOME TO THE PEARL OF THE INDIAN OCEAN
                    </p>
                    <div className="hidden sm:block bg-primary/80 h-[1.5px] w-12 md:w-20"/>
                </div>

                {/* Main Heading + Gold Script Line */}
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl leading-[1.08] mb-5 sm:mb-6 drop-shadow-md">
                    Sri Lanka Awaits.
                    <span
                        className="block font-normal italic text-primary text-3xl sm:text-5xl md:text-6xl lg:text-[64px] mt-1 sm:mt-2">
        Let the Journey Begin.
      </span>
                </h1>

                {/* Description Text */}
                <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mb-7 sm:mb-9 font-normal leading-relaxed px-2 drop-shadow">
                    Discover breathtaking landscapes, rich culture and unforgettable
                    experiences with PNS Ride Sri Lanka.
                </p>

                {/* Dual Action Buttons */}
                <div
                    className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
                    <Button size={"lg"}>
                        <Link href={"/packages"} className="flex gap-2">
                            explore our tours <span><MapPinSearch/></span>
                        </Link>
                    </Button>

                    <InquiryButton
                        size={"lg"}
                        variant="outline"
                        label="PLAN YOUR TRIP"
                        className="rounded-full border border-white/60 bg-black/40 hover:bg-white/15 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 sm:px-8 sm:py-4 backdrop-blur-sm transition-all"
                    />
                </div>
            </div>
        </section>

    )
}


