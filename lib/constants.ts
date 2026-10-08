import {CmsMenuTabsType} from "@/types";
import {ImageIcon, MapPin, Package} from "lucide-react";
import {Destination} from "@/features/tours/types";

export const TABS: CmsMenuTabsType[] = [
    {href: "/cms/tours", label: "Tours", icon: Package},
    {href: "/cms/destinations", label: "Destinations", icon: MapPin},
    {href: "/cms/gallery", label: "Gallery", icon: ImageIcon},
]

export const DESTINATIONS: Destination[] = [
    {
        id: 1,
        name: "sigiriya"
    },
    {
        id: 2,
        name: "mirissa"
    },
    {
        id: 3,
        name: "negombo"
    },
    {
        id: 4,
        name: "galle"
    },
]