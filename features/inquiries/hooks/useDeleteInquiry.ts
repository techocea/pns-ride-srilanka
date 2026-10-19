"use client"

import {deleteInquiryAction} from "@/features/inquiries/actions/inquiry.action";
import {useState, useTransition} from "react";

export function useDeleteInquiry(id: string, name: string) {
    const [pending, startTransition] = useTransition()
    const [error, setError] = useState('')

    const remove = () => {
        if (!confirm(`Delete the enquiry from ${name}? This cannot be undone.`)) return
        setError('')

        startTransition(async () => {
            const result = await deleteInquiryAction(id)
            if (result.error) setError(result.error)
        })
    }

    return { pending, remove, error }
}