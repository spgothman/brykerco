import CaseStudyTimeline from "@/components/sections/CaseStudyTimeline"
import ClientsTombstones from "@/components/sections/ClientsTombstones"
import { createPageMetadata } from "@/lib/metadata"

export const metadata = createPageMetadata({
  title: "Results",
  description:
    "Case studies from Bryker & Co. Operator-led partnerships from sourcing through exit.",
  path: "/results",
})

export default function ResultsPage() {
  return (
    <main>
      <CaseStudyTimeline />
      <ClientsTombstones />
    </main>
  )
}
