import { generateReactHelpers } from '@uploadthing/react'
import type { AppFileRouter } from '@/features/media/server/file-router'

export const { useUploadThing } = generateReactHelpers<AppFileRouter>()