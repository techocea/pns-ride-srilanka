'use client'

import { useCallback, useState } from 'react'

export function useLightbox(count: number) {
    const [active, setActive] = useState<number | null>(null)

    const open = useCallback((index: number) => setActive(index), [])
    const close = useCallback(() => setActive(null), [])
    const step = useCallback(
        (direction: 1 | -1) =>
            setActive((i) => (i === null || count === 0 ? i : (i + direction + count) % count)),
        [count],
    )

    return { active, open, close, step }
}