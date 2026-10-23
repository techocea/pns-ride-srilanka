import {CmsMenuTabsType, StatItem} from "@/types";
import {
    ImageIcon,
    MapPin,
    Package,
    Inbox,
} from "lucide-react";

export const PRICE_CURRENCY = "USD";

export const CMS_MENU: CmsMenuTabsType[] = [
    {href: "/cms/tours", label: "Tours", icon: Package},
    {href: "/cms/destinations", label: "Destinations", icon: MapPin},
    {href: "/cms/gallery", label: "Gallery", icon: ImageIcon},
    {href: "/cms/inquiries", label: "Inquiries", icon: Inbox},
] as const;

export const NAV_LINKS = [
    {href: '/packages', label: 'Packages'},
    {href: '/destinations', label: 'Destinations'},
    {href: '/#gallery', label: 'Gallery'},
    {href: '/about', label: 'About'},
] as const

export const FOOTER_LINKS = [
    {href: '/privacy', label: 'Privacy Policy'},
    {href: '/terms', label: 'Terms and Conditions'},
    {href: '/about', label: 'About Us'},
    {href: '/#testimonials', label: 'Testimonials'},
    {href: '/blogs', label: 'Blogs'},
] as const

export const HERO_SLIDES = [
    {
        image:
            "/sigiriya.webp",
        alt: "The ancient Sigiriya rock fortress rising above the Sri Lankan landscape",
    },
    {
        image:
            "/ella.webp",
        alt: "A train crossing Nine Arch Bridge through the forest near Ella",
    },
    {
        image:
            "/galle.webp",
        alt: "Aerial view of a palm-fringed tropical beach on Sri Lanka’s southern coast",
    },
    {
        image:
            "/kandy.webp",
        alt: "Wild elephants standing in the water in a Sri Lankan national park",
    },
] as const;

export const STATS: StatItem[] = [
    {value: "2,400+", label: "Journeys Crafted", icon: 'Globe'},
    {value: "17", label: "Years of Expertise", icon: 'Award'},
    {value: "98%", label: "Guest Satisfaction", icon: 'Star'},
    {value: "64", label: "Countries Served", icon: 'Users'},
]

export const TRUST_US: StatItem[] = [
    {value: "5.0 Star Rated", label: "Top Rated on Google & TripAdvisor", icon: 'Star'},
    {value: "SLTDA Registered", label: "Official Sri Lanka Tourism License", icon: 'ShieldCheck'},
    {value: "Luxury Vehicle Fleet", label: "Fully insured A/C Cars & Vans", icon: 'Award'},
    {value: "Zero Hidden Fees", label: "All fuel, tolls & driver charges included", icon: 'HeartHandshake'},
]

export const TESTIMONIALS = [
    {
        quote:
            "Ceylon Luxe transformed our honeymoon into something completely otherworldly. The attention to detail — every transfer, every meal, every hidden viewpoint — was flawless.",
        name: "Isabelle & Marcus Laurent",
        title: "Paris, France",
        tour: "Island Grand Tour",
    },
    {
        quote:
            "Sigiriya at sunrise, with a private guide who knew every fresco by name. Then Ella by rail at golden hour. I've travelled extensively, and this stood apart.",
        name: "Dr. James Okafor",
        title: "Lagos, Nigeria",
        tour: "Ancient Kingdoms Circuit",
    },
    {
        quote:
            "The blue whale encounter off Mirissa was the single most profound wildlife experience of my life. Ceylon Luxe made it happen without a moment of stress.",
        name: "Sarah Kim",
        title: "Seoul, South Korea",
        tour: "Mirissa Coast Escape",
    },
    {
        quote:
            "The blue whale encounter off Mirissa was the single most profound wildlife experience of my life. Ceylon Luxe made it happen without a moment of stress.",
        name: "Sarah Kim",
        title: "Seoul, South Korea",
        tour: "Mirissa Coast Escape",
    },
    {
        quote:
            "The blue whale encounter off Mirissa was the single most profound wildlife experience of my life. Ceylon Luxe made it happen without a moment of stress.",
        name: "Sarah Kim",
        title: "Seoul, South Korea",
        tour: "Mirissa Coast Escape",
    },
]