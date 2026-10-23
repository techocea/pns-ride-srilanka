import Image from 'next/image'
import {Reveal} from "@/components/ui/reveal";
import {aboutContent} from "@/features/about/contents";
import type {PublicImage} from '@/features/media/utils/to-image'

export function AboutStory() {
    const {story} = aboutContent

    return (
        <section className="border-b border-line py-20 md:py-24">
            <div className="mx-auto grid max-w-6xl w-full items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-12">
                <Reveal className="grid gap-6">
                    <div>
                        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-gold">{story.eyebrow}</p>
                        <h2 className="font-serif text-2xl md:text-4xl capitalize leading-tight">{story.title}</h2>
                    </div>
                    {story.paragraphs.map((p, i) => (
                        <p key={i} className="text-sm leading-8 text-muted-foreground">{p}</p>
                    ))}
                </Reveal>


                    <Reveal delay={0.1} className="relative aspect-[4/5] overflow-hidden bg-ink">
                        <Image src={"/ella.webp"} alt={"best quality travel service"} fill
                               sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover"/>
                    </Reveal>

            </div>
        </section>
    )
}