'use client'

import Link from 'next/link'
import type {Tour} from '@/payload-types'
import {useTourForm} from '@/features/tours/hooks/useTourForm'
import {Field, inputClass} from '@/components/ui/field'
import {TOUR_TYPES} from "@/features/tours/schemas/tour.schema";

type Props = {
    destinations: { id: string | number; name: string }[]
    tour?: Tour
}

export function TourForm({destinations, tour}: Props) {
    const {state, formAction, pending, errors: e} = useTourForm()

    const destinationId = typeof tour?.destination === 'object' ? tour.destination.id : tour?.destination
    const coverId = typeof tour?.coverImage === 'object' ? tour.coverImage.id : tour?.coverImage


    return (
        <form action={formAction} className="mx-auto grid max-w-2xl gap-6">
            {tour && <input type="hidden" name="id" value={tour.id}/>}
            {tour && <input type="hidden" name="existingCover" value={coverId}/>}

            <Field label="Title" error={e.title}>
                <input name="title" defaultValue={tour?.title} className={inputClass}/>
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
                    <input name="durationDays" type="number" min={1} defaultValue={tour?.durationDays}
                           className={inputClass}/>
                </Field>
                <Field label="Price (USD)" error={e.price}>
                    <input name="price" type="number" min={0} defaultValue={tour?.price} className={inputClass}/>
                </Field>
            </div>




            <Field label="Cover image" error={e.coverImage}>
                <input name="coverImage" type="file" accept="image/*"
                       className={`${inputClass} file:mr-4 file:border-0 file:bg-gold file:px-3 file:py-1 file:text-xs file:text-black`}/>
            </Field>

            <div className="flex items-center gap-8">
                <select name="status" defaultValue={tour?.status ?? 'published'} className={`${inputClass} !w-auto`}>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                </select>
                <label className="flex items-center gap-3 text-sm">
                    <input type="checkbox" name="featured" defaultChecked={tour?.featured ?? false}
                           className="size-4 accent-[#c99a2e]"/>
                    Featured
                </label>
            </div>

            {state.error && <p className="text-sm text-red-400">{state.error}</p>}

            <div className="flex gap-3">
                <button
                    disabled={pending}
                    className="bg-gold px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black disabled:opacity-50"
                >
                    {pending ? 'Saving...' : 'Save package'}
                </button>
                <Link href="/cms/tours"
                      className="border border-line px-8 py-3 text-xs uppercase tracking-[0.2em] text-muted hover:text-white">
                    Cancel
                </Link>
            </div>
        </form>
    )
}