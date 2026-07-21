"use client"

import { motion } from "framer-motion"
import { Fragment } from "react"
import CountUp from "@/components/ui/CountUp"
import { getFadeUpProps } from "@/lib/scrollAnimations"
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion"

const VALUE_CLASS =
  "text-center font-serif text-[48px] font-bold leading-none text-white md:text-[72px]"

const PRACTICE_VALUE_CLASS =
  "text-center text-[24px] font-bold leading-tight text-white md:text-[32px]"

const metrics = [
  {
    kind: "count" as const,
    from: 1990,
    value: 2016,
    label: "YEAR FOUNDED",
  },
  {
    kind: "count" as const,
    value: 37,
    suffix: "+",
    label: "YEARS COMBINED EXPERIENCE",
  },
  {
    kind: "practice" as const,
    label: "PRACTICE AREAS",
  },
  {
    kind: "static" as const,
    display: "CPG",
    label: "SECTOR FOCUS",
  },
]

function PracticeAreasValue() {
  return (
    <p className={PRACTICE_VALUE_CLASS}>
      <span className="font-serif">Finance,</span>
      <br />
      <span className="font-serif">Ops </span>
      <span
        style={{
          fontFamily: "'Perpetua', 'Palatino Linotype', Georgia, serif",
          fontSize: "inherit",
          lineHeight: "inherit",
        }}
      >
        &
      </span>
      <span className="font-serif"> Tech</span>
    </p>
  )
}

function MetricValue({
  metric,
}: {
  metric: (typeof metrics)[number]
}) {
  if (metric.kind === "count") {
    return (
      <CountUp
        from={metric.from}
        value={metric.value}
        suffix={metric.suffix}
        className={VALUE_CLASS}
      />
    )
  }

  if (metric.kind === "practice") {
    return <PracticeAreasValue />
  }

  return <p className={VALUE_CLASS}>{metric.display}</p>
}

export default function MetricsStrip() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section className="bg-navy py-12 md:py-20" aria-label="Company highlights">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:items-stretch md:justify-center md:gap-0">
          {metrics.map((metric, index) => (
            <Fragment key={metric.label}>
              <motion.div
                className="flex w-full max-w-xs flex-1 flex-col items-center px-4 md:min-w-[200px] md:max-w-none md:px-12"
                {...getFadeUpProps(reducedMotion, index * 0.1)}
              >
                <div className="flex w-full flex-1 items-center justify-center">
                  <MetricValue metric={metric} />
                </div>
                <p className="mt-auto pt-5 text-center font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-blueGray">
                  {metric.label}
                </p>
              </motion.div>

              {index < metrics.length - 1 && (
                <div
                  className="hidden h-16 w-px shrink-0 self-center bg-slate md:block"
                  aria-hidden
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
