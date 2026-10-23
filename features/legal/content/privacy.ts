import { site } from '@/lib/site'
import type { LegalDoc } from '../types'
import { p, ul } from '../utils/blocks'

export const privacy: LegalDoc = {
    title: 'Privacy Policy',
    description: `How ${site.name} collects, uses and protects your personal information.`,
    updated: 'October 2026',
    intro: `We respect your privacy. This policy explains what personal information ${site.name} (“we”, “us”) collects through this website, why we collect it, and the choices you have.`,
    related: { href: '/terms', label: 'Terms & Conditions' },
    sections: [
        {
            id: 'who-we-are',
            title: 'Who we are',
            blocks: [
                p(`${site.name} is a Sri Lankan travel company offering tours and journeys across the island. [TODO: registered business name and address]. You can reach us using the details at the end of this page.`),
            ],
        },
        {
            id: 'information-we-collect',
            title: 'Information we collect',
            blocks: [
                p('We collect only what we need:'),
                ul(
                    'Enquiries. When you send an enquiry we receive your name, email address, phone number (if you give one), your message, the package you asked about, your preferred travel date and your group size.',
                    'Messages. If you email us or contact us on WhatsApp, we receive what you send, including your email address or phone number.',
                    'Website usage. Our analytics tool records how the site is used: the pages viewed, your device and browser type, the approximate area you are visiting from, and how you arrived. It does not tell us who you are.',
                ),
                p('This website does not take payments or collect card details. Please never include card numbers in an enquiry.'),
            ],
        },
        {
            id: 'how-we-use-it',
            title: 'How we use your information',
            blocks: [
                ul(
                    'To reply to your enquiry and to plan and quote your trip.',
                    'To arrange the tours you ask us to book, including with our partners.',
                    'To keep records of our conversations and bookings.',
                    'To understand how the website is used and to improve it.',
                    'To protect the website from spam and misuse.',
                    'To meet our legal and accounting obligations.',
                ),
            ],
        },
        {
            id: 'cookies-and-analytics',
            title: 'Cookies and analytics',
            blocks: [
                p('We use Google Analytics to measure visits to this website. It may set cookies or similar identifiers in your browser. You can block or delete cookies in your browser settings, or use Google’s opt-out tools. Blocking cookies won’t stop you from using the website.'),
            ],
        },
        {
            id: 'who-we-share-it-with',
            title: 'Who we share it with',
            blocks: [
                p('We do not sell your personal information. We share it only where it is needed:'),
                ul(
                    'Service providers who run the website for us: hosting, database, email delivery (Resend) and analytics (Google Analytics).',
                    'Partners who deliver your trip, such as drivers, guides, hotels and activity providers. They receive only the details they need, and only for tours you ask us to arrange. [TODO: confirm with the client]',
                    'Authorities, where the law requires it.',
                ),
                p('Some of these providers may process information outside Sri Lanka. We choose reputable providers and share only what each one needs.'),
            ],
        },
        {
            id: 'how-long-we-keep-it',
            title: 'How long we keep it',
            blocks: [
                p('We keep information only as long as we need it: to answer you, to arrange any trip you book, and to meet our legal and accounting duties. [TODO: state the retention period, e.g. 24 months after your last enquiry]. You can ask us to delete your information sooner.'),
            ],
        },
        {
            id: 'security',
            title: 'Security',
            blocks: [
                p('We take reasonable steps to protect your information, including encrypted connections (HTTPS), restricted staff access to our enquiry inbox and database, and carefully chosen providers. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.'),
            ],
        },
        {
            id: 'your-rights',
            title: 'Your rights and choices',
            blocks: [
                p('You can ask us to:'),
                ul(
                    'tell you what information we hold about you,',
                    'correct anything that is wrong,',
                    'delete your information, or',
                    'stop using it for a purpose you object to.',
                ),
                p('Email us and we will respond within 24 hours. If you are not satisfied, you may contact the data protection authority in your country.'),
            ],
        },
        {
            id: 'children',
            title: 'Children',
            blocks: [
                p('This website is meant for adults planning travel. If you include details about children in an enquiry, please make sure you are their parent or guardian.'),
            ],
        },
        {
            id: 'changes',
            title: 'Changes to this policy',
            blocks: [
                p('We may update this policy when our practices or the law change. The date at the top of this page shows the latest version.'),
            ],
        },
    ],
}