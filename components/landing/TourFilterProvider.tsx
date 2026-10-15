'use client'

import React, { createContext, useContext, useMemo, useState } from 'react'
import { ALL, type TourFilters } from '@/features/tours/utils/filter'

type Ctx = TourFilters & { setFilters: (next: Partial<TourFilters>) => void }
const FilterContext = createContext<Ctx | null>(null)

export function TourFilterProvider({ children }: { children: React.ReactNode }) {
    const [filters, set] = useState<TourFilters>({ type: ALL, destination: ALL })

    const value = useMemo<Ctx>(
        () => ({ ...filters, setFilters: (next) => set((f) => ({ ...f, ...next })) }),
        [filters],
    )

    return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

export function useTourFilters() {
    const ctx = useContext(FilterContext)
    if (!ctx) throw new Error('useTourFilters must be used inside <TourFilterProvider>')
    return ctx
}