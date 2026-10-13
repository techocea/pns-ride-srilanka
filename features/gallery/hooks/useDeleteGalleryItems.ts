'use client'

import { useState, useTransition } from 'react'
import { deleteGalleryItemAction } from '@/features/gallery/actions/gallery.actions'

export function useDeleteGalleryItem(id: string, caption: string) {
    const [pending, startTransition] = useTransition()
    const [error, setError] = useState('')

    const remove = () => {
        if (!confirm(`Delete "${caption}"? This cannot be undone.`)) return

        startTransition(async () => {
            const result = await deleteGalleryItemAction(id)
            if (result.error) setError(result.error)
        })
    }

    return { pending, remove, error }
}