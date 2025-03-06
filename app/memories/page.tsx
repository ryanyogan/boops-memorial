import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import UploadForm from "@/components/upload-form"

export default async function MemoriesPage() {
  const session = await auth()

  if (!session) {
    redirect("/login?callbackUrl=/memories")
  }

  return (
    <div className="container py-12 max-w-2xl">
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
          <h1 className="text-3xl font-bold mb-2">Share a Memory of Edison</h1>
          <p className="text-muted-foreground">Upload a photo or video to add to Edison's memorial gallery</p>
        </div>

        <div className="border rounded-lg p-6 bg-card">
          <UploadForm onSuccess={() => {}} />
        </div>
      </div>
    </div>
  )
}

