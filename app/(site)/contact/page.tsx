import ContactContent from "@/components/sections/ContactContent"
import ContactHero from "@/components/sections/ContactHero"
import { createPageMetadata } from "@/lib/metadata"

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Get in touch with Bryker & Co. We work with a small number of high-growth consumer brands at any time.",
  path: "/contact",
})

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactContent />
    </main>
  )
}
