import CaseStudyTimeline from "@/components/sections/CaseStudyTimeline"
import ClientsTombstones from "@/components/sections/ClientsTombstones"
import { createPageMetadata } from "@/lib/metadata"

export const metadata = {
  ...createPageMetadata({
    title: "Results",
    description:
      "Case studies from Bryker & Co. Operator-led partnerships from sourcing through exit.",
    path: "/results",
  }),
  title: "Results | Bryker & Co.",
  openGraph: {
    title: "Bryker & Co.",
    description: "Premium operating partner for consumer brands.",
    url: "https://brykerco.com/results",
    images: [
      {
        url: "https://brykerco.com/og-image.PNG",
        width: 1200,
        height: 630,
        alt: "Bryker & Co.",
      },
    ],
  },
}

export default function ResultsPage() {
  return (
    <main>
      <CaseStudyTimeline />
      <ClientsTombstones />
    </main>
  )
}
