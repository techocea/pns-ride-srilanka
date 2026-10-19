import Link from 'next/link'
import Image from "next/image";
import {site} from '@/lib/site'
import {NAV_LINKS} from "@/lib/constants";
import {MobileMenu} from "@/components/landing/MobileMenu";
import {Button} from "@/components/ui/button";
import {uploadthingLoader} from "@/features/gallery/utils/uploadthing-loader";
import {InquiryButton} from "@/features/inquiries/components/public/InquiryButton";

export function Header() {
    return (
        <header
            className="sticky top-0 z-30 flex h-full py-2 w-full items-center justify-between border-b border-border border-b border-line bg-secondary backdrop-blur">
            <div className="mx-auto flex  max-w-6xl w-full items-center justify-between px-6">
                <Link
                    href={"/"}
                    className="flex items-center gap-3 text-left"
                    aria-label="Return to PNS ride sri lanka home"
                >
                    <Image src="/logo.jpg" width={100} height={80} loader={uploadthingLoader} alt={site.description}/>
                </Link>

                <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
                    {NAV_LINKS.map((l) => (
                        <Link key={l.href} href={l.href}
                              className="text-sm text-muted-foreground transition hover:text-primary uppercase tracking-wider">
                            {l.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex gap-4 items-center justify-center">
                        <span className="text-muted-foreground text-sm hover:text-primary transition-colors">
                          <a href={`tel:${site.contacts[0].label}`}>{site.contacts[0].description}</a>
                        </span>
                    <InquiryButton variant={"outline"} size="sm" label="Enquire Now" className="uppercase"/>
                </div>

                <MobileMenu links={NAV_LINKS}/>
            </div>
        </header>
    )
}