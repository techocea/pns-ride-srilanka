import 'server-only'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayloadClient } from './payload'

export async function getCurrentUser() {
    const payload = await getPayloadClient()
    const { user } = await payload.auth({ headers: await headers() })
    return user
}

/** Use in every page, query and action.*/
export async function requireUser() {
    const payload = await getPayloadClient()

    const { user } = await payload.auth({ headers: await headers() })

    if (!user) redirect('/cms/login')
    return { payload, user }
}