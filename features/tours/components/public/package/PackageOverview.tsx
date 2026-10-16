import type { TourDetailData } from '@/features/tours/types'

export function PackageOverview({ tour }: { tour: TourDetailData }) {
    if (tour.paragraphs.length === 0) return null

    return (
        <section className="border-b border-line bg-secondary py-20 lg:py-28">
            <div className="mx-auto grid max-w-[1440px] gap-14 px-6 text-left lg:grid-cols-[1.3fr_0.7fr] lg:px-12">
                <div>
                    <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-gold">The Experience</p>
                    <h2 className="max-w-2xl font-serif text-4xl capitalize leading-tight sm:text-5xl">Sri Lanka, experienced at your own rhythm</h2>
                </div>

                <div>
                    <div className="grid gap-5">
                        {tour.paragraphs.map((p, i) => (
                            <p key={i} className="text-base leading-8 text-muted-foreground">{p}</p>
                        ))}
                    </div>
                    
                </div>
            </div>
        </section>
    )
}