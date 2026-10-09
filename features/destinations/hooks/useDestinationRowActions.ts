'use client'

import {useTransition} from "react";
import {deleteDestinationAction, toggleVisibilityAction} from "@/features/destinations/actions/destination.actions";

export function useDestinationRowActions(id: string, title: string) {
    const [pending, startTransition] = useTransition()

    const toggle = () => startTransition(() => toggleVisibilityAction(id))

    const remove = () => {
        if (confirm(`Delete "${title}"? This cannot be undone.`)) {
            startTransition(() => deleteDestinationAction(id))
        }
    }

    return {pending, toggle, remove}
}