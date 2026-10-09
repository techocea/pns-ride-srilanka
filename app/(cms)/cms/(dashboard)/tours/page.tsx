import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {getTourStats, getTours} from "@/features/tours/services/tour.service";
import TourList from "@/features/tours/components/TourList";
import Link from "next/link";
import {TitleHeader} from "@/components/shared/TitleHeader";

export default async function ToursPage() {
    const [{docs}, stats] = await Promise.all([getTours(), getTourStats()])

    return (
        <div
            className="mx-auto">
            <div className="flex items-center justify-between mb-6">
                <TitleHeader title={"Tour Package Management"} description={`${stats.total} packages total · ${stats.featured} featured`}/>
                <Link href={"/cms/tours/new"}>
                    <Button
                        size={"default"}
                        className="border-gold text-gold bg-transparent "
                    >
                        <Plus size={12}/> Add Package
                    </Button>
                </Link>
            </div>
            <div className="border border-border overflow-x-auto">
                <TourList tours={docs}/>
            </div>
        </div>
    )
}