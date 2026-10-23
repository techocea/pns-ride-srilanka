'use client'

import { useEffect, useState } from 'react'

export function useActiveSection(ids: string[]) {
    const [active, setActive] = useState(ids[0] ?? '')
    const key = ids.join('|')

    useEffect(() => {
        const elements = key
            .split('|')
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null)
        if (elements.length === 0) return

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
                if (visible[0]) setActive(visible[0].target.id)
            },
            { rootMargin: '-20% 0px -65% 0px' },
        )

        elements.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [key])

    return active
}