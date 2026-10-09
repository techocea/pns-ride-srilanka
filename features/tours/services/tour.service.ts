import "server-only"
import {requireUser} from "@/features/auth/services/auth.service";
import {SaveArgs} from "@/features/tours/types";
import {resolveImageIds} from "@/features/media/services/media.service";

export async function getTours() {
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

export async function saveTour({ id, input, images }: SaveArgs) {
    const {payload, user} = await requireUser()
    // const isId = (v: unknown) => typeof v === 'string' && /^[a-f0-9]{24}$/i.test(v)

    const ids = await resolveImageIds(images, input.title)

    // console.log('SAVE DEBUG', {
    //     destination: input.destination,
    //     destinationOk: isId(input.destination),
    //     mediaIds: ids,
    //     mediaOk: ids.map(isId),
    // })

    const [coverImage, ...rest] = ids

    if (!coverImage) throw new Error('Cover image is required')

    const data = { ...input, coverImage, images: rest.map((image) => ({ image })) }

    return id
        ? payload.update({collection: 'tours', id, data, user, overrideAccess: false})
        : payload.create({draft: true, select: undefined, collection: 'tours', data, user, overrideAccess: false})

}