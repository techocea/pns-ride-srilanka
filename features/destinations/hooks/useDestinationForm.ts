'use client'

import {startTransition, useActionState} from "react";
import {DestinationFormState} from "@/features/destinations/types";
import {saveDestinationAction} from "@/features/destinations/actions/destination.actions";

export function useDestinationForm() {
    const [state, formAction, pending] = useActionState<DestinationFormState, FormData>(saveDestinationAction, {})
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        startTransition(() => formAction(data))
    }
    return {state, handleSubmit, pending, errors: state.fieldErrors ?? {}}
}