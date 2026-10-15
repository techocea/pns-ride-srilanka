import { site } from './site'

export const organizationJsonLd = () => ({
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: site.name,
    url: site.url,
    ...(site.contacts[1].description && { email: site.contacts[1].description }),
    ...(site.contacts[0].description && { telephone: site.contacts[0].description }),
    ...(site.socials.length > 0 && { sameAs: site.socials }),
})