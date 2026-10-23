import 'server-only'

import { UploadThingError } from 'uploadthing/server'
import { getSession } from '@/features/auth/services/auth.service'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

export const fileRouter = {
    cmsImage: f({ image: { maxFileSize: '4MB', maxFileCount: 12 } })
        .middleware(async () => {
            const user = await getSession()
            if (!user) throw new UploadThingError('Unauthorized')
            return { userId: String(user.id) }
        })
        .onUploadComplete(async ({ file }) => ({ name: file.name })),
} satisfies FileRouter

export type AppFileRouter = typeof fileRouter