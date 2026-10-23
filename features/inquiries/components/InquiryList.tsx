import {cn} from "@/lib/utils";
import {InquiryRow} from "@/features/inquiries/types";
import {InquiryStatusSelect} from "@/features/inquiries/components/InquiryStatusSelect";
import {InquiryRowActions} from "@/features/inquiries/components/InquiryRowActions";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {formatReceived, formatTravelDate, formatTravelers} from "@/features/inquiries/utils/format";

const cols = 'grid grid-cols-[1.6fr_1.6fr_1.1fr_1fr_0.9fr_1fr] items-center gap-4 px-6'

export default function InquiryList({docs, emptyText}: { docs: InquiryRow[]; emptyText: string }) {
    return <Table>
        <TableHeader>
            <TableRow>
                <TableHead className="w-24 md:w-48">Enquirer</TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Travel</TableHead>
                <TableHead>Received</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {docs.length === 0 ? (
                <TableRow>
                    <TableCell
                        colSpan={100}
                        className="border-t border-line py-16 text-center text-sm text-muted-foreground"
                    >
                        {emptyText}
                    </TableCell>
                </TableRow>
            ) : (
                docs.map((i) => (
                        <TableRow key={i.id}>
                            <TableCell
                                className={cn(cols, 'min-h-[84px] border-t border-line py-3', i.status === 'closed' && 'opacity-60')}>
                                <div className="min-w-24">
                                    <p className="flex items-center gap-2 font-serif text-base md:text-lg leading-tight">
                                        {i.status === 'new' &&
                                            <span aria-label="New" className="size-1.5 shrink-0 rounded-full bg-gold"/>
                                        }
                                        <span className="text-white truncate">{i.name}</span>
                                    </p>
                                    <p className="mt-0.5 text-[11px] text-muted-foreground">{i.email}</p>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="min-w-0">
                                    <p className="truncate text-sm text-white/90">{i.tourTitle || 'General enquiry'}</p>
                                    <p className="mt-0.5 line-clamp-1 text-[11px] text-muted-foreground">{i.message}</p>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="text-sm text-white/80">
                                    <p>{formatTravelDate(i.travelDate) ||
                                        <span className="text-muted-foreground">Flexible</span>}</p>
                                    <p className="mt-0.5 text-[11px] text-muted-foreground">{formatTravelers(i.travelers)}</p>
                                </div>
                            </TableCell>
                            <TableCell className="text-sm">{formatReceived(i.createdAt)}</TableCell>
                            <TableCell>
                                <InquiryStatusSelect id={i.id} status={i.status}/>
                            </TableCell>
                            <TableCell>
                                <InquiryRowActions inquiry={i}/>
                            </TableCell>
                        </TableRow>
                    )
                ))}
        </TableBody>
    </Table>
}