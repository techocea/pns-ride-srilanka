'use client'

import React, {useEffect} from "react";
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {inputClass} from '@/components/ui/field'
import {ChevronDown, ChevronUp, Plus, Trash2} from 'lucide-react'
import {InitialItineraryRow, useItineraryRows} from "@/features/tours/hooks/useItineraryRows";
import {ImageUploadZone} from "@/components/cms/ImageUploadZone";

type Props = {
    name: string
    initialRows?: InitialItineraryRow[]
    error?: string
    onBusyChange?: (busy: boolean) => void
}

function IconButton({
                        label,
                        onClick,
                        disabled,
                        children,
                    }: {
    label: string
    onClick: () => void
    disabled?: boolean
    children: React.ReactNode
}) {
    return (
        <button
            type="button"
            aria-label={label}
            onClick={onClick}
            disabled={disabled}
            className="flex size-7 items-center justify-center border border-line text-muted transition hover:border-gold hover:text-gold disabled:opacity-30"
        >
            {children}
        </button>
    )
}

export function ItineraryEditor({name, initialRows, error, onBusyChange}: Props) {
    const {rows, add, remove, update, move, setCover, setUploading, busy, serialized} =
        useItineraryRows(initialRows)

    useEffect(() => {
        onBusyChange?.(busy)
    }, [busy, onBusyChange])

    return (
        <div className="grid gap-3">
            <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted">Itinerary</span>
                <Button type="button" variant="outline" size="sm" onClick={add}>
                    <Plus size={12}/> Add day
                </Button>
            </div>

            <input type="hidden" name={name} value={serialized}/>

            {rows.length === 0 && (
                <p className="border border-dashed border-line p-6 text-center text-xs text-muted">
                    No days yet. Add the first one.
                </p>
            )}

            {rows.map((row, index) => (
                <div key={row.key} className="grid gap-3 border border-line bg-surface p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-gold">Day {index + 1}</span>
                        <div className="flex gap-1">
                            <IconButton label="Move up" disabled={index === 0} onClick={() => move(row.key, -1)}>
                                <ChevronUp size={14}/>
                            </IconButton>
                            <IconButton label="Move down" disabled={index === rows.length - 1}
                                        onClick={() => move(row.key, 1)}>
                                <ChevronDown size={14}/>
                            </IconButton>
                            <IconButton label={`Remove day ${index + 1}`} onClick={() => remove(row.key)}>
                                <Trash2 size={14}/>
                            </IconButton>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-muted">Day photo</span>
                        <ImageUploadZone
                            maxFiles={1}
                            initialImages={row.initialCover}
                            coverControls={false}
                            onEntriesChange={(entries) => setCover(row.key, entries)}
                            onBusyChange={(isBusy) => setUploading(row.key, isBusy)}
                        />
                    </div>
                    <Input
                        value={row.title}
                        maxLength={80}
                        onChange={(e) => update(row.key, {title: e.target.value})}
                        placeholder="Arrival in Colombo"
                        aria-label={`Day ${index + 1} title`}
                    />
                    <textarea
                        value={row.details}
                        rows={3}
                        maxLength={600}
                        onChange={(e) => update(row.key, {details: e.target.value})}
                        placeholder="What happens on this day"
                        aria-label={`Day ${index + 1} details`}
                        className={inputClass}
                    />
                </div>
            ))}

            {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
    )
}