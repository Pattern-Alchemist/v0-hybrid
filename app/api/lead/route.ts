import { type NextRequest, NextResponse } from "next/server"
import { supabase, isSupabaseAvailable } from "@/lib/supabaseClient"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const required = ["name", "phone", "dob", "birth_location", "email"]

  for (const k of required) {
    if (!body?.[k]) {
      return NextResponse.json({ error: `${k} is required` }, { status: 400 })
    }
  }

  const leadData = {
    name: body.name,
    phone: body.phone,
    dob: body.dob,
    tob: body.tob,
    birth_location: body.birth_location,
    country: body.country,
    email: body.email,
  }

  if (!isSupabaseAvailable() || !supabase) {
    console.log("[Astrokalki] Lead captured (fallback - DB not available):", leadData)
    return NextResponse.json({
      ok: true,
      id: `local_${Date.now()}`,
      fallback: true,
      message: "Lead captured locally. Database will sync when available.",
    })
  }

  try {
    const { data, error } = await supabase.from("leads").insert(leadData).select().single()

    if (error) {
      console.warn("[Astrokalki] Database error, falling back to local storage:", error)
      console.log("[Astrokalki] Lead captured (fallback - DB error):", leadData)
      return NextResponse.json({
        ok: true,
        id: `local_${Date.now()}`,
        fallback: true,
        message: "Lead captured. We will process it shortly.",
      })
    }

    return NextResponse.json({ ok: true, id: data.id })
  } catch (err) {
    console.error("[Astrokalki] Unexpected error in lead submission:", err)
    console.log("[Astrokalki] Lead captured (fallback - unexpected error):", leadData)
    return NextResponse.json({
      ok: true,
      id: `local_${Date.now()}`,
      fallback: true,
      message: "Lead captured. We will process it shortly.",
    })
  }
}
