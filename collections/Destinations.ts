import type {CollectionConfig} from 'payload'

export const Destinations: CollectionConfig = {
    slug: 'destinations',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'province', 'updatedAt'],
    },
    access: {
        read: () => true,
    },
    fields: [
        {name: 'title', type: 'text', required: true},
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            index: true,
            admin: {position: 'sidebar', description: 'Auto-generated from name if left empty'},
            hooks: {
                beforeValidate: [
                    ({value, data}) => {
                        const source = value || data?.title
                        return source
                            ? String(source).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                            : value
                    },
                ],
            },
        },
        {
            name: 'status',
            type: 'select',
            defaultValue: 'draft',
            options: [
                {label: 'Draft', value: 'draft'},
                {label: 'Published', value: 'published'},
            ],
            admin: {position: 'sidebar'},
        },
        {name: 'province', type: 'text', required: true},
        {name: 'description', type: 'textarea'},
        {
            name: 'highlights', type: 'array',
            maxRows: 8,
            admin: {description: 'Short points shown as boxes, e.g. Tea estates, Waterfalls'},
            fields: [{name: 'text', type: 'text', required: true, maxLength: 40}],
        },
        {name: 'coverImage', type: 'relationship', relationTo: 'media', required: true},
    ],
}