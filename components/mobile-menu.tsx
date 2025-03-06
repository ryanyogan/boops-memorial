"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, PawPrint } from "lucide-react"

interface MobileMenuProps {
  session: boolean
}

export default function MobileMenu({ session }: MobileMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader className="mb-4">
          <SheetTitle className="flex items-center gap-2">
            <PawPrint className="h-5 w-5" />
            Edison Memorial
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="text-foreground py-2 hover:text-muted-foreground transition-colors"
            onClick={() => setOpen(false)}
          >
            Gallery
          </Link>
          <Link
            href="/about"
            className="text-foreground py-2 hover:text-muted-foreground transition-colors"
            onClick={() => setOpen(false)}
          >
            About Eddy
          </Link>
          <Link
            href="/memories"
            className="text-foreground py-2 hover:text-muted-foreground transition-colors"
            onClick={() => setOpen(false)}
          >
            Share a Memory
          </Link>

          <div className="h-px w-full bg-muted my-2" />

          {session ? (
            <>
              <Link
                href="/profile"
                className="text-foreground py-2 hover:text-muted-foreground transition-colors"
                onClick={() => setOpen(false)}
              >
                My Profile
              </Link>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-foreground py-2 hover:text-muted-foreground transition-colors"
                onClick={() => setOpen(false)}
              >
                Sign in
              </Link>
              <Button onClick={() => setOpen(false)}>Sign up</Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

