import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {getTourStats, getTours} from "@/features/tours/services/tour.service";
import TourList from "@/features/tours/components/TourList";
import Link from "next/link";
import {TitleHeader} from "@/components/shared/TitleHeader";

export default async function ToursPage() {
    const [{docs}, stats] = await Promise.all([getTours(), getTourStats()])

    return (
        <>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <TitleHeader title={"Tour Package Management"}
                             description={`${stats.total} packages total · ${stats.featured} featured`}/>
                <Link href={"/cms/tours/new"} className="w-full sm:w-auto">
                    <Button
                        size={"default"}
                        className="w-full sm:w-auto border-gold text-gold bg-transparent "
                    >
                        <Plus size={14}/> Add Package
                    </Button>
                </Link>
            </div>
            <div className="border border-border overflow-x-auto">
                <TourList tours={docs}/>
            </div>
        </>
    )
}