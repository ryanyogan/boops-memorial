import type { ImageType } from "@/lib/types";
import { ImageGallery } from "./image-gallery";
import { TimelineFilter } from "./timeline-filter";
import { UploadButton } from "./upload-button";

interface GalleryProps {
  images: ImageType[];
}

export default function Gallery({ images }: GalleryProps) {
  return (
    <section className="container px-4 py-12 md:py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Edison's Gallery
          </h2>
          <p className="text-muted-foreground">
            Browse through memories of our beloved Edison
          </p>
        </div>
        <div className="flex items-center gap-4">
          <TimelineFilter />
          <UploadButton />
        </div>
      </div>
      <ImageGallery images={images} />
    </section>
  );
}
