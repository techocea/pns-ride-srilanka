'use client'

import { useActionState } from 'react'
import {TourFormState} from "@/features/tours/types";
import {saveTourAction} from "@/features/tours/actions/tour.actions";

export function useTourForm() {
    const [state, formAction, pending] = useActionState<TourFormState, FormData>(saveTourAction, {})
    return { state, formAction, pending, errors: state.fieldErrors ?? {} }
}