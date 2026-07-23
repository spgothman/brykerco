import PageHero from "@/components/sections/PageHero"
import ServicePillars from "@/components/sections/ServicePillars"
import IntelligentERP from "@/components/sections/IntelligentERP"
import { TechnologyLayers } from "@/components/sections/TechnologyDetails"
import { createPageMetadata } from "@/lib/metadata"

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "Finance, operations, and technology. Embedded operating leadership for high-growth consumer brands.",
  path: "/services",
})

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        title="What we do."
        description={
          <div className="space-y-5">
            <p>Bryker deploys operators who build.</p>
            <p>
              We take on real functional roles, put the right systems and people
              in place, and leave your business ready for its next chapter.
            </p>
            <p>
              Whether that is institutional capital, a transaction, or
              sustainable growth, we build the infrastructure to get you there.
            </p>
          </div>
        }
      />
      <ServicePillars />
      <IntelligentERP showIntroText={false} showLearnMoreButton={false} />
      <TechnologyLayers />
    </main>
  )
}
