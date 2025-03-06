import Link from "next/link"
import { ImageGallery } from "./image-gallery"
import { UploadButton } from "./upload-button"
import { TimelineFilter } from "./timeline-filter"
import { Button } from "@/components/ui/button"
import type { ImageType } from "@/lib/types"

interface GalleryProps {
  images: ImageType[]
  isAuthenticated: boolean
}

export default function Gallery({ images, isAuthenticated }: GalleryProps) {
  return (
    <section className="container px-4 py-12 md:py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Edison's Gallery</h2>
          <p className="text-muted-foreground">Browse through memories of our beloved Edison</p>
        </div>
        <div className="flex items-center gap-4">
          <TimelineFilter />
          {isAuthenticated ? (
            <UploadButton />
          ) : (
            <Button variant="outline" asChild>
              <Link href="/login">Sign in to upload</Link>
            </Button>
          )}
        </div>
      </div>
      <ImageGallery images={images} />
    </section>
  )
}

