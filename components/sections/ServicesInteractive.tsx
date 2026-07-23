"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"
import { getFadeInProps, getFadeUpProps } from "@/lib/scrollAnimations"
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion"

type SegmentId = "finance" | "operations" | "technology"

type Segment = {
  id: SegmentId
  label: string
  color: string
  hoverColor: string
  heading: string
  body: string | readonly string[]
  bullets?: readonly string[]
}

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

const segments: Segment[] = [
  {
    id: "finance",
    label: "FINANCE",
    color: "#1E2D3D",
    hoverColor: "#2A3F54",
    heading: "Financial infrastructure built for scale.",
    body: "Bryker builds the financial architecture that lets founders run their business with clarity and confidence, and gives institutional partners confidence when it matters most.",
    bullets: [
      "Strategic financial planning and scenario modeling",
      "Investor-grade reporting and board package preparation",
      "Working capital management and cash flow visibility",
      "Transaction readiness and diligence preparation",
      "KPI frameworks and performance dashboards",
    ],
  },
  {
    id: "technology",
    label: "TECHNOLOGY SERVICES",
    color: "#A8BDCF",
    hoverColor: "#B8CAD9",
    heading: "We build operating systems for consumer brands.",
    body: [
      "Most consumer companies run on a patchwork of disconnected tools with no single source of truth.",
      "Or even worse, they rely on clunky, outdated systems (like NetSuite) that barely work or fulfill their needs.",
      "The Bryker Intelligent ERP sits above the entire system stack, pulling data from every tool the business uses, normalizing it in a central warehouse, and providing answers through one intelligent interface.",
    ],
  },
  {
    id: "operations",
    label: "OPERATIONS",
    color: "#3D5A6E",
    hoverColor: "#4A6B82",
    heading: "Systems that scale with demand.",
    body: "From supply chain to fulfillment, Bryker operators build the operational backbone that keeps pace with growth without sacrificing margin, service levels, or founder focus.",
    bullets: [
      "Demand planning and inventory management",
      "Supply chain design and vendor management",
      "Fulfillment, logistics, and 3PL coordination",
      "COGS optimization and margin analysis",
      "Process design for high-growth environments",
    ],
  },
]

const CX = 250
const CY = 250
const OUTER_R = 210
const INNER_R = 127
const LABEL_MID_R = (INNER_R + OUTER_R) / 2
const GAP_DEG = 5
const SEGMENT_DEG = (360 - GAP_DEG * 3) / 3
const ACCENT_DOT = "#A8BDCF"

/** Three-round entrance pulse: F → O → T × 3, 500ms apart. */
const ENTRANCE_PULSE_DURATION_S = 0.4
const ENTRANCE_PULSE_GAP_S = 0.5
const ENTRANCE_PULSE_TOTAL_S =
  ENTRANCE_PULSE_GAP_S * 8 + ENTRANCE_PULSE_DURATION_S // 4.4s

const ENTRANCE_PULSE_STARTS_S: Record<SegmentId, [number, number, number]> = {
  finance: [0, 1.5, 3.0],
  operations: [0.5, 2.0, 3.5],
  technology: [1.0, 2.5, 4.0],
}

function getEntrancePulseAnimation(id: SegmentId) {
  const starts = ENTRANCE_PULSE_STARTS_S[id]
  const total = ENTRANCE_PULSE_TOTAL_S

  const scale: number[] = []
  const times: number[] = []

  const push = (t: number, s: number) => {
    const normalized = Math.min(t / total, 1)
    if (times.length > 0 && Math.abs(times[times.length - 1] - normalized) < 1e-6) {
      scale[scale.length - 1] = s
      return
    }
    times.push(normalized)
    scale.push(s)
  }

  push(0, 1)
  for (const start of starts) {
    push(start, 1)
    push(start + ENTRANCE_PULSE_DURATION_S / 2, 1.05)
    push(start + ENTRANCE_PULSE_DURATION_S, 1)
  }
  push(total, 1)

  return { scale, times, duration: total }
}

function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleDeg: number,
) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  }
}

