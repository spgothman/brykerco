import Hero from "@/components/sections/Hero"
import MetricsStrip from "@/components/sections/MetricsStrip"
import ResultsTeaser from "@/components/sections/ResultsTeaser"
import ServicesInteractive from "@/components/sections/ServicesInteractive"
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
      <ServicesInteractive />
      <ResultsTeaser />
    </main>
  )
}
