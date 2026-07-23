"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { getFadeInProps, getFadeUpProps } from "@/lib/scrollAnimations"
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion"

export default function ResultsTeaser() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section className="bg-navy pt-16 pb-8 md:pt-[120px] md:pb-[60px]">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-20">
        <motion.h2
          className="font-serif text-3xl font-semibold leading-tight text-white md:text-[48px]"
          {...getFadeUpProps(reducedMotion)}
        >
          Proven in the field.
        </motion.h2>
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
