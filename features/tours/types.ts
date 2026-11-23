import {TourInput} from "@/features/tours/schemas/tour.schema";
import {ImageEntry} from "@/features/media/schemas/media.schema";
import {Tour} from "@/payload-types";
import {PublicImage} from "@/features/media/utils/to-image";

export type SaveArgs = {
    id?: string; input: TourInput; images: ImageEntry[], cover: ImageEntry[]
}

export type TourFormState = { error?: string; fieldErrors?: Record<string, string> }

export type ItineraryDay = { title: string; details: string | null; itineraryCover: PublicImage | null }

export type TourDetailData = {
    slug: string
    title: string
    typeLabel: string
    destination: { title: string; province: string } | null
    durationDays: number
    durationNights?: number
    price?: number
    maxGroupSize?: number | null
    paragraphs: string[]
    coverImage: PublicImage | null
    photos: PublicImage[]
    itinerary: ItineraryDay[]
}

export type TourCardData = {
    id: string
    slug: string
    title: string
    description?: string
    destinationTitle: string
    destinationSlug: string
    price?: number | null
    durationDays: number
    tourType: Tour['tourType']
    featured: boolean
    image: PublicImage | null
}