'use client'

import Link from 'next/link'
import {useState} from 'react'
import type {Destination, Media} from '@/payload-types'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Field, inputClass} from '@/components/ui/field'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {ImageUploadZone} from '@/components/cms/ImageUploadZone'
import type {ImageItem} from '@/features/media/hooks/use-image-items'
import {useDestinationForm} from '../hooks/useDestinationForm'
import {HIGHLIGHT_LIMITS, parseHighlights} from '../utils/highlights'
import {DestinationHighlights} from "@/features/destinations/components/DestinationHighlights";


const statusItems = [
    {label: 'Published', value: 'published'},
    {label: 'Draft', value: 'draft'},
]

export function DestinationForm({destination}: { destination?: Destination }) {
    const {state, handleSubmit, pending, errors: e} = useDestinationForm()
    const [busy, setBusy] = useState(false)
    const [highlights, setHighlights] = useState(
        destination?.highlights?.map((h) => h.text).join(', ') ?? '',
    )

    const parsed = parseHighlights(highlights)

    return (
        <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-8 w-full">
            {destination && <input type="hidden" name="id" value={destination.id}/>}

            <Field label="Title" error={e.title}>
                <Input name="title" defaultValue={destination?.title}/>
            </Field>

            <Field label="Province" error={e.province}>
                <Input name="province" defaultValue={destination?.province} placeholder="Central Province"/>
            </Field>

            <Field label="Description" error={e.description}>
        <textarea
            name="description"
            rows={4}
            defaultValue={destination?.description ?? ''}
            className={inputClass}
        />
            </Field>

            <div className="grid gap-2">
                <Field label="Highlights (comma separated)" error={e.highlights}>
                    <Input
                        name="highlights"
                        value={highlights}
                        onChange={(ev) => setHighlights(ev.target.value)}
                        placeholder="Tea estates, Waterfalls, Train rides"
                    />
                </Field>
                <p className="text-[10px] text-muted">
                    {parsed.length}/{HIGHLIGHT_LIMITS.maxItems} · up to {HIGHLIGHT_LIMITS.maxLength} characters each
                </p>
                <DestinationHighlights items={parsed}/>
            </div>

            <Field label="Status" error={e.status}>
                <Select name="status" items={statusItems} defaultValue={destination?.status ?? 'published'}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {statusItems.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </Field>

            {/* outside <Field>: a <label> would forward clicks to the first button */}
            <div className="grid gap-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Cover image</span>
                <ImageUploadZone
                    name="images"
                    maxFiles={1}
                    initialImages={toInitialImages(destination)}
                    onBusyChange={setBusy}
                />
                {e.images && <span className="text-xs text-red-400">{e.images}</span>}
            </div>

            {state.error && <p className="text-sm text-red-400">{state.error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2">
                <Button size="lg" type="submit" disabled={pending || busy} className="w-auto uppercase">
                    {pending ? 'Saving...' : 'Save destination'}
                </Button>
                <Button
                    size={"lg"}
                    variant={"outline"}
                    className="uppercase w-auto"
                >
                    <Link href="/cms/destinations"> Cancel
                    </Link>
                </Button>
            </div>
        </form>
    )
}

function toInitialImages(destination?: Destination): ImageItem[] {
    const cover = destination?.coverImage
    if (!cover || typeof cover !== 'object') return []
    const m = cover as Media
    return [{key: m.id, src: m.url, status: 'existing', mediaId: m.id}]
}