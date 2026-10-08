'use client'

import {useEffect, useRef, useState} from 'react'
import {useUploadThing} from '@/lib/uploadthing'
import {ImageEntry} from "@/features/media/schemas/media.schema";

export type ImageItem = {
    key: string // local React key
    src: string
    status: 'existing' | 'uploading' | 'uploaded'
    mediaId?: string
    upload?: { url: string; key: string; name: string; size: number }
}

export const IMAGE_RULES = {
    maxFiles: 12,
    maxBytes: 16 * 1024 * 1024,
    types: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
} as const

const revoke = (i: ImageItem) => i.src.startsWith('blob:') && URL.revokeObjectURL(i.src)

type Options = { initial?: ImageItem[]; maxFiles?: number }

export function useImageItems({initial = [], maxFiles = IMAGE_RULES.maxFiles}: Options = {}) {
    const [items, setItems] = useState<ImageItem[]>(initial)
    const [error, setError] = useState('')
    const {startUpload} = useUploadThing('cmsImage', {onUploadError: (e) => setError(e.message)})

    const latest = useRef(items)
    useEffect(() => {
        latest.current = items
    })
    useEffect(() => () => latest.current.forEach(revoke), [])

    async function add(files: FileList | File[]) {
        const selected = Array.from(files)
        if (!selected.length) return

        const badType = selected.find((f) => !(IMAGE_RULES.types as readonly string[]).includes(f.type))
        if (badType) return setError(`${badType.name}: use JPG, PNG or WebP.`)
        const tooBig = selected.find((f) => f.size > IMAGE_RULES.maxBytes)
        if (tooBig) return setError(`${tooBig.name} is over 4 MB.`)
        if (items.length + selected.length > maxFiles) return setError(`Choose up to ${maxFiles} images.`)

        setError('')
        const placeholders: ImageItem[] = selected.map((file) => ({
            key: crypto.randomUUID(),
            src: URL.createObjectURL(file),
            status: 'uploading',
        }))
        setItems((prev) => [...prev, ...placeholders])

        // one upload per file, so results always match their placeholder
        await Promise.all(
            selected.map(async (file, i) => {
                const placeholder = placeholders[i]
                const done = (await startUpload([file]))?.[0]

                if (!done) {
                    setItems((prev) => prev.filter((it) => it.key !== placeholder.key))
                    URL.revokeObjectURL(placeholder.src)
                    return
                }
                setItems((prev) =>
                    prev.map((it) =>
                        it.key === placeholder.key
                            ? {
                                ...it,
                                status: 'uploaded',
                                upload: {url: done.ufsUrl, key: done.key, name: done.name, size: done.size},
                            }
                            : it,
                    ),
                )
            }),
        )
    }

    function remove(key: string) {
        const item = items.find((i) => i.key === key)
        if (item) revoke(item)
        setItems(items.filter((i) => i.key !== key))
    }

    function makeCover(key: string) {
        const item = items.find((i) => i.key === key)
        if (item) setItems([item, ...items.filter((i) => i.key !== key)])
    }

    const uploading = items.some((i) => i.status === 'uploading')

    // the ordered list the server action receives (first = cover)
    const entries: ImageEntry[] = []
    for (const i of items) {
        if (i.status === 'existing' && i.mediaId) {
            entries.push({kind: 'existing', id: i.mediaId})
        } else if (i.status === 'uploaded' && i.upload) {
            entries.push({kind: 'new', ...i.upload})
        }
    }

    return {items, error, uploading, entries, add, remove, makeCover}
}