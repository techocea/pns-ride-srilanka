import { createRouteHandler } from 'uploadthing/next'
import { fileRouter } from '@/features/media/server/file-router'

export const { GET, POST } = createRouteHandler({ router: fileRouter })