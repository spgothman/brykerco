import CaseStudyTimeline from "@/components/sections/CaseStudyTimeline"
import ClientsTombstones from "@/components/sections/ClientsTombstones"
import PageHero from "@/components/sections/PageHero"
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
      <PageHero
        title="Our results."
        description={
          <>
            <p style={{ marginBottom: 12 }}>
              Our engagements result in measurable growth.
            </p>
            <p>
              Our clients have scaled revenue, overhauled the way they operate
              through technology, and gone on to close transactions that defined
              their businesses.
            </p>
          </>
        }
      />
      <CaseStudyTimeline />
      <ClientsTombstones />
    </main>  )
}
