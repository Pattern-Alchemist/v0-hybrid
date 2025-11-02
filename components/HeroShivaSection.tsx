"use client"

import { ArrowRight } from "lucide-react"
import { useCallback } from "react"

const HeroShivaSection = () => {
  const handleScroll = useCallback(() => {
    const target = document.querySelector("#pricing")
    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="/placeholder.jpg"
      >
        <source src="/videos/Shiva_hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/80" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-5xl flex-col items-center justify-center px-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">AstroKalki Warning Protocol</p>
        <h1 className="mt-4 text-balance text-5xl font-bold text-white md:text-6xl">
          Your karma is bleeding energy. I&apos;ll show you where — today.
        </h1>
        <p className="mt-4 max-w-3xl text-balance text-xl text-slate-300 md:text-2xl">
          14-day danger window. Who&apos;s draining you. What NOT to do.
        </p>
        <button
          type="button"
          onClick={handleScroll}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black"
        >
          Get My Warning Reading (₹99)
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>
        <p className="mt-6 max-w-2xl text-sm text-slate-400">
          1:1 human reading. You pay first, I decode personally. No AI spam. No sugarcoating.
        </p>
      </div>
    </section>
  )
}

export default HeroShivaSection
