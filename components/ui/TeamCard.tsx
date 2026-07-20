"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import {
  getAboutCardProps,
  getAboutTeamTextProps,
} from "@/lib/scrollAnimations"
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion"

type TeamCardProps = {
  name: string
  title: string
  imageSrc: string
  index: number
}

export default function TeamCard({
  name,
  title,
  imageSrc,
  index,
}: TeamCardProps) {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <article className="flex flex-col overflow-hidden rounded bg-white shadow-sm">
      <motion.div
        className="relative aspect-[4/5] w-full bg-offWhite"
        {...getAboutCardProps(reducedMotion, index)}
      >
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </motion.div>
      <motion.div
        className="flex flex-1 flex-col px-6 py-6"
        {...getAboutTeamTextProps(reducedMotion, index)}
      >
        <h3 className="font-serif text-xl font-semibold text-navy">{name}</h3>
        <p className="mt-1 font-sans text-sm font-medium text-slate">{title}</p>
      </motion.div>
    </article>
  )
}
