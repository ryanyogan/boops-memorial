import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Gallery
          </Link>
        </Button>
      </div>

      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">About Edison</h1>
          <p className="text-muted-foreground">2015 - 2023</p>
        </div>

        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src="/placeholder.svg?height=600&width=1200"
            alt="Edison portrait"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <p>
            Edison (affectionately known as Eddy) was a beloved companion who brought immeasurable joy to our lives for
            eight wonderful years. With his playful spirit, unwavering loyalty, and gentle soul, he touched the hearts
            of everyone who had the privilege of knowing him.
          </p>

          <p>
            Born in the spring of 2015, Edison was a bundle of energy from the start. His curious nature and boundless
            enthusiasm made every day an adventure. Whether he was chasing squirrels in the park, splashing in puddles
            during rainy walks, or simply curling up beside us during quiet evenings at home, Edison had a special way
            of making ordinary moments extraordinary.
          </p>

          <p>
            Edison's favorite activities included long walks in the woods, playing fetch with his favorite tennis ball,
            and sneaking onto the couch when he thought nobody was looking. He had an uncanny ability to sense when
            someone was feeling down and would offer comfort with a gentle nuzzle or a paw on the knee.
          </p>

          <p>
            This memorial gallery is our way of celebrating Edison's life and the countless memories we shared. We
            invite friends, family, and all who knew and loved Edison to contribute their own photos and stories,
            helping us preserve the legacy of a truly exceptional companion.
          </p>

          <p>
            Though Edison is no longer physically with us, his spirit lives on in our hearts and in the memories we
            cherish. We hope this gallery brings smiles, laughter, and perhaps a few tears as we remember our beloved
            Eddy.
          </p>
        </div>
      </div>
    </div>
  )
}

