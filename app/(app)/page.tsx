
import React from "react";
import {STATS, TRUST_US} from "@/lib/constants";
import {Hero} from "@/features/home/components/Hero";
import ContactSection from "@/features/inquiries/components/public/ContactSection";
import {AboutTeaser} from "@/features/about/components/AboutTeaser";
import TestimonialSection from "@/features/home/components/TestimonialSection";
import {ToursSection} from "@/features/tours/components/public/ToursSection";
import {GallerySection} from "@/features/gallery/components/public/GallerySection";
import {getPublishedTours} from "@/features/tours/services/tour.service.public";
import {getPublicGallery} from "@/features/gallery/services/gallery.service.public";
import DestinationsSection from "@/features/destinations/components/public/DestinationsSection";
import {getPublishedDestinations} from "@/features/destinations/services/destination.service.public";
import {StatsSection} from "@/features/home/components/StatsSection";
import {WhyChooseUsSection} from "@/features/home/components/WhyChooseUsSection";
import {FaqSection} from "@/features/home/components/FaqSection";

export default async function Home() {
    const [tours, destinations, gallery] = await Promise.all([getPublishedTours(), getPublishedDestinations(), getPublicGallery()]);
    // console.log("Published gallery items:", gallery);

    const photos = destinations.flatMap((d) => (d.image ? [d.image] : []))
    const aboutImage = photos[1] ?? photos[0] ?? null

    return (
        <React.Fragment>
            <Hero/>
            <StatsSection items={TRUST_US}/>
            <WhyChooseUsSection/>
            <hr/>
            <AboutTeaser image={aboutImage}/>
            <StatsSection items={STATS}/>
            {/*<TripPlannerWidget />*/}
            <ToursSection tours={tours}/>
            <DestinationsSection destinations={destinations}/>
            <hr/>
            <GallerySection gallery={gallery}/>
            <hr/>
            <TestimonialSection/>
            <hr/>
            <FaqSection/>
            <ContactSection/>
            <hr/>
        </React.Fragment>
    )
}
