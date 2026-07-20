import { redirect } from "next/navigation"
import AdminHeader from "@/components/admin/AdminHeader"
import SubmissionsTable from "@/components/admin/SubmissionsTable"
import { getSession } from "@/lib/session"
import { createSupabaseAdmin } from "@/lib/supabase/server"
import type { ContactSubmission } from "@/lib/types"

export default async function AdminPage() {
  const session = await getSession()
  if (!session) {
    redirect("/admin/login")
  }

  const supabase = createSupabaseAdmin()
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Failed to fetch submissions:", error)
  }

  const submissions = (data ?? []) as ContactSubmission[]

  return (
    <>
      <AdminHeader />
      <main className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="font-serif text-2xl font-semibold text-navy">
          Contact Submissions
        </h1>
        <p className="mt-2 font-sans text-sm text-blueGray">
          {submissions.length} total submission
          {submissions.length === 1 ? "" : "s"}
        </p>
        <div className="mt-8 overflow-hidden rounded border border-slate/50 bg-white">
          <SubmissionsTable initialSubmissions={submissions} />
        </div>
      </main>
    </>
  )
}
