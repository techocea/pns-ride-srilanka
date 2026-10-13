import Link from "next/link";
import {Button} from "@/components/ui/button";
import {TitleHeader} from "@/components/shared/TitleHeader";
import {DestinationForm} from "@/features/destinations/components/DestinationForm";

export default function CreateDestinationPage() {
    return <div className="max-w-2xl w-full mx-auto">
        <div className="space-y-10">
            <div className="space-y-2">
                <Button
                    size={"sm"}
                    variant={"ghost"}
                    className="uppercase p-0"
                >
                    <Link href="/cms/destinations"> back
                    </Link>
                </Button>
                <TitleHeader title={"Configure destination"}
                             description={"Define the details of the places they visit. All fields below will be displayed on the public site."}/>
            </div>
            <div className="w-full">
                <DestinationForm/>
            </div>
        </div>
    </div>
}