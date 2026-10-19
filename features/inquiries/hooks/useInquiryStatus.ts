'use client'

import {InquiryStatus} from "@/features/inquiries/constants";
import {startTransition, useOptimistic, useState} from "react";
import {updateInquiryStatusAction} from "@/features/inquiries/actions/inquiry.action";

export function useInquiryStatus(id: string, status: InquiryStatus) {
    const [value, setOptimistic] = useOptimistic(status)
    const [error, setError] = useState('')

    const change = (next: InquiryStatus) => {
        if (next === value) return
        setError('')

        startTransition(async () => {
            setOptimistic(next)
            const result = await updateInquiryStatusAction(id, next)
            if (result.error) setError(result.error) // the optimistic value reverts on its own
        })
    }

    return { value, change, error }
}