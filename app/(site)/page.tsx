import Hero from "@/components/sections/Hero"
import IntelligentERP from "@/components/sections/IntelligentERP"
import MetricsStrip from "@/components/sections/MetricsStrip"
import ResultsTeaser from "@/components/sections/ResultsTeaser"
import ServicePillars from "@/components/sections/ServicePillars"
import { createPageMetadata } from "@/lib/metadata"

export const metadata = createPageMetadata({
  title: "Bryker & Co.",
  description:
    "Bryker & Co. embeds experienced operators inside high-growth consumer brands, building finance, operations, and technology systems for institutional readiness.",
  path: "/",
})

export default function HomePage() {
  return (
    <main>
      <Hero />
      <MetricsStrip />
      <ServicePillars show={["FINANCE", "OPERATIONS"]} />
      <IntelligentERP />
      <ResultsTeaser />
    </main>
  )
}
