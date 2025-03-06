import Image from "next/image"
import Link from "next/link"
import type { ImageType } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { ChevronLeft } from "lucide-react"
import CommentSection from "./comment-section"

interface ImageDetailProps {
  image: ImageType
  isAuthenticated: boolean
}

export default function ImageDetail({ image, isAuthenticated }: ImageDetailProps) {
  return (
    <div className="flex flex-col space-y-8">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Gallery
          </Link>
        </Button>
      </div>

      <div className="mx-auto max-w-3xl w-full">
        <div className="relative aspect-square sm:aspect-[4/3] overflow-hidden rounded-lg bg-muted">
          <Image
            src={image.url || "/placeholder.svg"}
            alt={image.caption || "Image of Edison"}
            fill
            priority
            className="object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
          />
        </div>

        <div className="mt-6">
          <h1 className="text-3xl font-bold">{image.caption || "Edison"}</h1>
          <p className="text-muted-foreground mt-1">{formatDate(image.createdAt)}</p>
          <div className="my-8 h-px w-full bg-muted" />
          <CommentSection imageId={image.id} isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </div>
  )
}

