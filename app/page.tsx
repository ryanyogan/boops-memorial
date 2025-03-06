import { auth } from "@/lib/auth"
import { getImages } from "@/lib/db"
import Gallery from "@/components/gallery"
import Hero from "@/components/hero"

export default async function Home() {
  const session = await auth()
  const images = await getImages()

  return (
    <main className="min-h-screen">
      <Hero />
      <Gallery images={images} isAuthenticated={!!session} />
    </main>
  )
}

