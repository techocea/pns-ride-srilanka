import type {CollectionConfig} from 'payload'

export const Gallery: CollectionConfig = {
    slug: 'gallery',
    admin: {useAsTitle: 'caption', defaultColumns: ['caption', 'image', 'createdAt']},
    access: {
        read: () => true,
        create: ({req: {user}}) => Boolean(user),
        update: ({req: {user}}) => Boolean(user),
        delete: ({req: {user}}) => Boolean(user),
    },
    fields: [
        {name: 'image', type: 'relationship', relationTo: 'media', required: true},
        {
            name: 'caption', type: 'text', required: true,
            maxLength: 120,
            admin: {description: 'Shown under the image and used as its alt text'},
        }],
}