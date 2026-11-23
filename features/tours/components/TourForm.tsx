'use client'

import Link from 'next/link'
import {useState} from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import {Button, buttonVariants} from '@/components/ui/button'
import {cn} from '@/lib/utils'
import type {Media, Tour} from '@/payload-types'
import {Field, inputClass} from '@/components/ui/field'
import {useTourForm} from '@/features/tours/hooks/useTourForm'
import {TOUR_TYPES} from '@/features/tours/schemas/tour.schema'
import {ImageUploadZone} from '@/components/cms/ImageUploadZone'
import type {ImageItem} from '@/features/media/hooks/use-image-items'
import type {Destination} from '@/features/destinations/types'
import {ItineraryEditor} from '@/features/tours/components/ItineraryEditor'
import type {InitialItineraryRow} from '@/features/tours/hooks/useItineraryRows'

type Props = {
    destinations: Destination[]
    tour?: Tour
}

const mediaToItem = (m: Media): ImageItem => ({
    key: m.id,
    src: m.url,
    status: 'existing',
    mediaId: m.id,
})

export function TourForm({destinations, tour}: Props) {
    const {state, handleSubmit, pending, errors: e} = useTourForm()

    // one flag per zone: they upload independently
    const [coverBusy, setCoverBusy] = useState(false)
    const [imagesBusy, setImagesBusy] = useState(false)
    const [itineraryBusy, setItineraryBusy] = useState(false)
    const busy = coverBusy || imagesBusy || itineraryBusy

    const destinationId = typeof tour?.destination === 'object' ? tour.destination.id : tour?.destination
    const destinationItems = destinations.map((d) => ({label: d.title, value: String(d.id)}))

    return (
        <form onSubmit={handleSubmit} className="mx-auto w-full max-w-2xl space-y-8">
            {tour && <input type="hidden" name="id" value={tour.id}/>}

            <Field label="Title" error={e.title}>
                <Input name="title" defaultValue={tour?.title}/>
            </Field>

            <Field label="Description" error={e.description}>
                <textarea
                    name="description"
                    rows={6}
                    defaultValue={tour?.description ?? ''}
                    placeholder="Press Enter to start a new paragraph"
                    className={inputClass}
                />
            </Field>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Field label="Type" error={e.tourType}>
                    <Select name="tourType" items={TOUR_TYPES} defaultValue={tour?.tourType ?? null}>
                        <SelectTrigger className="w-full" size="lg">
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
                        defaultValue={destinationId ? String(destinationId) : null}
                    >
                        <SelectTrigger className="w-full" size="lg">
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

            <div className="grid col-span-2 gap-6">
                <Field label="Duration (days)" error={e.durationDays}>
                    <Input name="durationDays" type="number" min={1} defaultValue={tour?.durationDays}/>
                </Field>
                {/*<Field label="Price (USD)" error={e.price}>*/}
                {/*    <Input name="price" type="number" min={0} defaultValue={tour?.price}/>*/}
                {/*</Field>*/}
            </div>

            {/* the zones are NOT inside <Field>: a <label> would forward clicks to the first button */}
            <div className="grid gap-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted">Cover image</span>
                <ImageUploadZone
                    name="cover"
                    maxFiles={1}
                    initialImages={toCoverItems(tour)}
                    onBusyChange={setCoverBusy}
                />
                {e.cover && <span className="text-xs text-red-400">{e.cover}</span>}
            </div>

            <div className="grid gap-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted">Tour images</span>
                <ImageUploadZone
                    name="images"
                    maxFiles={8}
                    coverControls={false}
                    initialImages={toTourImageItems(tour)}
                    onBusyChange={setImagesBusy}
                />
                {e.images && <span className="text-xs text-red-400">{e.images}</span>}
            </div>

            <ItineraryEditor
                name="itinerary"
                initialRows={toItineraryRows(tour)}
                error={e.itinerary}
                onBusyChange={setItineraryBusy}
            />

            <div className="flex items-center gap-8">
                <select name="status" defaultValue={tour?.status ?? 'published'} className={`${inputClass} !w-auto`}>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                </select>

                <Label className="flex items-center gap-3 text-sm">
                    <input
                        type="checkbox"
                        name="featured"
                        defaultChecked={tour?.featured ?? false}
                        className="size-4 accent-[#c99a2e]"
                    />
                    Featured
                </Label>
            </div>

            {state.error && <p role="alert" className="text-sm text-red-400">{state.error}</p>}

            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
                <Button size="lg" type="submit" disabled={pending || busy} className="uppercase">
                    {pending ? 'Saving...' : busy ? 'Uploading images...' : 'Save package'}
                </Button>
                <Link
                    href="/cms/tours"
                    className={cn(buttonVariants({variant: 'outline', size: 'lg'}), 'uppercase')}
                >
                    Cancel
                </Link>
            </div>
        </form>
    )
}

function toCoverItems(tour?: Tour): ImageItem[] {
    return tour && typeof tour.coverImage === 'object' ? [mediaToItem(tour.coverImage)] : []
}

function toTourImageItems(tour?: Tour): ImageItem[] {
    return (tour?.images ?? []).flatMap((row) => (typeof row.image === 'object' ? [mediaToItem(row.image)] : []))
}

function toItineraryRows(tour?: Tour): InitialItineraryRow[] {
    return (tour?.itinerary ?? []).map((row) => {
        const media = typeof row.itineraryCover === 'object' ? row.itineraryCover : null
        return {
            key: row.id ?? crypto.randomUUID(),
            title: row.title,
            details: row.details ?? '',
            initialCover: media ? [mediaToItem(media)] : [],
            cover: media ? {kind: 'existing' as const, id: media.id} : null,
        }
    })
}