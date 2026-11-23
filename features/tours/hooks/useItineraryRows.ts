'use client'

import {useState} from 'react'
import {ImageEntry} from "@/features/media/schemas/media.schema";
import {ImageItem} from "@/features/media/hooks/use-image-items";

export type ItineraryRow = {
    key: string
    title: string
    details: string
    initialCover: ImageItem[] // what the zone shows first (the saved photo, when editing)
    cover: ImageEntry | null // current choice, kept in sync by the zone
    uploading: boolean
}

export type InitialItineraryRow = Omit<ItineraryRow, 'uploading'>

export function useItineraryRows(initial: InitialItineraryRow[] = []) {
    const [rows, setRows] = useState<ItineraryRow[]>(() => initial.map((r) => ({...r, uploading: false})))

    const add = () =>
        setRows((r) => [...r, {
            key: crypto.randomUUID(),
            title: '',
            details: '',
            initialCover: [],
            cover: null,
            uploading: false
        }])

    const remove = (key: string) => setRows((r) => r.filter((x) => x.key !== key))

    const update = (key: string, patch: Partial<Pick<ItineraryRow, 'title' | 'details'>>) =>
        setRows((r) => r.map((x) => (x.key === key ? {...x, ...patch} : x)))

    const move = (key: string, direction: -1 | 1) =>
        setRows((r) => {
            const from = r.findIndex((x) => x.key === key)
            const to = from + direction
            if (from < 0 || to < 0 || to >= r.length) return r
            const next = [...r]
            ;[next[from], next[to]] = [next[to], next[from]]
            return next
        })

    const setCover = (key: string, entries: ImageEntry[]) =>
        setRows((rows) => {
            const next = entries[0] ?? null
            const row = rows.find((x) => x.key === key)
            if (!row || JSON.stringify(row.cover) === JSON.stringify(next)) return rows
            return rows.map((x) => (x.key === key ? {...x, cover: next} : x))
        })

    const setUploading = (key: string, uploading: boolean) =>
        setRows((rows) => {
            const row = rows.find((x) => x.key === key)
            if (!row || row.uploading === uploading) return rows
            return rows.map((x) => (x.key === key ? {...x, uploading} : x))
        })

    const busy = rows.some((r) => r.uploading)

    // what the server receives: blank rows are dropped, order is kept
    const serialized = JSON.stringify(
        rows
            .filter((r) => r.title.trim() || r.details.trim() || r.cover)
            .map(({ title, details, cover }) => ({ title, details, cover })),
    )

    return {rows, add, remove, update, move, setCover, setUploading, busy, serialized}
}