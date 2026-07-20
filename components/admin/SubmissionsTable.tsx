"use client"

import { useState } from "react"
import type { ContactSubmission } from "@/lib/types"

function truncate(text: string, max = 80) {
  if (text.length <= max) return text
  return `${text.slice(0, max)}…`
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso))
}

function StatusBadge({ status }: { status: ContactSubmission["status"] }) {
  if (status === "reviewed") {
    return (
      <span className="inline-block rounded px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide bg-blueGray/20 text-blueGray">
        Reviewed
      </span>
    )
  }

  return (
    <span className="inline-block rounded bg-navy px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-white">
      New
    </span>
  )
}

export default function SubmissionsTable({
  initialSubmissions,
}: {
  initialSubmissions: ContactSubmission[]
}) {
  const [submissions, setSubmissions] = useState(initialSubmissions)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  async function markReviewed(id: string, event: React.MouseEvent) {
    event.stopPropagation()
    setUpdatingId(id)

    try {
      const response = await fetch(`/api/admin/submissions/${id}`, {
        method: "PATCH",
      })

      if (!response.ok) throw new Error("Update failed")

      setSubmissions((prev) =>
        prev.map((row) =>
          row.id === id ? { ...row, status: "reviewed" as const } : row,
        ),
      )
    } catch {
      alert("Failed to update status. Please try again.")
    } finally {
      setUpdatingId(null)
    }
  }

  if (submissions.length === 0) {
    return (
      <p className="font-sans text-sm text-blueGray">No submissions yet.</p>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse font-sans text-sm [border-width:0.5px]">
        <thead>
          <tr className="border-b border-slate/50 text-left text-[11px] font-medium uppercase tracking-[0.1em] text-blueGray [border-bottom-width:0.5px]">
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Company</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Message</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium" />
          </tr>
        </thead>
        <tbody>
          {submissions.map((row) => {
            const isExpanded = expandedId === row.id

            return (
              <tr
                key={row.id}
                onClick={() => setExpandedId(isExpanded ? null : row.id)}
                className="cursor-pointer border-b border-slate/50 transition-colors hover:bg-offWhite/60 [border-bottom-width:0.5px]"
              >
                <td className="px-4 py-4 align-top text-slate">
                  {formatDate(row.created_at)}
                </td>
                <td className="px-4 py-4 align-top font-medium text-navy">
                  {row.name}
                </td>
                <td className="px-4 py-4 align-top text-slate">{row.company}</td>
                <td className="px-4 py-4 align-top">
                  <a
                    href={`mailto:${row.email}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-accent hover:underline"
                  >
                    {row.email}
                  </a>
                </td>
                <td className="px-4 py-4 align-top text-slate">
                  {isExpanded ? (
                    <p className="max-w-md whitespace-pre-wrap leading-relaxed">
                      {row.message}
                    </p>
                  ) : (
                    truncate(row.message)
                  )}
                </td>
                <td className="px-4 py-4 align-top">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-4 py-4 align-top">
                  {row.status === "new" && (
                    <button
                      type="button"
                      disabled={updatingId === row.id}
                      onClick={(e) => markReviewed(row.id, e)}
                      className="rounded-sm border border-slate px-3 py-1.5 text-xs font-medium text-navy transition-colors hover:bg-offWhite disabled:opacity-50"
                    >
                      {updatingId === row.id ? "Saving…" : "Mark as Reviewed"}
                    </button>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
