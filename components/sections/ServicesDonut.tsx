"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useMemo, useState } from "react"
import { getFadeInProps, getFadeUpProps } from "@/lib/scrollAnimations"
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion"

type SegmentId = "finance" | "operations" | "technology"

type Segment = {
  id: SegmentId
  label: string
  color: string
  hoverColor: string
  heading: string
  body: string
  bullets?: readonly string[]
}

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
    body: "Most consumer companies run on a patchwork of disconnected tools with no single source of truth. Or even worse, they rely on clunky, outdated systems (like NetSuite) that barely work or fulfill their needs. The Bryker Intelligent ERP sits above the entire system stack, pulling data from every tool the business uses, normalizing it in a central warehouse, and providing answers through one intelligent interface.",
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

const DEFAULT_PANEL = {
  heading: "What we do.",
  subheading: "Bryker deploys operators who build.",
  body: "We take on real functional roles, put the right systems and people in place, and leave your business ready for its next chapter. Whether that is institutional capital, a transaction, or sustainable growth, we build the infrastructure to get you there.",
  bullets: undefined as readonly string[] | undefined,
}

const CX = 200
const CY = 200
const OUTER_R = 165
const INNER_R = 100
const LABEL_R = 132
const GAP_DEG = 5
const SEGMENT_DEG = (360 - GAP_DEG * 3) / 3
const ACCENT_DOT = "#A8BDCF"

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

function labelArcPath(
  startAngle: number,
  endAngle: number,
  reversed = false,
) {
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  if (reversed) {
    // Draw end → start (counterclockwise) so bottom-half labels read upright
    const start = polarToCartesian(CX, CY, LABEL_R, endAngle)
    const end = polarToCartesian(CX, CY, LABEL_R, startAngle)
    return `M ${start.x} ${start.y} A ${LABEL_R} ${LABEL_R} 0 ${largeArc} 0 ${end.x} ${end.y}`
  }
  const start = polarToCartesian(CX, CY, LABEL_R, startAngle)
  const end = polarToCartesian(CX, CY, LABEL_R, endAngle)
  return `M ${start.x} ${start.y} A ${LABEL_R} ${LABEL_R} 0 ${largeArc} 1 ${end.x} ${end.y}`
}

function getSegmentAngles(index: number) {
  // 0° = 12 o'clock; Finance (index 0) is centered at top
  const start = -SEGMENT_DEG / 2 + index * (SEGMENT_DEG + GAP_DEG)
  const end = start + SEGMENT_DEG
  return { start, end }
}

export default function ServicesDonut() {
  const reducedMotion = usePrefersReducedMotion()
  const [activeId, setActiveId] = useState<SegmentId | null>(null)

  const activeSegment = useMemo(
    () => segments.find((segment) => segment.id === activeId) ?? null,
    [activeId],
  )

  const panel = activeSegment
    ? {
        heading: activeSegment.heading,
        subheading: undefined as string | undefined,
        body: activeSegment.body,
        bullets: activeSegment.bullets,
      }
    : DEFAULT_PANEL

  return (
    <section className="bg-white py-16 md:py-[120px]">
      <div className="mx-auto max-w-7xl px-4 md:px-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            className="mx-auto w-full max-w-[440px]"
            {...getFadeUpProps(reducedMotion)}
          >
            <svg
              viewBox="0 0 400 400"
              className="h-auto w-full overflow-visible"
              role="img"
              aria-label="Operating partner practice areas: Finance, Operations, and Technology Services"
            >
              <defs>
                {segments.map((segment, index) => {
                  const { start, end } = getSegmentAngles(index)
                  const pad = 8
                  const mid = (start + end) / 2
                  const isBottomHalf = mid > 90 && mid < 270
                  return (
                    <path
                      key={`label-path-${segment.id}`}
                      id={`donut-label-${segment.id}`}
                      d={labelArcPath(start + pad, end - pad, isBottomHalf)}
                      fill="none"
                    />
                  )
                })}
              </defs>

              {segments.map((segment, index) => {
                const { start, end } = getSegmentAngles(index)
                const isActive = activeId === segment.id
                const isDimmed = activeId !== null && !isActive

                return (
                  <g
                    key={segment.id}
                    style={{
                      transformOrigin: `${CX}px ${CY}px`,
                      transform: isActive ? "scale(1.03)" : "scale(1)",
                      transition:
                        "transform 220ms ease, filter 220ms ease, opacity 220ms ease",
                      filter: isActive ? "brightness(1.12)" : "none",
                      opacity: isDimmed ? 0.72 : 1,
                      cursor: "pointer",
                    }}
                    onMouseEnter={() => setActiveId(segment.id)}
                    onMouseLeave={() => setActiveId(null)}
                    onFocus={() => setActiveId(segment.id)}
                    onBlur={() => setActiveId(null)}
                    tabIndex={0}
                    role="button"
                    aria-label={segment.label}
                  >
                    <path
                      d={donutSegmentPath(start, end)}
                      fill={isActive ? segment.hoverColor : segment.color}
                      stroke="#FFFFFF"
                      strokeWidth={2}
                    />
                    <text
                      fill="#FFFFFF"
                      className="font-sans"
                      style={{
                        fontSize: segment.id === "technology" ? 9.5 : 11,
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        pointerEvents: "none",
                      }}
                    >
                      <textPath
                        href={`#donut-label-${segment.id}`}
                        startOffset="50%"
                        textAnchor="middle"
                      >
                        {segment.label}
                      </textPath>
                    </text>
                  </g>
                )
              })}

              <circle cx={CX} cy={CY} r={INNER_R - 4} fill="#FFFFFF" />
              <text
                x={CX}
                y={CY - 8}
                textAnchor="middle"
                className="font-sans"
                style={{
                  fill: "#1E2D3D",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                }}
              >
                OPERATING
              </text>
              <text
                x={CX}
                y={CY + 10}
                textAnchor="middle"
                className="font-sans"
                style={{
                  fill: "#1E2D3D",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                }}
              >
                PARTNER
              </text>
            </svg>
          </motion.div>

          <motion.div
            className="max-w-xl"
            {...getFadeInProps(reducedMotion, 0.1)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId ?? "default"}
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <h2 className="font-serif text-3xl font-semibold leading-tight text-navy md:text-[40px]">
                  {panel.heading}
                </h2>
                {panel.subheading && (
                  <p className="mt-4 font-sans text-lg font-medium leading-relaxed text-navy">
                    {panel.subheading}
                  </p>
                )}
                <p className="mt-6 font-sans text-base leading-relaxed text-slate">
                  {panel.body}
                </p>
                {panel.bullets && panel.bullets.length > 0 && (
                  <ul className="mt-8 space-y-3">
                    {panel.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 font-sans text-sm leading-relaxed text-slate"
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
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
