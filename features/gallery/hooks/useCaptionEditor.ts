'use client'

import { useState } from 'react'
import { updateCaptionAction } from '@/features/gallery/actions/gallery.actions'

type Status = 'idle' | 'saving' | 'saved' | 'error'

export function useCaptionEditor(id: string, initial: string) {
    const [value, setValue] = useState(initial)
    const [savedValue, setSavedValue] = useState(initial)
    const [status, setStatus] = useState<Status>('idle')
    const [error, setError] = useState('')

    // call on blur: nothing is sent unless the text really changed
    async function save() {
        const next = value.trim()
        if (next === savedValue) return

        setStatus('saving')
        const result = await updateCaptionAction(id, next)

        if (result.error) {
            setStatus('error')
            setError(result.error)
            return
        }
        setValue(next)
        setSavedValue(next)
        setStatus('saved')
    }

    return { value, setValue, save, status, error }
}