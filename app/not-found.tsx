import Link from 'next/link'
import "@/app/globals.css";
import {Compass, ArrowRight} from 'lucide-react'
import {Button} from '@/components/ui/button'

export default function NotFound() {
    return (
        <section
            className="relative flex h-dvh w-full flex-col items-center justify-center overflow-hidden bg-background px-6 text-white">
            {/* Subtle Ambient Gold Radial Glow & Architectural Grid */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_65%)]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"
            />

            {/* Centered Oversized Watermark */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-serif text-[9rem] font-light leading-none tracking-tight text-white/[0.03] sm:text-[14rem] md:text-[18rem]"
            >
                404
            </span>

            <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
                {/* Eyebrow Badge */}
                <div className="mb-5 inline-flex items-center gap-2 border border-gold/30 bg-gold/5 px-3.5 py-1.5">
                    <Compass className="size-3.5 text-gold"/>
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">
                        Off the Mapped Route · 07°17′N 80°38′E
                    </span>
                </div>

                {/* Editorial Heading */}
                <h1 className="font-serif text-4xl font-normal tracking-tight text-white sm:text-5xl md:text-6xl">
                    This path leads beyond the horizon.
                </h1>

                <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
                    The page or itinerary you are looking for may have moved, expired, or never been charted. Let our
                    private chauffeurs guide you back to Sri Lanka&apos;s finest destinations.
                </p>

                {/* Primary Action */}
                <div className="mt-9 flex w-full flex-col items-center justify-center sm:w-auto">

                    <Link href="/">
                        <Button
                            size="lg"
                            className="flex items-center gap-2 w-full text-xs font-semibold uppercase tracking-widest sm:w-auto"
                        >
                            Return Home
                            <ArrowRight className="size-4"/>
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}