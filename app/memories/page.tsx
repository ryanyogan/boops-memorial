"use client";

import { Button } from "@/components/ui/button";
import { createMemory } from "@/lib/actions";
import { UploadButton } from "@/utils/uploadthing";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MemoriesPage() {
  const router = useRouter();

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
          <p className="text-muted-foreground">
            Upload a photo or video to add to Edison's memorial gallery
          </p>
        </div>

        <div className="border rounded-lg p-6 bg-card">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={async (res) => {
              if (!res?.[0]) return;

              const file = res[0];
              await createMemory({
                url: file.url,
                name: file.name,
                size: file.size,
                caption: "",
                date: new Date().toISOString(),
              });

              router.refresh();
              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
