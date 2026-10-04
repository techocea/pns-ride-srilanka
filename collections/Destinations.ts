import type { CollectionConfig } from 'payload'

export const Destinations: CollectionConfig = {
    slug: 'destinations',
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'province', 'updatedAt'],
    },
    access: {
        read: () => true,
    },
    fields: [
        { name: 'name', type: 'text', required: true },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            index: true,
            admin: { position: 'sidebar', description: 'Auto-generated from name if left empty' },
            hooks: {
                beforeValidate: [
                    ({ value, data }) => {
                        const source = value || data?.name
                        return source
                            ? String(source).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                            : value
                    },
                ],
            },
        },
        { name: 'province', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'coverImage', type: 'upload', relationTo: 'media', required: true },
    ],
}