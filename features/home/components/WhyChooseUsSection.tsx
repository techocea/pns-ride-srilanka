import { Car, UserCheck, Map, Clock } from 'lucide-react'

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
    {
        icon: Clock,
        title: '24/7 On-Road Support',
        description: 'From Colombo Airport (CMB) pickup to end-of-tour drops, our team provides round-the-clock assistance.',
    },
]

export function WhyChooseUsSection() {
    return (
        <section className="py-20 bg-background text-foreground">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-xs uppercase tracking-widest text-gold font-semibold">The PNS Difference</span>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2">Why Travel Sri Lanka With Us?</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((item, index) => {
                        const Icon = item.icon
                        return (
                            <div key={index} className="p-6 rounded-xl border border-border bg-card/50 hover:border-gold/50 transition">
                                <div className="size-12 rounded-lg bg-gold/10 text-gold flex items-center justify-center mb-5">
                                    <Icon className="size-6" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}