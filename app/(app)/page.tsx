import {StatsSection} from "@/components/landing/StatsSection";
import {HeroCarousel} from "@/components/landing/HeroCarousel";
import ContactSection from "@/components/landing/ContactSection";
import TestimonialSection from "@/components/landing/TestimonialSection";
import {TourFilterProvider} from "@/components/landing/TourFilterProvider";
import {ToursSection} from "@/features/tours/components/public/ToursSection";
import {GallerySection} from "@/features/gallery/components/public/GallerySection";
import DestinationsSection from "@/features/destinations/components/public/DestinationsSection";
import {getPublishedTours} from "@/features/tours/services/tour.service.public";
import {getPublicGallery} from "@/features/gallery/services/gallery.service.public";
import {getPublishedDestinations} from "@/features/destinations/services/destination.service.public";

export default async function Home() {
    const [tours, destinations, gallery] = await Promise.all([getPublishedTours(), getPublishedDestinations(), getPublicGallery()]);
    // console.log("Published gallery items:", gallery);

    return (
        <TourFilterProvider>
            <HeroCarousel/>
            <ToursSection tours={tours}/>
            <StatsSection/>
            <DestinationsSection destinations={destinations}/>
            <hr/>
            <GallerySection gallery={gallery}/>
            <hr/>
            <TestimonialSection/>
            <ContactSection/>
        </TourFilterProvider>
    )
}
