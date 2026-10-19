import DestinationsSection from "@/features/destinations/components/public/DestinationsSection";
import {getPublishedDestinations} from "@/features/destinations/services/destination.service.public";

export default async function DestinationsPage() {
    const destinations = await getPublishedDestinations();

    return <DestinationsSection destinations={destinations}/>
}