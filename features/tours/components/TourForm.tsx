'use client'

import Link from 'next/link'
import {useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import type {Media, Tour} from '@/payload-types'
import {Destination} from "@/features/tours/types";
import {Field, inputClass} from '@/components/ui/field'
import {useTourForm} from '@/features/tours/hooks/useTourForm'
import {TOUR_TYPES} from "@/features/tours/schemas/tour.schema";
import {ImageUploadZone} from "@/components/ui/ImageUploadZone";
import type {ImageItem} from "@/features/media/hooks/use-image-items";

type Props = {
    destinations: Destination[]
    tour?: Tour
}


export function TourForm({destinations, tour}: Props) {
    const {state, formAction, pending, errors: e} = useTourForm()
    const [busy, setBusy] = useState(false)

    const destinationId = typeof tour?.destination === 'object' ? tour.destination.id : tour?.destination
    const coverId = typeof tour?.coverImage === 'object' ? tour.coverImage.id : tour?.coverImage


    return (
        <form action={formAction} className="mx-auto grid max-w-2xl gap-6">
            {tour && <Input type="hidden" name="id" value={tour.id}/>}
            {tour && <Input type="hidden" name="existingCover" value={coverId}/>}

            <Field label="Title" error={e.title}>
                <Input name="title" defaultValue={tour?.title}/>
            </Field>

            <Field label="Description" error={e.description}>
                <Input name="description" defaultValue={tour?.description}/>
            </Field>


            <div className="grid grid-cols-2 gap-6">
                <Field label="Type" error={e.tourType}>
                    <select name="tourType" defaultValue={tour?.tourType ?? 'cultural'} className={inputClass}>
                        {TOUR_TYPES.map((t) => (
                            <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                    </select>
                </Field>

                <Field label="Destination" error={e.destination}>
                    <select name="destination" defaultValue={destinationId ?? ''} className={inputClass}>
                        <option value="">Select destination</option>
                        {destinations.map((d) => (
                            <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                    </select>
                </Field>
            </div>

            <div className="grid grid-cols-2 gap-6">
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

            <div className="flex gap-3">
                <Button
                    size={"lg"}
                    type="submit"
                    disabled={pending || busy}
                    className="uppercase"
                >
                    {pending ? 'Saving...' : 'Save package'}
                </Button>
                <Link href="/cms/tours"
                      className="border border-line px-8 py-3 text-xs uppercase tracking-[0.2em] text-muted hover:text-white">
                    Cancel
                </Link>
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
