'use client'

import {useActionState, useEffect, useState} from 'react'
import {sendGAEvent} from '@next/third-parties/google'
import {submitInquiryAction} from '@/features/inquiries/actions/inquiry.action'
import type {InquiryResult} from '@/features/inquiries/schemas/inquiry.schema'


export function useInquiryForm(onSuccess?: () => void) {
    const [state, formAction, pending] = useActionState<InquiryResult, FormData>(
        submitInquiryAction,
        {}
    )
    const [formKey, setFormKey] = useState(0)

    useEffect(() => {
        if (state?.ok) {
            if (process.env.NODE_ENV === 'production') {
                sendGAEvent('event', 'generate_lead', {source: 'inquiry'})
            }
            onSuccess?.()
        }
    }, [state, onSuccess])
    const reset = () => {
        setFormKey((prev) => prev + 1)
    }

    return {
        state,
        formAction,
        pending,
        errors: state?.fieldErrors ?? {},
        reset,
        formKey,
    }
}