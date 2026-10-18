import {Reveal} from "@/components/ui/reveal";
import {aboutContent} from "@/features/about/contents";

export function AboutValues() {
    const { values } = aboutContent

    return (
        <section className="py-20 lg:py-24">
            <div className="mx-auto max-w-6xl w-full px-6 lg:px-12">
                <Reveal className="mb-12 text-left">
                    <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-gold">{values.eyebrow}</p>
                    <h2 className="font-serif text-4xl sm:text-5xl">{values.title}</h2>
                </Reveal>

                <ul className="grid gap-2 bg-line md:grid-cols-3">
                    {values.items.map(({ icon: Icon, title, text }, i) => (
                        <Reveal as="li" key={title} delay={i * 0.1} className="grid content-start gap-4 bg-accent border border-border p-8">
                            <Icon size={22} className="text-gold" />
                            <h3 className="font-serif capitalize text-2xl">{title}</h3>
                            <p className="text-sm leading-7 text-muted-foreground">{text}</p>
                        </Reveal>
                    ))}
                </ul>
            </div>
        </section>
    )
}