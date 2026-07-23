"use client"

import { motion } from "framer-motion"
import { colors } from "@/lib/tokens"
import { getFadeInProps, getFadeUpProps } from "@/lib/scrollAnimations"
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion"

const steps = [
  {
    date: "2022",
    title: "Off-Market Sourcing",
    body: "Identified opportunity through our operator network, without a traditional sell-side process.",
  },
  {
    date: "2022",
    title: "Led Seed Round",
    body: "Led the seed round as sponsor, structuring the deal to align founder and investor incentives.",
  },
  {
    date: "2022 to 2025",
    title: "Embedded Leadership",
    body: "Assumed operating roles across finance, operations, and tech, building infrastructure from scratch.",
  },
  {
    date: "2022 to 2025",
    title: "Scaled Revenue & Operations",
    body: "Grew revenue 3x and EBITDA 2.5x, while maintaining margins through a period of rapid expansion.",
  },
  {
    date: "2025",
    title: "Successful Exit",
    body: "Led a strategic transaction without an investment bank.",
  },
] as const

const timelineViewport = { once: true, margin: "-100px" } as const

const LINE_DURATION = 1
const DOT_STAGGER = 0.2
const DOT_LAND_DURATION = 0.3
const DATE_AFTER_DOT = 0.1
const DATE_DURATION = 0.3
const LABEL_AFTER_DATE = 0.1
const LABEL_DURATION = 0.4

const LINE_COLOR = "#3D5A6E"
const DATE_COLOR = "#A8BDCF"
const BODY_COLOR = "#A8BDCF"
const DOT_COLOR = "#A8BDCF"

const dotSpring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 15,
}

function getDotDelay(index: number) {
  return LINE_DURATION + index * DOT_STAGGER
}

function getDateDelay(index: number) {
  return getDotDelay(index) + DOT_LAND_DURATION + DATE_AFTER_DOT
}

function getLabelDelay(index: number) {
  return getDateDelay(index) + DATE_DURATION + LABEL_AFTER_DATE
}

function TimelineDot() {
  return (
    <div
      className="h-3 w-3 shrink-0 rounded-full"
      style={{ backgroundColor: DOT_COLOR }}
    />
  )
}

function DesktopTimelineStep({
  step,
  index,
  reducedMotion,
}: {
  step: (typeof steps)[number]
  index: number
  reducedMotion: boolean
}) {
  if (reducedMotion) {
    return (
      <div className="flex flex-col items-center">
        <p
          className="text-center font-sans text-[10px] font-medium uppercase tracking-[0.1em]"
          style={{ color: DATE_COLOR }}
        >
          {step.date}
        </p>
        <div className="my-3">
          <TimelineDot />
        </div>
        <h3 className="text-center font-sans text-sm font-semibold text-white">
          {step.title}
        </h3>
        <p
          className="mt-2 text-center font-sans text-xs leading-relaxed"
          style={{ color: BODY_COLOR }}
        >
          {step.body}
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <motion.p
        className="text-center font-sans text-[10px] font-medium uppercase tracking-[0.1em]"
        style={{ color: DATE_COLOR }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={timelineViewport}
        transition={{
          duration: DATE_DURATION,
          ease: "easeOut",
          delay: getDateDelay(index),
        }}
      >
        {step.date}
      </motion.p>

      <motion.div
        className="my-3"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={timelineViewport}
        transition={{
          ...dotSpring,
          delay: getDotDelay(index),
        }}
      >
        <TimelineDot />
      </motion.div>

      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={timelineViewport}
        transition={{
          duration: LABEL_DURATION,
          ease: "easeOut",
          delay: getLabelDelay(index),
        }}
      >
        <h3 className="text-center font-sans text-sm font-semibold text-white">
          {step.title}
        </h3>
        <p
          className="mt-2 text-center font-sans text-xs leading-relaxed"
          style={{ color: BODY_COLOR }}
        >
          {step.body}
        </p>
      </motion.div>
    </div>
  )
}

function MobileTimelineStep({
  step,
  index,
  reducedMotion,
}: {
  step: (typeof steps)[number]
  index: number
  reducedMotion: boolean
}) {
  const dateLabel = (
    <p
      className="font-sans text-[11px] font-medium uppercase tracking-[0.1em]"
      style={{ color: DATE_COLOR }}
    >
      {step.date}
    </p>
  )

  const titleAndBody = (
    <>
      <h3 className="font-sans text-sm font-semibold text-white">{step.title}</h3>
      <p
        className="mt-2 font-sans text-xs leading-relaxed"
        style={{ color: BODY_COLOR }}
      >
        {step.body}
      </p>
    </>
  )

  const dot = (
    <div
      className="absolute left-[5px] top-[28px] z-10 -translate-x-1/2"
      aria-hidden
    >
      <TimelineDot />
    </div>
  )

  if (reducedMotion) {
    return (
      <div className="relative pl-8">
        {dot}
        {dateLabel}
        <div className="mt-2">{titleAndBody}</div>
      </div>
    )
  }

  return (
    <div className="relative pl-8">
      {dot}

      {dateLabel}

      <motion.div
        className="mt-2 w-full"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={timelineViewport}
        transition={{
          duration: LABEL_DURATION,
          ease: "easeOut",
          delay: getLabelDelay(index),
        }}
      >
        {titleAndBody}
      </motion.div>
    </div>
  )
}

export default function CaseStudyTimeline() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section className="bg-[#1E2D3D] pb-16 pt-[72px] md:pb-[120px]">
      <div className="mx-auto max-w-7xl px-4 md:px-20">
        <header className="max-w-3xl pb-8 pt-16 md:pb-12 md:pt-24">
          <motion.p
            className="font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-blueGray"
            {...getFadeUpProps(reducedMotion)}
          >
            CASE STUDY
          </motion.p>
          <motion.h1
            className="mt-4 font-serif text-3xl font-bold leading-tight text-white sm:text-[44px] md:text-[48px] lg:whitespace-nowrap lg:text-[52px]"
            {...getFadeUpProps(reducedMotion)}
          >
            From growth stage to a successful exit.
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl font-sans text-base leading-relaxed sm:text-lg md:text-xl"
            style={{ color: colors.white75 }}
            {...getFadeInProps(reducedMotion)}
          >
            The Bryker team sourced, invested in, and operated a high-growth
            consumer brand from seed stage through a successful exit to an
            institutional partner.
          </motion.p>
        </header>

        <div className="relative mt-4 hidden md:mt-8 md:block">
          {reducedMotion ? (
            <div
              className="absolute left-0 right-0 top-[38px] h-px"
              style={{ backgroundColor: LINE_COLOR }}
              aria-hidden
            />
          ) : (
            <motion.div
              className="absolute left-0 right-0 top-[38px] h-px origin-left"
              style={{ backgroundColor: LINE_COLOR }}
              aria-hidden
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={timelineViewport}
              transition={{ duration: LINE_DURATION, ease: "easeOut" }}
            />
          )}

          <div className="grid grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <DesktopTimelineStep
                key={`${step.date}-${step.title}`}
                step={step}
                index={index}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </div>

        <div className="relative mt-8 md:hidden">
          <div
            className="absolute bottom-0 left-[5px] top-0 w-px"
            style={{ backgroundColor: LINE_COLOR }}
            aria-hidden
          />

          <div className="flex flex-col gap-8 sm:gap-12">
            {steps.map((step, index) => (
              <MobileTimelineStep
                key={`${step.date}-${step.title}`}
                step={step}
                index={index}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
