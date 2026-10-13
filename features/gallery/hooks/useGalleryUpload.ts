'use client'

import React, { useState, useTransition } from 'react'
import { addGalleryImagesAction } from '@/features/gallery/actions/gallery.actions'

export function useGalleryUpload() {
    const [pending, startTransition] = useTransition()
    const [error, setError] = useState('')
    const [resetKey, setResetKey] = useState(0) // changing it remounts the upload zone, which clears it

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)

        startTransition(async () => {
            const result = await addGalleryImagesAction(data)
            if (result.error) {
                setError(result.error)
            } else {
                setError('')
                setResetKey((k) => k + 1)
            }
        })
    }

    return { handleSubmit, pending, error, resetKey }
}