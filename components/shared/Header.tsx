import Link from 'next/link'
import Image from 'next/image'
import { site } from '@/lib/site'
import { NAV_LINKS } from '@/lib/constants'
import { MobileMenu } from '@/components/shared/MobileMenu'
import { InquiryButton } from '@/features/inquiries/components/public/InquiryButton'

export function Header() {
    return (
        <header className="sticky top-0 z-30 flex h-20 lg:h-24 w-full items-center justify-center border-b border-line bg-secondary/90 backdrop-blur-md">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
                <Link
                    href="/"
                    className="flex shrink-0 items-center gap-3 text-left"
                    aria-label="Return to PNS Ride Sri Lanka home"
                >
                    <Image
                        src="/logo.webp"
                        width={360}
                        height={220}
                        alt={site.name}
                        priority
                        quality={75}
                        className="h-14 md:h-16 lg:h-20 w-auto object-contain"
                    />
                </Link>

                {/* Tablet & Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6 lg:gap-14 xl:gap-20">
                    <nav aria-label="Main" className="flex items-center gap-4 lg:gap-7">
                        {NAV_LINKS.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="whitespace-nowrap text-xs lg:text-sm font-medium uppercase tracking-wider text-white transition-colors hover:text-primary"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Phone & CTA Actions */}
                    <div className="flex shrink-0 items-center gap-3 lg:gap-4">
                        <a
                            href={`tel:${site.contacts[0].label}`}
                            aria-label={`Call or WhatsApp ${site.contacts[0].description}`}
                            className="flex items-center gap-2 whitespace-nowrap text-sm text-white transition-colors hover:text-primary"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                width="20"
                                height="20"
                                fill="currentColor"
                                aria-hidden="true"
                                className="size-5 shrink-0 text-[#25D366]"
                            >
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
                            </svg>
                            {/* Hide phone digits on compact tablets (md), show on desktop (xl) */}
                            <span className="hidden xl:inline">{site.contacts[0].description}</span>
                        </a>

                        <InquiryButton
                            variant="outline"
                            size="sm"
                            label="Enquire Now"
                            className="whitespace-nowrap text-xs lg:text-sm uppercase"
                        />
                    </div>
                </div>

                {/* Mobile Drawer (< 768px) */}
                <MobileMenu mode="landing" links={NAV_LINKS} />
            </div>
        </header>
    )
}