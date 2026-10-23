import { Star, ShieldCheck, Award, HeartHandshake } from 'lucide-react'

export function TrustBadgesBar() {
    return (
        <section className="bg-accent border-y border-border text-white py-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-center md:text-left">

                    <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
                        <div className="p-2.5 rounded-full bg-gold/10 text-gold shrink-0">
                            <Star className="size-5 fill-gold text-gold" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold">5.0 Star Rated</p>
                            <p className="text-xs text-muted-foreground">Top Rated on Google & TripAdvisor</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
                        <div className="p-2.5 rounded-full bg-gold/10 text-gold shrink-0">
                            <ShieldCheck className="size-5" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold">SLTDA Registered</p>
                            <p className="text-xs text-muted-foreground">Official Sri Lanka Tourism License</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
                        <div className="p-2.5 rounded-full bg-gold/10 text-gold shrink-0">
                            <Award className="size-5" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Luxury Vehicle Fleet</p>
                            <p className="text-xs text-muted-foreground">Fully insured A/C Cars & Vans</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
                        <div className="p-2.5 rounded-full bg-gold/10 text-gold shrink-0">
                            <HeartHandshake className="size-5" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Zero Hidden Fees</p>
                            <p className="text-xs text-muted-foreground">All fuel, tolls & driver charges included</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}