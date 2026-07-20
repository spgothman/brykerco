"use client"

import { motion } from "framer-motion"
import { colors } from "@/lib/tokens"
import ERPArchitectureDiagram from "@/components/sections/ERPArchitectureDiagram"
import { agents, cpgSystems } from "@/lib/erpDiagramData"
import {
  getTechPageBodyProps,
  getTechPageEyebrowProps,
  getTechPageHeadingProps,
  getTechPageIntegrationChipProps,
  getTechPageLayerCardProps,
  techPageBodyDelay,
  techPageDiagramBaseDelay,
} from "@/lib/scrollAnimations"
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion"

const layers = [
  {
    title: "Closed-Loop Interface",
    body: "Purpose-built agents cover the functions consumer brands run every day, from controller and FP&A to demand planning, inventory, supply chain, and performance marketing. Each agent operates inside a unified interface, so leadership gets answers without switching between tools.",
    items: agents,
  },
  {
    title: "Intelligence + Context Layer",
    body: "The layer that makes raw data useful. Business rules, historical context, and operational knowledge are applied on top of normalized data. Every answer reflects how your company actually works, not just what a spreadsheet says.",
    items: [] as const,
  },
  {
    title: "API + Data Warehouse",
    body: "A central data warehouse pulls from every system in the stack through API connections. Data is normalized, reconciled, and stored once. That eliminates the version-control problems that come from exporting CSVs across departments.",
    items: [] as const,
  },
  {
    title: "Common CPG Systems",
    body: "The Bryker Intelligent ERP connects to the tools consumer brands already use, including e-commerce, marketplaces, EDI, marketing platforms, fulfillment, and project management. No rip-and-replace of existing software is required.",
    items: cpgSystems,
  },
] as const

export default function TechnologyDetails() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <>
      <section className="bg-white py-[120px]">
        <div className="mx-auto max-w-7xl px-6 md:px-20">
          <div className="max-w-3xl">
            <motion.p
              className="font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-slate"
              {...getTechPageEyebrowProps(reducedMotion)}
            >
              INTELLIGENT ERP
            </motion.p>
            <motion.h2
              className="mt-4 font-serif text-[40px] font-semibold leading-tight text-navy md:text-[48px]"
              {...getTechPageHeadingProps(reducedMotion)}
            >
              We build operating systems for consumer brands.
            </motion.h2>
            <motion.p
              className="mt-6 font-sans text-base leading-relaxed text-slate"
              {...getTechPageBodyProps(reducedMotion, 0)}
            >
              Most consumer companies run on a patchwork of disconnected tools with
              no single source of truth. Or even worse, they rely on clunky,
              outdated systems (like NetSuite) that barely work or fulfill their
              needs.
            </motion.p>
            <motion.p
              className="mt-6 font-sans text-base leading-relaxed text-slate"
              {...getTechPageBodyProps(reducedMotion, 1)}
            >
              The Bryker Intelligent ERP sits above the entire system stack,
              pulling data from every tool the business uses, normalizing it in a
              central warehouse, and providing answers through one intelligent
              interface.
            </motion.p>
          </div>

          <div className="mt-20">
            <ERPArchitectureDiagram
              animated
              staggerAgents
              layerBaseDelay={techPageDiagramBaseDelay}
            />
          </div>
        </div>
      </section>

      <section className="bg-offWhite py-[120px]">
        <div className="mx-auto max-w-7xl px-6 md:px-20">
          <motion.h2
            className="font-serif text-[40px] font-semibold leading-tight text-navy md:text-[48px]"
            {...getTechPageHeadingProps(reducedMotion)}
          >
            How each layer works.
          </motion.h2>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {layers.map((layer, index) => (
              <motion.div
                key={layer.title}
                className="rounded border border-midBlue/40 bg-white px-6 py-8"
                {...getTechPageLayerCardProps(reducedMotion, index)}
              >
                <h3 className="font-sans text-lg font-semibold text-navy">
                  {layer.title}
                </h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-blueGray">
                  {layer.body}
                </p>
                {layer.items.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {layer.items.map((item) => (
                      <span
                        key={item}
                        className="rounded border px-3 py-1.5 font-sans text-xs font-medium text-navy"
                        style={{
                          borderColor: colors.midBlue,
                          backgroundColor: colors.offWhite,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-textPrimary py-[120px]">
        <div className="mx-auto max-w-7xl px-6 md:px-20">
          <div className="max-w-3xl">
            <motion.p
              className="font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-blueGray"
              {...getTechPageEyebrowProps(reducedMotion)}
            >
              INTEGRATIONS
            </motion.p>
            <motion.h2
              className="mt-4 font-serif text-[40px] font-semibold leading-tight text-white md:text-[48px]"
              {...getTechPageHeadingProps(reducedMotion)}
            >
              Built for the CPG stack.
            </motion.h2>
            <motion.p
              className="mt-6 font-sans text-base leading-relaxed"
              style={{ color: colors.white75 }}
              {...getTechPageBodyProps(reducedMotion, 0)}
            >
              Consumer brands run on a specific set of tools. The Intelligent
              ERP is designed to connect them. From Shopify storefronts and Amazon
              marketplaces to EDI with retail partners, Meta ad accounts,
              ShipStation fulfillment, and Monday project management, Bryker
              integrates with the systems your team already depends on.
            </motion.p>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            {cpgSystems.map((system, index) => (
              <motion.div
                key={system}
                className="rounded border px-5 py-3"
                style={{
                  backgroundColor: colors.navyMid,
                  borderColor: colors.slate,
                }}
                {...getTechPageIntegrationChipProps(
                  reducedMotion,
                  index,
                  techPageBodyDelay + 0.1,
                )}
              >
                <p className="font-sans text-sm font-medium text-white">
                  {system}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
