import AboutHero from "@/components/sections/AboutHero"
import AboutTeam from "@/components/sections/AboutTeam"
import OriginStory from "@/components/sections/OriginStory"
import { createPageMetadata } from "@/lib/metadata"

export const metadata = {
  ...createPageMetadata({
    title: "About",
    description:
      "Built by operators, for operators. Learn about Bryker & Co.'s origin, team, and philosophy.",
    path: "/about",
  }),
  title: "About | Bryker & Co.",
  openGraph: {
    title: "Bryker & Co.",
    description: "Premium operating partner for consumer brands.",
    url: "https://brykerco.com/about",
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

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <OriginStory />
      <AboutTeam />
    </main>
  )
}
