"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { colors } from "@/lib/tokens"
import ERPArchitectureDiagram from "@/components/sections/ERPArchitectureDiagram"
import {
  getFadeInProps,
  getServiceEyebrowProps,
  getServiceHeadlineProps,
  getTechParagraphProps,
  techDiagramBaseDelay,
} from "@/lib/scrollAnimations"
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion"

export default function IntelligentERP() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <section className="bg-textPrimary py-[120px]">
      <div className="mx-auto max-w-7xl px-6 md:px-20">
        <header className="max-w-3xl">
          <motion.p
            className="font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-blueGray"
            {...getServiceEyebrowProps(reducedMotion)}
          >
            TECHNOLOGY
          </motion.p>
          <motion.h2
            className="mt-4 font-serif text-[40px] font-semibold leading-tight text-white md:text-[48px]"
            {...getServiceHeadlineProps(reducedMotion)}
          >
            We build operating systems for consumer brands.
          </motion.h2>
          <motion.p
            className="mt-6 font-sans text-base leading-relaxed"
            style={{ color: colors.white75 }}
            {...getTechParagraphProps(reducedMotion, 0)}
          >
            Most consumer companies run on a patchwork of disconnected tools with
            no single source of truth. Or even worse, they rely on clunky,
            outdated systems (like NetSuite) that barely work or fulfill their
            needs.
          </motion.p>
          <motion.p
            className="mt-6 font-sans text-base leading-relaxed"
            style={{ color: colors.white75 }}
            {...getTechParagraphProps(reducedMotion, 1)}
          >
            The Bryker Intelligent ERP sits above the entire system stack,
            pulling data from every tool the business uses, normalizing it in a
            central warehouse, and providing answers through one intelligent
            interface.
          </motion.p>
        </header>

        <div className="mt-20">
          <ERPArchitectureDiagram
            animated
            layerBaseDelay={techDiagramBaseDelay}
          />
        </div>

        <motion.div
          className="mt-16 text-center"
          {...getFadeInProps(reducedMotion, techDiagramBaseDelay + 0.5)}
        >
          <Link
            href="/technology"
            className="inline-flex rounded-sm border-[1.5px] border-white px-7 py-3.5 font-sans text-sm font-semibold text-white transition-colors duration-150 hover:bg-white/10"
          >
            Learn About Our Technology
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
