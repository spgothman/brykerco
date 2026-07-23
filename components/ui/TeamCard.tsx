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
  linkedInUrl: string
  index: number
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      className={className}
      aria-hidden
    >
      <path
        fill="#0A66C2"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  )
}

export default function TeamCard({
  name,
  title,
  imageSrc,
  linkedInUrl,
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
        className="flex flex-1 items-end gap-3 px-5 py-5 md:px-6 md:py-6"
        {...getAboutTeamTextProps(reducedMotion, index)}
      >
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-xl font-semibold text-navy">{name}</h3>
          <p className="mt-1 font-sans text-sm font-medium text-slate">{title}</p>
        </div>
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} on LinkedIn`}
          className="mb-0.5 shrink-0 transition-opacity hover:opacity-80"
        >
          <LinkedInIcon />
        </a>
      </motion.div>
    </article>
  )
}
