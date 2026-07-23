"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { getFadeInProps, getFadeUpProps } from "@/lib/scrollAnimations"
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion"

const clientLogos: {
  src: string
  href?: string
  leftPill?: string
  rightPill?: string
}[] = [
  {
    src: "/images/tombstones/masa.png",
    href: "https://www.masachips.com",
    rightPill: "Active Investment",
  },
  {
    src: "/images/tombstones/bpn.png",
    href: "https://www.bareperformancenutrition.com",
    leftPill: "Operational Role",
    rightPill: "Exited Investment",
  },
  {
    src: "/images/tombstones/huk.png",
    href: "https://www.hukgear.com",
    leftPill: "Operational Role",
  },
  {
    src: "/images/tombstones/onnit.png",
    href: "https://www.onnit.com",
    rightPill: "Exited Investment",
  },
  {
    src: "/images/tombstones/serene-herbs.png",
    href: "https://www.sereneherbs.com",
    leftPill: "Operational Role",
  },
  {
    src: "/images/tombstones/william-murray.png",
    href: "https://www.williammurraygolf.com",
    leftPill: "Operational Role",
  },
  {
    src: "/images/tombstones/big-blanket-co.png",
    href: "https://www.bigblanket.com",
    leftPill: "Operational Role",
    rightPill: "Active Investment",
  },
  {
    src: "/images/tombstones/zero-foxtrot.png",
    href: "https://www.zerofoxtrot.com",
    leftPill: "Operational Role",
  },
  {
    src: "/images/tombstones/seager.png",
    href: "https://www.seagerco.com",
    leftPill: "Operational Role",
  },
  {
    src: "/images/tombstones/ag-gear.png",
    href: "https://www.aggearstore.com",
    leftPill: "Operational Role",
  },
  {
    src: "/images/tombstones/barton.png",
    href: "https://www.bartonwatchbands.com",
    leftPill: "Operational Role",
  },
  {
    src: "/images/tombstones/nomad.png",
    href: "https://www.nomadoutdoor.com",
    leftPill: "Operational Role",
  },
  {
    src: "/images/tombstones/ikigai-cases.png",
    href: "https://www.ikigaicases.com",
    leftPill: "Operational Role",
  },
  {
    src: "/images/tombstones/granarly.png",
    leftPill: "Operational Role",
  },
  {
    src: "/images/tombstones/weather-line.png",
    href: "https://www.foxweather.com/app",
    leftPill: "Operational Role",
  },
  {
    src: "/images/tombstones/flighty.png",
    href: "https://www.flighty.app",
    leftPill: "Operational Role",
  },
]

const pillBaseClassName =
  "pointer-events-none w-fit rounded-full bg-[#1E2D3D] px-2 py-0.5 font-sans text-xs text-white transition-opacity duration-300 md:px-2.5 md:py-1"

export default function ClientsTombstones() {
  const reducedMotion = usePrefersReducedMotion()
  const [tappedIndex, setTappedIndex] = useState<number | null>(null)
  const openedByTouchRef = useRef(false)

  useEffect(() => {
    if (tappedIndex === null) return

    let removeListener: (() => void) | undefined

    // Defer so the same click that opened the pills doesn't immediately clear them
    const timeoutId = window.setTimeout(() => {
      const onPointerDown = (event: PointerEvent) => {
        if (event.pointerType === "touch") return
        const target = event.target as Element | null
        if (!target?.closest("[data-tombstone]")) {
          setTappedIndex(null)
        }
      }
      document.addEventListener("pointerdown", onPointerDown)
      removeListener = () =>
        document.removeEventListener("pointerdown", onPointerDown)
    }, 0)

    return () => {
      window.clearTimeout(timeoutId)
      removeListener?.()
    }
  }, [tappedIndex])

  return (
    <section className="bg-offWhite py-16 md:py-[120px]">
      <div className="mx-auto max-w-7xl px-4 md:px-20">
        <motion.h2
          className="font-serif text-3xl font-semibold leading-tight text-navy md:text-[48px]"
          {...getFadeUpProps(reducedMotion)}
        >
          Experience
        </motion.h2>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 md:mt-16 lg:grid-cols-4">
          {clientLogos.map(({ src, href, leftPill, rightPill }, index) => {
            const hoverSrc = src.replace(
              "/images/tombstones/",
              "/images/tombstones/hover/",
            )
            const isOnnit = src.includes("onnit")
            const isTapped = tappedIndex === index
            const fadeProps = getFadeInProps(reducedMotion, index * 0.05)

            return (
              <motion.div
                key={src}
                data-tombstone
                {...fadeProps}
                role="button"
                tabIndex={0}
                className="group relative flex cursor-pointer items-center justify-center overflow-hidden rounded border bg-white p-5 transition-shadow duration-200 hover:shadow-md sm:p-10"
                style={{ borderColor: "#E2E8F0" }}
                onTouchStart={() => {
                  openedByTouchRef.current = true
                  setTappedIndex(index)
                }}
                onTouchEnd={() => {
                  setTappedIndex((current) =>
                    current === index ? null : current,
                  )
                }}
                onTouchCancel={() => {
                  setTappedIndex((current) =>
                    current === index ? null : current,
                  )
                }}
                onClick={() => {
                  // Fallback for non-touch devices; ignore synthetic click after touch
                  if (openedByTouchRef.current) {
                    openedByTouchRef.current = false
                    return
                  }
                  setTappedIndex((current) =>
                    current === index ? null : index,
                  )
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault()
                    setTappedIndex((current) =>
                      current === index ? null : index,
                    )
                  }
                }}
              >
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 block w-full md:pointer-events-auto pointer-events-none"
                    onClick={(event) => {
                      // Mobile: tile onClick handles tap; don't navigate away
                      if (
                        typeof window !== "undefined" &&
                        !window.matchMedia("(min-width: 768px)").matches
                      ) {
                        event.preventDefault()
                      } else {
                        event.stopPropagation()
                      }
                    }}
                  >
                    <img
                      src={src}
                      alt=""
                      className="h-[64px] w-full object-contain opacity-100 transition-opacity duration-500 ease-[ease] group-hover:opacity-0 sm:h-[90px]"
                      style={isOnnit ? { transform: "scale(1.2)" } : undefined}
                    />
                  </a>
                ) : (
                  <img
                    src={src}
                    alt=""
                    className="relative z-10 h-[64px] w-full object-contain opacity-100 transition-opacity duration-500 ease-[ease] group-hover:opacity-0 sm:h-[90px]"
                    style={isOnnit ? { transform: "scale(1.2)" } : undefined}
                  />
                )}
                <img
                  src={hoverSrc}
                  alt=""
                  className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-[ease] group-hover:opacity-100"
                  aria-hidden
                />
                {(leftPill || rightPill) && (
                  <div className="pointer-events-none absolute bottom-2 left-2 z-20 flex flex-col gap-1.5 md:right-2 md:flex-row md:items-end md:justify-between">
                    {leftPill && (
                      <span
                        className={`${pillBaseClassName} ${
                          isTapped ? "opacity-100" : "opacity-0"
                        } md:opacity-0 md:group-hover:opacity-100`}
                      >
                        {leftPill}
                      </span>
                    )}
                    {rightPill && (
                      <span
                        className={`${pillBaseClassName} md:ml-auto ${
                          isTapped ? "opacity-100" : "opacity-0"
                        } md:opacity-0 md:group-hover:opacity-100`}
                      >
                        {rightPill}
                      </span>
                    )}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
