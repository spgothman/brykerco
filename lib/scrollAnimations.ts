import type { Transition } from "framer-motion"

export const scrollViewport = { once: true, margin: "-80px" } as const

export const fadeUpTransition: Transition = {
  duration: 0.6,
  ease: "easeOut",
}

export const fadeInTransition: Transition = {
  duration: 0.5,
  ease: "easeOut",
  delay: 0.1,
}

type MotionScrollProps = {
  initial?: { opacity: number; y?: number }
  whileInView?: { opacity: number; y?: number }
  viewport?: typeof scrollViewport
  transition?: Transition
}

export function getFadeUpProps(
  reducedMotion: boolean,
  delay = 0,
  y = 20,
  duration = 0.6,
): MotionScrollProps {
  if (reducedMotion) return {}

  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: scrollViewport,
    transition: { duration, ease: "easeOut", delay },
  }
}

export function getFadeInProps(
  reducedMotion: boolean,
  delay = 0.1,
  duration = 0.5,
): MotionScrollProps {
  if (reducedMotion) return {}

  return {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: scrollViewport,
    transition: { duration, ease: "easeOut", delay },
  }
}

/** Sequential service / technology block: eyebrow → headline → body → bullets */
export const serviceEyebrowDelay = 0
export const serviceHeadlineDelay = 0.1
export const serviceBodyDelay = 0.25
export const serviceBulletBaseDelay = 0.35
export const serviceBulletStagger = 0.08

export function getServiceEyebrowProps(reducedMotion: boolean): MotionScrollProps {
  return getFadeInProps(reducedMotion, serviceEyebrowDelay, 0.4)
}

export function getServiceHeadlineProps(reducedMotion: boolean): MotionScrollProps {
  return getFadeUpProps(reducedMotion, serviceHeadlineDelay, 20, 0.5)
}

export function getServiceBodyProps(reducedMotion: boolean): MotionScrollProps {
  return getFadeUpProps(reducedMotion, serviceBodyDelay, 16, 0.5)
}

export function getServiceBulletProps(
  reducedMotion: boolean,
  index: number,
): MotionScrollProps {
  return getFadeUpProps(
    reducedMotion,
    serviceBulletBaseDelay + index * serviceBulletStagger,
    12,
    0.5,
  )
}

/** Technology header: eyebrow → headline → paragraph 1 → paragraph 2 */
export const techParagraph1Delay = 0.2
export const techParagraph2Delay = 0.3
export const techDiagramBaseDelay = 0.4
export const techDiagramLayerStagger = 0.1

export function getTechParagraphProps(
  reducedMotion: boolean,
  paragraphIndex: 0 | 1,
): MotionScrollProps {
  const delay = paragraphIndex === 0 ? techParagraph1Delay : techParagraph2Delay
  return getFadeUpProps(reducedMotion, delay, 16, 0.5)
}

export function getDiagramLayerProps(
  reducedMotion: boolean,
  layerIndexFromBottom: number,
  baseDelay = techDiagramBaseDelay,
): MotionScrollProps {
  return getFadeUpProps(
    reducedMotion,
    baseDelay + layerIndexFromBottom * techDiagramLayerStagger,
    20,
    0.5,
  )
}

/** About page: headings, body copy, cards, team */
export const aboutBodyDelay = 0.1
export const aboutCardStagger = 0.15
export const aboutPhotoDuration = 0.6

export function getAboutHeadingProps(reducedMotion: boolean): MotionScrollProps {
  return getFadeUpProps(reducedMotion, 0, 20, 0.6)
}

export function getAboutBodyProps(
  reducedMotion: boolean,
  paragraphIndex = 0,
): MotionScrollProps {
  return getFadeUpProps(
    reducedMotion,
    aboutBodyDelay + paragraphIndex * 0.05,
    16,
    0.5,
  )
}

export function getAboutCardProps(
  reducedMotion: boolean,
  index: number,
): MotionScrollProps {
  return getFadeUpProps(reducedMotion, index * aboutCardStagger, 20, 0.6)
}

export function getAboutTeamTextProps(
  reducedMotion: boolean,
  index: number,
): MotionScrollProps {
  return getFadeInProps(
    reducedMotion,
    index * aboutCardStagger + aboutPhotoDuration + 0.1,
    0.5,
  )
}

export function getAboutLogoProps(reducedMotion: boolean): MotionScrollProps {
  return getFadeInProps(reducedMotion, 0, 0.6)
}

/** Technology page */
export const techPageBodyDelay = 0.1
export const techPageLayerStagger = 0.15
export const techPageAgentStagger = 0.08
export const techPageLayerCardStagger = 0.15
export const techPageChipStagger = 0.06
export const techPageDiagramBaseDelay = 0.25

export function getTechPageEyebrowProps(reducedMotion: boolean): MotionScrollProps {
  return getFadeInProps(reducedMotion, 0, 0.4)
}

export function getTechPageHeadingProps(reducedMotion: boolean): MotionScrollProps {
  return getFadeUpProps(reducedMotion, 0, 20, 0.6)
}

export function getTechPageBodyProps(
  reducedMotion: boolean,
  paragraphIndex = 0,
): MotionScrollProps {
  return getFadeUpProps(
    reducedMotion,
    techPageBodyDelay + paragraphIndex * 0.05,
    16,
    0.5,
  )
}

export function getTechPageDiagramLayerProps(
  reducedMotion: boolean,
  layerIndexFromBottom: number,
  baseDelay = techPageDiagramBaseDelay,
): MotionScrollProps {
  return getFadeUpProps(
    reducedMotion,
    baseDelay + layerIndexFromBottom * techPageLayerStagger,
    20,
    0.6,
  )
}

export function getTechPageAgentCardProps(
  reducedMotion: boolean,
  index: number,
  baseDelay: number,
): MotionScrollProps {
  return getFadeUpProps(
    reducedMotion,
    baseDelay + index * techPageAgentStagger,
    20,
    0.6,
  )
}

export function getTechPageLayerCardProps(
  reducedMotion: boolean,
  index: number,
): MotionScrollProps {
  return getFadeUpProps(
    reducedMotion,
    index * techPageLayerCardStagger,
    20,
    0.6,
  )
}

export function getTechPageIntegrationChipProps(
  reducedMotion: boolean,
  index: number,
  baseDelay = techPageBodyDelay,
): MotionScrollProps {
  return getFadeInProps(
    reducedMotion,
    baseDelay + index * techPageChipStagger,
    0.5,
  )
}
