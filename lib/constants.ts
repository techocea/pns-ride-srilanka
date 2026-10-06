import {CmsMenuTabsType} from "@/types";
import {ImageIcon, MapPin, Package} from "lucide-react";

export const TABS: CmsMenuTabsType[] = [
    {href: "/cms/tours", label: "Tours", icon: Package},
    {href: "/cms/destinations", label: "Destinations", icon: MapPin},
    {href: "/cms/gallery", label: "Gallery", icon: ImageIcon},
]