'use client'

import React, { useState, useTransition } from 'react'
import { sendGAEvent } from '@next/third-parties/google'
import { submitInquiryAction } from '@/features/inquiries/actions/inquiry.action'
import type { InquiryResult } from '@/features/inquiries/schemas/inquiry.schema'

export function useInquiryForm() {
    const [pending, startTransition] = useTransition()
    const [result, setResult] = useState<InquiryResult>({})

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)

        startTransition(async () => {
            const r = await submitInquiryAction(data)
            setResult(r)
            if (r.ok && process.env.NODE_ENV === 'production') {
                sendGAEvent('event', 'generate_lead', { source: data.get('title') ? 'package' : 'general' })
            }
        })
    }

    return { handleSubmit, pending, result, reset: () => setResult({}) }
}