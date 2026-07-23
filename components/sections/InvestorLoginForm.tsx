"use client"

import { type FormEvent, useState } from "react"
import Image from "next/image"
import { images } from "@/lib/images"

const inputClassName =
  "w-full border-0 border-b border-[#3D5A6E] bg-transparent py-3 font-sans text-base text-white outline-none transition-colors duration-200 placeholder:text-[#7A8A9A]/50 focus:border-[#A8BDCF]"

const labelClassName =
  "mb-2 block font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-[#7A8A9A]"

const loginButtonStyle = {
  backgroundColor: "#A8BDCF",
  color: "#1E2D3D",
  border: "none",
  fontSize: "13px",
  fontWeight: 600,
} as const

export default function InvestorLoginForm() {
  const [showError, setShowError] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setShowError(true)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1E2D3D] px-4 py-24">
      <div className="w-full max-w-md rounded border border-[#3D5A6E] bg-[#263A4D] px-6 py-10 sm:px-10">
        <div className="flex justify-center">
          <Image
            src={images.logoWhite}
            alt="Bryker & Co."
            width={2172}
            height={724}
            priority
            className="h-12 w-auto"
          />
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
          <div>
            <label htmlFor="email" className={labelClassName}>
              Email Address
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

          {showError && (
            <p className="font-sans text-sm text-red-500">
              Invalid email or password.
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-sm px-5 py-3.5 font-sans transition-[filter] duration-150 hover:brightness-105"
            style={loginButtonStyle}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  )
}
