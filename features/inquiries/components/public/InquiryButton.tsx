'use client'

import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

// the dialog and form code only download when someone first clicks
const InquiryDialog = dynamic(() => import('./InquiryDialog').then((m) => m.InquiryDialog))

type Props = Omit<React.ComponentProps<typeof Button>, 'onClick'> & { label?: string; tourTitle?: string }

export function InquiryButton({ label = 'Enquire now', tourTitle, ...buttonProps }: Props) {
    const [open, setOpen] = useState(false)
    const [everOpened, setEverOpened] = useState(false)

    return (
        <>
            <Button
                type="button"
                {...buttonProps}
                onClick={() => {
                    setEverOpened(true)
                    setOpen(true)
                }}
            >
                {label}
            </Button>
            {everOpened && <InquiryDialog open={open} onOpenChange={setOpen} tourTitle={tourTitle} />}
        </>
    )
}