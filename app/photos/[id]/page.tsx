import { getImageById } from "@/lib/db"
import { auth } from "@/lib/auth"
import ImageDetail from "@/components/image-detail"
import { notFound } from "next/navigation"

interface PhotoPageProps {
  params: {
    id: string
  }
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const session = await auth()
  const image = await getImageById(params.id)

  if (!image) {
    notFound()
  }

  return (
    <div className="container py-12">
      <ImageDetail image={image} isAuthenticated={!!session} />
    </div>
  )
}

