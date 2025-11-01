"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import {
  Calendar,
  Menu,
  Compass,
  FileDown,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Play,
  Clock3,
  HeartHandshake,
  Copy,
  User,
  Loader,
  CreditCard,
  QrCode,
  SprayCan as Paypal,
  Send,
  Shuffle,
  Download,
  Share2,
  Check,
} from "lucide-react"

import Chart from "chart.js/auto"
import KarmicPatternBreaker from "@/components/karmic-pattern-breaker"

export default function HomePage() {
  // FOOTER YEAR
  const year = new Date().getFullYear()

  // =========================
  // TESTIMONIAL CAROUSEL STATE
  // =========================
  const [tIndex, setTIndex] = useState(0)
  const tLen = 3
  useEffect(() => {
    const id = setInterval(() => {
      setTIndex((prev) => (prev + 1) % tLen)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  const handlePrev = () => {
    setTIndex((prev) => (prev + tLen - 1) % tLen)
  }
  const handleNext = () => {
    setTIndex((prev) => (prev + 1) % tLen)
  }

  // =========================
  // HOROSCOPE PREVIEW STATE
  // =========================
  const [hDob, setHDob] = useState("")
  const [hTob, setHTob] = useState("")
  const [hLoc, setHLoc] = useState("")
  const [hPreview, setHPreview] = useState("Fill your details and tap Reveal Preview.")

  const handleHoroscopeGenerate = () => {
    if (!hDob || !hLoc) {
      setHPreview("Please fill DOB and Location.")
      return
    }
    const vibes = ["steady momentum", "subtle breakthrough", "quiet rest", "magnetic meetings", "skill upgrade"]
    const day = new Date(hDob).getDate()
    const vibe = vibes[day % vibes.length]
    setHPreview(
      `<div class="text-sm">
        <div class="text-cyan-200 mb-1">Today's cue</div>
        With ${hLoc} as your sky anchor and TOB ${hTob || "—"}, you're primed for 
        <span class="text-cyan-300">${vibe}</span>. 
        Keep promises small and sacred. Color hint: <span class="text-teal-300">teal</span>.
      </div>`,
    )
  }

  // =========================
  // KARMIC MAP CHART
  // =========================
  const karmicRef = useRef<HTMLCanvasElement | null>(null)
  const karmicChartRef = useRef<Chart | null>(null)

  const renderKarmicChart = useCallback(() => {
    if (!karmicRef.current) return

    const ctx = karmicRef.current.getContext("2d")
    if (!ctx) return

    if (karmicChartRef.current) {
      karmicChartRef.current.destroy()
    }

    const dataVals = [65, 48, 72, 40, 58, 85]

    const gradientCyan = ctx.createLinearGradient(0, 0, 0, 300)
    gradientCyan.addColorStop(0, "rgba(103,232,249,0.7)")
    gradientCyan.addColorStop(1, "rgba(86,179,168,0.2)")

    const gradientFuschia = ctx.createLinearGradient(0, 0, 0, 300)
    gradientFuschia.addColorStop(0, "rgba(232,121,249,0.7)")
    gradientFuschia.addColorStop(1, "rgba(13,11,30,0.2)")

    karmicChartRef.current = new Chart(ctx, {
      type: "polarArea",
      data: {
        labels: ["Dharma", "Artha", "Kama", "Moksha", "Saturn", "Jupiter"],
        datasets: [
          {
            data: dataVals,
            backgroundColor: [
              gradientCyan,
              "rgba(86,179,168,0.4)",
              gradientFuschia,
              "rgba(232,121,249,0.35)",
              "rgba(103,232,249,0.35)",
              "rgba(86,179,168,0.35)",
            ],
            borderColor: "rgba(255,255,255,0.35)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          r: {
            grid: { color: "rgba(255,255,255,0.15)" },
            angleLines: { color: "rgba(255,255,255,0.15)" },
            ticks: { display: false },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "white",
            },
          },
        },
      },
    })
  }, [])

  useEffect(() => {
    renderKarmicChart()
  }, [renderKarmicChart])

  // =========================
  // RELATIONSHIP ANALYZER CHART
  // =========================
  const raRef = useRef<HTMLCanvasElement | null>(null)
  const raChartRef = useRef<Chart | null>(null)

  const [raAName, setRaAName] = useState("")
  const [raADob, setRaADob] = useState("")
  const [raATob, setRaATob] = useState("")
  const [raALoc, setRaALoc] = useState("")

  const [raBName, setRaBName] = useState("")
  const [raBDob, setRaBDob] = useState("")
  const [raBTob, setRaBTob] = useState("")
  const [raBLoc, setRaBLoc] = useState("")

  const [raFriction, setRaFriction] = useState("Awaiting analysis…")
  const [raLeverage, setRaLeverage] = useState("Awaiting analysis…")
  const [raPlan, setRaPlan] = useState("Run an analysis to generate a plan.")

  const [raJson, setRaJson] = useState<{
    status: string
    message?: string
    data?: any
  }>({
    status: "waiting",
    message: "Run analysis to see structured results.",
  })

  const analyzeRelationship = () => {
    const a = new Date(raADob || "1990-01-01")
    const b = new Date(raBDob || "1990-01-02")

    const delta = Math.abs(a.getDate() - b.getDate())
    const synergy = Math.max(20, 100 - delta * 3)
    const comms = 60 + (b.getMonth() % 5) * 8
    const growth = 50 + ((a.getMonth() + b.getMonth()) % 6) * 7
    const trust = 55 + (10 - (delta % 10))
    const passion = 45 + ((a.getDay() + b.getDay()) % 7) * 6

    const scores = [synergy, comms, growth, trust, passion]

    const ctx = raRef.current?.getContext("2d")
    if (!ctx) return

    if (raChartRef.current) {
      raChartRef.current.destroy()
    }

    raChartRef.current = new Chart(ctx, {
      type: "radar",
      data: {
        labels: ["Overall Synergy", "Communication", "Growth Potential", "Trust", "Passion"],
        datasets: [
          {
            label: "Compatibility",
            data: scores,
            backgroundColor: "rgba(103,232,249,0.2)",
            borderColor: "rgba(103,232,249,0.8)",
            pointBackgroundColor: "rgba(232,121,249,0.9)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          r: {
            suggestedMin: 0,
            suggestedMax: 100,
            angleLines: { color: "rgba(255,255,255,0.15)" },
            grid: { color: "rgba(255,255,255,0.15)" },
            pointLabels: {
              color: "#fff",
              font: { size: 10 },
            },
            ticks: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "#fff",
            },
          },
        },
      },
    })

    setRaFriction(
      "Your emotional pacing is mismatched. One runs, one withdraws. Name the cycle out loud instead of chasing.",
    )
    setRaLeverage(
      "Shared loyalty. You both defend each other in public. That's rare. Build rituals around that protection.",
    )
    setRaPlan(
      "Day 1: 10-minute honesty dump. Day 3: physical reset walk. Day 5: ask for one thing you miss. Day 7: celebrate a win.",
    )

    setRaJson({
      status: "ok",
      data: {
        profiles: [
          { name: raAName, dob: raADob, tob: raATob, loc: raALoc },
          { name: raBName, dob: raBDob, tob: raBTob, loc: raBLoc },
        ],
        scores: {
          synergy,
          communication: comms,
          growth,
          trust,
          passion,
        },
        friction: "mismatched pacing, reactive silence",
        leverage: "public loyalty, shared mission vibe",
        plan7Day: ["honesty ritual", "movement reset", "name one longing", "reinforce safety"],
      },
    })
  }

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(raJson, null, 2))
    } catch (e) {
      // ignore
    }
  }

  // =========================
  // MICROREADING FLOW
  // =========================
  const [microStep, setMicroStep] = useState<1 | 2 | 3>(1)

  const startPayment = async (method: "upi" | "paypal") => {
    console.log("[v0] Starting payment with method:", method)
    setMicroStep(2)

    try {
      if (method === "upi") {
        const response = await fetch("/api/payments/upi/pay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: 99,
            phoneNumber: "9211271977",
            orderId: null,
          }),
        })

        const data = await response.json()

        if (data.success) {
          console.log("[v0] UPI payment initiated:", data.transactionId)
          // Open UPI deep link in a new window for mobile/app
          if (data.deepLink) {
            window.open(data.deepLink, "_blank")
          }
          setTimeout(() => setMicroStep(3), 1500)
        } else {
          console.error("[v0] UPI payment failed:", data.error)
          alert("Payment failed: " + data.error)
          setMicroStep(1)
        }
      } else if (method === "paypal") {
        const response = await fetch("/api/payments/paypal/pay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: 5,
            orderId: null,
          }),
        })

        const data = await response.json()

        if (data.success) {
          console.log("[v0] PayPal payment initiated:", data.transactionId)
          // In production, redirect to PayPal checkout
          alert(`PayPal: Send $5 to ${data.paypalEmail}`)
          setTimeout(() => setMicroStep(3), 1500)
        } else {
          console.error("[v0] PayPal payment failed:", data.error)
          alert("Payment failed: " + data.error)
          setMicroStep(1)
        }
      }
    } catch (err) {
      console.error("[v0] Payment error:", err)
      alert("Payment error. Please try again.")
      setMicroStep(1)
    }
  }

  // =========================
  // ORACLE DRAW
  // =========================
  const [oracleResult, setOracleResult] = useState("Awaiting your intention…")
  const drawOracle = () => {
    const cards = [
      "Release control. Your path is unlocked when you stop begging for certainty.",
      "Ask for help from someone who intimidated you last year. That's the gate.",
      "Travel is not distance, it's position shift. Change the room, change the field.",
      "You already know what you should say. Say it unedited within 24 hours.",
    ]
    const pick = cards[Math.floor(Math.random() * cards.length)]
    setOracleResult(pick)
  }

  // =========================
  // RENDER
  // =========================
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink text-white font-inter">
      {/* COSMIC BG LAYERS */}
      <div aria-hidden="true" className="fixed inset-0 -z-10 aurora" />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 opacity-10 mix-blend-screen">
        <img
          src="/images/design-mode/cb2a21a1-9c75-4291-8761-52100edf8f23_320w.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* drifting particles */}
      <div aria-hidden="true" className="fixed inset-0 -z-10">
        <div className="particle absolute left-10 top-20 h-1 w-1"></div>
        <div className="particle absolute left-1/2 top-52 h-1 w-1"></div>
        <div className="particle absolute right-24 top-1/3 h-1 w-1"></div>
        <div className="particle absolute bottom-36 left-1/4 h-1 w-1"></div>
        <div className="particle absolute bottom-12 right-1/3 h-1 w-1"></div>
      </div>

      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-4 flex items-center justify-between rounded-2xl glass glow px-4 py-3 sm:px-6">
            {/* brand */}
            <a href="#home" className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/images/design-mode/8477fb66-6ccd-42e6-9255-2f8c33075af0_320w.jpg"
                  alt="AstroKalki logo"
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-cyan-300/40"
                  onError={(e) => {
                    ;(e.currentTarget as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=200&auto=format&fit=crop"
                  }}
                />
                <span className="absolute -inset-1 -z-10 rounded-full bg-cyan-300/20 blur-md"></span>
              </div>
              <div>
                <span className="font-cinzel font-semibold title-tight text-lg">ASTROKALKI</span>
                <p className="-mt-0.5 text-xs text-cyan-200/80">Karma. Cosmos. Dharma </p>
              </div>
            </a>

            {/* nav */}
            <nav className="hidden items-center gap-6 text-sm md:flex">
              <a href="#horoscope" className="hover:text-cyan-200">
                Horoscope
              </a>
              <a href="#karmic" className="hover:text-cyan-200">
                Karmic Map
              </a>
              <a href="#relationship" className="hover:text-cyan-200">
                Relationship
              </a>
              <a href="#services" className="hover:text-cyan-200">
                Services
              </a>
              <a href="#radio" className="hover:text-cyan-200">
                Radio/Oracle
              </a>
              <a href="#admin" className="hover:text-cyan-200">
                Admin
              </a>
            </nav>

            {/* cta + mobile menu */}
            <div className="flex items-center gap-2">
              <a href="#booking" className="btn">
                <Calendar className="h-4 w-4" strokeWidth={1.5} />
                <span className="font-medium text-sm">Book Now</span>
              </a>
              <button className="btn-ghost rounded-full p-2 md:hidden" aria-label="Open Menu">
                <Menu className="h-5 w-5 text-white" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main id="home" className="pt-20 sm:pt-24">
        {/* HERO with Video */}
        <section className="relative px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Video Container - Responsive with modern border effects */}
            <div className="relative rounded-3xl overflow-hidden glass glow p-1 sm:p-2">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative rounded-2xl overflow-hidden backdrop-blur-xl">
                <div className="relative w-full bg-black" style={{ paddingBottom: "56.25%" }}>
                  <video className="absolute inset-0 h-full w-full object-cover" controls autoPlay muted loop>
                    <source
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/files-blob/astrokalki-v1.3/public/videos/kalki-AIjgDQ9pqOIPktVuS3rX6eVuBMgfEb.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>

            <div className="relative mt-6 sm:mt-8 overflow-hidden rounded-3xl glass glow p-8 sm:p-12 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors duration-300">
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl opacity-40 animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/30 rounded-full blur-3xl opacity-40 animate-pulse" />
                <div
                  className="absolute inset-0 opacity-5 pointer-events-none"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)",
                  }}
                />
              </div>

              <div className="relative space-y-6">
                {/* Main Headline */}
                <div className="text-center space-y-4">
                  <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-300 via-teal-300 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                    KARMA BALANCE
                  </h1>
                  <p className="text-xl sm:text-2xl text-cyan-200 font-light">in just 10 minutes</p>
                </div>

                {/* Divider */}
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                  <div className="text-cyan-300 text-sm font-semibold">✦</div>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                </div>

                <div className="grid sm:grid-cols-3 gap-4 mt-8">
                  <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-400/30 backdrop-blur text-center hover:bg-cyan-500/15 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 transform hover:scale-105">
                    <div className="text-cyan-300 text-sm font-semibold">1 Question</div>
                    <p className="text-xs text-cyan-200/80 mt-1">Love • Life • Career</p>
                  </div>
                  <div className="p-4 rounded-xl bg-fuchsia-500/10 border border-fuchsia-400/30 backdrop-blur text-center hover:bg-fuchsia-500/15 hover:shadow-lg hover:shadow-fuchsia-500/20 transition-all duration-300 transform hover:scale-105">
                    <div className="text-fuchsia-300 text-sm font-semibold">Universe Feedback</div>
                    <p className="text-xs text-fuchsia-200/80 mt-1">Cosmic Insight</p>
                  </div>
                  <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-400/30 backdrop-blur text-center hover:bg-teal-500/15 hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300 transform hover:scale-105">
                    <div className="text-teal-300 text-sm font-semibold">Instant Delivery</div>
                    <p className="text-xs text-teal-200/80 mt-1">No Waiting Required</p>
                  </div>
                </div>

                {/* Pricing and CTA */}
                <div className="mt-8 text-center space-y-4">
                  <div className="inline-block">
                    <span className="text-lg text-white/80">Only </span>
                    <span className="font-cinzel text-3xl font-bold text-cyan-300">₹99</span>
                    <span className="text-lg text-white/80"> / </span>
                    <span className="font-cinzel text-3xl font-bold text-cyan-300">$5</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <button className="relative group px-8 py-3 rounded-xl font-cinzel font-semibold text-lg bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-black transition-all duration-300 shadow-lg shadow-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/70 transform hover:scale-110 active:scale-95">
                      <span className="relative z-10">Get My Reading</span>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 opacity-0 group-hover:opacity-30 transition-opacity blur" />
                    </button>

                    <button className="relative group px-8 py-3 rounded-xl font-cinzel font-semibold text-lg border-2 border-fuchsia-400 text-fuchsia-300 hover:text-fuchsia-200 transition-all duration-300 hover:bg-fuchsia-500/10 shadow-lg shadow-fuchsia-500/20 hover:shadow-2xl hover:shadow-fuchsia-500/40 transform hover:scale-110 active:scale-95">
                      <span className="relative z-10">Book 1-on-1 Session</span>
                      <div className="absolute inset-0 rounded-xl border-2 border-fuchsia-400 opacity-0 group-hover:opacity-100 animate-pulse" />
                    </button>
                  </div>
                </div>

                {/* Footer Text */}
                <div className="text-center space-y-2 pt-4 border-t border-white/10">
                  <p className="text-sm text-cyan-200">✧ "KAUSTUBH" is live. "RADIO" is tuning in… ✧</p>
                  <p className="text-xs text-white/70">Coming Soon. Transform your LIFE... Start now.</p>
                  <div className="inline-block mt-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-400/40">
                    <span className="text-xs font-semibold text-red-300">WARNING: Instant Karma Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="relative mt-16 sm:mt-24 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-cinzel title-tight text-3xl font-semibold sm:text-4xl mb-6">
              Plans aligned to your journey
            </h2>
            <p className="mb-8 text-white/70">Simple tiers. No surprises. Cosmic clarity at every step.</p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Flash K – Quick Insight */}
              <div className="glass glow flex flex-col rounded-2xl p-6 hover:border-cyan-300/40 border border-white/10 transition-all">
                <div className="flex items-center justify-between">
                  <h3 className="font-cinzel title-tight text-xl font-semibold">Flash K</h3>
                  <span className="badge text-xs">Quick Insight</span>
                </div>
                <p className="mt-1 text-sm text-white/70">Instant clarity on any question.</p>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-cyan-200">₹100</div>
                </div>
                <ul className="mt-5 space-y-2 text-sm text-white/80 flex-grow">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-300 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span>1 Specific Question (Career, Love, Money, Health)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-300 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span>Personal Voice message in mail: 5–10 mins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-300 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span>1 Simple Remedy you can apply immediately</span>
                  </li>
                </ul>
                <a href="#booking" className="btn mt-6 w-full justify-center text-sm font-medium">
                  Book Now
                </a>
              </div>

              {/* Cosmic Code – Astrology + Numerology */}
              <div className="glass glow flex flex-col rounded-2xl p-6 hover:border-cyan-300/40 border border-white/10 transition-all">
                <div className="flex items-center justify-between">
                  <h3 className="font-cinzel title-tight text-xl font-semibold">Cosmic Code</h3>
                  <span className="badge text-xs">Astrology</span>
                </div>
                <p className="mt-1 text-sm text-white/70">Reveal your cosmic blueprint.</p>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-cyan-200">₹777</div>
                </div>
                <ul className="mt-5 space-y-2 text-sm text-white/80 flex-grow">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-300 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span>Life Path + Future events</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-300 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span>Alignment guidance + Life's greater purpose</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-300 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span>Audio call: 20 mins + Complete PDF Report</span>
                  </li>
                </ul>
                <a href="#booking" className="btn mt-6 w-full justify-center text-sm font-medium">
                  Book Now
                </a>
              </div>

              {/* KARMA Level */}
              <div className="glass glow flex flex-col rounded-2xl p-6 border-2 border-cyan-300/40 hover:border-cyan-300/60 transition-all lg:col-span-1 md:col-span-2 md:max-w-md lg:max-w-none">
                <div className="flex items-center justify-between">
                  <h3 className="font-cinzel title-tight text-xl font-semibold">KARMA Level</h3>
                  <span className="badge bg-cyan-300/30 text-xs">Most Popular</span>
                </div>
                <p className="mt-1 text-sm text-white/70">Your personalized karmic insight session.</p>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-cyan-200">₹1,500</div>
                </div>
                <ul className="mt-5 space-y-2 text-sm text-white/80 flex-grow">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-300 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span>3 Questions covered in depth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-300 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span>Remedy Outline tailored to your situation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-300 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span>Audio call: 25-30 mins + 7-day follow-up chat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-300 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span>Complete PDF Report</span>
                  </li>
                </ul>
                <a href="#booking" className="btn mt-6 w-full justify-center text-sm font-medium">
                  Book Now
                </a>
              </div>

              {/* KARMIC RELEASE */}
              <div className="glass glow flex flex-col rounded-2xl p-6 hover:border-cyan-300/40 border border-white/10 transition-all">
                <div className="flex items-center justify-between">
                  <h3 className="font-cinzel title-tight text-xl font-semibold">KARMA RELEASE</h3>
                  <span className="badge text-xs">Intensive</span>
                </div>
                <p className="mt-1 text-sm text-white/70">Past-Present-Future deep dive.</p>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-cyan-200">₹4,500</div>
                </div>
                <ul className="mt-5 space-y-2 text-sm text-white/80 flex-grow">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-300 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span>Past (Last year's), Present and Future Predictions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-300 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span>Karmic analysis + Natal Snapshot + Current Transits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-300 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span>Audio/Video Session: 45–60 mins + 30-day follow-up</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-300 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span>Complete PDF Report</span>
                  </li>
                </ul>
                <a href="#booking" className="btn mt-6 w-full justify-center text-sm font-medium">
                  Book Now
                </a>
              </div>

              {/* THE MOKSHA ROADMAP */}
              <div className="glass glow flex flex-col rounded-2xl p-6 hover:border-cyan-300/40 border border-white/10 transition-all">
                <div className="flex items-center justify-between">
                  <h3 className="font-cinzel title-tight text-xl font-semibold">MOKSHA ROADMAP</h3>
                  <span className="badge text-xs">Premium</span>
                </div>
                <p className="mt-1 text-sm text-white/70">12-18 month future roadmap.</p>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-cyan-200">₹8,888</div>
                </div>
                <ul className="mt-5 space-y-2 text-sm text-white/80 flex-grow">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-300 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span>Full Chart + 12–18 Month Future Roadmap</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-300 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span>Future events decoding + Early path navigation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-300 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span>Video Session: 60–75 mins + Two Follow-Up Calls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-300 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span>Complete PDF Report</span>
                  </li>
                </ul>
                <a href="#booking" className="btn mt-6 w-full justify-center text-sm font-medium">
                  Book Now
                </a>
              </div>

              {/* WALK for DHARMA */}
              <div className="glass glow flex flex-col rounded-2xl p-6 hover:border-cyan-300/40 border border-white/10 transition-all">
                <div className="flex items-center justify-between">
                  <h3 className="font-cinzel title-tight text-xl font-semibold">WALK for DHARMA</h3>
                  <span className="badge text-xs">Mentorship</span>
                </div>
                <p className="mt-1 text-sm text-white/70">Personal cosmic blueprint + 3-month access.</p>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-cyan-200">₹33,999</div>
                </div>
                <ul className="mt-5 space-y-2 text-sm text-white/80 flex-grow">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-300 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span>Personal Soul Blueprint decoded</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-300 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span>Custom Sadhana Plan + Karmic realignment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-300 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span>Priority 1-on-1 Access for 3 months + Tools + WhatsApp guidance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-teal-300 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <span>Access to lectures, crystals, rudraksha recommendations</span>
                  </li>
                </ul>
                <a href="#booking" className="btn mt-6 w-full justify-center text-sm font-medium">
                  Book Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="relative mt-16 sm:mt-24 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="glass glow rounded-3xl p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <h3 className="font-cinzel title-tight text-2xl font-semibold text-center">Stories from the cosmos</h3>
                <div className="flex items-center gap-2">
                  <button className="btn btn-ghost px-3 text-sm" aria-label="Previous" onClick={handlePrev}>
                    <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                  <button className="btn px-3 text-sm" aria-label="Next" onClick={handleNext}>
                    <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              <div className="mt-6 overflow-hidden">
                <div
                  className="carousel-track grid w-[300%] grid-cols-1 gap-6 sm:grid-cols-3"
                  style={{
                    transform: `translateX(-${tIndex * 100}%)`,
                  }}
                >
                  {/* Slide 1 */}
                  <div className="glass rounded-2xl p-5">
                    <div className="flex items-center gap-3">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src="https://images.unsplash.com/photo-1621619856624-42fd193a0661?w=1080&q=80"
                        alt=""
                      />
                      <div>
                        <div className="font-medium">Aarav</div>
                        <div className="text-xs text-white/60">Pune</div>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-white/80">
                      The Karmic Map read me like a mirror. Subtle nudges, clear next steps. I felt seen.
                    </p>
                  </div>

                  {/* Slide 2 */}
                  <div className="glass rounded-2xl p-5">
                    <div className="flex items-center gap-3">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src="https://images.unsplash.com/photo-1621619856624-42fd193a0661?w=1080&q=80"
                        alt=""
                      />
                      <div>
                        <div className="font-medium">Maya</div>
                        <div className="text-xs text-white/60">Bengaluru</div>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-white/80">
                      Daily previews feel like gentle course-corrections. The design is otherworldly.
                    </p>
                  </div>

                  {/* Slide 3 */}
                  <div className="glass rounded-2xl p-5">
                    <div className="flex items-center gap-3">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src="https://images.unsplash.com/photo-1621619856624-42fd193a0661?w=1080&q=80"
                        alt=""
                      />
                      <div>
                        <div className="font-medium">Ishan</div>
                        <div className="text-xs text-white/60">Toronto</div>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-white/80">
                      The Relationship Analyzer gave us a realistic plan, not fairy dust. It worked.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KARMIC PATTERN BREAKER */}
        <KarmicPatternBreaker />

        {/* KARMIC MAP */}
        <section id="karmic" className="relative mt-16 sm:mt-24 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* left form */}
              <div className="glass glow rounded-3xl p-6 lg:col-span-1">
                <h3 className="font-cinzel title-tight text-2xl font-semibold">Karmic Map Analyzer</h3>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm">DOB</label>
                    <input
                      type="date"
                      className="glass focus-ring w-full rounded-xl bg-transparent px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm">TOB</label>
                    <input
                      type="time"
                      className="glass focus-ring w-full rounded-xl bg-transparent px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-sm">Location</label>
                    <input
                      type="text"
                      placeholder="City"
                      className="glass focus-ring w-full rounded-xl bg-transparent px-3 py-2 text-sm text-white"
                    />
                  </div>
                </div>

                <button className="btn mt-5 w-full justify-center text-sm font-medium" onClick={renderKarmicChart}>
                  <Compass className="h-4 w-4" strokeWidth={1.5} />
                  Analyze
                </button>

                <a href="#" className="btn btn-ghost mt-3 w-full justify-center border-cyan-300/40 text-sm font-medium">
                  <FileDown className="h-4 w-4 text-white" strokeWidth={1.5} />
                  Full Map PDF
                </a>
              </div>

              {/* right chart */}
              <div className="glass glow rounded-3xl p-6 lg:col-span-2">
                <h4 className="font-cinzel title-tight font-semibold text-xl">Pattern Analysis</h4>
                <p className="text-sm text-white/70">
                  A radial synthesis of strengths, frictions, and dharmic currents.
                </p>

                <div className="mt-4">
                  <div className="relative h-72 rounded-2xl glass sm:h-96">
                    <div className="absolute inset-3">
                      <div className="h-full w-full">
                        <canvas ref={karmicRef} className="h-full w-full" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-white/60">Tip: hover the chart points for insight labels.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RELATIONSHIP ANALYZER */}
        <section id="relationship" className="relative mt-16 sm:mt-24 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="glass glow rounded-3xl p-6">
              {/* header row */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="font-cinzel title-tight text-2xl font-semibold">Relationship Analyzer</h3>
                  <p className="text-sm text-white/70">Map friction, leverage and a concrete 7-day repair plan.</p>
                </div>
                <a href="#" className="btn text-sm font-medium">
                  <Clock3 className="h-4 w-4" strokeWidth={1.5} />
                  7-Day Repair Plan
                </a>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-3">
                {/* Profile A */}
                <div className="glass rounded-2xl p-4">
                  <div className="flex items-center gap-2">
                    <span className="badge">Profile A</span>
                    <User className="h-4 w-4 text-cyan-300" strokeWidth={1.5} />
                  </div>
                  <div className="mt-3 space-y-3 text-sm">
                    <input
                      value={raAName}
                      onChange={(e) => setRaAName(e.target.value)}
                      type="text"
                      placeholder="Name"
                      className="glass focus-ring w-full rounded-xl bg-transparent px-3 py-2 text-white"
                    />
                    <input
                      value={raADob}
                      onChange={(e) => setRaADob(e.target.value)}
                      type="date"
                      className="glass focus-ring w-full rounded-xl bg-transparent px-3 py-2 text-white"
                    />
                    <input
                      value={raATob}
                      onChange={(e) => setRaATob(e.target.value)}
                      type="time"
                      className="glass focus-ring w-full rounded-xl bg-transparent px-3 py-2 text-white"
                    />
                    <input
                      value={raALoc}
                      onChange={(e) => setRaALoc(e.target.value)}
                      type="text"
                      placeholder="Location"
                      className="glass focus-ring w-full rounded-xl bg-transparent px-3 py-2 text-white"
                    />
                  </div>
                </div>

                {/* Profile B */}
                <div className="glass rounded-2xl p-4">
                  <div className="flex items-center gap-2">
                    <span className="badge">Profile B</span>
                    <User className="h-4 w-4 text-cyan-300" strokeWidth={1.5} />
                  </div>
                  <div className="mt-3 space-y-3 text-sm">
                    <input
                      value={raBName}
                      onChange={(e) => setRaBName(e.target.value)}
                      type="text"
                      placeholder="Name"
                      className="glass focus-ring w-full rounded-xl bg-transparent px-3 py-2 text-white"
                    />
                    <input
                      value={raBDob}
                      onChange={(e) => setRaBDob(e.target.value)}
                      type="date"
                      className="glass focus-ring w-full rounded-xl bg-transparent px-3 py-2 text-white"
                    />
                    <input
                      value={raBTob}
                      onChange={(e) => setRaBTob(e.target.value)}
                      type="time"
                      className="glass focus-ring w-full rounded-xl bg-transparent px-3 py-2 text-white"
                    />
                    <input
                      value={raBLoc}
                      onChange={(e) => setRaBLoc(e.target.value)}
                      type="text"
                      placeholder="Location"
                      className="glass focus-ring w-full rounded-xl bg-transparent px-3 py-2 text-white"
                    />
                  </div>
                </div>

                {/* Actions + Radar */}
                <div className="lg:col-span-1">
                  <div className="flex flex-col justify-between h-full">
                    <div className="glass rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <HeartHandshake className="h-4 w-4 text-cyan-300" strokeWidth={1.5} />
                        <div className="font-medium">Analysis Summary</div>
                      </div>
                      <p className="text-sm text-white/70 mb-2">
                        Friction: <span className="text-white">{raFriction}</span>
                      </p>
                      <p className="text-sm text-white/70 mb-2">
                        Leverage: <span className="text-white">{raLeverage}</span>
                      </p>
                      <p className="text-sm text-white/70">
                        Plan: <span className="text-white">{raPlan}</span>
                      </p>
                    </div>
                    <button
                      className="btn mt-4 w-full justify-center text-sm font-medium"
                      onClick={analyzeRelationship}
                    >
                      <Play className="h-4 w-4" strokeWidth={1.5} />
                      Analyze Relationship
                    </button>
                    <button
                      className="btn btn-ghost mt-2 w-full justify-center border-cyan-300/40 text-sm font-medium"
                      onClick={handleCopyJson}
                    >
                      <Copy className="h-4 w-4 text-white" strokeWidth={1.5} />
                      Copy Analysis JSON
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-1">
                <div className="glass glow rounded-3xl p-6">
                  <h4 className="font-cinzel title-tight font-semibold text-xl">Compatibility Radar</h4>
                  <p className="text-sm text-white/70">Visualizing the interplay of your energies.</p>
                  <div className="mt-4 relative h-64 rounded-2xl glass sm:h-80">
                    <div className="absolute inset-3">
                      <div className="h-full w-full">
                        <canvas ref={raRef} className="h-full w-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RADIO / ORACLE */}
        <section id="radio" className="relative mt-16 sm:mt-24 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Episodes */}
              <div className="md:col-span-2">
                <h3 className="font-cinzel title-tight text-3xl font-semibold">Radio • Oracle</h3>
                <p className="mt-1 text-white/70">Listen while you realign.</p>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {/* Ep 21 */}
                  <div className="rounded-2xl glass glow p-5">
                    <div className="flex items-center gap-3">
                      <div className="eq flex h-6 items-end gap-1" aria-hidden="true">
                        <span className="animate-eqbounce"></span>
                        <span className="animate-eqbounce"></span>
                        <span className="animate-eqbounce"></span>
                        <span className="animate-eqbounce"></span>
                        <span className="animate-eqbounce"></span>
                      </div>
                      <div>
                        <div className="font-medium">Episode 21 — Saturn Lessons</div>
                        <div className="text-xs text-white/60">24 min</div>
                      </div>
                    </div>
                    <audio controls className="mt-3 w-full" />
                    <p className="mt-3 text-sm text-white/80">
                      Turn resistance into rhythm. A practical guide to steady growth.
                    </p>
                  </div>

                  {/* Ep 22 */}
                  <div className="rounded-2xl glass glow p-5">
                    <div className="flex items-center gap-3">
                      <div className="eq flex h-6 items-end gap-1" aria-hidden="true">
                        <span className="animate-eqbounce"></span>
                        <span className="animate-eqbounce"></span>
                        <span className="animate-eqbounce"></span>
                        <span className="animate-eqbounce"></span>
                        <span className="animate-eqbounce"></span>
                      </div>
                      <div>
                        <div className="font-medium">Episode 22 — Venus Codes</div>
                        <div className="text-xs text-white/60">18 min</div>
                      </div>
                    </div>
                    <audio controls className="mt-3 w-full" />
                    <p className="mt-3 text-sm text-white/80">Attraction mechanics and subtle self-worth tuning.</p>
                  </div>
                </div>
              </div>

              {/* Oracle pull */}
              <div className="glass glow h-full rounded-2xl p-6">
                <div className="badge">Oracle Pull</div>
                <h4 className="font-cinzel title-tight mt-2 text-2xl font-semibold">Draw a Card</h4>
                <p className="mt-2 text-sm text-white/70">A quick alignment ritual. Ask, breathe, and draw.</p>
                <button className="btn mt-4 w-full justify-center text-sm font-medium" onClick={drawOracle}>
                  <Shuffle className="h-4 w-4" strokeWidth={1.5} />
                  Shuffle &amp; Draw
                </button>
                <div className="mt-4 rounded-xl glass p-4 text-sm text-cyan-100/90">{oracleResult}</div>
              </div>
            </div>
          </div>
        </section>

        {/* BOOKING / LEADS */}
        <section id="booking" className="relative mt-16 sm:mt-24 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Lead form */}
              <div className="rounded-3xl glass glow p-6">
                <h3 className="font-cinzel title-tight text-2xl font-semibold">Lead &amp; Booking Form</h3>
                <p className="text-sm text-white/70">We reply within 24 hours.</p>

                <form
                  className="mt-4 grid gap-4 sm:grid-cols-2"
                  onSubmit={(e) => {
                    e.preventDefault()
                    const success = document.getElementById("lead-success")
                    if (success) {
                      success.classList.remove("hidden")
                    }
                  }}
                >
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-sm">Full Name</label>
                    <input
                      name="name"
                      type="text"
                      required
                      className="glass focus-ring w-full rounded-xl bg-transparent px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm">Phone</label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      className="glass focus-ring w-full rounded-xl bg-transparent px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm">Email</label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="glass focus-ring w-full rounded-xl bg-transparent px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm">DOB</label>
                    <input
                      name="dob"
                      type="date"
                      required
                      className="glass focus-ring w-full rounded-xl bg-transparent px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm">TOB (optional)</label>
                    <input
                      name="tob"
                      type="time"
                      className="glass focus-ring w-full rounded-xl bg-transparent px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm">Location</label>
                    <input
                      name="location"
                      type="text"
                      required
                      className="glass focus-ring w-full rounded-xl bg-transparent px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm">Country (optional)</label>
                    <input
                      name="country"
                      type="text"
                      className="glass focus-ring w-full rounded-xl bg-transparent px-3 py-2 text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <button className="btn w-full justify-center text-sm font-medium" type="submit">
                      <Send className="h-4 w-4" strokeWidth={1.5} />
                      Submit
                    </button>
                  </div>
                </form>

                {/* success toast */}
                <div id="lead-success" className="hidden mt-4 rounded-2xl glass p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cyan-300/20">
                    <Check className="h-5 w-5 text-cyan-300" strokeWidth={1.5} />
                  </div>
                  <p className="mt-2 font-medium">Thank you! Your request is received.</p>
                  <p className="text-sm text-white/70">We'll reach out shortly.</p>
                </div>
              </div>

              {/* Microreading Flow */}
              <div className="rounded-3xl glass glow p-6">
                <h3 className="font-cinzel title-tight text-2xl font-semibold">Microreading Flow</h3>

                <div className="mt-4 space-y-4 text-white text-sm">
                  {/* STEP 1 */}
                  <div className={`glass rounded-2xl p-4 ${microStep === 1 ? "" : "opacity-50"}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="badge">Step 1</span>
                        <div className="font-medium">Payment</div>
                      </div>
                      <CreditCard className="h-4 w-4 text-cyan-300" strokeWidth={1.5} />
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <button
                        onClick={() => startPayment("upi")}
                        className="btn w-full justify-center text-sm font-medium"
                      >
                        <QrCode className="h-4 w-4" strokeWidth={1.5} />
                        UPI
                      </button>
                      <button
                        onClick={() => startPayment("paypal")}
                        className="btn btn-ghost w-full justify-center text-sm font-medium"
                      >
                        <Paypal className="h-4 w-4 text-white" strokeWidth={1.5} />
                        PayPal
                      </button>
                    </div>
                  </div>

                  {/* STEP 2 */}
                  <div className={`glass rounded-2xl p-4 ${microStep === 2 ? "" : "hidden"}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="badge">Step 2</span>
                        <div className="font-medium">Generating Reading</div>
                      </div>
                      <Loader className="h-4 w-4 animate-spin text-cyan-300" strokeWidth={1.5} />
                    </div>
                    <div className="mt-3 rounded-xl bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/20 to-teal-500/20 p-3 text-sm">
                      Aligning orbits, mapping karma, distilling insights…
                    </div>
                  </div>

                  {/* STEP 3 */}
                  <div className={`glass rounded-2xl p-4 ${microStep === 3 ? "" : "hidden"}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="badge">Step 3</span>
                        <div className="font-medium">Download</div>
                      </div>
                      <FileDown className="h-4 w-4 text-cyan-300" strokeWidth={1.5} />
                    </div>
                    <p className="mt-2 text-sm text-white/80">Your 1-page actionable summary is ready.</p>
                    <div className="mt-3 flex gap-3">
                      <a href="#" className="btn text-sm font-medium">
                        <Download className="h-4 w-4" strokeWidth={1.5} />
                        PDF
                      </a>
                      <a href="#" className="btn btn-ghost text-sm font-medium">
                        <Share2 className="h-4 w-4 text-white" strokeWidth={1.5} />
                        Share
                      </a>
                    </div>
                  </div>

                  {/* ACTIONABLE SUMMARY (always shown) */}
                  <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-cyan-400/10 via-indigo-500/10 to-fuchsia-500/10 p-4 text-sm text-white/85">
                    <h4 className="font-cinzel title-tight text-xl font-semibold text-white">Actionable Summary</h4>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      <li>Anchor morning with 5-minute breath: count 4-7-8.</li>
                      <li>Send gratitude message to a mentor—open a new path.</li>
                      <li>Choose one ritual color for the week: teal</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="relative mt-16 sm:mt-24 py-12 text-center text-sm text-white/70">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p>
              © {year} AstroKalki. All Rights Reserved. |
              <a href="#" className="text-cyan-300 hover:text-cyan-200">
                {" "}
                Privacy Policy
              </a>{" "}
              |
              <a href="#" className="text-cyan-300 hover:text-cyan-200">
                {" "}
                Terms of Service
              </a>
            </p>
            <p className="mt-2 text-xs text-white/50">
              The cosmos holds infinite possibilities. Insights provided are for guidance and entertainment.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
