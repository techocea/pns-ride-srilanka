export const TRAVELER_OPTIONS = ['1', '2', '3-4', '5-8', '9+'] as const
export type Traveler = (typeof TRAVELER_OPTIONS)[number]

export const travelerLabel = (v: Traveler) => `${v} ${v === '1' ? 'traveller' : 'travellers'}`