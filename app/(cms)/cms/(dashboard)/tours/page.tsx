import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {getTourStats, listTours} from "@/features/tours/services/tour.service";
import TourList from "@/features/tours/components/TourList";

export default async function ToursPage() {
    const [{docs}, stats] = await Promise.all([listTours(), getTourStats()])

    return (
        <div
            className="mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="font-serif text-white text-xl">Tour Packages</h2>
                    <p className="mt-0.5 font-mono text-[10px] text-muted">
                        {stats.total} packages total · {stats.featured} featured
                    </p>
                </div>
                <Button
                    size={"default"}
                    className="border-gold text-gold bg-transparent "
                >
                    <Plus size={12}/> Add Package
                </Button>
            </div>
            <div className="border border-border overflow-x-auto">
                <TourList tours={docs}/>
            </div>
        </div>
    )
}