import {ImageEntry} from "@/features/media/schemas/media.schema";
import {DestinationInput} from "@/features/destinations/schemas/destination.schema";

export type SaveArgs = {
    id?: string; input: DestinationInput; images: ImageEntry[]
}

export type Destination = { id: string | number; title: string }

export type DestinationFormState = { error?: string; fieldErrors?: Record<string, string> }