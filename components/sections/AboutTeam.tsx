"use client"

import { motion } from "framer-motion"
import TeamCard from "@/components/ui/TeamCard"
import { getAboutHeadingProps } from "@/lib/scrollAnimations"
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion"

const teamMembers = [
  {
    name: "Josh Holley",
    title: "Founder & Managing Partner",
    imageSrc: "/images/team/Holley_Grey Background.png",
  },
  {
    name: "Shane Gothman",
    title: "Partner",
    imageSrc: "/images/team/Gothman_Grey Background.png",
  },
  {
    name: "Travis Walker",
    title: "Vice President",
    imageSrc: "/images/team/Walker_Grey Background.png",
  },
] as const

export default function AboutTeam() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section className="bg-offWhite py-16 md:py-[120px]">
      <div className="mx-auto max-w-7xl px-4 md:px-20">
        <motion.h2
          className="font-serif text-3xl font-semibold leading-tight text-navy md:text-[48px]"
          {...getAboutHeadingProps(reducedMotion)}
        >
          The team.
        </motion.h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
          {teamMembers.map((member, index) => (
            <TeamCard key={member.name} {...member} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
