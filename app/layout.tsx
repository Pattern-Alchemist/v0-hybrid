import type { Metadata } from "next"
import { Cinzel, Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import SiteHeader from "@/components/SiteHeader"

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "600", "700"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.astrokalki.com"),
  title: "AstroKalki — Karma Balance",
  description: "10‑minute karmic snapshots with practical actions.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-black font-inter text-white antialiased">
        <SiteHeader />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
