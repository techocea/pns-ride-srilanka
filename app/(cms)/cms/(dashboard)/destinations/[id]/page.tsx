import Link from "next/link";
import {notFound} from "next/navigation";
import {Button} from "@/components/ui/button";
import {TitleHeader} from "@/components/shared/TitleHeader";
import {findDestination} from "@/features/destinations/services/destination.service";
import {DestinationForm} from "@/features/destinations/components/DestinationForm";

export default async function EditDestinationPage({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params
    const destination = await findDestination(id)
    if (!destination) notFound()

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
                <TitleHeader title={"Edit Destination"}
                             description={"Define the details of the places they visit. All fields below will be displayed on the public site."}/>
            </div>
            <div className="w-full">
                <DestinationForm destination={destination}/>
            </div>
        </div>
    </div>
}