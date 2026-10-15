import type { TourCardData } from '../types'

export const ALL = 'all'
export type TourFilters = { type: string; destination: string }

export function filterTours(tours: TourCardData[], { type, destination }: TourFilters) {
    return tours.filter(
        (t) => (type === ALL || t.tourType === type) && (destination === ALL),
    )
}