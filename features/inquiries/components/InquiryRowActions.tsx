"use client"

import {useState} from "react";
import {Eye, Mail, Trash2} from "lucide-react";
import {InquiryRow} from "@/features/inquiries/types";
import {replyHref} from "@/features/inquiries/utils/format";
import {useDeleteInquiry} from "@/features/inquiries/hooks/useDeleteInquiry";
import {InquiryDetailDialog} from "@/features/inquiries/components/InquiryDetailDialog";

const btn =
    'flex size-8 items-center justify-center border border-line text-muted transition hover:border-gold hover:text-gold disabled:opacity-40'

export function InquiryRowActions({inquiry}: { inquiry: InquiryRow }) {
    const [open, setOpen] = useState(false)
    const {pending, remove, error} = useDeleteInquiry(inquiry.id, inquiry.name)

    return (
        <div>
            <div className="flex gap-2">
                <button type="button" className={btn} onClick={() => setOpen(true)}
                        aria-label={`View enquiry from ${inquiry.name}`}>
                    <Eye size={14}/>
                </button>
                {/*<a href={replyHref(inquiry)} className={btn} aria-label={`Reply to ${inquiry.name}`}>*/}
                {/*    <Mail size={14}/>*/}
                {/*</a>*/}
                <button type="button" className={btn} onClick={remove} disabled={pending}
                        aria-label={`Delete enquiry from ${inquiry.name}`}>
                    <Trash2 size={14}/>
                </button>
            </div>
            {error && <p role="alert" className="mt-1 text-[10px] text-red-400">{error}</p>}

            <InquiryDetailDialog inquiry={inquiry} open={open} onOpenChange={setOpen}/>
        </div>
    )
}