import {LucideIcon} from "lucide-react";

export interface CmsMenuTabsType {
    href: string;
    label: string;
    icon: LucideIcon;
}

export type StatItem = {
    icon: string;
    value: string;
    label: string;
};

interface StatsSectionProps {
    items: StatItem[];
}
