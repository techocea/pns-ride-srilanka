import type { Metadata } from 'next'
import { absoluteUrl, site } from '@/lib/site'
import { JsonLd } from '@/components/seo/JsonLd'
import {AboutCta} from "@/features/about/components/AboutCTA";
import { AboutHero } from '@/features/about/components/AboutHero'
import { AboutStory } from '@/features/about/components/AboutStory'
import { AboutValues } from '@/features/about/components/AboutValues'
import {getPublishedTours} from "@/features/tours/services/tour.service.public";
import { AboutDestinations } from '@/features/about/components/AboutDestinations'
import {InquiryButton} from "@/features/inquiries/components/public/InquiryButton";
import {getPublishedDestinations} from "@/features/destinations/services/destination.service.public";

export const revalidate = 3600

export const metadata: Metadata = {
    title: 'About us',
    description: 'TODO: 150-160 characters about who you are and what you offer',
    alternates: { canonical: '/about' },
}

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`

export default async function AboutPage() {
    const [tours, destinations] = await Promise.all([getPublishedTours(), getPublishedDestinations()])

    const summary =
        tours.length && destinations.length
            ? `${plural(tours.length, 'journey', 'journeys')} across ${plural(destinations.length, 'destination', 'destinations')}`
            : ''

    return (
        <>
            <JsonLd
                data={{
                    '@context': 'https://schema.org',
                    '@type': 'AboutPage',
                    name: `About ${site.name}`,
                    url: absoluteUrl('/about'),
                }}
            />

            <AboutHero summary={summary} />
            <AboutStory  />
            <AboutValues />
            <AboutDestinations destinations={destinations} />
            <AboutCta action={<InquiryButton  size="lg" label="Plan my trip" className="uppercase" />} />
        </>
    )
}