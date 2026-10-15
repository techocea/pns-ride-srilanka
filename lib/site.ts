import {FaFacebookF, FaInstagram} from "react-icons/fa";
import {MailIcon, PhoneIcon} from "lucide-react";

export const site = {
    name: 'PNS Ride Sri Lanka',
    url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, ''),
    description: 'Discover paradise with pnsridesrilanka.com. Book custom Sri Lanka tour packages with reliable private drivers. Start planning your dream vacation today!',
    contacts: [
        {
            icon: PhoneIcon,
            label: "Phone",
            description: '+94765711106'
        },
        {
            icon: MailIcon,
            label: "Email",
            description: 'pnsridetoursandtravel@gmail.com'
        }],
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