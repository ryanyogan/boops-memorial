import { PawPrint } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <PawPrint className="h-5 w-5" />
          <p className="text-sm text-muted-foreground">Edison Memorial Gallery &copy; {new Date().getFullYear()}</p>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          <p>Created with love in memory of our beloved Edison</p>
        </div>
      </div>
    </footer>
  )
}

