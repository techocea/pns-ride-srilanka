import {Car, UserCheck, Map, Clock} from 'lucide-react'
import {Reveal} from "@/components/ui/reveal";

const features = [
    {
        icon: Car,
        title: 'Modern Luxury Fleet',
        description: 'Travel in ultimate comfort with immaculate, air-conditioned sedans, SUVs, and luxury passenger vans.',
    },
    {
        icon: UserCheck,
        title: 'Expert Local Drivers',
        description: 'English-speaking, professional chauffeur-guides dedicated to your safety, punctuality, and local insights.',
    },
    {
        icon: Map,
        title: '100% Tailor-Made Itineraries',
        description: 'Explore at your own pace. Stop anytime for fresh king coconuts, scenic photos, or local lunch spots.',
    },
]

export function WhyChooseUsSection() {
    return (
        <section className="px-6 py-20">
            <div className="mx-auto max-w-6xl w-full space-y-10">
                <div className="md:max-w-lg w-full mx-auto space-y-6 text-center">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-gold">The PNS Difference</p>
                    <h2 id="packages-title" className="mt-3 font-serif capitalize text-4xl md:text-5xl">Why Travel Sri
                        Lanka With
                        Us?</h2>
                </div>

                <div className="grid gap-2 bg-line md:grid-cols-3">
                    {features.map((item, index) => {
                        const Icon = item.icon
                        return (
                            <Reveal as="div" key={item.title} delay={index * 0.1}
                                    className="grid content-start gap-4 bg-accent border border-border p-8">
                                <div className="p-2.5 w-fit bg-gold/10 text-gold shrink-0">
                                    <Icon className="size-5"/>
                                </div>
                                <h3 className="font-serif capitalize text-2xl">{item.title}</h3>
                                <p className="text-sm leading-7 text-muted-foreground">{item.description}</p>
                            </Reveal>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}