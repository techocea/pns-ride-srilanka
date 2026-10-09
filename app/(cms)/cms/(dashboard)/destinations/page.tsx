import Link from "next/link";
import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {TitleHeader} from "@/components/shared/TitleHeader";
import {getDestinations, getDestinationStats} from "@/features/destinations/services/destination.service";
import DestinationList from "@/features/destinations/components/DestinationList";

export default async function DestinationsPage(){
    const [destinations, stats] = await Promise.all([getDestinations(), getDestinationStats()]);

    return (
        <div
            className="mx-auto">
            <div className="flex items-center justify-between mb-6">
                <TitleHeader title={"Destinations Management"} description={`${stats.total} destinations total · ${stats.published} published`}/>
                <Link href={"/cms/destinations/new"}>
                    <Button
                        size={"default"}
                        className="border-gold text-gold bg-transparent "
                    >
                        <Plus size={12}/> Add Destination
                    </Button>
                </Link>
            </div>
            <div>
                <DestinationList destinations={destinations}/>
            </div>
        </div>
    )
}