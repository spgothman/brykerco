"use client"

import { motion } from "framer-motion"
import { Fragment, useEffect, useRef, useState, useSyncExternalStore } from "react"
import CountUp from "@/components/ui/CountUp"
import { getFadeUpProps } from "@/lib/scrollAnimations"
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion"

const VALUE_CLASS =
  "text-center font-serif text-[48px] font-bold leading-none text-white md:text-[72px]"

const SCRAMBLE_VALUE_CLASS =
  "text-center font-serif text-[32px] font-bold leading-none text-white md:text-[48px]"

const PRACTICE_VALUE_CLASS =
  "text-center text-[24px] font-bold leading-tight text-white md:text-[32px]"

const SCRAMBLE_TARGET = "Consumer"
const SCRAMBLE_LOCK_MS = [500, 650, 800, 950, 1100, 1250, 1400, 1550] as const
const SCRAMBLE_TICK_MS = 50
const SCRAMBLE_DURATION_MS = 1600

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
    kind: "scramble" as const,
    display: SCRAMBLE_TARGET,
    label: "SECTOR FOCUS",
  },
]

function subscribeMdUp(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia("(min-width: 768px)")
  mediaQuery.addEventListener("change", onStoreChange)
  return () => mediaQuery.removeEventListener("change", onStoreChange)
}

function getMdUpSnapshot() {
  return window.matchMedia("(min-width: 768px)").matches
}

function getMdUpServerSnapshot() {
  return false
}

function useIsMdUp() {
  return useSyncExternalStore(
    subscribeMdUp,
    getMdUpSnapshot,
    getMdUpServerSnapshot,
  )
}

function randomLetterMatchingCase(targetChar: string) {
  if (targetChar >= "A" && targetChar <= "Z") {
    return String.fromCharCode(65 + Math.floor(Math.random() * 26))
  }
  if (targetChar >= "a" && targetChar <= "z") {
    return String.fromCharCode(97 + Math.floor(Math.random() * 26))
  }
  return targetChar
}

function SectorScramble({ className }: { className: string }) {
  const reducedMotion = usePrefersReducedMotion()
  const ref = useRef<HTMLParagraphElement>(null)
  const hasAnimatedRef = useRef(false)
  const [display, setDisplay] = useState(SCRAMBLE_TARGET)

  useEffect(() => {
    const el = ref.current
    if (!el || hasAnimatedRef.current) return

    let intervalId: ReturnType<typeof setInterval> | null = null

    const runAnimation = () => {
      if (hasAnimatedRef.current) return
      hasAnimatedRef.current = true

      if (reducedMotion) {
        setDisplay(SCRAMBLE_TARGET)
        return
      }

      const start = performance.now()
      const locked = SCRAMBLE_TARGET.split("").map(() => false)

      intervalId = setInterval(() => {
        const elapsed = performance.now() - start
        const next = SCRAMBLE_TARGET.split("")

        for (let i = 0; i < next.length; i++) {
          if (!locked[i] && elapsed >= SCRAMBLE_LOCK_MS[i]) {
            locked[i] = true
          }
          if (!locked[i]) {
            next[i] = randomLetterMatchingCase(SCRAMBLE_TARGET[i])
          }
        }

        setDisplay(next.join(""))

        if (locked.every(Boolean) || elapsed >= SCRAMBLE_DURATION_MS) {
          setDisplay(SCRAMBLE_TARGET)
          if (intervalId !== null) clearInterval(intervalId)
          intervalId = null
        }
      }, SCRAMBLE_TICK_MS)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runAnimation()
          observer.disconnect()
        }
      },
      { threshold: 0.3, rootMargin: "-100px 0px" },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (intervalId !== null) clearInterval(intervalId)
    }
  }, [reducedMotion])

  return (
    <p ref={ref} className={className} aria-label={SCRAMBLE_TARGET}>
      {display}
    </p>
  )
}

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

  if (metric.kind === "scramble") {
    return <SectorScramble className={SCRAMBLE_VALUE_CLASS} />
  }

  return null
}

export default function MetricsStrip() {
  const reducedMotion = usePrefersReducedMotion()
  const isMdUp = useIsMdUp()
  const skipFadeIn = reducedMotion || !isMdUp

  return (
    <section className="bg-navy py-12 md:py-20" aria-label="Company highlights">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:items-stretch md:justify-center md:gap-0">
          {metrics.map((metric, index) => (
            <Fragment key={metric.label}>
              <motion.div
                className="flex w-full max-w-xs flex-1 flex-col items-center px-4 md:min-w-[200px] md:max-w-none md:px-12"
                {...getFadeUpProps(skipFadeIn, index * 0.1)}
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
