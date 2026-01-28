import GalleryTableAdmin from "../../features/gallery/components/GalleryTableAdmin";

export default function Gallery() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-primary">Gallery Management</h1>
            <GalleryTableAdmin />
        </div>
    );
}
