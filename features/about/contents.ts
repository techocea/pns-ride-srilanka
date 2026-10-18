import {Compass, MapPin, MessageCircle, type LucideIcon} from 'lucide-react'

export const aboutContent = {
    eyebrow: 'About Us',
    lead: 'PNS Ride Sri Lanka helps travellers discover the beauty of Sri Lanka through memorable journeys, scenic routes, and visits to the island’s most popular tourist destinations. From golden beaches and historic landmarks to lush tea plantations and breathtaking mountain landscapes, we help you explore Sri Lanka at your own pace.',

    story: {
        eyebrow: 'Our Story',
        title: 'Your Journey Through the Beauty of Sri Lanka',
        paragraphs: [
            'Sri Lanka is an island filled with incredible experiences, from ancient cultural sites and vibrant coastal towns to misty mountain ranges, wildlife-rich national parks, and beautiful tropical beaches. At PNS Ride Sri Lanka, our goal is to help travellers experience these destinations and discover what makes every part of the island special.',
            'Whether you are planning a relaxing beach holiday, a scenic journey through the hill country, a cultural adventure, or a tour covering Sri Lanka’s most popular attractions, we aim to make your travel experience comfortable, enjoyable, and easy to plan. We help you explore destinations across Sri Lanka with journeys shaped around your interests, itinerary, and travel preferences.',
        ],
    },

    values: {
        eyebrow: 'Why Travel With Us',
        title: 'Discover Sri Lanka With Confidence',
        items: [
            {
                icon: Compass,
                title: 'Journeys Planned Around You',
                text: 'Explore Sri Lanka with travel plans shaped around your preferred destinations, schedule, interests, and pace.',
            },
            {
                icon: MapPin,
                title: 'Explore Sri Lanka’s Top Destinations',
                text: 'Discover beautiful beaches, cultural landmarks, scenic hill-country towns, wildlife destinations, and other highlights across the island.',
            },
            {
                icon: MessageCircle,
                title: 'Personal Travel Assistance',
                text: 'Have a destination in mind or need help planning your route? Contact PNS Ride Sri Lanka to discuss your travel plans and arrange your journey.',
            },
        ] satisfies { icon: LucideIcon; title: string; text: string }[],
    },

    cta: {
        title: 'Ready to Explore Sri Lanka?',
        text: 'Start planning your Sri Lankan adventure with PNS Ride Sri Lanka. Tell us where you want to go, when you plan to visit, and what you would love to experience.',
    },
}