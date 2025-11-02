import type { Metadata } from "next"
import { Inter, Cinzel } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.astrokalki.com"),
  title: {
    default: "AstroKalki | Precision Karmic Warnings",
    template: "%s | AstroKalki",
  },
  description:
    "Get direct karmic warning readings from AstroKalki. Discover your 14-day danger window, the energy leaks around you, and the boundaries you cannot cross.",
  openGraph: {
    title: "AstroKalki | Precision Karmic Warnings",
    description:
      "Get direct karmic warning readings from AstroKalki. Discover your 14-day danger window, the energy leaks around you, and the boundaries you cannot cross.",
    url: "https://www.astrokalki.com",
    siteName: "AstroKalki",
    images: [
      {
        url: "/placeholder.jpg",
        width: 1200,
        height: 630,
        alt: "AstroKalki cosmic gradient",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AstroKalki | Precision Karmic Warnings",
    description:
      "Direct, surgical karmic readings with zero sugarcoating. Secure your field now.",
    images: ["/placeholder.jpg"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-[#0a0a0f] font-sans text-white antialiased">
        {children}
      </body>
    </html>
  )
}
