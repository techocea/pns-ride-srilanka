import type { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
    slug: 'gallery',
    admin: { useAsTitle: 'title' },
    access: {
        read: () => true,
    },
    fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
        { name: 'destination', type: 'relationship', relationTo: 'destinations' },
    ],
}