function donutSegmentPath(startAngle: number, endAngle: number) {
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  const outerStart = polarToCartesian(CX, CY, OUTER_R, startAngle)
  const outerEnd = polarToCartesian(CX, CY, OUTER_R, endAngle)
  const innerStart = polarToCartesian(CX, CY, INNER_R, endAngle)
  const innerEnd = polarToCartesian(CX, CY, INNER_R, startAngle)

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${OUTER_R} ${OUTER_R} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerStart.x} ${innerStart.y}`,
    `A ${INNER_R} ${INNER_R} 0 ${largeArc} 0 ${innerEnd.x} ${innerEnd.y}`,
    "Z",
  ].join(" ")
}

function getSegmentAngles(index: number) {
  // 0° = 12 o'clock; Finance (index 0) is centered at top
  const start = -SEGMENT_DEG / 2 + index * (SEGMENT_DEG + GAP_DEG)
  const end = start + SEGMENT_DEG
  return { start, end }
}

export default function ServicesInteractive() {
  const reducedMotion = usePrefersReducedMotion()
  const [activeId, setActiveId] = useState<SegmentId | null>(null)
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)
  const hasPulsedRef = useRef(false)
  const [entrancePulse, setEntrancePulse] = useState(false)

  useEffect(() => {
    if (reducedMotion || hasPulsedRef.current) return
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPulsedRef.current) {
          hasPulsedRef.current = true
          setEntrancePulse(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3, rootMargin: "-100px 0px" },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [reducedMotion])

  useEffect(() => {
    if (!entrancePulse) return
    const timeoutId = window.setTimeout(() => {
      setEntrancePulse(false)
    }, ENTRANCE_PULSE_TOTAL_S * 1000 + 50)
    return () => window.clearTimeout(timeoutId)
  }, [entrancePulse])

  const clearLeaveTimeout = () => {
    if (leaveTimeoutRef.current !== null) {
      clearTimeout(leaveTimeoutRef.current)
      leaveTimeoutRef.current = null
    }
  }

  const activateSegment = (id: SegmentId) => {
    clearLeaveTimeout()
    setActiveId(id)
  }

  const scheduleDeactivate = () => {
    clearLeaveTimeout()
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveId(null)
      leaveTimeoutRef.current = null
    }, 500)
  }

  const activeSegment = useMemo(
    () => segments.find((segment) => segment.id === activeId) ?? null,
    [activeId],
  )

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-[120px]"
      style={{ backgroundColor: "#F2F5F8" }}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-16">
          <motion.div
            className="mx-auto flex h-full w-full max-w-[560px] items-center justify-center lg:mx-0 lg:max-w-none"
            {...getFadeUpProps(reducedMotion)}
          >
            <svg
              viewBox="0 0 500 500"
              width={500}
              height={500}
              className="aspect-square h-auto w-full max-w-[560px] overflow-visible lg:h-full lg:w-auto lg:max-h-full lg:max-w-full"
              role="img"
              aria-label="Operating partner practice areas: Finance, Operations, and Technology Services"
            >
              {segments.map((segment, index) => {
                const { start, end } = getSegmentAngles(index)
                const midAngle = start + (end - start) / 2
                // polarToCartesian uses 0° at 12 o'clock (same as segment paths).
                // rotate(midAngle) ≡ user's midAngle_math + 90 so text follows the arc.
                const labelPos = polarToCartesian(
                  CX,
                  CY,
                  LABEL_MID_R,
                  midAngle,
                )
                const isBottomHalf = midAngle > 90 && midAngle < 270
                const textRotation = isBottomHalf ? midAngle + 180 : midAngle
                const isActive = activeId === segment.id
                const isDimmed = activeId !== null && !isActive
                const entranceAnim = entrancePulse
                  ? getEntrancePulseAnimation(segment.id)
                  : null

                return (
                  <g
                    key={segment.id}
                    style={{
                      opacity: isDimmed ? 0.72 : 1,
                      cursor: "pointer",
                      transition: "opacity 220ms ease",
                    }}
                    onMouseEnter={() => activateSegment(segment.id)}
                    onMouseLeave={scheduleDeactivate}
                    onFocus={() => activateSegment(segment.id)}
                    onBlur={scheduleDeactivate}
                    tabIndex={0}
                    role="button"
                    aria-label={segment.label}
                  >
                    <motion.path
                      d={donutSegmentPath(start, end)}
                      fill={isActive ? segment.hoverColor : segment.color}
                      stroke="#FFFFFF"
                      strokeWidth={2}
                      style={{
                        transformOrigin: `${CX}px ${CY}px`,
                        filter: isActive ? "brightness(1.12)" : "none",
                        transition: "filter 220ms ease",
                      }}
                      initial={false}
                      animate={
                        isActive
                          ? { scale: 1.03 }
                          : entranceAnim
                            ? { scale: entranceAnim.scale }
                            : { scale: 1 }
                      }
                      transition={
                        isActive
                          ? { duration: 0.22, ease: "easeOut" }
                          : entranceAnim
                            ? {
                                duration: entranceAnim.duration,
                                times: entranceAnim.times,
                                ease: "easeInOut",
                              }
                            : { duration: 0.22, ease: "easeOut" }
                      }
                    />
                    {segment.id === "technology" ? (
                      <text
                        x={labelPos.x}
                        y={labelPos.y}
                        fill="#FFFFFF"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${textRotation} ${labelPos.x} ${labelPos.y})`}
                        className="font-sans"
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          pointerEvents: "none",
                        }}
                      >
                        <tspan x={labelPos.x} dy="-0.6em">
                          TECHNOLOGY
                        </tspan>
                        <tspan x={labelPos.x} dy="1.2em">
                          SERVICES
                        </tspan>
                      </text>
                    ) : (
                      <text
                        x={labelPos.x}
                        y={labelPos.y}
                        fill="#FFFFFF"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${textRotation} ${labelPos.x} ${labelPos.y})`}
                        className="font-sans"
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          pointerEvents: "none",
                        }}
                      >
                        {segment.label}
                      </text>
                    )}
                  </g>
                )
              })}

              <circle cx={CX} cy={CY} r={INNER_R - 4} fill="#FFFFFF" />
              <text
                x={CX}
                y={CY - 10}
                textAnchor="middle"
                className="font-sans"
                style={{
                  fill: "#1E2D3D",
                  fontSize: 16,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                }}
              >
                OPERATING
              </text>
              <text
                x={CX}
                y={CY + 13}
                textAnchor="middle"
                className="font-sans"
                style={{
                  fill: "#1E2D3D",
                  fontSize: 16,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                }}
              >
                PARTNER
              </text>
            </svg>
          </motion.div>

          <motion.div
            className="flex min-h-0 w-full min-w-0 flex-col lg:pt-8"
            {...getFadeInProps(reducedMotion, 0.1)}
          >
            {!activeSegment && (
              <h2
                className="font-serif text-3xl font-semibold leading-tight md:text-[48px]"
                style={{ color: "#0F1A24" }}
              >
                How we work.
              </h2>
            )}

            <div
              className={`flex min-h-0 flex-1 flex-col ${activeSegment ? "" : "mt-6"}`}
            >
              <AnimatePresence mode="wait">
                {activeSegment ? (
                  <motion.div
                    key={activeSegment.id}
                    className="flex h-full flex-1 flex-col justify-center"
                    initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  >
                    <h3
                      className="font-serif text-3xl font-semibold leading-tight md:text-[40px]"
                      style={{ color: "#0F1A24" }}
                    >
                      {activeSegment.heading}
                    </h3>
                    {Array.isArray(activeSegment.body) ? (
                      <div className="mt-6 flex flex-col gap-3">
                        {activeSegment.body.map((paragraph) => (
                          <p
                            key={paragraph}
                            className="font-sans text-base leading-relaxed"
                            style={{ color: "#4A5568" }}
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p
                        className="mt-6 font-sans text-base leading-relaxed"
                        style={{ color: "#4A5568" }}
                      >
                        {activeSegment.body}
                      </p>
                    )}
                    {activeSegment.bullets &&
                      activeSegment.bullets.length > 0 && (
                        <ul className="mt-8 space-y-3">
                          {activeSegment.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex gap-3 font-sans text-sm leading-relaxed"
                              style={{ color: "#4A5568" }}
                            >
                              <span
                                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                                style={{ backgroundColor: ACCENT_DOT }}
                                aria-hidden
                              />
                              <span className="min-w-0">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    className="flex flex-col gap-5"
                    initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  >
                    {principles.map((principle) => (
                      <div
                        key={principle.title}
                        className="rounded border p-3"
                        style={{
                          backgroundColor: "#E8ECF0",
                          borderColor: "#D4DAE0",
                        }}
                      >
                        <h3
                          className="mb-1 font-sans text-base font-semibold leading-snug"
                          style={{ color: "#0F1A24" }}
                        >
                          {principle.title}
                        </h3>
                        <p
                          className="font-sans text-xs leading-relaxed"
                          style={{ color: "#4A5568" }}
                        >
                          {principle.description}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
