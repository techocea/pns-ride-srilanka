import type {CollectionConfig} from 'payload'
import {autoSlug} from "@/collections/hooks/auto-slug";

export const Destinations: CollectionConfig = {
    slug: 'destinations',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'province', 'updatedAt'],
    },
    access: {
        read: () => true,
        create: ({req: {user}}) => Boolean(user),
        update: ({req: {user}}) => Boolean(user),
        delete: ({req: {user}}) => Boolean(user),
    },
    fields: [
        {name: 'title', type: 'text', required: true},
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            index: true,
            admin: {
                position: 'sidebar',
                readOnly: true,
                description: 'Generated from the title',
            },
            hooks: {beforeValidate: [autoSlug('title')]},
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