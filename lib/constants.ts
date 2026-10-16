import {CmsMenuTabsType} from "@/types";
import {ImageIcon, MapPin, Package, Star, Award, Users, Globe} from "lucide-react";

export const PRICE_CURRENCY = "USD";

export const CMS_MENU: CmsMenuTabsType[] = [
    {href: "/cms/tours", label: "Tours", icon: Package},
    {href: "/cms/destinations", label: "Destinations", icon: MapPin},
    {href: "/cms/gallery", label: "Gallery", icon: ImageIcon},
] as const;

export const NAV_LINKS = [
    {href: '/#packages', label: 'Packages'},
    {href: '/#destinations', label: 'Destinations'},
    {href: '/#gallery', label: 'Gallery'},
    {href: '/about', label: 'About'},
] as const

export const FOOTER_LINKS = [
    {href: '/privacy-policy', label: 'Privacy Policy'},
    {href: '/terms-and-conditions', label: 'Terms and Conditions'},
    {href: '/about-us', label: 'About Us'},
    {href: '/#testimonials', label: 'Testimonials'},
    {href: '/blogs', label: 'Blogs'},
] as const

export const HERO_SLIDES = [
    {
        image:
            "https://g4518yf2e3.ufs.sh/f/iz1TLKwtTZx3zJYd1k0xkSnDcbNQhqF4Xt29PJH3LZm6WovU",
        alt: "The ancient Sigiriya rock fortress rising above the Sri Lankan landscape",
    },
    {
        image:
            "https://g4518yf2e3.ufs.sh/f/iz1TLKwtTZx3oJeSTDN61sBPhYRwAWLVufzoq4eaXlQgmb5v",
        alt: "A train crossing Nine Arch Bridge through the forest near Ella",
    },
    {
        image:
            "https://g4518yf2e3.ufs.sh/f/iz1TLKwtTZx3Hmm585L4gbAx03VuBhDijQ8ZlyPGSfvHK92I",
        alt: "Aerial view of a palm-fringed tropical beach on Sri Lanka’s southern coast",
    },
    {
        image:
            "https://g4518yf2e3.ufs.sh/f/iz1TLKwtTZx38LV1yXp1KVsAcfh9gDNyw4EBkqpT7XZFxiUI",
        alt: "Wild elephants standing in the water in a Sri Lankan national park",
    },
] as const;

export const STATS = [
    {value: "2,400+", label: "Journeys Crafted", icon: Globe},
    {value: "17", label: "Years of Expertise", icon: Award},
    {value: "98%", label: "Guest Satisfaction", icon: Star},
    {value: "64", label: "Countries Served", icon: Users},
] as const

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