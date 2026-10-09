import {TitleHeader} from "@/components/shared/TitleHeader";
import {TourForm} from "@/features/tours/components/TourForm";
import {getDestinations} from "@/features/destinations/services/destination.service";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default async function CreateTour() {
    const destinations = await getDestinations();

    return <div className="max-w-2xl w-full mx-auto">
        <div className="space-y-10">
            <div className="space-y-2">
                <Button
                    size={"sm"}
                    variant={"ghost"}
                    className="uppercase p-0"
                >
                    <Link href="/cms/tours"> back
                    </Link>
                </Button>
                <TitleHeader title={"New Journey"}
                             description={"Define the details and day-by-day itinerary for a new curated travel experience. All fields below will be displayed on the public site."}/>
            </div>
            <div className="w-full">
                <TourForm destinations={destinations}/>
            </div>
        </div>
    </div>
}