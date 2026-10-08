import {TourInput} from "@/features/tours/schemas/tour.schema";
import {ImageEntry} from "@/features/media/schemas/media.schema";

export type SaveArgs = {
    id?: string; input: TourInput; images: ImageEntry[]
}

export type Destination = { id: string | number; name: string }

export type TourFormState = { error?: string; fieldErrors?: Record<string, string> }