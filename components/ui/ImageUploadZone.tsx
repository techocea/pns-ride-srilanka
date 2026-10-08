'use client'

import {useEffect, useRef, useState} from 'react'
import {Loader2, UploadCloud, X} from 'lucide-react'
import {Button} from '@/components/ui/button'
import Image from "next/image";
import {IMAGE_RULES, useImageItems, type ImageItem} from '@/features/media/hooks/use-image-items'

type Props = {
    name: string
    initialImages?: ImageItem[]
    maxFiles?: number
    onBusyChange?: (busy: boolean) => void
}

export function ImageUploadZone({name, initialImages, maxFiles = IMAGE_RULES.maxFiles, onBusyChange}: Props) {
    const {items, error, uploading, entries, add, remove, makeCover} = useImageItems({
        initial: initialImages,
        maxFiles,
    })
    const [dragging, setDragging] = useState(false)
    const browseRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        onBusyChange?.(uploading)
    }, [uploading, onBusyChange])

    return (
        <div className="space-y-3">
            <div
                onDragOver={(e) => {
                    e.preventDefault()
                    setDragging(true)
                }}
                onDragLeave={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragging(false)
                }}
                onDrop={(e) => {
                    e.preventDefault()
                    setDragging(false)
                    void add(e.dataTransfer.files)
                }}
                className={`border border-dashed p-6 text-center transition-colors ${
                    dragging ? 'border-gold bg-gold/10' : 'border-line bg-surface'
                }`}
            >
                <UploadCloud size={24} className="mx-auto mb-3 text-gold"/>
                <p className="text-sm text-white">Drag &amp; drop images</p>
                <p className="mb-4 mt-2 text-xs text-muted">
                    JPG, PNG, WebP · 16 MB each · up to {maxFiles} images
                </p>
                <Button size={"sm"} type="button" variant="outline" onClick={() => browseRef.current?.click()}>
                    Browse images
                </Button>

                <input
                    ref={browseRef}
                    type="file"
                    multiple
                    accept={IMAGE_RULES.types.join(',')}
                    aria-label="Choose images"
                    className="hidden"
                    onChange={(e) => {
                        if (e.target.files) void add(e.target.files)
                        e.target.value = ''
                    }}
                />

                {/* the only field submitted with the form: ordered list, first = cover */}
                <input type="hidden" name={name} value={JSON.stringify(entries)}/>
            </div>

            {error && (
                <p role="alert" className="text-xs text-red-400">
                    {error}
                </p>
            )}

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {items.map((item, index) => (
                    <div key={item.key} className="relative border border-line bg-surface">
                        {/* plain <img>: blob previews can't go through next/image */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <Image
                            width={400}
                            height={400}
                            src={item.src}
                            alt={`Image ${index + 1}`}
                            className={`h-24 w-full object-cover ${item.status === 'uploading' ? 'opacity-40' : ''}`}
                        />

                        {item.status === 'uploading' && (
                            <Loader2 size={18}
                                     className="absolute left-1/2 top-9 -translate-x-1/2 animate-spin text-gold"/>
                        )}

                        <Button
                            type="button"
                            variant={"destructive"}
                            aria-label={`Remove image ${index + 1}`}
                            onClick={() => remove(item.key)}
                            className="absolute right-1 top-1 bg-ink p-1 text-white transition hover:text-gold"
                        >
                            <X size={12}/>
                        </Button>

                        {index === 0 ? (
                            <p className="py-2 text-center text-[10px] uppercase tracking-[0.15em] text-gold">Cover
                                image</p>
                        ) : (
                            <Button
                                type="button"
                                disabled={item.status === 'uploading'}
                                onClick={() => makeCover(item.key)}
                                className="w-full py-2 text-[10px] uppercase tracking-[0.15em] text-muted transition hover:text-gold disabled:opacity-40"
                            >
                                Use as cover
                            </Button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}