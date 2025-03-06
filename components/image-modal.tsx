"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import type { ImageType } from "@/lib/types"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import CommentSection from "./comment-section"

interface ImageModalProps {
  image: ImageType
  isAuthenticated: boolean
}

export function ImageModal({ image, isAuthenticated }: ImageModalProps) {
  const router = useRouter()

  const onClose = () => {
    router.back()
  }

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-5xl w-[90vw] p-0 overflow-hidden">
        <div className="grid md:grid-cols-2 h-[90vh]">
          <div className="relative w-full h-full bg-black">
            <Image
              src={image.url || "/placeholder.svg"}
              alt={image.caption || "Image of Edison"}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/60 text-white hover:bg-black/80"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <div className="flex flex-col h-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{image.caption || "Edison"}</h2>
              <p className="text-sm text-muted-foreground mb-4">{formatDate(image.createdAt)}</p>
              <div className="h-px w-full bg-muted mb-6" />
              <CommentSection imageId={image.id} isAuthenticated={isAuthenticated} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

