import type {CollectionConfig} from 'payload'
import {UTApi} from "uploadthing/server";

export const Media: CollectionConfig = {
    slug: 'media',
    admin: {useAsTitle: 'name', defaultColumns: ['name', 'alt', 'createdAt']},
    access: {
        read: () => true, // images are public
    },
    hooks: {
        afterDelete: [
            async ({doc}) => {
                try {
                    await new UTApi().deleteFiles(doc.key)
                } catch (e) {
                    console.error('UploadThing delete failed', e)
                }
            },
        ],
    },
    fields: [
        {name: 'url', type: 'text', required: true},
        {name: 'key', type: 'text', required: true, unique: true, index: true},
        {name: 'name', type: 'text', required: true},
        {name: 'alt', type: 'text', required: true},
        {name: 'size', type: 'number'},
    ],
}