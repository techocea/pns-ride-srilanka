import {ImageEntry} from "@/features/media/schemas/media.schema";
import {DestinationInput} from "@/features/destinations/schemas/destination.schema";
import type {PublicImage} from "@/features/media/utils/to-image";

export type SaveArgs = {
    id?: string; input: DestinationInput; images: ImageEntry[]
}

export type Destination = { id: string | number; title: string }

export type DestinationFormState = { error?: string; fieldErrors?: Record<string, string> }

export type DestinationCardData = {
    id: string
    slug: string
    title: string
    province: string
    description: string
    highlights: string[]
    image: PublicImage | null
}