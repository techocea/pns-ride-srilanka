import type { CollectionConfig } from 'payload'

export const Tours: CollectionConfig = {
    slug: 'tours',
    admin: {
        useAsTitle: 'title',
        defaultColumns: [ 'title', 'destination', 'duration', 'price', 'type', 'status']
    },
    access: {
        read: () => true,
    },
    fields: [
        { name: 'title', type: 'text', required: true },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            index: true,
            admin: { position: 'sidebar' },
            hooks: {
                beforeValidate: [
                    ({ value, data }) => {
                        const source = value || data?.title
                        return source
                            ? String(source).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                            : value
                    },
                ],
            },
        },
        {
            name: 'tourType',
            type: 'select',
            required: true,
            defaultValue: 'cultural',
            options: [
                { label: 'Cultural', value: 'cultural' },
                { label: 'Nature', value: 'nature' },
                { label: 'Adventure', value: 'adventure' },
                { label: 'Beach', value: 'beach' },
                { label: 'Wildlife', value: 'wildlife' },
                { label: 'Wellness', value: 'wellness' },
            ],
        },
        {
            name: 'status',
            type: 'select',
            defaultValue: 'draft',
            options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Published', value: 'published' },
            ],
            admin: { position: 'sidebar' },
        },
        { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
        { name: 'destination', type: 'relationship', relationTo: 'destinations', required: true },
        {
            type: 'row',
            fields: [
                { name: 'durationDays', type: 'number', required: true, min: 1 },
                { name: 'price', type: 'number', required: true, min: 0, admin: { description: 'Per person, USD' } },
                { name: 'maxGroupSize', type: 'number' },
            ],
        },
        { name: 'description', type: 'textarea', required: true },
        { name: 'coverImage', type: 'relationship', relationTo: 'media', required: true },
        {
            name: 'images',
            type: 'array',
            label: 'Tour Images',
            fields: [{ name: 'image', type: 'relationship', relationTo: 'media', required: true }],
        },
        {
            name: 'itinerary',
            type: 'array',
            fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'details', type: 'textarea' },
            ],
        },
    ],
}