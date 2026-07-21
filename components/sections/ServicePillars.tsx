"use client"

import { motion } from "framer-motion"
import { colors } from "@/lib/tokens"
import {
  getServiceBodyProps,
  getServiceBulletProps,
  getServiceEyebrowProps,
  getServiceHeadlineProps,
} from "@/lib/scrollAnimations"
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion"

const pillars = [
  {
    eyebrow: "FINANCE",
    title: "Financial infrastructure built for scale.",
    body: "Bryker builds the financial architecture that lets founders run their business with clarity and confidence, and gives institutional partners confidence when it matters most.",
    bullets: [
      "Strategic financial planning and scenario modeling",
      "Investor-grade reporting and board package preparation",
      "Working capital management and cash flow visibility",
      "Transaction readiness and diligence preparation",
      "KPI frameworks and performance dashboards",
    ],
    variant: "light" as const,
  },
  {
    eyebrow: "OPERATIONS",
    title: "Systems that scale with demand.",
    body: "From supply chain to fulfillment, Bryker operators build the operational backbone that keeps pace with growth without sacrificing margin, service levels, or founder focus.",
    bullets: [
      "Demand planning and inventory management",
      "Supply chain design and vendor management",
      "Fulfillment, logistics, and 3PL coordination",
      "COGS optimization and margin analysis",
      "Process design for high-growth environments",
    ],
    variant: "white" as const,
  },
  {
    eyebrow: "TECHNOLOGY",
    title: "A single source of truth across the stack.",
    body: "Most consumer companies run on disconnected tools with no unified view of the business. Bryker builds the data and technology layer that connects every system and surfaces answers through one intelligent interface.",
    bullets: [
      "Data warehouse and API integrations",
      "The Bryker Intelligent ERP platform",
      "Agent-based workflows across finance and ops",
      "Shopify, Amazon, EDI, and marketing stack connectivity",
      "Dashboards and decision support for leadership teams",
    ],
    variant: "dark" as const,
  },
] as const

type PillarEyebrow = (typeof pillars)[number]["eyebrow"]

type ServicePillarsProps = {
  show?: readonly PillarEyebrow[]
}

function BulletList({
  items,
  light,
  reducedMotion,
}: {
  items: readonly string[]
  light?: boolean
  reducedMotion: boolean
}) {
  return (
    <ul className="mt-6 space-y-2.5 md:mt-8 md:space-y-3">
      {items.map((item, index) => (
        <motion.li
          key={item}
          className={`flex gap-3 font-sans text-sm leading-relaxed ${light ? "text-white/80" : "text-slate"}`}
          {...getServiceBulletProps(reducedMotion, index)}
        >
          <span
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: colors.accent }}
            aria-hidden
          />
          <span className="min-w-0">{item}</span>
        </motion.li>
      ))}
    </ul>
  )
}

export default function ServicePillars({ show }: ServicePillarsProps = {}) {
  const reducedMotion = usePrefersReducedMotion()
  const visiblePillars = show
    ? pillars.filter((pillar) => show.includes(pillar.eyebrow))
    : pillars

  return (
    <>
      {visiblePillars.map((pillar) => {
        const isDark = pillar.variant === "dark"
        const bgClass =
          pillar.variant === "light"
            ? "bg-offWhite"
            : pillar.variant === "white"
              ? "bg-white"
              : "bg-navy"

        return (
          <section
            key={pillar.eyebrow}
            className={`${bgClass} py-16 md:py-[120px]`}
          >
            <div className="mx-auto max-w-7xl px-4 md:px-20">
              <div
                className={
                  pillar.eyebrow === "FINANCE" ? "max-w-5xl" : "max-w-3xl"
                }
              >
                <motion.p
                  className={`font-sans text-[11px] font-medium uppercase tracking-[0.12em] ${isDark ? "text-blueGray" : "text-slate"}`}
                  {...getServiceEyebrowProps(reducedMotion)}
                >
                  {pillar.eyebrow}
                </motion.p>
                <motion.h2
                  className={`mt-4 font-serif text-3xl font-semibold leading-tight md:text-[48px] ${isDark ? "text-white" : "text-navy"} ${pillar.eyebrow === "FINANCE" ? "md:whitespace-nowrap" : ""}`}
                  {...getServiceHeadlineProps(reducedMotion)}
                >
                  {pillar.title}
                </motion.h2>
                <motion.p
                  className={`mt-6 font-sans text-base leading-relaxed ${isDark ? "" : "text-slate"}`}
                  style={isDark ? { color: colors.white75 } : undefined}
                  {...getServiceBodyProps(reducedMotion)}
                >
                  {pillar.body}
                </motion.p>
                <BulletList
                  items={pillar.bullets}
                  light={isDark}
                  reducedMotion={reducedMotion}
                />
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}
