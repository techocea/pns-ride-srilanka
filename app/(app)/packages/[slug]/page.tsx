import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {JsonLd} from '@/components/seo/JsonLd'
import {getPublishedTours, getTourBySlug} from '@/features/tours/services/tour.service.public'
import {absoluteUrl, site} from '@/lib/site'
import {TOUR_TYPES} from "@/features/tours/schemas/tour.schema";
import {tourJsonLd} from "@/features/tours/seo";
import {PackageDetail} from "@/features/tours/components/public/package/PackageDetail";
import {PRICE_CURRENCY} from "@/lib/constants";
import {InquiryPanel} from "@/features/inquiries/components/InquiryPanel";

export const revalidate = 3600

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
    const tours = await getPublishedTours()
    // console.log("tours:", tours);
    return tours.map((t) => ({slug: t.slug}))
}

const typeLabel = (v: string) => TOUR_TYPES.find((t) => t.value === v)?.label ?? ''

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {slug} = await params
    const tour = await getTourBySlug(slug)
    if (!tour) return {}

    const title = `${tour.title} - ${tour.durationDays}-Day ${typeLabel(tour.typeLabel)} Tour`
    const description =
        tour.paragraphs.join(' ').slice(0, 155).trim() ||
        `${tour.durationDays}-day ${tour.typeLabel.toLowerCase()} tour${
            tour.destination ? ` in ${tour.destination.title}` : ''
        }, from $${tour.price}. Enquire online.`

    return {
        title,
        description,
        alternates: {canonical: `/packages/${tour.slug}`},
        openGraph: {
            title,
            description,
            url: absoluteUrl(`/packages/${tour.slug}`),
            images: tour.coverImage ? [{url: tour.coverImage.url, alt: tour.coverImage.alt}] : undefined,
        },
    }
}

export default async function PackagePage({params}: Props) {
    const {slug} = await params
    const tour = await getTourBySlug(slug)
    if (!tour) notFound()


    return (
        <article>
            <JsonLd data={tourJsonLd(tour)}/>
            <PackageDetail
                tour={tour}
                booking={
                    <InquiryPanel
                        tourTitle={tour.title}
                        price={tour.price}
                        currency={PRICE_CURRENCY}
                        whatsappNumber={site.contacts[0].description}
                    />
                }
            />
        </article>
    )
}