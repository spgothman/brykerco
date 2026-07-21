"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { images } from "@/lib/images"
import { colors } from "@/lib/tokens"
import {
  getAboutBodyProps,
  getAboutHeadingProps,
  getAboutLogoProps,
} from "@/lib/scrollAnimations"
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion"

const bodyFontStyle = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 400,
  color: "#0F1A24",
} as const

const paragraphs = [
  "Bryker & Co. was founded in 2016 by Josh Holley, who spent his career inside consumer brands, building finance, operations, and growth systems from within rather than advising from the outside. The firm was born from a conviction that middle-market CPG companies deserve the same caliber of operating leadership typically reserved for companies ten times their size.",
  "What began as hands-on advisory work grew into something more substantial. Bryker sources opportunities off-market, invests alongside founders, and deploys experienced operators to build the systems, teams, and infrastructure that outlast the engagement. Shane Gothman and Travis Walker joined to expand that capability across finance, operations, and technology.",
  "That model was tested and proven with a high-growth consumer brand. In 2022, the Bryker team identified the company off-market, led the seed round, and assumed operating roles across finance, operations, and technology. Over several years, the team built infrastructure and scaled the business to 3x revenue and 2.5x EBITDA. In 2025, Bryker led a transaction to a strategic private equity partner without an investment bank, delivering a strong outcome for the founder and investors.",
  "Today, Bryker & Co. brings that same operator-led approach to every partnership. We roll up our sleeves, train & hire the right people, and build the systems that prepare consumer brands for their next chapter of growth.",
] as const

export default function OriginStory() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section className="bg-white py-16 md:py-[120px]">
      <div className="mx-auto max-w-7xl px-4 md:px-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.h2
              className="font-serif text-3xl font-semibold leading-tight text-navy md:text-[48px]"
              {...getAboutHeadingProps(reducedMotion)}
            >
              Where we came from.
            </motion.h2>
            <div
              className="origin-story-body mt-6 space-y-5 text-base leading-relaxed md:mt-8 md:space-y-6"
              style={bodyFontStyle}
            >
              {paragraphs.map((paragraph, index) => (
                <motion.p
                  key={paragraph.slice(0, 32)}
                  style={bodyFontStyle}
                  {...getAboutBodyProps(reducedMotion, index)}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>

          <motion.div
            className="relative hidden lg:block"
            {...getAboutLogoProps(reducedMotion)}
          >
            <div
              className="absolute -inset-4 rounded"
              style={{ backgroundColor: colors.offWhite }}
              aria-hidden
            />
            <div className="relative aspect-square overflow-hidden rounded border border-offWhite bg-offWhite">
              <Image
                src={images.logo}
                alt="Bryker & Co."
                fill
                className="object-contain p-16"
                sizes="(max-width: 1024px) 50vw, 400px"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
