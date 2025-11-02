import Image from "next/image"
import Link from "next/link"

const pricingTiers = [
  {
    name: "Warning Reading",
    priceIndia: "₹99",
    priceIntl: "$5",
    icon: "/icons/generated_image-3.svg",
    benefits: [
      "14-day danger window",
      "Who/what is draining you now",
      "1 boundary you must not break",
    ],
    cta: "Get Warning Reading",
  },
  {
    name: "Full Karmic Map",
    priceIndia: "₹1,500",
    priceIntl: "$49",
    icon: "/icons/generated_image-4.svg",
    benefits: [
      "Root pattern of repeating pain",
      "\"Who is the leak\" clarity",
      "Ritual/action steps",
    ],
    cta: "Get Full Map",
    highlighted: true,
  },
  {
    name: "30-Day Shield Plan",
    priceIndia: "₹4,999",
    priceIntl: "$199",
    icon: "/icons/generated_image-5.svg",
    benefits: [
      "Daily stance + boundary script",
      "Mid-cycle check-in",
      "Red alert warnings",
    ],
    cta: "Get Shield Plan",
  },
] as const

const PricingSection = () => {
  return (
    <section id="pricing" className="cosmic-gradient py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-4xl font-bold text-white">Choose Your Shield</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-base text-slate-300">
          Direct, surgical intelligence for the cycle you&apos;re entering. Every tier starts with your payment confirmation and a
          human analysis delivered privately.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {pricingTiers.map((tier) => (
            <article
              key={tier.name}
              className={`glass-card flex h-full flex-col border-white/10 p-8 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] ${
                tier.highlighted ? "border-cyan-500/60 shadow-[0_0_25px_rgba(6,182,212,0.4)]" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="relative inline-flex h-16 w-16 items-center justify-center">
                  <Image src={tier.icon} alt="" width={64} height={64} className="h-16 w-16" />
                </span>
                <div>
                  <h3 className="text-2xl font-semibold text-white">{tier.name}</h3>
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">Focused Karmic Extraction</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-6 text-slate-200">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">India</p>
                  <p className="text-2xl font-bold text-white">{tier.priceIndia}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">International</p>
                  <p className="text-2xl font-bold text-white">{tier.priceIntl}</p>
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 shadow-[0_0_8px_rgba(217,70,239,0.6)]" aria-hidden="true" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Link
                  href="#lead-form"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  {tier.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingSection
