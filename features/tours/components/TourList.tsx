import {Tour} from "@/payload-types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import {TourRowActions} from "./TourRowActions";
import {Button} from "@/components/ui/button";
import {uploadthingLoader} from "@/features/gallery/utils/uploadthing-loader";

const cols = 'grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] items-center gap-4 px-6'

function StatusBadge({tour}: { tour: Tour }) {
    const base = 'inline-block px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em]'
    if (tour.status === 'draft') return <span className={`${base} bg-white/5 text-muted`}>Drafted</span>
    if (tour.featured) return <span className={`${base} bg-gold/40 text-gold`}>Featured</span>
    return <span className={`${base} bg-white/5 text-white/70`}>Published</span>
}

export default function TourList({tours}: { tours: Tour[] }) {
    return <Table>
        <TableHeader>
            <TableRow>
                <TableHead className="w-10">Tour Package</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {tours.map((tour) => {
                const cover = typeof tour.coverImage === 'object' ? tour.coverImage : null
                const src = cover?.url
                const draft = tour.status === 'draft'

                return (
                    <TableRow key={tour.id}>
                        <TableCell className={`${cols} h-[78px] border-t border-line ${draft ? 'opacity-50' : ''}`}>
                            <div className="flex items-center gap-4">
                                {src ? (
                                    <Image src={src} alt={cover?.alt ?? tour.title} width={54} height={64} loader={uploadthingLoader}
                                           className="h-[42px] w-[64px] object-cover"/>
                                ) : (
                                    <div className="h-[42px] w-[54px] bg-surface"/>
                                )}
                                <div>
                                    <p className="font-serif text-sm capitalize leading-tight">{tour.title}</p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <Button size={"xs"}
                                    className="uppercase text-[10px] border-gold text-gold bg-transparent hover:bg-transparent hover:text-gold hover:border-gold">
                                {tour.tourType}
                            </Button>
                        </TableCell>
                        <TableCell>{tour.durationDays} days</TableCell>
                        <TableCell>${tour.price.toLocaleString('en-US')}</TableCell>
                        <TableCell> <StatusBadge tour={tour}/></TableCell>
                        <TableCell> <TourRowActions id={String(tour.id)} title={tour.title}
                                                    draft={draft}/></TableCell>
                    </TableRow>
                )
            })}
        </TableBody>
    </Table>
}