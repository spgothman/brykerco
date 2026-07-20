"use client"

import { motion } from "framer-motion"
import { agents, cpgSystems } from "@/lib/erpDiagramData"
import { colors } from "@/lib/tokens"
import {
  getDiagramLayerProps,
  getTechPageAgentCardProps,
  getTechPageDiagramLayerProps,
  techPageLayerStagger,
} from "@/lib/scrollAnimations"
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion"

function DiagramArrow() {
  return (
    <svg
      width="20"
      height="28"
      viewBox="0 0 20 28"
      fill="none"
      aria-hidden
      className="mx-auto"
    >
      <path
        d="M10 26V4M10 4L4 10M10 4L16 10"
        stroke={colors.slate}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DiagramCard({
  children,
  highlighted = false,
  className = "",
}: {
  children: React.ReactNode
  highlighted?: boolean
  className?: string
}) {
  return (
    <div
      className={`rounded border px-5 py-3 ${className}`}
      style={{
        backgroundColor: colors.navyMid,
        borderColor: highlighted ? colors.accent : colors.slate,
        boxShadow: highlighted ? `0 0 0 1px ${colors.accent}40` : undefined,
      }}
    >
      {children}
    </div>
  )
}

function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-xs font-medium text-white">{children}</p>
  )
}

function LayerWrapper({
  animated,
  reducedMotion,
  layerIndexFromBottom,
  layerBaseDelay,
  layerStagger,
  children,
  className = "",
}: {
  animated: boolean
  reducedMotion: boolean
  layerIndexFromBottom: number
  layerBaseDelay: number
  layerStagger: number
  children: React.ReactNode
  className?: string
}) {
  if (!animated) {
    return <div className={className}>{children}</div>
  }

  const layerProps =
    layerStagger === techPageLayerStagger
      ? getTechPageDiagramLayerProps(
          reducedMotion,
          layerIndexFromBottom,
          layerBaseDelay,
        )
      : getDiagramLayerProps(
          reducedMotion,
          layerIndexFromBottom,
          layerBaseDelay,
        )

  return (
    <motion.div className={className} {...layerProps}>
      {children}
    </motion.div>
  )
}

export default function ERPArchitectureDiagram({
  animated = false,
  layerBaseDelay = 0.4,
  staggerAgents = false,
}: {
  animated?: boolean
  layerBaseDelay?: number
  staggerAgents?: boolean
}) {
  const reducedMotion = usePrefersReducedMotion()
  const layerStagger = staggerAgents ? techPageLayerStagger : 0.1
  const agentsBaseDelay =
    layerBaseDelay + 3 * techPageLayerStagger

  return (
    <div
      className="flex flex-col items-center"
      aria-label="Intelligent ERP architecture"
    >
      <div className="w-full">
        {animated && staggerAgents ? (
          <>
            <motion.p
              className="mb-4 text-center font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-blueGray"
              {...getTechPageDiagramLayerProps(reducedMotion, 3, layerBaseDelay)}
            >
              Closed-Loop Interface
            </motion.p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {agents.map((agent, index) => (
                <motion.div
                  key={agent}
                  {...getTechPageAgentCardProps(
                    reducedMotion,
                    index,
                    agentsBaseDelay,
                  )}
                >
                  <DiagramCard className="text-center">
                    <CardLabel>{agent}</CardLabel>
                    <p
                      className="mt-1 font-sans text-[10px] font-medium uppercase tracking-wider"
                      style={{ color: colors.accent }}
                    >
                      +AGENT
                    </p>
                  </DiagramCard>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <LayerWrapper
            animated={animated}
            reducedMotion={reducedMotion}
            layerIndexFromBottom={3}
            layerBaseDelay={layerBaseDelay}
            layerStagger={layerStagger}
            className="w-full"
          >
            <p className="mb-4 text-center font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-blueGray">
              Closed-Loop Interface
            </p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {agents.map((agent) => (
                <DiagramCard key={agent} className="text-center">
                  <CardLabel>{agent}</CardLabel>
                  <p
                    className="mt-1 font-sans text-[10px] font-medium uppercase tracking-wider"
                    style={{ color: colors.accent }}
                  >
                    +AGENT
                  </p>
                </DiagramCard>
              ))}
            </div>
          </LayerWrapper>
        )}
      </div>

      <div className="py-3">
        <DiagramArrow />
      </div>

      <LayerWrapper
        animated={animated}
        reducedMotion={reducedMotion}
        layerIndexFromBottom={2}
        layerBaseDelay={layerBaseDelay}
        layerStagger={layerStagger}
        className="w-full max-w-xl"
      >
        <DiagramCard highlighted className="text-center">
          <CardLabel>Intelligence + Context Layer</CardLabel>
        </DiagramCard>
      </LayerWrapper>

      <div className="py-3">
        <DiagramArrow />
      </div>

      <LayerWrapper
        animated={animated}
        reducedMotion={reducedMotion}
        layerIndexFromBottom={1}
        layerBaseDelay={layerBaseDelay}
        layerStagger={layerStagger}
        className="w-full max-w-md"
      >
        <DiagramCard className="text-center">
          <CardLabel>API + Data Warehouse</CardLabel>
        </DiagramCard>
      </LayerWrapper>

      <div className="py-3">
        <DiagramArrow />
      </div>

      <LayerWrapper
        animated={animated}
        reducedMotion={reducedMotion}
        layerIndexFromBottom={0}
        layerBaseDelay={layerBaseDelay}
        layerStagger={layerStagger}
        className="w-full"
      >
        <p className="mb-4 text-center font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-blueGray">
          Common CPG Systems
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {cpgSystems.map((system) => (
            <DiagramCard key={system}>
              <CardLabel>{system}</CardLabel>
            </DiagramCard>
          ))}
        </div>
      </LayerWrapper>
    </div>
  )
}
