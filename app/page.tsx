import Gallery from "@/components/gallery";
import Hero from "@/components/hero";
import { getImages } from "@/lib/db";

export default async function Home() {
  const images = await getImages();

  return (
    <main className="min-h-screen">
      <Hero />
      <Gallery images={images} />
    </main>
  );
}
