import "server-only"
import {requireUser} from "@/features/auth/services/auth.service";
import {resolveImageIds} from "@/features/media/services/media.service";
import type {Destination, SaveArgs} from "@/features/destinations/types";

export async function getDestinations() {
    const {payload, user} = await requireUser()
    const {docs} = await payload.find({
        collection: 'destinations',
        limit: 100,
        depth: 1,
        sort: 'title',
        user,
        overrideAccess: false,
    })

    return docs
}

export async function findDestination(id: string) {
    const {payload, user} = await requireUser()
    return payload
        .findByID({collection: 'destinations', id, depth: 1, user, overrideAccess: false})
        .catch(() => null)
}

export async function getDestinationOptions(): Promise<Destination[]> {
    const {payload, user} = await requireUser()
    const {docs} = await payload.find({
        collection: 'destinations',
        depth: 1,
        limit: 100,
        sort: 'title',
        user,
        overrideAccess: false,
    })
    return docs.map((d) => ({id: String(d.id), title: d.title}))
}

export async function getDestinationStats() {
    const {payload, user} = await requireUser()
    const [total, published] = await Promise.all([
        payload.count({collection: "destinations", user, overrideAccess: false}),
        payload.count({
            collection: "destinations",
            where: {status: {equals: "published"}},
            user, overrideAccess: false
        }),
    ])
    return {total: total.totalDocs, published: published.totalDocs}
}

export async function toggleVisibilty(id: string) {
    const {payload, user} = await requireUser()
    const destination = await payload.findByID({collection: 'destinations', id, depth: 0, user, overrideAccess: false})
    await payload.update({
        collection: 'destinations',
        id,
        data: {status: destination.status === 'draft' ? 'published' : 'draft'},
        user,
        overrideAccess: false,
    })
}

export async function removeDestination(id: string) {
    const {payload, user} = await requireUser()
    await payload.delete({collection: 'destinations', id, user, overrideAccess: false})
}

export async function saveDestination({id, input, images}: SaveArgs) {
    const {payload, user} = await requireUser()

    const ids = await resolveImageIds(images, input.title)

    const [coverImage, ...rest] = ids

    if (!coverImage) throw new Error('Cover image is required')

    const data = {...input, coverImage, images: rest.map((image) => ({image}))}

    return id
        ? payload.update({collection: 'destinations', id, data, user, overrideAccess: false})
        : payload.create({
            draft: true,
            select: undefined,
            collection: 'destinations',
            data,
            user,
            overrideAccess: false
        })

}