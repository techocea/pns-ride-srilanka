"use client";

import {useMemo} from "react";
import {TourCardData} from "@/features/tours/types";
import {TOUR_TYPES} from "@/features/tours/schemas/tour.schema";
import {ALL, filterTours} from "@/features/tours/utils/filter";
import {TourCard} from "@/features/tours/components/public/TourCard";
import {useTourFilters} from "@/features/tours/providers/TourFilterProvider";
import {Button} from "@/components/ui/button";
import {TabBar} from "@/components/shared/TabBar";

export function ToursSection({tours}: { tours: TourCardData[] }) {
    const {type, destination, setFilters} = useTourFilters()

    const tabs = useMemo(
        () => [{value: ALL, label: 'All'}, ...TOUR_TYPES.filter((t) => tours.some((x) => x.tourType === t.value))],
        [tours],
    )

    const visible = useMemo(() => filterTours(tours, {type, destination}), [tours, type, destination])

    return (
        <section id="packages" aria-labelledby="packages-title" className="px-6 py-20">
            <div className="mx-auto max-w-6xl w-full">
                <div className="md:max-w-lg w-full mx-auto space-y-6 text-center">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-gold">curated journeys</p>
                    <h2 id="packages-title" className="mt-3 font-serif capitalize text-4xl md:text-5xl">tour
                        packages</h2>
                    <p className="text-sm md:text-base text-muted-foreground">Every itinerary is crafted by specialists with deep roots in
                        Ceylon&apos;s culture, landscape, and hidden corners.</p>
                </div>

                <hr className="my-10"/>
                <div className="my-10">
                    <TabBar label="Filter tours by type" tabs={tabs} value={type}
                            onChange={(v) => setFilters({type: v})}/>
                </div>

                {visible.length === 0 ? (
                    <div className="mt-12 text-center text-muted">
                        <p>No tours match this search.</p>
                        <Button type="button" onClick={() => setFilters({type: ALL, destination: ALL})}
                                className="mt-3 text-gold underline">
                            Show all tours
                        </Button>
                    </div>
                ) : (
                    <div className="mt-12 md:px-8 grid sm:grid-cols-2 lg:grid-cols-3">
                        {visible.map((tour) => (
                            <TourCard key={tour.id} tour={tour}/>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}