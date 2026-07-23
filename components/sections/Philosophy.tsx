"use client"

import { motion } from "framer-motion"
import {
  getAboutCardProps,
  getAboutHeadingProps,
} from "@/lib/scrollAnimations"
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion"

const principles = [
  {
    title: "We invest alongside you.",
    description:
      "When the deal is right, we put our own capital in alongside yours. That changes the dynamic. We are not a vendor. We are a shareholder, aligned on the same outcome from day one.",
  },
  {
    title: "We work, we do not advise.",
    description:
      "We do not show up to observe. We show up to build. Our team sits alongside yours, builds the systems, and trains the people. When we leave, the machine runs without us.",
  },
  {
    title: "We build what lasts.",
    description:
      "Every engagement is designed to leave the company stronger than we found it. The infrastructure, processes, and people we put in place are built to outlast our involvement. We build companies, not consulting engagements.",
  },
] as const

export default function Philosophy() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section className="py-16 md:py-[120px]" style={{ backgroundColor: "#F2F5F8" }}>
      <div className="mx-auto max-w-7xl px-4 md:px-20">
        <motion.h2
          className="font-serif text-3xl font-semibold leading-tight md:text-[48px]"
          style={{ color: "#0F1A24" }}
          {...getAboutHeadingProps(reducedMotion)}
        >
          How we work.
        </motion.h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              className="rounded border px-5 py-6 md:px-6 md:py-8"
              style={{
                backgroundColor: "#E8ECF0",
                borderColor: "#D4DAE0",
              }}
              {...getAboutCardProps(reducedMotion, index)}
            >
              <h3
                className="font-sans text-lg font-semibold"
                style={{ color: "#0F1A24" }}
              >
                {principle.title}
              </h3>
              <p
                className="mt-4 font-sans text-sm leading-relaxed"
                style={{ color: "#4A5568" }}
              >
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
