import type { Metadata } from 'next'
import { LegalDocument } from '@/features/legal/components/LegalDocument'
import { privacy } from '@/features/legal/content/privacy'

export const metadata: Metadata = {
    title: privacy.title,
    description: privacy.description,
    alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
    return <LegalDocument doc={privacy} />
}