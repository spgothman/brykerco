"use client"

import Link from "next/link"
import { colors } from "@/lib/tokens"
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion"

const HERO_VIDEO_SRC = "/videos/Austin Skyline Video.mp4"
const HERO_VIDEO_POSTER = "/images/Hero Austin.jpg"

export default function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <section className="relative isolate h-[80vh] overflow-visible bg-navy md:h-auto md:min-h-screen">
      {!prefersReducedMotion && (
        <div
          className="animate-hero-gradient-drift absolute inset-0 z-0"
          style={{
            background: `linear-gradient(135deg, ${colors.navy}, ${colors.navyMid}, ${colors.slate}, ${colors.navyMid})`,
            backgroundSize: "200% 200%",
          }}
          aria-hidden
        />
      )}

      <div className="absolute inset-0 z-[1]">
        <video
          autoPlay={!prefersReducedMotion}
          muted
          loop={!prefersReducedMotion}
          playsInline
          preload="auto"
          poster={HERO_VIDEO_POSTER}
          className="h-full w-full object-cover"
          style={{
            willChange: "transform",
            transform: "translateZ(0)",
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
          aria-hidden
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{ backgroundColor: colors.overlayHero, willChange: "opacity" }}
        aria-hidden
      />

      <div className="relative z-10 flex h-[80vh] flex-col justify-between overflow-visible px-4 pt-28 pb-8 md:h-auto md:min-h-screen md:flex-row md:items-center md:justify-start md:px-20 md:pt-0 md:pb-0">
        <div className="max-w-[800px]">
          <p
            className="max-w-full font-sans text-[11px] font-medium tracking-[0.08em] sm:tracking-[0.12em]"
            style={{ color: colors.accent }}
          >
            ESTABLISHED 2016{" "}
            <span aria-hidden>&middot;</span> OPERATING PARTNER{" "}
            <span aria-hidden>&middot;</span>
            <br className="block md:hidden" /> MIDDLE MARKET CPG
          </p>

          <h1 className="mt-8 font-serif text-3xl font-bold leading-[1.1] text-white sm:text-[44px] md:mt-6 md:text-[68px]">
            The operating partner for high-growth consumer brands.
          </h1>

          <p
            className="mt-6 max-w-[600px] font-sans text-sm leading-[1.75] md:text-lg"
            style={{ color: colors.white75 }}
          >
            Bryker & Co. embeds experienced operators inside your organization,
            building the finance, operations, and technology systems that prepare
            companies for institutional capital and successful transactions.
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link
              href="/results"
              className="inline-flex items-center justify-center rounded-sm px-7 py-3.5 font-sans font-semibold"
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
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-sm border border-white bg-transparent px-7 py-3.5 font-sans text-sm font-semibold text-white transition-colors duration-150 hover:bg-white/10"
            >
              Learn About Bryker
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
