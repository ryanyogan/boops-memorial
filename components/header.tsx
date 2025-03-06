import Link from "next/link"
import { auth } from "@/lib/auth"
import { PawPrint } from "lucide-react"
import { Button } from "@/components/ui/button"
import MobileMenu from "./mobile-menu"

export default async function Header() {
  const session = await auth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <PawPrint className="h-6 w-6" />
          <span className="hidden sm:inline-block">Edison Memorial</span>
        </Link>

        <nav className="ml-auto hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-foreground/80">
            Gallery
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-foreground/80">
            About Eddy
          </Link>
          <Link href="/memories" className="text-sm font-medium hover:text-foreground/80">
            Share a Memory
          </Link>

          {session ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/profile">My Profile</Link>
              </Button>
              <Button variant="outline" size="sm">
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Sign up</Link>
              </Button>
            </>
          )}
        </nav>

        <div className="ml-auto md:hidden">
          <MobileMenu session={!!session} />
        </div>
      </div>
    </header>
  )
}

