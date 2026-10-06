import "server-only"
import {requireUser} from "@/features/auth/services/auth.service";
import {SaveArgs} from "@/features/tours/types";

export async function listTours() {
    const {payload, user} = await requireUser()
    return payload.find({
        collection: "tours",
        depth: 1,
        limit: 100,
        sort: '-createdAt',
        user,
        overrideAccess: false,
    })
}

export async function getTourStats() {
    const {payload, user} = await requireUser()
    const [total, featured] = await Promise.all([
        payload.count({collection: "tours", user, overrideAccess: false}),
        payload.count({
            collection: "tours",
            where: {featured: {equals: true}},
            user, overrideAccess: false
        }),
    ])
    return {total: total.totalDocs, featured: featured.totalDocs}
}

export async function toggleVisibilty(id: string) {
    const {payload, user} = await requireUser()
    const tour = await payload.findByID({collection: 'tours', id, depth: 0, user, overrideAccess: false})
    await payload.update({
        collection: 'tours',
        id,
        data: {status: tour.status === 'draft' ? 'published' : 'draft'},
        user,
        overrideAccess: false,
    })
}

export async function removeTour(id: string) {
    const {payload, user} = await requireUser()
    await payload.delete({collection: 'tours', id, user, overrideAccess: false})
}

export async function saveTour({id, input, coverFile, existingCover}: SaveArgs) {
    const {payload, user} = await requireUser()
    let coverImage = existingCover
    if (coverFile && coverFile.size > 0) {
        // Part 2 of the plan: this block is the only thing that changes for UploadThing
        const media = await payload.create({
            collection: 'media',
            data: {alt: input.title},
            file: {
                data: Buffer.from(await coverFile.arrayBuffer()),
                mimetype: coverFile.type,
                name: coverFile.name,
                size: coverFile.size,
            },
            user,
            overrideAccess: false,
        })
        coverImage = String(media.id)
    }

    if (!coverImage) throw new Error('Cover image is required')

    const data = {...input, coverImage}
    return id
        ? payload.update({collection: 'tours', id, data, user, overrideAccess: false})
        : payload.create({draft: true, select: undefined, collection: 'tours', data, user, overrideAccess: false})

}