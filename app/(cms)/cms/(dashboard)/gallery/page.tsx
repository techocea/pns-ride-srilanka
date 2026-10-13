import {TitleHeader} from "@/components/shared/TitleHeader";
import {getGallery} from "@/features/gallery/services/gallery.service";
import {GalleryUploader} from "@/features/gallery/components/GalleryUploader";
import {GalleryGrid} from "@/features/gallery/components/GalleryGrid";

export default async function GalleryPage() {
    const items = await getGallery();

    return <div
        className="mx-auto space-y-8">

        <TitleHeader title={"Gallery Management"} description={`${items.length} images`}
        />
        <GalleryUploader/>
        <GalleryGrid items={items}/>

    </div>;
}