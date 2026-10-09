'use client'

import { useTransition } from 'react'
import {deleteTourAction, toggleVisibilityAction} from "@/features/tours/actions/tour.actions";

export function useTourRowActions(id: string, title: string) {
    const [pending, startTransition] = useTransition()

    const toggle = () => startTransition(() => toggleVisibilityAction(id))

    const remove = () => {
        if (confirm(`Delete "${title}"? This cannot be undone.`)) {
            startTransition(() => deleteTourAction(id))
        }
    }

    return { pending, toggle, remove }
}