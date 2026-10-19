import {TitleHeader} from "@/components/shared/TitleHeader";
import {getInquiryCounts, listInquiries} from "@/features/inquiries/services/inquiry.service";
import {isInquiryStatus} from "@/features/inquiries/constants";
import {redirect} from "next/navigation";
import {inquiriesHref} from "@/features/inquiries/utils/cms-url";
import InquiryList from "@/features/inquiries/components/InquiryList";
import {InquiryFilters} from "@/components/cms/InquiryFilters";
import {Pagination} from "@/components/cms/Pagination";

type Props = { searchParams: Promise<{ status?: string; page?: string }> }

export default async function InquiriesPage({searchParams}: Props) {
    const sp = await searchParams
    const status = isInquiryStatus(sp.status) ? sp.status : undefined
    const page = Math.max(1, Number.parseInt(sp.page ?? '1', 10) || 1)

    const [{docs, totalPages}, counts] = await Promise.all([listInquiries({status, page}), getInquiryCounts()])

    if (totalPages > 0 && page > totalPages) redirect(inquiriesHref({status, page: totalPages}))

    return (
        <div
            className="mx-auto">
            <div className="flex items-center justify-between mb-6">
                <TitleHeader title={"Inquiry Management"}
                             description={`${counts.all} total · ${counts.new} new`}/>
            </div>
            <div className="border border-border overflow-x-auto">
                <InquiryFilters active={status} counts={counts}/>

                <InquiryList docs={docs} emptyText={status ? `No ${status} enquiries.` : 'No enquiries yet.'}/>

                <Pagination page={page} totalPages={totalPages} hrefFor={(p) => inquiriesHref({status, page: p})}/>
            </div>
        </div>
    )
}