import { ADMIN_COOKIE_KEY, verifySignedAdminSession } from "@/lib/adminSession"
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabaseClient"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  const data = await request.json()

  if (!data.name || !data.dob || !data.birth_city || !data.country || !data.issue_type) {
    return Response.json({ error: "Missing required fields" }, { status: 400 })
  }

  try {
    const supabase = getSupabaseClient()

    if (supabase) {
      await supabase.from("kalki_queue").insert([
        {
          name: data.name,
          phone: data.phone || null,
          email: data.email || null,
          dob: data.dob,
          tob: data.tob || null,
          birth_city: data.birth_city,
          country: data.country,
          issue_type: data.issue_type,
          amount_expected: data.amount_expected ?? null,
          payment_status: "unpaid",
          delivery_status: "pending",
          notes: data.notes ?? null,
          created_at: new Date().toISOString(),
        },
      ])
    }
  } catch (error) {
    console.log("Supabase insert failed (optional):", error)
  }

  return Response.json({ success: true, message: "Lead captured" })
}

export async function PUT(request: Request) {
  const data = await request.json()

  if (!data?.id) {
    return Response.json({ error: "Missing lead id" }, { status: 400 })
  }

  const isAuthenticated = verifySignedAdminSession(cookies().get(ADMIN_COOKIE_KEY)?.value)

  if (!isAuthenticated) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!isSupabaseConfigured) {
    return Response.json({ error: "Supabase not configured" }, { status: 500 })
  }

  const supabase = getSupabaseClient()

  if (!supabase) {
    return Response.json({ error: "Supabase client unavailable" }, { status: 500 })
  }

  const allowedFields = ["payment_status", "delivery_status", "amount_expected", "notes"] as const
  const updatePayload: Record<string, unknown> = {}

  for (const field of allowedFields) {
    if (Object.prototype.hasOwnProperty.call(data, field)) {
      updatePayload[field] = data[field]
    }
  }

  if (Object.keys(updatePayload).length === 0) {
    return Response.json({ error: "No valid fields to update" }, { status: 400 })
  }

  const { error } = await supabase.from("kalki_queue").update(updatePayload).eq("id", data.id)

  if (error) {
    console.error("Failed to update lead", error)
    return Response.json({ error: "Failed to update lead" }, { status: 500 })
  }

  return Response.json({ success: true })
}
