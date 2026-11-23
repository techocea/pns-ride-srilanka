'use client'

import { startTransition, useActionState } from 'react'
import { saveTourAction } from '@/features/tours/actions/tour.actions'
import type { TourFormState } from '@/features/tours/types'

export function useTourForm() {
    const [state, formAction, pending] = useActionState<TourFormState, FormData>(saveTourAction, {})

    // Submitting through onSubmit keeps the typed values after a failed save.
    // With <form action={formAction}>, React resets every field after the action runs.
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        startTransition(() => formAction(data))
    }

    return { state, handleSubmit, pending, errors: state.fieldErrors ?? {} }
}