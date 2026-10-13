'use client'

import { useState } from 'react'

export type ItineraryRow = { key: string; title: string; details: string }

export function useItineraryRows(initial: ItineraryRow[] = []) {
    const [rows, setRows] = useState<ItineraryRow[]>(initial)

    const add = () =>
        setRows((r) => [...r, { key: crypto.randomUUID(), title: '', details: '' }])

    const remove = (key: string) => setRows((r) => r.filter((x) => x.key !== key))

    const update = (key: string, patch: Partial<Pick<ItineraryRow, 'title' | 'details'>>) =>
        setRows((r) => r.map((x) => (x.key === key ? { ...x, ...patch } : x)))

    const move = (key: string, direction: -1 | 1) =>
        setRows((r) => {
            const from = r.findIndex((x) => x.key === key)
            const to = from + direction
            if (from < 0 || to < 0 || to >= r.length) return r
            const next = [...r]
            ;[next[from], next[to]] = [next[to], next[from]]
            return next
        })

    // what the server receives: blank rows are dropped, order is kept
    const serialized = JSON.stringify(
        rows
            .filter((r) => r.title.trim() || r.details.trim())
            .map(({ title, details }) => ({ title, details })),
    )

    return { rows, add, remove, update, move, serialized }
}