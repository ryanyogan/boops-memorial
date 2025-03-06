"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="right">
        <div className="flex flex-col space-y-4">
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
        </div>
      </SheetContent>
    </Sheet>
  );
}
