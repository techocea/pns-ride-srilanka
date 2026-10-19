import {ToursSection} from "@/features/tours/components/public/ToursSection";
import {getPublishedTours} from "@/features/tours/services/tour.service.public";

export default async function PackagesPage() {
    const tours = await getPublishedTours();

    return <ToursSection tours={tours}/>
}