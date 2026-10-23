import {TitleHeader} from "@/components/shared/TitleHeader";
import {getGallery} from "@/features/gallery/services/gallery.service";
import {GalleryUploader} from "@/features/gallery/components/GalleryUploader";
import {GalleryGrid} from "@/features/gallery/components/GalleryGrid";
import {BackButton} from "@/components/cms/BackButton";

export default async function GalleryPage() {
    const items = await getGallery();

    return <div
        className="mx-auto space-y-8">
        <div className="space-y-2">
            <BackButton/>
            <TitleHeader title={"Gallery Management"} description={`${items.length} images`}
            />
        </div>

        <GalleryUploader/>

        <GalleryGrid items={items}/>
    </div>;
}