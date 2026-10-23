'use client'

import {useEffect, useState} from 'react'
import {usePathname} from 'next/navigation'

export function useStickyCta({heroId}: { heroId: string }) {
    const pathname = usePathname() // re-run after client-side navigation, when the page has a new hero
    const [pastHero, setPastHero] = useState(false)


    useEffect(() => {
        const hero = document.getElementById(heroId)
        if (!hero) {
            setPastHero(false) // no hero on this page: keep the bar hidden
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0),
            {threshold: 0},
        )
        observer.observe(hero)
        return () => observer.disconnect()
    }, [heroId, pathname])


    return pastHero
}