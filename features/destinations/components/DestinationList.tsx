import {Destination} from "@/payload-types";
import {DestinationCard} from "@/features/destinations/components/DestinationCard";

export default function DestinationList({destinations}: { destinations: Destination[] }) {
    return <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {destinations.map((dest, index) => (
            <DestinationCard key={dest.id} destination={dest} index={index} />
        ))}
    </div>
}