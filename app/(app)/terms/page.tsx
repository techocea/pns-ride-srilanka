import type { Metadata } from 'next'
import { LegalDocument } from '@/features/legal/components/LegalDocument'
import { terms } from '@/features/legal/content/terms'

export const metadata: Metadata = {
    title: terms.title,
    description: terms.description,
    alternates: { canonical: '/terms' },
}

export default function TermsPage() {
    return <LegalDocument doc={terms} />
}