import AboutHero from "@/components/sections/AboutHero"
import AboutTeam from "@/components/sections/AboutTeam"
import OriginStory from "@/components/sections/OriginStory"
import { createPageMetadata } from "@/lib/metadata"

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Built by operators, for operators. Learn about Bryker & Co.'s origin, team, and philosophy.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <OriginStory />
      <AboutTeam />
    </main>
  )
}
