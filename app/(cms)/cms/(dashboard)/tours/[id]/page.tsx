import Link from "next/link";
import {notFound} from "next/navigation";
import {Button} from "@/components/ui/button";
import {TitleHeader} from "@/components/shared/TitleHeader";
import {TourForm} from "@/features/tours/components/TourForm";
import {findTour} from "@/features/tours/services/tour.service";
import {getDestinationOptions} from "@/features/destinations/services/destination.service";

export default async function EditTour({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params

    const [tour, destinations] = await Promise.all([findTour(id), getDestinationOptions()])

    if (!tour) notFound()

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
                <TitleHeader title={"Edit Journey"}
                             description={"Define the details and day-by-day itinerary for a new curated travel experience. All fields below will be displayed on the public site."}/>
            </div>
            <div className="w-full">
                <TourForm tour={tour} destinations={destinations}/>
            </div>
        </div>
    </div>
}