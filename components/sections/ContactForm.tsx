"use client"

import { type FormEvent, useState } from "react"

const inputClassName =
  "w-full border-0 border-b border-midBlue bg-transparent py-3 font-sans text-base text-textPrimary outline-none transition-colors duration-200 placeholder:text-blueGray/50 focus:border-accent"

const labelClassName =
  "mb-2 block font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-blueGray"

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setLoading(true)

    const formData = new FormData(event.currentTarget)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("fullName"),
          company: formData.get("company"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error ?? "Something went wrong. Please try again.")
        return
      }

      setSubmitted(true)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <p className="font-sans text-lg leading-relaxed text-slate">
        Thank you for reaching out. We&apos;ll be in touch shortly.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div>
        <label htmlFor="fullName" className={labelClassName}>
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          autoComplete="name"
          className={inputClassName}
        />
      </div>

      <div>
        <label htmlFor="company" className={labelClassName}>
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          required
          autoComplete="organization"
          className={inputClassName}
        />
      </div>

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
        <label htmlFor="message" className={labelClassName}>
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className={`${inputClassName} resize-none`}
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
        {loading ? "Sending…" : "Send Message"}
      </button>
    </form>
  )
}
