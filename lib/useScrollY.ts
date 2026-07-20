"use client"

import { useMotionValueEvent, useScroll } from "framer-motion"
import { useEffect, useState } from "react"

const DEFAULT_THRESHOLD = 80

export function useScrollY(threshold = DEFAULT_THRESHOLD) {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setScrolled(scrollY.get() > threshold)
  }, [scrollY, threshold])

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > threshold)
  })

  return { scrollY, scrolled }
}
