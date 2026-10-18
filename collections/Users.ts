import type {CollectionConfig} from 'payload'

export const Users: CollectionConfig = {
    slug: 'users',
    admin: {useAsTitle: 'email'},
    access: {
        read: ({req: {user}}) => Boolean(user),
        create: ({req: {user}}) => Boolean(user),
        update: ({req: {user}}) => Boolean(user),
        delete: ({req: {user}}) => Boolean(user),
    },
    auth: true,
    fields: [],
}