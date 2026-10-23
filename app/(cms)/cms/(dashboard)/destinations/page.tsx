import Link from "next/link";
import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {TitleHeader} from "@/components/shared/TitleHeader";
import {getDestinations, getDestinationStats} from "@/features/destinations/services/destination.service";
import DestinationList from "@/features/destinations/components/DestinationList";

export default async function DestinationsPage() {
    const [destinations, stats] = await Promise.all([getDestinations(), getDestinationStats()]);

    return (
        <>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <TitleHeader title={"Destinations Management"}
                             description={`${stats.total} destinations total · ${stats.published} published`}/>
                <Link href={"/cms/destinations/new"} className="w-full sm:w-auto">
                    <Button
                        size={"default"}
                        className="w-full sm:w-auto border-gold text-gold bg-transparent "
                    >
                        <Plus size={14}/> Add Destination
                    </Button>
                </Link>
            </div>
            <div>
                <DestinationList destinations={destinations}/>
            </div>
        </>
    )
}