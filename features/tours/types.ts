import {TourInput} from "@/features/tours/schemas/tour.schema";

export type SaveArgs = {
    id?: string
    input: TourInput
    coverFile: File | null
    existingCover?: string
}

export type TourFormState = { error?: string; fieldErrors?: Record<string, string> }