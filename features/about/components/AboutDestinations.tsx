import Link from 'next/link'
import {Dot} from "lucide-react";
import {Reveal} from "@/components/ui/reveal";

type Props = { destinations: { id: string; title: string; province: string }[] }

export function AboutDestinations({ destinations }: Props) {
    if (destinations.length === 0) return null

    return (
        <section className="border-y border-line bg-canvas py-20 lg:py-24">
            <div className="mx-auto max-w-6xl w-full px-6 lg:px-12">
                <Reveal className="grid gap-8">
                    <div>
                        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Where we travel</p>
                        <h2 className="font-serif text-4xl capitalize sm:text-5xl">Our destinations</h2>
                    </div>
                    <ul className="flex flex-wrap gap-3">
                        {destinations.map((d) => (
                            <li key={d.id}>
                                <Link
                                    href="/#destinations"
                                    className="flex items-center gap-2 border border-line px-5 py-3 text-sm transition-colors delay-200 hover:border-gold hover:text-gold"
                                >
                                    {d.title} <span><Dot className="size-6"/></span>{d.province}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </div>
        </section>
    )
}