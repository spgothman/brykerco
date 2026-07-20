"use client"

import { useEffect, useRef, useState } from "react"
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion"

type CountUpProps = {
  value: number
  from?: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
  className?: string
}

function getDecimals(value: number): number {
  const [, fraction] = String(value).split(".")
  return fraction?.length ?? 0
}

function easeOut(progress: number): number {
  return 1 - Math.pow(1 - progress, 3)
}

function isElementInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  return rect.top < window.innerHeight && rect.bottom > 0
}

export default function CountUp({
  value,
  from = 0,
  prefix = "",
  suffix = "",
  decimals,
  duration = 1200,
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimatedRef = useRef(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const resolvedDecimals = decimals ?? getDecimals(value)
  const [count, setCount] = useState(prefersReducedMotion ? value : from)

  useEffect(() => {
    const el = ref.current
    if (!el || hasAnimatedRef.current) return

    const runAnimation = () => {
      if (hasAnimatedRef.current) return
      hasAnimatedRef.current = true

      if (prefersReducedMotion) {
        setCount(value)
        return
      }

      const startTime = performance.now()

      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1)
        const current = from + (value - from) * easeOut(progress)

        setCount(
          resolvedDecimals > 0
            ? Number(current.toFixed(resolvedDecimals))
            : Math.round(current),
        )

        if (progress < 1) requestAnimationFrame(tick)
      }

      requestAnimationFrame(tick)
    }

    if (isElementInViewport(el)) {
      runAnimation()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runAnimation()
          observer.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [from, value, resolvedDecimals, duration, prefersReducedMotion])

  const display =
    resolvedDecimals > 0 ? count.toFixed(resolvedDecimals) : String(count)

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
