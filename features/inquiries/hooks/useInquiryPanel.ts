'use client'

import {useEffect, useState} from 'react'
import type {Traveler} from '../constants'
import {buildWhatsAppUrlCustomer} from '../utils/whatsapp'

type Args = { tourTitle: string; whatsappNumber?: string }

export function useInquiryPanel({tourTitle, whatsappNumber}: Args) {
    const [travelDate, setTravelDate] = useState('')
    const [travelers, setTravelers] = useState<Traveler>('2')
    const [open, setOpen] = useState(false)
    const [everOpened, setEverOpened] = useState(false)
    const [minDate, setMinDate] = useState<string>()

    // Set after mount. The page is built ahead of time, so a "today" computed
    // on the server would be days old by the time someone visits.
    useEffect(() => setMinDate(new Date().toLocaleDateString('en-CA')), []) // en-CA = YYYY-MM-DD

    const openDialog = () => {
        setEverOpened(true) // the dialog code downloads on first click only
        setOpen(true)
    }

    const whatsappUrl = whatsappNumber
        ? buildWhatsAppUrlCustomer({number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER as string, tourTitle, travelDate, travelers})
        : null

    return {
        travelDate,
        setTravelDate,
        travelers,
        setTravelers,
        minDate,
        open,
        setOpen,
        everOpened,
        openDialog,
        whatsappUrl
    }
}