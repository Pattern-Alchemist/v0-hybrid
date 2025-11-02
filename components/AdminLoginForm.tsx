"use client"

import { useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { Loader2, Lock } from "lucide-react"
import { useRouter } from "next/navigation"

type FormState = {
  error?: string
  success?: boolean
}

type AdminLoginFormProps = {
  loginAction: (state: FormState, formData: FormData) => Promise<FormState>
}

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-60"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Verifying...
        </>
      ) : (
        <>
          <Lock className="h-5 w-5" aria-hidden="true" /> Enter Dashboard
        </>
      )}
    </button>
  )
}

const AdminLoginForm = ({ loginAction }: AdminLoginFormProps) => {
  const [state, formAction] = useFormState(loginAction, { error: undefined, success: false })
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      router.refresh()
    }
  }, [state.success, router])

  return (
    <form action={formAction} className="glass-card neon-border border-white/10 p-8 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
      <h1 className="text-3xl font-bold text-white">Admin Access</h1>
      <p className="mt-2 text-sm text-slate-300">Enter the passphrase to view the live karmic queue.</p>

      <label className="mt-6 block text-sm">
        <span className="text-slate-200">Admin Password</span>
        <input
          type="password"
          name="password"
          required
          minLength={6}
          className="mt-2 w-full rounded-lg border border-white/10 bg-black/50 px-4 py-3 text-white transition-colors focus:border-cyan-400 focus:outline-none"
          placeholder="Enter admin password"
        />
      </label>

      {state.error && (
        <p role="alert" className="mt-4 rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-2 text-sm text-red-100">
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  )
}

export type { FormState, AdminLoginFormProps }
export default AdminLoginForm
