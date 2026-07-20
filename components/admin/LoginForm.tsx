"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { type FormEvent, useState } from "react"

const inputClassName =
  "w-full border-0 border-b border-midBlue bg-transparent py-3 font-sans text-base text-textPrimary outline-none transition-colors duration-200 focus:border-accent"

const labelClassName =
  "mb-2 block font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-blueGray"

export default function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError("Invalid email or password.")
      return
    }

    router.push("/admin")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-8">
      <div>
        <label htmlFor="email" className={labelClassName}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClassName}
        />
      </div>

      <div>
        <label htmlFor="password" className={labelClassName}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={inputClassName}
        />
      </div>

      {error && (
        <p className="font-sans text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-sm bg-accent px-6 py-3.5 font-sans text-sm font-semibold text-navy transition-[filter] duration-150 hover:brightness-105 disabled:opacity-50"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  )
}
