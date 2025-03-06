"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import type { ImageType } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { useInView } from "react-intersection-observer"

interface ImageGalleryProps {
  images: ImageType[]
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [visibleImages, setVisibleImages] = useState<ImageType[]>([])
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView({
    threshold: 0.1,
  })

  // Simulate loading more images when scrolling
  const loadMoreImages = useCallback(() => {
    const currentLength = visibleImages.length
    const nextBatch = images.slice(currentLength, currentLength + 6)
    if (nextBatch.length > 0) {
      setVisibleImages((prev) => [...prev, ...nextBatch])
    }
  }, [images, visibleImages])

  // Initial load
  useEffect(() => {
    setVisibleImages(images.slice(0, 12))
  }, [images])

  // Load more when scrolling to the bottom
  useEffect(() => {
    if (inView) {
      loadMoreImages()
    }
  }, [inView, loadMoreImages])

  // Group images by month and year
  const groupedImages = visibleImages.reduce(
    (acc, image) => {
      const date = new Date(image.createdAt)
      const monthYear = date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })

      if (!acc[monthYear]) {
        acc[monthYear] = []
      }

      acc[monthYear].push(image)
      return acc
    },
    {} as Record<string, ImageType[]>,
  )

  return (
    <div className="space-y-16">
      {Object.entries(groupedImages).map(([monthYear, images]) => (
        <div key={monthYear} className="space-y-6">
          <h3 className="text-2xl font-semibold border-b pb-2">{monthYear}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/photos/${image.id}`} className="block overflow-hidden rounded-lg bg-muted">
                  <div className="aspect-square relative overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={image.caption || "Photo of Edison"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium truncate">{image.caption || "Edison"}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(image.createdAt)}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
      <div ref={ref} className="h-10" />
    </div>
  )
}

