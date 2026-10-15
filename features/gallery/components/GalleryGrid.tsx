import type { Gallery } from '@/payload-types'
import {GalleryCard} from "@/features/gallery/components/GalleryCard";

export function GalleryGrid({ items }: { items: Gallery[] }) {
    if (items.length === 0) {
        return (
            <p className="border border-line py-16 text-center text-sm text-muted">
                No gallery images yet. Upload some above.
            </p>
        )
    }

    return (
        <div className="grid grid-cols-2 gap-px bg-line md:grid-cols-4">
            {items.map((item) => (
                <GalleryCard key={item.id} item={item} />
            ))}
        </div>
    )
}