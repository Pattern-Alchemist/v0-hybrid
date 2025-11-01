import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { BarChart3, Users, CreditCard, TrendingUp } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function AdminDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20)

  const { data: leads, error: leadsError } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20)

  const totalOrders = orders?.length || 0
  const totalLeads = leads?.length || 0
  const completedOrders = orders?.filter((o) => o.status === "paid").length || 0
  const totalRevenue = orders?.filter((o) => o.status === "paid").reduce((sum, o) => sum + (o.amount || 0), 0) || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold font-cinzel">Admin Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">
              Logged in as: <span className="text-cyan-300">{user.email}</span>
            </p>
          </div>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-400/40 text-red-300 hover:bg-red-500/30 transition"
            >
              Sign Out
            </button>
          </form>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="rounded-lg bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Orders</p>
                <p className="text-3xl font-bold text-cyan-300 mt-2">{totalOrders}</p>
              </div>
              <CreditCard className="h-10 w-10 text-cyan-300/50" strokeWidth={1.5} />
            </div>
          </div>

          <div className="rounded-lg bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Completed Orders</p>
                <p className="text-3xl font-bold text-teal-300 mt-2">{completedOrders}</p>
              </div>
              <TrendingUp className="h-10 w-10 text-teal-300/50" strokeWidth={1.5} />
            </div>
          </div>

          <div className="rounded-lg bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Leads</p>
                <p className="text-3xl font-bold text-fuchsia-300 mt-2">{totalLeads}</p>
              </div>
              <Users className="h-10 w-10 text-fuchsia-300/50" strokeWidth={1.5} />
            </div>
          </div>

          <div className="rounded-lg bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-green-300 mt-2">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <BarChart3 className="h-10 w-10 text-green-300/50" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Tables */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Orders Table */}
          <div className="rounded-lg border border-white/10 overflow-hidden">
            <div className="bg-white/5 px-6 py-4 border-b border-white/10">
              <h2 className="text-xl font-bold">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-white/[0.02]">
                  <tr className="border-b border-white/10">
                    <th className="text-left px-4 py-3 text-slate-400">Channel</th>
                    <th className="text-left px-4 py-3 text-slate-400">Amount</th>
                    <th className="text-left px-4 py-3 text-slate-400">Status</th>
                    <th className="text-left px-4 py-3 text-slate-400">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {(orders || []).map((order: any) => (
                    <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="px-4 py-3 font-medium text-cyan-300">{order.channel}</td>
                      <td className="px-4 py-3">
                        {order.currency === "INR" ? "₹" : "$"}
                        {(order.amount / 100).toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            order.status === "paid"
                              ? "bg-green-500/20 text-green-300"
                              : "bg-yellow-500/20 text-yellow-300"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-400">{new Date(order.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Leads Table */}
          <div className="rounded-lg border border-white/10 overflow-hidden">
            <div className="bg-white/5 px-6 py-4 border-b border-white/10">
              <h2 className="text-xl font-bold">Recent Leads</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-white/[0.02]">
                  <tr className="border-b border-white/10">
                    <th className="text-left px-4 py-3 text-slate-400">Name</th>
                    <th className="text-left px-4 py-3 text-slate-400">Email</th>
                    <th className="text-left px-4 py-3 text-slate-400">Phone</th>
                    <th className="text-left px-4 py-3 text-slate-400">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {(leads || []).map((lead: any) => (
                    <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="px-4 py-3 font-medium text-cyan-300">{lead.name}</td>
                      <td className="px-4 py-3 text-slate-400">{lead.email}</td>
                      <td className="px-4 py-3 text-slate-400">{lead.phone}</td>
                      <td className="px-4 py-3 text-slate-400">{new Date(lead.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
