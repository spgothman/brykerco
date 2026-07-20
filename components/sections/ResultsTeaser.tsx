"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { colors } from "@/lib/tokens"
import { getFadeInProps, getFadeUpProps } from "@/lib/scrollAnimations"
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion"

export default function ResultsTeaser() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section className="bg-navy py-[120px]">
      <div className="mx-auto max-w-3xl px-6 text-center md:px-20">
        <motion.h2
          className="font-serif text-[40px] font-semibold leading-tight text-white md:text-[48px]"
          {...getFadeUpProps(reducedMotion)}
        >
          Proven in the field.
        </motion.h2>
        <motion.p
          className="mt-6 font-sans text-base leading-relaxed"
          style={{ color: colors.white75 }}
          {...getFadeInProps(reducedMotion)}
        >
          The Bryker team sourced, invested in, and operated a high-growth
          consumer brand from seed stage through a successful strategic
          transaction. Embedded operators built the finance, operations, and
          technology infrastructure that made it possible.
        </motion.p>
        <motion.div className="mt-10" {...getFadeInProps(reducedMotion, 0.2)}>
          <Link
            href="/results"
            className="inline-flex rounded-sm px-7 py-3.5 font-sans font-semibold"
            style={{
              backgroundColor: "#FFFFFF",
              color: "#1E2D3D",
              border: "none",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
            }}
          >
            See Our Results
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
