'use client'

import { useState } from 'react'
import { Compass, Search } from 'lucide-react'

export function TripPlannerWidget() {
    const [duration, setDuration] = useState('7-10')
    const [style, setStyle] = useState('culture-nature')

    return (
        <section className="py-12 bg-secondary/30 border-y border-border">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-card p-6 sm:p-8 rounded-2xl shadow-xl border border-border">
                    <div className="flex items-center gap-3 mb-6">
                        <Compass className="size-6 text-gold" />
                        <div>
                            <h3 className="text-xl font-bold">Quick Trip Finder</h3>
                            <p className="text-xs text-muted-foreground">Find or build your ideal Sri Lanka travel itinerary</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Duration</label>
                            <select
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="w-full p-3 rounded-md bg-background border border-border text-sm focus:outline-none focus:border-gold"
                            >
                                <option value="1-3">1 - 3 Days (Day Tours)</option>
                                <option value="4-6">4 - 6 Days (Highlights)</option>
                                <option value="7-10">7 - 10 Days (Popular)</option>
                                <option value="12+">12+ Days (Grand Tour)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider mb-2">Travel Style</label>
                            <select
                                value={style}
                                onChange={(e) => setStyle(e.target.value)}
                                className="w-full p-3 rounded-md bg-background border border-border text-sm focus:outline-none focus:border-gold"
                            >
                                <option value="culture-nature">Culture & Wildlife</option>
                                <option value="beach-relax">Beach & Relaxation</option>
                                <option value="hill-country">Hill Country & Scenic Trains</option>
                                <option value="custom">Custom Private Itinerary</option>
                            </select>
                        </div>

                        <div className="flex items-end">
                            <a
                                href={`#tours?duration=${duration}&style=${style}`}
                                className="w-full flex items-center justify-center gap-2 p-3 bg-gold text-black font-semibold text-sm rounded-md hover:bg-gold/90 transition uppercase tracking-wider"
                            >
                                <Search className="size-4" />
                                Find My Tour
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}