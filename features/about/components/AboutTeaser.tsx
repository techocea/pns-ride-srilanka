import Image from 'next/image'
import Link from 'next/link'
import {ArrowRight} from 'lucide-react'
import {Reveal} from "@/components/ui/reveal";
import type {PublicImage} from '@/features/media/utils/to-image'
import {aboutContent} from "@/features/about/contents";
import {Button} from "@/components/ui/button";

export function AboutTeaser({image}: { image: PublicImage | null }) {
    const {teaser, values} = aboutContent

    return (
        <section id="about" aria-labelledby="about-title"
                 className="scroll-mt-20 border-b border-line px-6 lg:px-12 py-20 md:py-24">
            <div className="mx-auto grid max-w-6xl w-full items-center gap-14 grid-cols-1 lg:grid-cols-2 lg:gap-20">
                <Reveal className="grid gap-6">
                    <div>
                        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-gold">{teaser.eyebrow}</p>
                        <h2 id="about-title"
                            className="font-serif text-3xl leading-tight sm:text-5xl">{teaser.title}</h2>
                    </div>

                    <p className="text-sm leading-6 md:leading-8 text-muted-foreground">{teaser.text}</p>

                    <ul className="grid gap-5 border-y border-line py-6 sm:grid-cols-3">
                        {values.items.map(({icon: Icon, title}) => (
                            <li key={title} className="flex items-center gap-3 sm:flex-col sm:items-start">
                                <Icon size={20} className="shrink-0 text-gold"/>
                                <span className="text-sm text-white/90">{title}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="max-sm:flex max-sm:justify-center max-sm:w-full">
                        <Button size="lg">
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2"
                            >
                                {teaser.linkLabel} <ArrowRight size={14}/>
                            </Link>
                        </Button>
                    </div>
                </Reveal>

                {image && (
                    <Reveal delay={0.1} className="relative aspect-[4/3] overflow-hidden bg-ink lg:aspect-[4/5]">
                        <Image src={image.url} alt={image.alt} fill sizes="(min-width: 1024px) 50vw, 100vw"
                               className="object-cover"/>
                    </Reveal>
                )}
            </div>
        </section>
    )
}