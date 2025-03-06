import { getImageById } from "@/lib/db"
import { auth } from "@/lib/auth"
import { ImageModal } from "@/components/image-modal"
import { notFound } from "next/navigation"

interface PhotoModalPageProps {
  params: {
    id: string
  }
}

export default async function PhotoModalPage({ params }: PhotoModalPageProps) {
  const session = await auth()
  const image = await getImageById(params.id)

  if (!image) {
    notFound()
  }

  return <ImageModal image={image} isAuthenticated={!!session} />
}

