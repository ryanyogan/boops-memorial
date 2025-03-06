"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Upload } from "lucide-react"
import UploadForm from "./upload-form"

export function UploadButton() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Memory
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload a Memory of Edison</DialogTitle>
        </DialogHeader>
        <UploadForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

