"use client"

import { useMemo, useState } from "react"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"

export type LeadRecord = {
  id: string
  name: string
  phone?: string | null
  email?: string | null
  dob: string
  tob?: string | null
  birth_city: string
  country: string
  issue_type: string
  amount_expected?: number | null
  payment_status: string
  delivery_status: string
  notes?: string | null
  created_at?: string | null
}

type AdminDashboardProps = {
  leads: LeadRecord[]
  supabaseConfigured: boolean
}

const paymentStatusOptions = [
  { label: "Unpaid", value: "unpaid" },
  { label: "Paid", value: "paid" },
]

const deliveryStatusOptions = [
  { label: "Pending", value: "pending" },
  { label: "Sent", value: "sent" },
]

const AdminDashboard = ({ leads, supabaseConfigured }: AdminDashboardProps) => {
  const [records, setRecords] = useState(leads)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const sortedRecords = useMemo(
    () =>
      [...records].sort((a, b) => {
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0
        return dateB - dateA
      }),
    [records],
  )

  const handleUpdate = async (id: string, updates: Partial<LeadRecord>) => {
    setUpdatingId(id)
    setMessage(null)

    try {
      const response = await fetch("/api/lead", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...updates }),
      })

      const payload = await response.json()

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.error ?? "Failed to update lead")
      }

      setRecords((previous) =>
        previous.map((entry) => (entry.id === id ? { ...entry, ...updates } : entry)),
      )
      setMessage({ type: "success", text: "Lead updated." })
    } catch (error) {
      console.error("Lead update failed", error)
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Unexpected error" })
    } finally {
      setUpdatingId(null)
    }
  }

  if (!supabaseConfigured) {
    return (
      <div className="mt-10 rounded-2xl border border-yellow-500/40 bg-yellow-500/10 p-6 text-sm text-yellow-100">
        Supabase not configured
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {message && (
        <div
          role="status"
          className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${
            message.type === "success"
              ? "border-teal-400/50 bg-teal-400/10 text-teal-100"
              : "border-red-500/60 bg-red-500/10 text-red-100"
          }`}
        >
          {message.type === "success" ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10 text-sm">
          <thead className="bg-white/5">
            <tr>
              <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-200">
                Name
              </th>
              <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-200">
                DOB / TOB
              </th>
              <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-200">
                Birth City
              </th>
              <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-200">
                Country
              </th>
              <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-200">
                Issue Type
              </th>
              <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-200">
                Amount Expected
              </th>
              <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-200">
                Payment Status
              </th>
              <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-200">
                Delivery Status
              </th>
              <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-200">
                Notes
              </th>
              <th scope="col" className="px-4 py-3 text-left font-semibold text-slate-200">
                Created
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {sortedRecords.map((lead) => (
              <tr key={lead.id} className="bg-black/30">
                <td className="px-4 py-3">
                  <div className="font-semibold text-white">{lead.name}</div>
                  <div className="text-xs text-slate-400">{lead.phone ?? lead.email ?? "—"}</div>
                </td>
                <td className="px-4 py-3 text-slate-200">
                  <div>{lead.dob}</div>
                  <div className="text-xs text-slate-400">{lead.tob ?? "—"}</div>
                </td>
                <td className="px-4 py-3 text-slate-200">{lead.birth_city}</td>
                <td className="px-4 py-3 text-slate-200">{lead.country}</td>
                <td className="px-4 py-3 text-slate-200">{lead.issue_type}</td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    defaultValue={lead.amount_expected ?? ""}
                    onBlur={(event) => {
                      const value = event.target.value
                      const amount = value ? Number(value) : null
                      if (amount !== (lead.amount_expected ?? null)) {
                        handleUpdate(lead.id, { amount_expected: amount })
                      }
                    }}
                    className="w-28 rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-right text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </td>
                <td className="px-4 py-3">
                  <select
                    defaultValue={lead.payment_status}
                    onChange={(event) => handleUpdate(lead.id, { payment_status: event.target.value })}
                    className="rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  >
                    {paymentStatusOptions.map((option) => (
                      <option key={option.value} value={option.value} className="bg-[#0a0a0f] text-slate-900">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <select
                    defaultValue={lead.delivery_status}
                    onChange={(event) => handleUpdate(lead.id, { delivery_status: event.target.value })}
                    className="rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  >
                    {deliveryStatusOptions.map((option) => (
                      <option key={option.value} value={option.value} className="bg-[#0a0a0f] text-slate-900">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <textarea
                    defaultValue={lead.notes ?? ""}
                    onBlur={(event) => {
                      const value = event.target.value.trim()
                      if (value !== (lead.notes ?? "")) {
                        handleUpdate(lead.id, { notes: value })
                      }
                    }}
                    rows={2}
                    className="w-48 rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </td>
                <td className="px-4 py-3 text-xs text-slate-400">
                  {lead.created_at ? new Date(lead.created_at).toLocaleString() : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {updatingId && (
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Loader2 className="h-4 w-4 animate-spin" /> Saving changes...
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
