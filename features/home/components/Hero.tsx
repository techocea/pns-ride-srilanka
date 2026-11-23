import {HeroCarousel} from "@/features/home/components/HeroCarousel";
import {site} from "@/lib/site";
import {HeroVideoSection} from "@/features/home/components/HeroVideoSection";

export function Hero() {
    return (
        <section className="relative -mt-24 w-full overflow-hidden bg-black">
            {site.heroVideo.mp4 ? <HeroVideoSection/> : <HeroCarousel/>}
        </section>
    )
}