import {TourInput} from "@/features/tours/schemas/tour.schema";
import {ImageEntry} from "@/features/media/schemas/media.schema";
import {Tour} from "@/payload-types";
import {PublicImage} from "@/features/media/utils/to-image";

export type SaveArgs = {
    id?: string; input: TourInput; images: ImageEntry[]
}

export type TourFormState = { error?: string; fieldErrors?: Record<string, string> }

export type TourItinerary = { title: string; details: string }

export type TourCardData = {
    id: string
    slug: string
    title: string
    description: string
    price: number
    durationDays: number
    tourType: Tour['tourType']
    featured: boolean
    image: PublicImage | null
}