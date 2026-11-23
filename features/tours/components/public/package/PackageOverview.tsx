import type {TourDetailData} from '@/features/tours/types'
import {calcDurationNights} from "@/features/tours/utils/calc-duration";
import {InquiryButton} from "@/features/inquiries/components/public/InquiryButton";
import React from "react";

export function PackageOverview({tour}: { tour: TourDetailData }) {
    if (tour.paragraphs.length === 0) return null

    const durationDays = tour.durationDays
    const durationNights = calcDurationNights(durationDays);

    const rows = [
        {detail: "Duration", information: `${durationDays} Days / ${durationNights}`},
        {detail: "Tour type", information: "Private guided journey"},
        {
            detail: "Price", information: <InquiryButton
                variant={"ghost"}
                size={"icon-sm"}
                label="get a quote"
                tourTitle={tour.title}
                className="font-semibold ml-11"
            />
        },
        {detail: "Transport", information: "Private vehicle"},
        {detail: "Starting point", information: "Bandaranaike International Airport (CMB)"},
        {detail: "Ending point", information: "Bandaranaike International Airport (CMB)"},
    ];


    return (
        <section className="border-b border-line bg-secondary py-20 lg:py-28">
            <div className="mx-auto max-w-6xl w-full gap-16 px-6 text-left lg:px-12">
                <div className="mb-12 flex items-end justify-between gap-8 text-left">
                    <div>
                        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                            Package Overview
                        </p>
                        <h2 className="font-serif text-4xl capitalize sm:text-5xl">
                            Key details of your journey
                        </h2>
                    </div>
                </div>
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="border-b border-white/15">
                        <th className="py-3.5 pr-6 text-sm sm:text-base font-semibold text-white w-1/3 sm:w-1/4">
                            Detail
                        </th>
                        <th className="py-3.5 text-sm sm:text-base font-semibold text-white">
                            Information
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-white/15">
                    {rows.map((item, index) => (
                        <tr key={index} className="hover:bg-white/[0.03] transition-colors">
                            <td className="py-4 pr-6 text-sm sm:text-base text-gray-200 align-top">
                                {item.detail}
                            </td>
                            <td className="py-4 text-sm sm:text-base text-gray-200 align-top">
                                {item.information}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}