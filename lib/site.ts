import {FaFacebookF, FaInstagram} from "react-icons/fa";
import {MailIcon, MapIcon, PhoneIcon} from "lucide-react";

export const site = {
    name: 'PNS Ride Sri Lanka',
    url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, ''),
    description: 'Discover paradise with pnsridesrilanka.com. Book custom Sri Lanka tour packages with reliable private drivers. Start planning your dream vacation today!',
    heroVideo: {
        mp4: 'https://g4518yf2e3.ufs.sh/f/iz1TLKwtTZx3uRSwJ5doECTmnDZUaWcL1MI7yq6SXHkFsQOJ', // set to '' to fall back to the image carousel
        webm: '/videos/hero.webm', // optional: set to '' if you only have the mp4
        poster: '/videos/hero-poster.webp', // required whenever mp4 is set
    },
    contacts: [
        {
            icon: PhoneIcon,
            label: "+94765711106",
            description: '+94 76 571 1106'
        },
        {
            icon: MailIcon,
            label: "Email",
            description: 'pnsridetoursandtravel@gmail.com'
        },
        {
            icon: MapIcon,
            label: "Address",
            description: 'Kandy, Sri Lanka',
        }
    ],
    socials: [
        {
            icon: FaFacebookF,
            label: "Facebook",
            href: 'https://web.facebook.com/profile.php?id=61585056593383&sk=directory_basic_in'
        },
        {
            icon: FaInstagram,
            label: "Instagram",
            href: 'https://web.facebook.com/profile.php?id=61585056593383&sk=directory_basic_in'
        }],
    indexable: process.env.NEXT_PUBLIC_INDEXABLE === 'true', // true in production only
}

export const absoluteUrl = (path: string) => `${site.url}${path}`