"use client"

import { signOut } from "next-auth/react"
import Link from "next/link"

export default function AdminHeader() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-slate/40 bg-navy px-6">
      <div className="flex items-center gap-6">
        <span className="font-serif text-sm tracking-[0.12em] text-white">
          BRYKER & CO.
        </span>
        <span className="font-sans text-xs font-medium uppercase tracking-[0.1em] text-blueGray">
          Admin
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="font-sans text-xs text-blueGray transition-colors hover:text-white"
        >
          View site
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="font-sans text-xs text-blueGray transition-colors hover:text-white"
        >
          Sign out
        </button>
      </div>
    </header>
  )
}
