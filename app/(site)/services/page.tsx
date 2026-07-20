import PageHero from "@/components/sections/PageHero"
import ServicePillars from "@/components/sections/ServicePillars"
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
          <>
            <p style={{ marginBottom: 8 }}>
              Bryker deploys operators who build.
            </p>
            <p style={{ marginBottom: 8 }}>
              We take on real functional roles, put the right systems and people
              in place, and leave your business ready for its next chapter.
            </p>
            <p>
              Whether that is institutional capital, a transaction, or
              sustainable growth, we build the infrastructure to get you there.
            </p>
          </>
        }
      />
      <ServicePillars />
    </main>
  )
}
