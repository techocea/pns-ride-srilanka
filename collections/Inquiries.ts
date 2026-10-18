import type { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
    slug: 'inquiries',
    admin: { useAsTitle: 'name', defaultColumns: ['name', 'email', 'tourTitle', 'status', 'createdAt'] },
    access: {
        create: () => false,
        read: ({ req }) => Boolean(req.user),
        update: ({ req }) => Boolean(req.user),
        delete: ({ req }) => Boolean(req.user),
    },
    fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
        { name: 'phone', type: 'text', required: true  },
        { name: 'travelers', type: 'text', required: true  },
        { name: 'travelDate', type: 'text',  admin: { description: 'Preferred travel date (YYYY-MM-DD)' }  },
        { name: 'message', type: 'textarea', required: true },
        { name: 'tourTitle', type: 'text', admin: { description: 'The package the visitor asked about, if any' } },
        {
            name: 'status',
            type: 'select',
            defaultValue: 'new',
            options: [
                { label: 'New', value: 'new' },
                { label: 'Contacted', value: 'contacted' },
                { label: 'Closed', value: 'closed' },
            ],
            admin: { position: 'sidebar' },
        },
    ],
}