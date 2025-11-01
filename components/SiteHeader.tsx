"use client"
import Link from "next/link"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"

const NAV = [
  { href: "/", label: "Home" },
  { href: "#horoscope", label: "Horoscope" },
  { href: "#karmic", label: "Karmic Map" },
  { href: "#relationship", label: "Relationship" },
  { href: "#radio", label: "Radio" },
]

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-500/20 bg-black/80 backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo_image.png"
            alt="AstroKalki Logo"
            width={80}
            height={80}
            className="rounded-full border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20"
          />
          <span className="font-cinzel text-3xl font-bold tracking-wider text-cyan-400">ASTROKALKI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-300 transition-colors hover:text-cyan-400"
            >
              {item.label}
            </Link>
          ))}

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-sm font-medium text-gray-300 transition-colors hover:text-cyan-400 flex items-center gap-1"
              aria-expanded={isDropdownOpen}
            >
              More
              <svg
                className={`h-4 w-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg bg-black/95 border border-cyan-500/30 shadow-lg z-10">
                <button
                  onClick={() => {
                    setIsDropdownOpen(false)
                    const section = document.getElementById("services")
                    if (section) section.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="w-full text-left block px-4 py-2 text-sm text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-t-lg transition-colors"
                >
                  Services
                </button>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false)
                    const section = document.getElementById("booking")
                    if (section) section.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="w-full text-left block px-4 py-2 text-sm text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                >
                  Book Session
                </button>
                <Link
                  href="/admin"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-b-lg transition-colors"
                >
                  Admin
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-cyan-400" aria-label="Toggle menu">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="border-t border-cyan-500/20 bg-black/95 px-4 py-4 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-sm font-medium text-gray-300 transition-colors hover:text-cyan-400"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setIsOpen(false)
              const section = document.getElementById("services")
              if (section) section.scrollIntoView({ behavior: "smooth" })
            }}
            className="w-full text-left block py-2 text-sm font-medium text-gray-300 transition-colors hover:text-cyan-400"
          >
            Services
          </button>
          <button
            onClick={() => {
              setIsOpen(false)
              const section = document.getElementById("booking")
              if (section) section.scrollIntoView({ behavior: "smooth" })
            }}
            className="w-full text-left block py-2 text-sm font-medium text-gray-300 transition-colors hover:text-cyan-400"
          >
            Book Session
          </button>
        </nav>
      )}
    </header>
  )
}
