"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

const issueTypes = ["Money", "Relationship", "Health", "Energy Drain"] as const
const countries = ["India", "Outside India"] as const

type LeadFormValues = {
  name: string
  phone?: string
  email?: string
  dob: string
  tob?: string
  birth_city: string
  country: (typeof countries)[number]
  issue_type: (typeof issueTypes)[number]
}

const LeadCaptureSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverMessage, setServerMessage] = useState<string | null>(null)
  const [showInstructions, setShowInstructions] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm<LeadFormValues>({
    defaultValues: {
      country: "India",
      issue_type: "Energy Drain",
    },
  })

  const selectedCountry = watch("country")

  const onSubmit = async (values: LeadFormValues) => {
    setServerMessage(null)
    setShowInstructions(false)

    if (values.country === "India" && !values.phone?.trim()) {
      setError("phone", { type: "manual", message: "Phone/WhatsApp is required for India" })
      return
    }

    if (values.country === "Outside India" && !values.email?.trim()) {
      setError("email", { type: "manual", message: "Email is required for international clients" })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          status: "new",
        }),
      })

      const payload = await response.json()

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.error ?? "Submission failed")
      }

      setServerMessage("Lead captured. Follow the payment instructions below.")
      setShowInstructions(true)
      reset({
        country: values.country,
        issue_type: values.issue_type,
      })
    } catch (error) {
      console.error("Lead submission failed", error)
      setServerMessage(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="lead-form" className="bg-[#0a0a0f] py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="glass-card neon-border border-white/10 p-10">
          <header className="text-center">
            <h2 className="text-3xl font-bold text-white">Secure Your Reading</h2>
            <p className="mt-4 text-base text-slate-300">
              Fill the karmic intake form precisely. I read every line myself before I decode your field.
            </p>
          </header>

          <form className="mt-10 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6 md:grid-cols-2">
              <label className="flex flex-col text-sm">
                <span className="text-slate-200">Name*</span>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  className="mt-2 rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white transition-colors focus:border-cyan-400 focus:outline-none"
                  placeholder="Enter your full name"
                />
                {errors.name && <span className="mt-1 text-xs text-red-400">{errors.name.message}</span>}
              </label>

              <label className="flex flex-col text-sm">
                <span className="text-slate-200">Phone/WhatsApp{selectedCountry === "India" ? "*" : ""}</span>
                <input
                  {...register("phone")}
                  type="text"
                  className="mt-2 rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white transition-colors focus:border-cyan-400 focus:outline-none"
                  placeholder="Include country code"
                />
                {errors.phone && <span className="mt-1 text-xs text-red-400">{errors.phone.message}</span>}
              </label>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <label className="flex flex-col text-sm">
                <span className="text-slate-200">Email{selectedCountry === "Outside India" ? "*" : " (optional)"}</span>
                <input
                  {...register("email")}
                  type="email"
                  className="mt-2 rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white transition-colors focus:border-cyan-400 focus:outline-none"
                  placeholder="Your contact email"
                />
                {errors.email && <span className="mt-1 text-xs text-red-400">{errors.email.message}</span>}
              </label>

              <label className="flex flex-col text-sm">
                <span className="text-slate-200">Country*</span>
                <select
                  {...register("country", { required: "Country is required" })}
                  className="mt-2 rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white transition-colors focus:border-cyan-400 focus:outline-none"
                >
                  {countries.map((countryOption) => (
                    <option key={countryOption} value={countryOption} className="bg-[#0a0a0f] text-slate-900">
                      {countryOption}
                    </option>
                  ))}
                </select>
                {errors.country && <span className="mt-1 text-xs text-red-400">{errors.country.message}</span>}
              </label>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <label className="flex flex-col text-sm">
                <span className="text-slate-200">Date of Birth*</span>
                <input
                  {...register("dob", { required: "Date of birth is required" })}
                  type="date"
                  className="mt-2 rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white transition-colors focus:border-cyan-400 focus:outline-none"
                />
                {errors.dob && <span className="mt-1 text-xs text-red-400">{errors.dob.message}</span>}
              </label>

              <label className="flex flex-col text-sm">
                <span className="text-slate-200">Time of Birth (optional)</span>
                <input
                  {...register("tob")}
                  type="time"
                  className="mt-2 rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white transition-colors focus:border-cyan-400 focus:outline-none"
                />
              </label>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <label className="flex flex-col text-sm">
                <span className="text-slate-200">Birth City*</span>
                <input
                  {...register("birth_city", { required: "Birth city is required" })}
                  type="text"
                  className="mt-2 rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white transition-colors focus:border-cyan-400 focus:outline-none"
                  placeholder="City + State"
                />
                {errors.birth_city && <span className="mt-1 text-xs text-red-400">{errors.birth_city.message}</span>}
              </label>

              <label className="flex flex-col text-sm">
                <span className="text-slate-200">Issue Type*</span>
                <select
                  {...register("issue_type", { required: "Issue type is required" })}
                  className="mt-2 rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white transition-colors focus:border-cyan-400 focus:outline-none"
                >
                  {issueTypes.map((type) => (
                    <option key={type} value={type} className="bg-[#0a0a0f] text-slate-900">
                      {type}
                    </option>
                  ))}
                </select>
                {errors.issue_type && <span className="mt-1 text-xs text-red-400">{errors.issue_type.message}</span>}
              </label>
            </div>

            {serverMessage && (
              <div
                role="alert"
                className={`rounded-xl border px-4 py-3 text-sm ${
                  showInstructions ? "border-cyan-500/60 bg-cyan-500/10 text-cyan-100" : "border-red-500/40 bg-red-500/10 text-red-100"
                }`}
              >
                {serverMessage}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Capturing..." : "Submit Details"}
            </button>
          </form>

          {showInstructions && (
            <div className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-black/40 p-6 text-sm text-slate-200">
              <h3 className="text-lg font-semibold text-white">Payment Instructions</h3>
              <p>
                <strong>India:</strong> Send payment via <span className="text-cyan-300">UPI to 9211271977@hdfcbank</span>
              </p>
              <p>
                <strong>International:</strong> Send payment via <span className="text-cyan-300">PayPal to &lsquo;kaus777&rsquo;</span>
              </p>
              <p>
                After payment, send your screenshot and date of birth to WhatsApp. I confirm manually before decoding.
              </p>
            </div>
          )}

          <div className="mt-8 space-y-2 text-xs text-slate-400">
            <p>
              <strong>Disclaimer:</strong> Spiritual guidance and energetic boundary work. Not medical, legal, or licensed financial
              advice.
            </p>
            <p>Your birth details are private and never shared publicly.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LeadCaptureSection
