import AdminDashboard, { type LeadRecord } from "@/components/AdminDashboard"
import AdminLoginForm, { type FormState } from "@/components/AdminLoginForm"
import {
  ADMIN_COOKIE_KEY,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createSignedAdminSession,
  verifySignedAdminSession,
} from "@/lib/adminSession"
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabaseClient"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

const loginAction = async (_: FormState, formData: FormData): Promise<FormState> => {
  "use server"

  const submittedPassword = formData.get("password")?.toString() ?? ""
  const adminPassword = process.env.ADMIN_PASS

  if (!adminPassword) {
    return { error: "ADMIN_PASS environment variable not set." }
  }

  if (submittedPassword !== adminPassword) {
    return { error: "Incorrect password. Access denied." }
  }

  try {
    const cookieStore = cookies()
    const { value } = createSignedAdminSession()

    cookieStore.set({
      name: ADMIN_COOKIE_KEY,
      value,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
    })
  } catch (error) {
    console.error("Failed to create admin session", error)
    return { error: "Admin session is not configured correctly." }
  }

  revalidatePath("/admin")
  return { success: true }
}

const fetchLeads = async (): Promise<LeadRecord[]> => {
  if (!isSupabaseConfigured) {
    return []
  }

  const supabase = getSupabaseClient()
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from("kalki_queue")
    .select("id, name, phone, email, dob, tob, birth_city, country, issue_type, amount_expected, payment_status, delivery_status, notes, created_at")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Failed to load leads from Supabase", error)
    return []
  }

  return data as LeadRecord[]
}

const AdminPage = async () => {
  const cookieStore = cookies()
  const isAuthenticated = verifySignedAdminSession(cookieStore.get(ADMIN_COOKIE_KEY)?.value)

  const leads = isAuthenticated ? await fetchLeads() : []

  return (
    <main className="min-h-screen bg-[#050509] py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        {!isAuthenticated ? (
          <div className="mx-auto max-w-lg">
            <AdminLoginForm loginAction={loginAction} />
          </div>
        ) : (
          <section className="space-y-6">
            <header className="space-y-2">
              <h1 className="text-4xl font-bold">Kalki Queue Dashboard</h1>
              <p className="text-sm text-slate-300">
                Review new leads, confirm payments, and mark delivery status once the warning reading has been sent.
              </p>
            </header>
            <AdminDashboard leads={leads} supabaseConfigured={isSupabaseConfigured} />
          </section>
        )}
      </div>
    </main>
  )
}

export default AdminPage
