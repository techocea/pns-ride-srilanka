import Image from 'next/image'
import {site} from '@/lib/site'
import {Reveal} from "@/components/ui/reveal";
import {aboutContent} from "@/features/about/contents";
import type {PublicImage} from '@/features/media/utils/to-image'
import {uploadthingLoader} from "@/features/gallery/utils/uploadthing-loader";

export function AboutHero({image, summary}: { image: PublicImage | null; summary: string }) {
    return (
        <section className="relative isolate overflow-hidden border-b border-line">
            {image && (
                <>
                    <Image src={image.url} alt={image.alt} fill loader={uploadthingLoader} sizes="55vw"
                           className="object-cover opacity-30"/>
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-secondary/25 to-transparent"/>
                </>
            )}

            <div className="relative z-10 max-w-6xl w-full mx-auto px-6 py-20 text-left lg:px-12 md:py-24">
                <Reveal className="max-w-3xl">
                    <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-gold">{aboutContent.eyebrow}</p>
                    <h1 className="font-serif text-4xl leading- 2xl tracking-tight md:text-5xl">About {site.name}</h1>
                    <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">{aboutContent.lead}</p>
                    {summary && (
                        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-gold">{summary}</p>
                    )}
                </Reveal>
            </div>
        </section>
    )
}