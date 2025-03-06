import { PawPrint } from "lucide-react";
import Link from "next/link";
import MobileMenu from "./mobile-menu";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <PawPrint className="h-6 w-6" />
          <span className="hidden sm:inline-block">Edison Memorial</span>
        </Link>

        <nav className="ml-auto hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium hover:text-foreground/80"
          >
            Gallery
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:text-foreground/80"
          >
            About Eddy
          </Link>
        </nav>

        <div className="ml-auto md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
