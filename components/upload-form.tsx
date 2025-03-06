"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Upload } from "lucide-react"
import { uploadImage } from "@/lib/actions"

const formSchema = z.object({
  file: z.any().refine((file) => file?.length === 1, "Please select a file"),
  caption: z.string().min(3, "Caption must be at least 3 characters").max(100),
  date: z.string().optional(),
})

interface UploadFormProps {
  onSuccess: () => void
}

export default function UploadForm({ onSuccess }: UploadFormProps) {
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caption: "",
      date: new Date().toISOString().split("T")[0],
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsUploading(true)
      // In a real implementation, we would use UploadThing here
      await uploadImage(values)
      router.refresh()
      onSuccess()
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreview(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
    form.setValue("file", e.target.files)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="file"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Upload Photo or Video</FormLabel>
              <FormControl>
                <div className="grid w-full items-center gap-1.5">
                  <label
                    htmlFor="file"
                    className={cn(
                      "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer bg-muted/50 hover:bg-muted transition-colors",
                      preview ? "border-primary" : "border-muted-foreground/25",
                    )}
                  >
                    {preview ? (
                      <div className="relative w-full h-full">
                        <img
                          src={preview || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground/70 mt-1">Images or videos of Edison</p>
                      </div>
                    )}
                    <Input
                      id="file"
                      type="file"
                      accept="image/*,video/*"
                      className="hidden"
                      onChange={handleFileChange}
                      {...field}
                    />
                  </label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caption</FormLabel>
              <FormControl>
                <Textarea placeholder="Share a memory about Edison..." className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>When was this taken? (optional)</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isUploading} className="w-full">
          {isUploading ? "Uploading..." : "Upload Memory"}
        </Button>
      </form>
    </Form>
  )
}

