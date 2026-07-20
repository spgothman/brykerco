import { redirect } from "next/navigation"
import LoginForm from "@/components/admin/LoginForm"
import { getSession } from "@/lib/session"

export default async function AdminLoginPage() {
  const session = await getSession()
  if (session) {
    redirect("/admin")
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="mb-10 font-serif text-2xl font-semibold text-navy">
          Admin sign in
        </h1>
        <LoginForm />
      </div>
    </div>
  )
}
