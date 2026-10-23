import { site } from '@/lib/site'
import type { LegalDoc } from '../types'
import { p, ul } from '../utils/blocks'

export const terms: LegalDoc = {
    title: 'Terms & Conditions',
    description: `The terms that apply when you use the ${site.name} website and book a trip with us.`,
    updated: 'October 2026',
    intro: `These terms explain how enquiries, bookings and trips with ${site.name} (“we”, “us”) work. We have kept them in plain language. If anything is unclear, please ask us before you book.`,
    related: { href: '/privacy', label: 'Privacy Policy' },
    sections: [
        {
            id: 'about-these-terms',
            title: 'About these terms',
            blocks: [
                p('By using this website or sending us an enquiry, you agree to these terms. If you do not agree, please do not use the website. Once you book a trip, any written confirmation or booking agreement we send you also applies. [TODO: name the booking agreement, if there is one.]'),
            ],
        },
        {
            id: 'enquiries-and-bookings',
            title: 'Enquiries and bookings',
            blocks: [
                p('Sending an enquiry does not book anything, and it does not commit you or us. A trip is booked only when we confirm it to you in writing, by email or WhatsApp [TODO: and we receive the deposit or payment].'),
            ],
        },
        {
            id: 'prices-and-payment',
            title: 'Prices and payment',
            blocks: [
                ul(
                    'Prices on this website are “from” prices, per person, in US dollars. They are a guide. The final price depends on your dates, group size, accommodation and options, and we confirm it in writing before you commit.',
                    'Descriptions, itineraries and photos are for planning. Details can change, and availability is not guaranteed until we confirm.',
                    'Deposit and payment: [TODO: deposit amount, due dates and accepted payment methods].',
                    'Taxes, service charges and exchange rates: [TODO: add the client’s terms, if any].',
                ),
            ],
        },
        {
            id: 'cancellations-and-refunds',
            title: 'Cancellations and refunds',
            blocks: [
                p('Please tell us as soon as you need to cancel or change your trip. Any refund depends on how far ahead you tell us, and on costs we have already paid for you that cannot be recovered, such as non-refundable accommodation or permits.'),
                ul(
                    '[TODO: more than N days before the trip starts: refund of …]',
                    '[TODO: between N and N days before: refund of …]',
                    '[TODO: fewer than N days before: refund of …]',
                ),
                p('If we have to cancel your trip, we will tell you promptly and [TODO: offer a refund or an alternative].'),
            ],
        },
        {
            id: 'itinerary-changes',
            title: 'Changes to your itinerary',
            blocks: [
                p('Weather, road conditions, safety, closures and other things outside our control can affect a trip. If we need to change your itinerary, we will tell you as early as we can and, where possible, offer a sensible alternative of similar value.'),
            ],
        },
        {
            id: 'your-responsibilities',
            title: 'Your responsibilities',
            blocks: [
                ul(
                    'Hold valid travel documents, including your passport and any visa or travel authorisation Sri Lanka requires, and check the entry rules before you travel.',
                    'Give us accurate details when you enquire and book.',
                    'Follow local laws and customs, including dress and behaviour rules at temples and other religious sites, and national park rules.',
                    'Treat our team, other travellers and wildlife with respect.',
                ),
            ],
        },
        {
            id: 'health-and-accessibility',
            title: 'Health, accessibility and diet',
            blocks: [
                p('Please tell us in advance about health conditions, mobility or accessibility needs, and dietary requirements, so we can plan a comfortable trip. Some activities involve walking, climbing or long journeys, and we can only advise on suitability if you tell us what you need.'),
            ],
        },
        {
            id: 'travel-insurance',
            title: 'Travel insurance',
            blocks: [
                p('We strongly recommend travel insurance that covers medical care, cancellation and your belongings. You are responsible for arranging it. [TODO: say whether insurance is required for any tours].'),
            ],
        },
        {
            id: 'liability',
            title: 'Our responsibility',
            blocks: [
                p('We take care in planning and delivering every trip. Many parts of a journey are provided by independent third parties, such as hotels, airlines and activity operators. To the extent the law allows, we are not responsible for delays, losses or changes caused by events outside our reasonable control, by those third parties, or for the loss of personal belongings. Nothing in these terms limits any right or liability that the law does not allow us to limit.'),
                p('[TODO: have a legal adviser review this section.]'),
            ],
        },
        {
            id: 'website-use',
            title: 'Using this website',
            blocks: [
                p('The text, photos, video and design on this website belong to us or our licensors. You may view the pages and share links to them, but please do not copy, republish or sell the content without our written permission. Please do not misuse the website, for example by trying to disrupt it or by sending spam through the enquiry form.'),
                p('The website may link to other sites, such as WhatsApp or social networks. We do not control them and are not responsible for their content or privacy practices.'),
            ],
        },
        {
            id: 'governing-law',
            title: 'Governing law',
            blocks: [
                p('[TODO: confirm. For example: these terms are governed by the laws of Sri Lanka, and its courts have jurisdiction over any dispute.]'),
            ],
        },
        {
            id: 'changes',
            title: 'Changes to these terms',
            blocks: [
                p('We may update these terms from time to time. The date at the top of this page shows the latest version. The version in force when you book is the one that applies to that booking.'),
            ],
        },
    ],
}