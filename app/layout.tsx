import type React from "react"
import "@/styles/globals.css"
import { Mona_Sans as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import Header from "@/components/header"
import Footer from "@/components/footer"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "Edison Memorial Gallery",
  description: "A loving tribute to our wonderful dog Edison",
    generator: 'v0.dev'
}

interface RootLayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">
            {children}
            {modal}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  )
}



import './globals.css'