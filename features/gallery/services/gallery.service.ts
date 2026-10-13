import {requireUser} from "@/features/auth/services/auth.service";
import type {NewImageEntry} from "@/features/media/schemas/media.schema";
import {resolveImageIds} from "@/features/media/services/media.service";
import {captionFromName} from "@/features/gallery/utils/caption";

export async function getGallery() {
    const {payload, user} = await requireUser();
    const {docs} = await payload.find({
        collection: "gallery",
        depth: 1,
        sort: "-createdAt",
        user,
        overrideAccess: false
    })
    return docs;
}

export async function addGalleryItems(entries:NewImageEntry[]) {
    const { payload, user } = await requireUser()
    const ids = await resolveImageIds(entries, 'Gallery image')

    for (let i = entries.length - 1; i >= 0; i--) {
        await payload.create({
            collection: 'gallery',
            data: { image: ids[i], caption: captionFromName(entries[i].name) },
            user,
            overrideAccess: false,
        })
    }
}

export async function updateCaption(id: string, caption: string) {
    const { payload, user } = await requireUser()
    await payload.update({ collection: 'gallery', id, data: { caption }, user, overrideAccess: false })
}

export async function removeGalleryItem(id: string) {
    const { payload, user } = await requireUser()

    const item = await payload.findByID({ collection: 'gallery', id, depth: 0, user, overrideAccess: false })
    await payload.delete({ collection: 'gallery', id, user, overrideAccess: false })

    // also remove the media record; its afterDelete hook deletes the file from UploadThing
    const mediaId = typeof item.image === 'string' ? item.image : item.image.id
    await payload.delete({ collection: 'media', id: mediaId, user, overrideAccess: false }).catch(() => {})
}