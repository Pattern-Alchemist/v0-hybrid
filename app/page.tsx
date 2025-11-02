import HeroShivaSection from "@/components/HeroShivaSection"
import LeadCaptureSection from "@/components/LeadCaptureSection"
import PricingSection from "@/components/PricingSection"

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#0a0a0f] text-white">
      <HeroShivaSection />
      <PricingSection />
      <LeadCaptureSection />
      <footer className="border-t border-white/5 bg-black/40 py-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 text-center text-sm text-slate-400 md:flex-row md:justify-between md:text-left">
          <p>&copy; {new Date().getFullYear()} AstroKalki. All rights reserved.</p>
          <div className="space-x-4">
            <a href="#lead-form" className="text-slate-300 transition-colors hover:text-cyan-300">
              Book a Reading
            </a>
            <a href="mailto:astrokalki@protonmail.com" className="text-slate-300 transition-colors hover:text-cyan-300">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
