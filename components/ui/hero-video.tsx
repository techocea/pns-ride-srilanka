'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'

type Props = {
    mp4: string
    webm?: string
    poster: string
}

type NetworkInfo = { saveData?: boolean; effectiveType?: string }

export function HeroVideo({ mp4, webm, poster }: Props) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [enabled, setEnabled] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [paused, setPaused] = useState(false)

    useEffect(() => {
        // Ensure this check only runs on the client after mount
        if (typeof window === 'undefined') return

        // Accessibility check: reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        // Network check: data saver & slow connections
        const conn = (navigator as Navigator & { connection?: NetworkInfo }).connection
        if (conn?.saveData || (conn?.effectiveType && ['slow-2g', '2g', '3g'].includes(conn.effectiveType))) {
            return
        }

        // Enable video playback
        setEnabled(true)
    }, [])

    // Auto-play when video comes into view
    useEffect(() => {
        const video = videoRef.current
        if (!enabled || !video) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !paused) {
                    video.play().catch(() => {
                        // Autoplay blocked by browser policy or missing interactions
                    })
                } else {
                    video.pause()
                }
            },
            { threshold: 0.25 }
        )

        observer.observe(video)
        return () => observer.disconnect()
    }, [enabled, paused])

    return (
        <>
            {/* LCP Poster Image (always rendered first) */}
            <Image
                src={poster}
                alt="Hero Poster"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
            />

            {enabled && (
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={poster}
                    aria-hidden
                    tabIndex={-1}
                    onPlaying={() => setPlaying(true)}
                    className={`absolute inset-0 h-full w-screen object-cover transition-opacity duration-1000 ${
                        playing ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    {webm && <source src={webm} type="video/webm" />}
                    <source src={mp4} type="video/mp4" onError={() => setEnabled(false)} />
                </video>
            )}

            {/* Dark Overlay for Readability */}
            <div className="absolute inset-0 bg-secondary/50" />

            {/* Play/Pause Control Button */}
            {enabled && playing && (
                <button
                    type="button"
                    onClick={() => setPaused((p) => !p)}
                    aria-label={paused ? 'Play background video' : 'Pause background video'}
                    className="absolute bottom-3 right-3 z-10 grid size-8 sm:size-10 place-items-center border border-white/30 bg-black/40 text-white transition hover:border-gold hover:text-gold sm:bottom-6 sm:right-6"
                >
                    {paused ? <Play size={12} className="sm:size-3.5" /> : <Pause size={12} className="sm:size-3.5" />}
                </button>
            )}
        </>
    )
}