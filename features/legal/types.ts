export type LegalBlock = { type: 'p'; text: string } | { type: 'ul'; items: string[] }

export type LegalSection = { id: string; title: string; blocks: LegalBlock[] }

export type LegalDoc = {
    title: string
    description: string
    updated: string
    intro: string
    sections: LegalSection[]
    related: { href: string; label: string }
}