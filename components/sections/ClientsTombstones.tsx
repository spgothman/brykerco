"use client"

import { motion } from "framer-motion"
import { getFadeInProps, getFadeUpProps } from "@/lib/scrollAnimations"
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion"

const clientLogos: { src: string; href?: string }[] = [
  {
    src: "/images/tombstones/masa.png",
    href: "https://www.masachips.com",
  },
  {
    src: "/images/tombstones/bpn.png",
    href: "https://www.bareperformancenutrition.com",
  },
  {
    src: "/images/tombstones/huk.png",
    href: "https://www.hukgear.com",
  },
  {
    src: "/images/tombstones/onnit.png",
    href: "https://www.onnit.com",
  },
  {
    src: "/images/tombstones/serene-herbs.png",
    href: "https://www.sereneherbs.com",
  },
  {
    src: "/images/tombstones/william-murray.png",
    href: "https://www.williammurraygolf.com",
  },
  {
    src: "/images/tombstones/big-blanket-co.png",
    href: "https://www.bigblanket.com",
  },
  {
    src: "/images/tombstones/zero-foxtrot.png",
    href: "https://www.zerofoxtrot.com",
  },
  {
    src: "/images/tombstones/seager.png",
    href: "https://www.seager.com",
  },
  {
    src: "/images/tombstones/ag-gear.png",
    href: "https://www.aggearstore.com",
  },
  {
    src: "/images/tombstones/barton.png",
    href: "https://www.bartonwatchbands.com",
  },
  {
    src: "/images/tombstones/nomad.png",
    href: "https://www.nomadoutdoor.com",
  },
  {
    src: "/images/tombstones/ikigai-cases.png",
    href: "https://www.ikigaicases.com",
  },
  {
    src: "/images/tombstones/granarly.png",
  },
  {
    src: "/images/tombstones/weather-line.png",
    href: "https://www.foxweather.com/app",
  },
  {
    src: "/images/tombstones/flighty.png",
    href: "https://www.flighty.app",
  },
]

export default function ClientsTombstones() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section className="bg-white py-16 md:py-[120px]">
      <div className="mx-auto max-w-7xl px-4 md:px-20">
        <motion.h2
          className="font-serif text-3xl font-semibold leading-tight text-navy md:text-[48px]"
          {...getFadeUpProps(reducedMotion)}
        >
          Experience
        </motion.h2>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 md:mt-16 lg:grid-cols-4">
          {clientLogos.map(({ src, href }, index) => {
            const hoverSrc = src.replace(
              "/images/tombstones/",
              "/images/tombstones/hover/",
            )
            const isWilliamMurray = src.includes("william-murray")
            const isOnnit = src.includes("onnit")

            return (
              <motion.div
                key={src}
                className="group relative flex items-center justify-center overflow-hidden rounded border bg-white p-5 transition-shadow duration-200 hover:shadow-md sm:p-10"
                style={{ borderColor: "#E2E8F0" }}
                {...getFadeInProps(reducedMotion, index * 0.05)}
              >
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 block w-full"
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
                  className={`absolute inset-0 z-0 h-full w-full opacity-0 transition-opacity duration-500 ease-[ease] group-hover:opacity-100 ${
                    isWilliamMurray
                      ? "object-contain object-center"
                      : "object-cover"
                  }`}
                  aria-hidden
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
