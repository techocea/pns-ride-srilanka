'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export function useStickyCta({
                                 heroId = 'hero',
                                 endId = 'footer',
                             }: {
    heroId?: string
    endId?: string
}) {
    const pathname = usePathname() // re-run after client-side navigation
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setVisible(false)

        const hero =
            document.getElementById(heroId) ??
            document.querySelector('main > section:first-of-type')
        const footer = document.getElementById(endId)

        let pastHero = false
        let atFooter = false
        const update = () => setVisible(pastHero && !atFooter)

        const footerObserver = footer
            ? new IntersectionObserver(
                ([entry]) => {
                    atFooter = entry.isIntersecting
                    update()
                },
                { threshold: 0 },
            )
            : null

        if (footer && footerObserver) footerObserver.observe(footer)

        if (hero) {
            const heroObserver = new IntersectionObserver(
                ([entry]) => {
                    pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0
                    update()
                },
                { threshold: 0 },
            )
            heroObserver.observe(hero)

            return () => {
                heroObserver.disconnect()
                footerObserver?.disconnect()
            }
        }

        // Fallback if a page has no <section> inside <main>
        const onScroll = () => {
            pastHero = window.scrollY > 300
            update()
        }
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', onScroll)
            footerObserver?.disconnect()
        }
    }, [heroId, endId, pathname])

    return visible
}