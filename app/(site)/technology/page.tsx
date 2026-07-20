import PageHero from "@/components/sections/PageHero"
import TechnologyDetails from "@/components/sections/TechnologyDetails"
import { createPageMetadata } from "@/lib/metadata"

export const metadata = createPageMetadata({
  title: "Technology",
  description:
    "The Bryker Intelligent ERP is the operating system for consumer brands, built on a unified data layer and agent-based workflows.",
  path: "/technology",
})

export default function TechnologyPage() {
  return (
    <main>
      <PageHero
        title="Built for consumer brands."
        description="A single intelligent layer above your entire system stack, connecting finance, operations, and growth tools into a single source of truth."
      />
      <TechnologyDetails />
    </main>
  )
}
