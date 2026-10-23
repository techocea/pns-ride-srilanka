'use client'

import Link from 'next/link'
import {useState} from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import type {Media, Tour} from '@/payload-types'
import {Field, inputClass} from '@/components/ui/field'
import {useTourForm} from '@/features/tours/hooks/useTourForm'
import {TOUR_TYPES} from "@/features/tours/schemas/tour.schema";
import {ImageUploadZone} from "@/components/cms/ImageUploadZone";
import type {ImageItem} from "@/features/media/hooks/use-image-items";
import type {Destination} from "@/features/destinations/types";
import {ItineraryEditor} from "@/features/tours/components/ItineraryEditor";
import {type ItineraryRow} from "@/features/tours/hooks/useItineraryRows";

type Props = {
    destinations: Destination[]
    tour?: Tour
}


export function TourForm({destinations, tour}: Props) {
    const {state, formAction, pending, errors: e} = useTourForm()
    const [busy, setBusy] = useState(false)

    const destinationId = typeof tour?.destination === 'object' ? tour.destination.id : tour?.destination
    const coverId = typeof tour?.coverImage === 'object' ? tour.coverImage.id : tour?.coverImage

    const destinationItems = destinations.map((d) => ({label: d.title, value: d.id}))

    return (
        <form action={formAction} className="mx-auto max-w-2xl space-y-8 w-full">
            {tour && <input type="hidden" name="id" value={tour.id}/>}
            {tour && <input type="hidden" name="existingCover" value={coverId}/>}

            <Field label="Title" error={e.title}>
                <Input name="title" defaultValue={tour?.title}/>
            </Field>

            <Field label="Description" error={e.description}>
                <Input name="description" defaultValue={tour?.description}/>
            </Field>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Type" error={e.tourType}>
                    <Select
                        name="tourType"
                        // items={destinationItems}
                        defaultValue={tour?.tourType ?? ""}
                    >
                        <SelectTrigger className="w-full" size={"lg"}>
                            <SelectValue placeholder="Select tour type"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {TOUR_TYPES.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>

                <Field label="Destination" error={e.destination}>
                    <Select
                        name="destination"
                        items={destinationItems}
                        defaultValue={destinationId ?? ''}
                    >
                        <SelectTrigger className="w-full" size={"lg"}>
                            <SelectValue placeholder="Select destination"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {destinationItems.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Duration (days)" error={e.durationDays}>
                    <Input name="durationDays" type="number" min={1} defaultValue={tour?.durationDays}
                    />
                </Field>
                <Field label="Price (USD)" error={e.price}>
                    <Input name="price" type="number" min={0} defaultValue={tour?.price}/>
                </Field>
            </div>


            <Field label="Media Files" error={e.coverImage}>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted">Images (first is the cover)</span>
                <ImageUploadZone name="images" maxFiles={8} initialImages={toInitialImages(tour)}
                                 onBusyChange={setBusy}/>
            </Field>

            <div className="flex items-center gap-8">
                <select name="status" defaultValue={tour?.status ?? 'published'} className={`${inputClass} !w-auto`}>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                </select>
                <Label className="flex items-center gap-3 text-sm">
                    <Input type="checkbox" name="featured" defaultChecked={tour?.featured ?? false}
                           className="size-4 accent-[#c99a2e]"/>
                    Featured
                </Label>
            </div>

            {state.error && <p className="text-sm text-red-400">{state.error}</p>}

            <ItineraryEditor name="itinerary" initialRows={toItineraryRows(tour)} error={e.itinerary}/>

            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2">
                <Button
                    size={"lg"}
                    type="submit"
                    disabled={pending || busy}
                    className="uppercase w-auto"
                >
                    {pending ? 'Saving...' : 'Save package'}
                </Button>
                <Button
                    size={"lg"}
                    variant={"outline"}
                    className="uppercase w-auto"
                >
                    <Link href="/cms/tours"> Cancel
                    </Link>
                </Button>
            </div>
        </form>
    )
}

function toInitialImages(tour?: Tour): ImageItem[] {
    if (!tour) return []
    const media = [tour.coverImage, ...(tour.images?.map((i) => i.image) ?? [])]
    return media
        .filter((m): m is Media => typeof m === 'object')
        .map((m) => ({key: m.id, src: m.url, status: 'existing', mediaId: m.id}))
}

function toItineraryRows(tour?: Tour): ItineraryRow[] {
    return (tour?.itinerary ?? []).map((row) => ({
        key: row.id ?? crypto.randomUUID(),
        title: row.title,
        details: row.details ?? '',
    }))
}