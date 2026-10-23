import Link from 'next/link'
import { site } from '@/lib/site'
import {Reveal} from "@/components/ui/reveal";
import {LegalDoc} from "@/features/legal/types";
import {LegalToc} from "@/features/legal/components/LegalToc";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'


// makes every [TODO: ...] placeholder stand out, so none can ship unnoticed
function Text({ children }: { children: string }) {
    return (
        <>
            {children.split(/(\[TODO:[^\]]*\])/g).map((part, i) =>
                part.startsWith('[TODO:') ? (
                    <mark key={i} className="bg-gold/20 px-1 text-gold">{part}</mark>
                ) : (
                    part
                ),
            )}
        </>
    )
}

const pad = (n: number) => String(n).padStart(2, '0')

export function LegalDocument({ doc }: { doc: LegalDoc }) {
    const toc = doc.sections.map(({ id, title }) => ({ id, title }))
    const whatsapp = site.contacts[0].description.replace(/\D/g, '')
    const hasContact = Boolean(site.contacts[1].description || site.contacts[0].description || whatsapp || site.contacts[2].description)

    return (
        <article>
            <header className="border-b border-line bg-surface">
                <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
                    <Reveal className="max-w-3xl">
                        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Legal</p>
                        <h1 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl">{doc.title}</h1>
                        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
                            <Text>{doc.intro}</Text>
                        </p>
                        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                            Last updated: <Text>{doc.updated}</Text>
                        </p>
                    </Reveal>
                </div>
            </header>

            <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[260px_1fr] lg:gap-20 lg:px-12 lg:py-24">
                <aside className="lg:sticky lg:top-28 lg:self-start">
                    {/* phones: a collapsible list */}
                    <details className="border border-line bg-surface lg:hidden">
                        <summary className="cursor-pointer px-5 py-4 text-[11px] uppercase tracking-[0.2em] text-gold">
                            On this page
                        </summary>
                        <ol className="grid gap-1 border-t border-line p-3">
                            {toc.map((item, i) => (
                                <li key={item.id}>
                                    <a href={`#${item.id}`} className="block px-2 py-2 text-sm text-muted hover:text-white">
                                        <span className="mr-2 font-mono text-[10px] text-gold">{pad(i + 1)}</span>
                                        {item.title}
                                    </a>
                                </li>
                            ))}
                        </ol>
                    </details>

                    {/* desktop: sticky, highlights the section you are reading */}
                    <div className="hidden lg:block">
                        <LegalToc items={toc} />
                    </div>
                </aside>

                <div className="max-w-3xl">
                    {doc.sections.map((section, i) => (
                        <section
                            key={section.id}
                            id={section.id}
                            aria-labelledby={`${section.id}-title`}
                            className="scroll-mt-28 border-b border-line py-10 first:pt-0"
                        >
                            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{pad(i + 1)}</p>
                            <h2 id={`${section.id}-title`} className="mb-5 font-serif text-3xl sm:text-4xl">
                                {section.title}
                            </h2>

                            <div className="grid gap-5">
                                {section.blocks.map((block, j) =>
                                    block.type === 'p' ? (
                                        <p key={j} className="text-base leading-8 text-muted">
                                            <Text>{block.text}</Text>
                                        </p>
                                    ) : (
                                        <ul key={j} className="grid gap-3">
                                            {block.items.map((item) => (
                                                <li key={item} className="flex gap-4 text-base leading-8 text-muted">
                                                    <span aria-hidden className="mt-3.5 size-1.5 shrink-0 bg-gold" />
                                                    <span><Text>{item}</Text></span>
                                                </li>
                                            ))}
                                        </ul>
                                    ),
                                )}
                            </div>
                        </section>
                    ))}

                    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-28 pt-10">
                        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                            {pad(doc.sections.length + 1)}
                        </p>
                        <h2 id="contact-title" className="mb-5 font-serif text-3xl sm:text-4xl">Contact us</h2>
                        <p className="mb-6 text-base leading-8 text-muted">
                            Questions about this page, or a request about your information? Get in touch.
                        </p>

                        {hasContact ? (
                            <ul className="grid gap-4 border border-line bg-surface p-6 text-sm">
                                {site.name && <li className="font-serif text-xl">{site.name}</li>}
                                {site.contacts[1].description && (
                                    <li className="flex items-center gap-3">
                                        <Mail size={16} className="text-gold" />
                                        <a href={`mailto:${site.contacts[1].description}`} className="hover:text-gold">{site.contacts[1].description}</a>
                                    </li>
                                )}
                                {site.contacts[0].description && (
                                    <li className="flex items-center gap-3">
                                        <Phone size={16} className="text-gold" />
                                        <a href={`tel:${site.contacts[0].description}`} className="hover:text-gold">{site.contacts[0].description}</a>
                                    </li>
                                )}
                                {whatsapp && (
                                    <li className="flex items-center gap-3">
                                        <MessageCircle size={16} className="text-gold" />
                                        <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                                            WhatsApp
                                        </a>
                                    </li>
                                )}
                                {site.contacts[2].description && (
                                    <li className="flex items-start gap-3">
                                        <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                                        <span>{site.contacts[2].description}</span>
                                    </li>
                                )}
                            </ul>
                        ) : (
                            <Link href="/#contact" className="text-gold underline">Send us an enquiry</Link>
                        )}

                        <Link
                            href={doc.related.href}
                            className="mt-10 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-gold transition hover:gap-4"
                        >
                            Also read: {doc.related.label} <ArrowRight size={14} />
                        </Link>
                    </section>
                </div>
            </div>
        </article>
    )
}