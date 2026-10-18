import React from "react";
import {Reveal} from "@/components/ui/reveal";
import {aboutContent} from "@/features/about/contents";

export function AboutCta({action}: { action: React.ReactNode }) {
    const {cta} = aboutContent

    return (
        <section className="bg-accent px-6 py-16 text-center">
            <Reveal className="mx-auto grid max-w-2xl gap-6">
                <h2 className="font-serif text-3xl md:text-4xl">{cta.title}</h2>
                <p className="text-muted-foreground">{cta.text}</p>
                <div className="flex justify-center">{action}</div>
            </Reveal>
        </section>
    )
}